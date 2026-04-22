# DigiSaathi – Digital Literacy for Senior Citizens 📱🙏

DigiSaathi is a full-stack web application designed specifically for senior citizens to learn digital skills like UPI payments, WhatsApp basics, and Aadhaar services in a safe, accessible, and friendly environment.

## 🎨 UI/UX Features
- **Senior-Friendly Design**: Large fonts (min 18px), high contrast (Saffron/Navy), and generously sized tap targets (min 48x48px).
- **Interactive Learning**: Step-by-step tutorials with large illustrations and built-in voice read-aloud using the Web Speech API.
- **Dynamic Accessibility**: Toggle between Normal, Large, and Extra Large font sizes, along with Light and Dark modes.
- **Safety First**: OTP-based login (no passwords) and a dedicated Fraud Alert module with an interactive simulator.
- **Volunteer Support**: Connect with youth volunteers for private sessions and guidance.

---

## 🛠️ Tech Stack
- **Frontend**: React 18, React Router v6, Tailwind CSS, Framer Motion, Axios, Context API, Lucide-React.
- **Backend**: Node.js, Express, Firebase Admin SDK.
- **Database/Auth**: Firebase Firestore & Firebase Auth (OTP).

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v16 or higher)
- A Firebase Project (Google Cloud console)

### 2. Backend Setup
1. Navigate to the server folder:
   ```bash
   cd digisaathi/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   PORT=5000
   FIREBASE_SERVICE_ACCOUNT='{"type":"service_account","project_id":"..."}'
   ```
   *Note: Get your service account JSON from Project Settings -> Service Accounts in the Firebase Console.*
4. Seed the database with modules and fraud alerts:
   ```bash
   node seed.js
   ```
5. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the client folder:
   ```bash
   cd digisaathi/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `src/utils/firebaseConfig.js` with your Firebase project keys.
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## ⚡ API Route Groups
- `/api/auth` — OTP Verification & User Profiles
- `/api/modules` — Educational contents & Progress saving
- `/api/volunteers` — Pairing requests & Leaderboards
- `/api/alerts` — Fraud warnings & Quiz data
- `/api/family` — progress summaries for caregivers

---

## 🙌 Credits
Designed to bridge the digital divide. Made with ❤️ for our elders.
