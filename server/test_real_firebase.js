require('dotenv').config();
const { admin } = require('./config/firebase');

console.log("\n🧪 [TEST] Verifying real Firebase Admin initialization...");
console.log("--------------------------------------------------");

if (admin && admin.apps.length > 0) {
  console.log("✅ SUCCESS: Firebase Admin SDK initialized successfully with your service account!");
  console.log("   ├─ Project ID:", admin.app().options.credential.projectId || "digisaathinew");
  console.log("   └─ Database URL:", admin.app().options.databaseURL);
} else {
  console.error("❌ FAILURE: Firebase Admin SDK failed to initialize. Please check if service account JSON was written correctly.");
}
process.exit(0);
