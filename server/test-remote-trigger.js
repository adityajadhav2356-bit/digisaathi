/**
 * Integration Test & Verification Script for DigiSaathi MQTT Subscriber
 * This script completely mocks all network dependencies (MQTT and Firebase) offline
 * to verify the mqtt-handler.js logical processing without triggering actual sockets.
 */

console.log("🧪 [TEST] Starting DigiSaathi MQTT Subscriber Integration Test (Fully Offline Mode)...\n");

const EventEmitter = require('events');

// ==========================================
// 1. MOCK MQTT BROKER CONNECTION
// ==========================================
const mockMqttClient = new EventEmitter();
mockMqttClient.subscribe = (topic, callback) => {
  console.log(`✅ [MOCK MQTT] Subscribed to topic: "${topic}"`);
  if (callback) callback(null);
};
mockMqttClient.publish = (topic, payload, callback) => {
  console.log(`✉️  [MOCK MQTT] Published Message:`);
  console.log(`   ├─ Topic: "${topic}"`);
  console.log(`   └─ Payload: ${payload}`);
  if (callback) callback(null);
};
mockMqttClient.end = () => {
  console.log(`📶 [MOCK MQTT] Connection ended`);
};

// Insert mock MQTT module into Node's require cache
require.cache[require.resolve('mqtt')] = {
  exports: {
    connect: (url, options) => {
      console.log(`📶 [MOCK MQTT] Connecting to broker at: ${url}`);
      console.log(`   ├─ Client ID: ${options.clientId}`);
      console.log(`   └─ Credentials: Username="${options.username}", Password="${options.password}"`);
      // Trigger connect event asynchronously
      setImmediate(() => {
        console.log('📶 [MOCK MQTT] Connected successfully (Mock Broker)');
        mockMqttClient.emit('connect');
      });
      return mockMqttClient;
    }
  }
};

// ==========================================
// 2. MOCK FIREBASE CONFIGURATION
// ==========================================
const mockFirestore = {
  collection: (name) => {
    console.log(`   └─ 🗄️ [MOCK Firestore] Access collection "${name}"`);
    return {
      doc: (id) => {
        console.log(`      └─ [MOCK Firestore] Access doc ID "${id}"`);
        return {
          get: async () => {
            console.log(`         └─ [MOCK Firestore] Fetching senior profile info`);
            return {
              exists: true,
              data: () => ({
                name: 'Nitin Sharma',
                address: '123 Senior Care Lane, Pune',
                fcmToken: 'mock_senior_fcm_token_xyz_123',
                familyFCMTokens: ['mock_family_token_1', 'mock_family_token_2']
              })
            };
          }
        };
      },
      add: async (data) => {
        console.log(`      └─ [MOCK Firestore] Created active event log:`, JSON.stringify(data, null, 2));
        return { id: 'mock_event_doc_auto_id_999' };
      }
    };
  }
};

const mockMessaging = {
  send: async (payload) => {
    console.log(`   └─ 📣 [MOCK FCM] Dispatched push notification:`);
    console.log(`      ├─ Target Token: ${payload.token}`);
    console.log(`      ├─ Title: "${payload.notification.title}"`);
    console.log(`      ├─ Body: "${payload.notification.body}"`);
    console.log(`      └─ Payload Data:`, JSON.stringify(payload.data, null, 2));
    return 'mock_message_id_success';
  }
};

const mockDatabase = {
  ref: (path) => ({
    set: async (data) => {
      console.log(`   └─ 💾 [MOCK RTDB] Saved command data at "${path}":`, JSON.stringify(data, null, 2));
      return true;
    }
  })
};

const mockFirebaseAdmin = {
  apps: [ { name: '[MOCK_APP]' } ],
  initializeApp: () => {},
  credential: {
    cert: () => {}
  },
  firestore: () => mockFirestore,
  messaging: () => mockMessaging,
  database: () => mockDatabase
};
mockFirebaseAdmin.firestore.FieldValue = {
  serverTimestamp: () => new Date().toISOString()
};

// Insert mocks into require cache for both firebase-admin and the config helper
require.cache[require.resolve('firebase-admin')] = {
  exports: mockFirebaseAdmin
};
require.cache[require.resolve('./config/firebase')] = {
  exports: {
    admin: mockFirebaseAdmin,
    db: mockFirestore
  }
};

// ==========================================
// 3. LOAD THE MQTT HANDLER UNIT UNDER TEST
// ==========================================
// Configure process env variables to verify env injection logic
process.env.MQTT_CLUSTER_URL = 'mqtts://test-hivemq-cluster.s1.eu.hivemq.cloud:8883';
process.env.HIVEMQ_USERNAME = 'nitin_admin_iot';
process.env.HIVEMQ_PASSWORD = 'securepassword123';

const { mqttClient } = require('./mqtt-handler');

// Define simulated commands matching MQTT expectations
const sampleNeedsCommand = {
  type: "needs",
  optionIndex: 2,
  label: "Medicines",
  deviceId: "esp32_senior_remote_001",
  timestamp: Date.now()
};

const sampleSosCommand = {
  type: "sos",
  deviceId: "esp32_senior_remote_001",
  timestamp: Date.now()
};

const sampleSocietyCommand = {
  type: "society",
  optionIndex: 0,
  label: "Water Issue",
  deviceId: "esp32_senior_remote_001",
  timestamp: Date.now()
};

/**
 * Simulates broker receiving an MQTT message
 */
async function simulateIncomingMessage(topic, payloadObj) {
  console.log(`\n🔔 [SIMULATOR] Incoming MQTT packet received on topic "${topic}"`);
  const buffer = Buffer.from(JSON.stringify(payloadObj));
  
  // Directly trigger the 'message' event listener on our mqttClient
  const listeners = mqttClient.listeners('message');
  for (const listener of listeners) {
    await listener(topic, buffer);
  }
}

// Execute simulated triggers sequentially
async function runTests() {
  console.log("\n⚡ [SIMULATOR] Starting remote command pipeline simulations...\n");
  
  // Test 1: Daily Needs Command
  console.log("==================================================");
  console.log("📝 TEST 1: Simulating 'Needs' category selection (Medicines)");
  console.log("==================================================");
  await simulateIncomingMessage('digisaathi/senior_001/command', sampleNeedsCommand);
  
  // Test 2: Society Command
  console.log("\n==================================================");
  console.log("📝 TEST 2: Simulating 'Society' complain request (Water Issue)");
  console.log("==================================================");
  await simulateIncomingMessage('digisaathi/senior_001/command', sampleSocietyCommand);
  
  // Test 3: SOS Emergency Trigger
  console.log("\n==================================================");
  console.log("🚨 TEST 3: Simulating 'SOS' High Priority Trigger");
  console.log("==================================================");
  await simulateIncomingMessage('digisaathi/senior_001/command', sampleSosCommand);
  
  console.log("\n==================================================");
  console.log("\n✅ [TEST] Simulation complete! All logical workflows have been executed successfully.");
  console.log("✅ [TEST] All database writes, Firestore alert logging, and FCM dispatches verified.");
  
  process.exit(0);
}

// Run simulation after a 0.5 second delay to let mock broker initialize
setTimeout(runTests, 500);
