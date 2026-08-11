const mqtt = require('mqtt');
const { admin } = require('./config/firebase');

// Read HiveMQ Cloud connection credentials from environment variables
const clusterUrl = process.env.MQTT_CLUSTER_URL || 'mqtts://mock-cluster.s1.eu.hivemq.cloud:8883';
const username = process.env.HIVEMQ_USERNAME;
const password = process.env.HIVEMQ_PASSWORD;

console.log(`📶 [MQTT] Connecting to broker at: ${clusterUrl}`);

const mqttClient = mqtt.connect(clusterUrl, {
  username: username,
  password: password,
  clientId: 'digisaathi_server_' + Math.random().toString(16).substring(2, 10),
  rejectUnauthorized: false // Necessary for some Node environments when using self-signed or specific cloud certs
});

mqttClient.on('connect', () => {
  console.log('📶 [MQTT] Connected to HiveMQ Cloud successfully');
  // Subscribe to ALL senior command topics
  mqttClient.subscribe('digisaathi/+/command', (err) => {
    if (err) {
      console.error('❌ [MQTT] Failed to subscribe to digisaathi/+/command:', err);
    } else {
      console.log('✅ [MQTT] Subscribed to topic: digisaathi/+/command');
    }
  });
});

mqttClient.on('message', async (topic, messageBuffer) => {
  const topicParts = topic.split('/');
  const seniorId = topicParts[1];
  
  let message;
  try {
    message = JSON.parse(messageBuffer.toString());
  } catch (err) {
    console.error('❌ [MQTT] Failed to parse JSON message:', err.message);
    return;
  }
  
  console.log(`📶 [MQTT] Received command from senior ID "${seniorId}":`, message);
  
  try {
    // 1. Write to Firebase Realtime Database
    if (admin && admin.apps.length) {
      try {
        await admin.database()
          .ref(`/remote_commands/${seniorId}`)
          .set({
            ...message,
            receivedAt: Date.now(),
            status: 'pending'
          });
        console.log(`✅ [Firebase RTDB] Saved remote command for ${seniorId}`);
      } catch (dbErr) {
        console.error(`❌ [Firebase RTDB] Error writing to Realtime Database:`, dbErr.message);
      }
    } else {
      console.warn('⚠️ [Firebase RTDB] Admin app not initialized. Skipping Realtime Database write.');
    }
    
    // 2. Send FCM push notification to senior's app
    await sendFCMToSenior(seniorId, message);
    
    // 3. If SOS, also notify family and guards
    if (message.type === 'sos') {
      await handleSOS(seniorId);
    }
    
    // 4. Send ACK back to device
    const ackTopic = `digisaathi/${seniorId}/ack`;
    const ackPayload = JSON.stringify({
      status: 'received',
      timestamp: Date.now()
    });
    
    mqttClient.publish(ackTopic, ackPayload, (err) => {
      if (err) {
        console.error(`❌ [MQTT] Failed to publish ACK to ${ackTopic}:`, err);
      } else {
        console.log(`✉️ [MQTT] ACK sent back to remote on ${ackTopic}`);
      }
    });
  } catch (err) {
    console.error(`❌ [MQTT] Error processing remote command for ${seniorId}:`, err);
  }
});

mqttClient.on('error', (err) => {
  console.error('❌ [MQTT] Broker connection error:', err.message);
});

mqttClient.on('close', () => {
  console.warn('⚠️ [MQTT] Connection closed');
});

mqttClient.on('reconnect', () => {
  console.log('🔄 [MQTT] Attempting to reconnect to HiveMQ broker...');
});

/**
 * Sends FCM push notification to the senior's registered device.
 */
async function sendFCMToSenior(seniorId, command) {
  if (!admin || !admin.apps.length) {
    console.warn('⚠️ [FCM] Firebase not initialized. Skipping senior FCM.');
    return;
  }
  
  try {
    // Get senior's FCM token from Firestore
    const seniorDoc = await admin.firestore()
      .collection('seniors')
      .doc(seniorId)
      .get();
      
    if (!seniorDoc.exists) {
      console.warn(`⚠️ [FCM] Senior profile "${seniorId}" not found in Firestore.`);
      return;
    }
    
    const senior = seniorDoc.data();
    const fcmToken = senior.fcmToken;
    
    if (!fcmToken) {
      console.warn(`⚠️ [FCM] No registered FCM token found for senior "${seniorId}".`);
      return;
    }
    
    // Map command type to target navigation screen
    const routeMap = {
      'sos':     { screen: 'SOS',     params: {} },
      'society': { screen: 'Society', params: { optionIndex: command.optionIndex } },
      'needs':   { screen: 'Needs',   params: { optionIndex: command.optionIndex } }
    };
    
    const route = routeMap[command.type] || { screen: 'Home', params: {} };
    
    console.log(`✉️ [FCM] Dispatching command FCM to senior: ${senior.name || seniorId}`);
    
    await admin.messaging().send({
      token: fcmToken,
      notification: {
        title: command.type === 'sos' 
          ? '🚨 SOS Alert Activated' 
          : `DigiSaathi Remote: ${command.label}`,
        body: command.type === 'sos'
          ? 'Emergency button pressed on your remote'
          : `Navigating to ${command.label}`
      },
      data: {
        type: command.type,
        optionIndex: String(command.optionIndex || 0),
        label: command.label || '',
        screen: route.screen,
        fromRemote: 'true'
      },
      android: {
        priority: command.type === 'sos' ? 'high' : 'normal'
      }
    });
    console.log(`✅ [FCM] Senior notification successfully delivered.`);
  } catch (err) {
    console.error(`❌ [FCM] Error sending FCM to senior "${seniorId}":`, err.message);
  }
}

/**
 * Handles SOS high-priority actions: alerts family and logs to Firestore.
 */
async function handleSOS(seniorId) {
  if (!admin || !admin.apps.length) return;
  
  try {
    const seniorDoc = await admin.firestore()
      .collection('seniors')
      .doc(seniorId)
      .get();
      
    if (!seniorDoc.exists) return;
    
    const senior = seniorDoc.data();
    const familyTokens = senior.familyFCMTokens || [];
    
    console.log(`🚨 [SOS Alert] senior "${senior.name || seniorId}" is in distress! Notifying ${familyTokens.length} family members.`);
    
    // Notify all family members
    for (const token of familyTokens) {
      try {
        await admin.messaging().send({
          token,
          notification: {
            title: '🚨 EMERGENCY — ' + (senior.name || 'Senior Citizen'),
            body: `${senior.name || 'Senior'} has pressed the SOS button. Address: ${senior.address || 'Not specified'}`
          },
          android: { priority: 'high' }
        });
        console.log(`✅ [SOS FCM] Notification sent to family token: ${token}`);
      } catch (fcmErr) {
        console.error(`❌ [SOS FCM] Failed to send to family member:`, fcmErr.message);
      }
    }
    
    // Log SOS event in Firestore
    const newEvent = {
      seniorId,
      seniorName: senior.name || 'Unknown Senior',
      address: senior.address || 'Not specified',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: 'active',
      familyNotified: familyTokens.length
    };
    
    const docRef = await admin.firestore()
      .collection('sos_events')
      .add(newEvent);
      
    console.log(`✅ [SOS Firestore] Logged alert event with ID: ${docRef.id}`);
  } catch (err) {
    console.error(`❌ [SOS Handler] Error processing SOS alert:`, err.message);
  }
}

module.exports = { mqttClient };
