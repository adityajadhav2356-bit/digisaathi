# 📊 How to Connect Registration Form to Google Sheets (2 Minute Setup)

Follow these simple steps so every registration form submission live-updates in your Google Sheet!

---

### Step 1: Create a Google Sheet & Open Script Editor
1. Go to [Google Sheets](https://sheets.google.com) and create a **Blank Spreadsheet**.
2. Name your spreadsheet **"DigiSaathi Workshop Registrations"**.
3. In the top menu, click **Extensions** ➔ **Apps Script**.

---

### Step 2: Paste this Code into Apps Script
Delete any existing code in the Apps Script code editor, paste the exact code below, and click **Save** (💾 icon):

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var p = e.parameter;
    
    // Automatically add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Full Name", 
        "Division", 
        "RBT Number", 
        "Roll Number", 
        "College Email", 
        "Phone Number", 
        "Registration Date"
      ]);
    }
    
    // Append submission data as a new row
    sheet.appendRow([
      p.name || '',
      p.division || '',
      p.rbt || '',
      p.roll || '',
      p.email || '',
      p.phone || '',
      p.timestamp || new Date().toLocaleString()
    ]);
    
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}
```

---

### Step 3: Deploy as Web App
1. At the top right of Apps Script, click **Deploy** ➔ **New deployment**.
2. Click the gear icon (⚙️) next to *Select type* and choose **Web app**.
3. Set the following options:
   - **Description**: `DigiSaathi Registration Webhook`
   - **Execute as**: `Me (your Google email)`
   - **Who has access**: **`Anyone`** *(CRITICAL: Must be "Anyone" so visitors can submit without Google login)*
4. Click **Deploy**.
5. Grant permissions if prompted (*Click Advanced ➔ Go to Untitled project (unsafe) ➔ Allow*).
6. Copy the **Web App URL** generated (it will look like: `https://script.google.com/macros/s/AKfycbx.../exec`).

---

### Step 4: Paste Web App URL in `script.js`
Open [`script.js`](file:///c:/Users/NITIN/java/digisaathi/script.js#L480) and set your URL on Line 480:

```javascript
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec';
```

---

🎉 **Done!** From now on, whenever anyone fills out the form on any phone or laptop:
- Their response will **instantly appear as a new row in your Google Sheet**.
- You can view it live in your browser or download it as CSV anytime directly from Google Sheets!
