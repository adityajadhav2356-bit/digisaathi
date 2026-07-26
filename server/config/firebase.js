const admin = require('firebase-admin');

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
    console.log("Firebase Admin initialized successfully.");
  } else {
    console.warn("FIREBASE_SERVICE_ACCOUNT environment variable is not set. Database connection won't work in this session.");
  }
} catch (error) {
  console.error("Firebase Admin initialization error:", error);
}

const db = admin.apps.length ? admin.firestore() : null;

module.exports = { admin, db };
