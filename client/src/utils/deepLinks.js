/**
 * Deep Link & Redirect Logic
 * Easy-to-maintain mapping for opening external native apps and web fallbacks.
 */

export const AppLinks = {
  // WhatsApp App
  whatsappHome: () => 'https://wa.me/',
  whatsappChat: (phone) => `https://wa.me/${phone}`,
  whatsappWebFallback: () => 'https://web.whatsapp.com/',

  // Telephony
  phoneCall: (phone = '') => `tel:${phone}`,
  smsSend: (phone = '') => `sms:${phone}`,
  emailCompose: (email = '') => `mailto:${email}`,

  // Maps / Navigation
  mapsHome: () => 'https://www.google.com/maps',
  mapsDir: () => 'https://www.google.com/maps/dir/',
  mapsSearch: (query) => `https://www.google.com/maps/search/${encodeURIComponent(query)}`,

  // UPI Payments / Banking
  upiGeneric: (upiId, name = '') => `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}`,
  upiGpay: () => 'tez://upi/pay',
  upiPaytm: () => 'paytmmp://pay',
  upiPhonepe: () => 'phonepe://pay',

  // Entertainment
  youtubeHome: () => 'https://www.youtube.com/',
  youtubeSearch: (query) => `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,

  // Social / Web
  browserGoogle: () => 'https://www.google.com/',
  gmailApp: () => 'https://mail.google.com/',
  facebookApp: () => 'https://www.facebook.com/',
  instagramApp: () => 'https://www.instagram.com/',

  // System Settings
  deviceSettings: () => 'app-settings:',
  wifiSettings: () => 'app-settings:WIFI',
};

/**
 * Handle execution of deep links safely.
 * @param {string} primaryUrl - The main intent or deep link (e.g. upi://pay)
 * @param {string} fallbackUrl - Web fallback if primary fails (e.g. https://...)
 */
export const executeDeepLink = (primaryUrl, fallbackUrl = null) => {
  if (!primaryUrl) return;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  try {
    // If we're on mobile and have a very specific protocol (like upi://)
    if (primaryUrl.startsWith('upi://') || primaryUrl.startsWith('whatsapp://') || primaryUrl.startsWith('tel:') || primaryUrl.startsWith('sms:')) {
      window.location.href = primaryUrl;

      // Mobile browsers don't easily tell us if a custom protocol failed.
      // We use a timeout trick: if the app opens, the browser goes to the background.
      // If it doesn't leave the page after 2 seconds, we trigger the fallback.
      if (fallbackUrl) {
        setTimeout(() => {
          if (document.hasFocus()) {
             window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
          }
        }, 2000);
      }
    } else {
      // It's a standard web URL
      window.open(primaryUrl, '_blank', 'noopener,noreferrer');
    }
  } catch (error) {
    console.error("Deep link failed", error);
    if (fallbackUrl) {
       window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
    }
  }
};

/**
 * Analyze lesson content dynamically or use explicit step config to define Action.
 * Per-step action configurations tailored strictly to learning intents.
 */
export const getContextualPracticeLink = (moduleTitle, stepTitle, stepContent) => {
  const title = stepTitle.toLowerCase();
  const text = `${moduleTitle} ${stepTitle} ${stepContent}`.toLowerCase();

  // 1. WHATSAPP MODULE
  if (text.includes('whatsapp')) {
    if (title.includes('video call')) {
      return { url: AppLinks.whatsappHome(), fallback: AppLinks.whatsappWebFallback(), label: 'Try WhatsApp Video Call', icon: '📹' };
    }
    if (title.includes('call') || title.includes('voice')) {
      return { url: AppLinks.whatsappHome(), fallback: AppLinks.whatsappWebFallback(), label: 'Try WhatsApp Call', icon: '📞' };
    }
    if (title.includes('status')) {
      return { url: AppLinks.whatsappHome(), fallback: AppLinks.whatsappWebFallback(), label: 'Open WhatsApp Status', icon: '📸' };
    }
    if (title.includes('send') || title.includes('message')) {
      return { url: AppLinks.whatsappHome(), fallback: AppLinks.whatsappWebFallback(), label: 'Send Message to Your Friend', icon: '💬' };
    }
    // Generic Whatsapp fallback
    return { url: AppLinks.whatsappHome(), fallback: AppLinks.whatsappWebFallback(), label: 'Open WhatsApp', icon: '💬' };
  }

  // 2. PAYMENT / UPI MODULE (And Banking mapping)
  if (text.includes('upi') || text.includes('payment') || text.includes('pay') || text.includes('balance') || text.includes('money')) {
     if (title.includes('google pay') || title.includes('gpay')) {
        return { url: AppLinks.upiGpay(), fallback: 'https://www.googlepay.com/', label: 'Open Google Pay', icon: '💸' };
     }
     if (title.includes('paytm')) {
        return { url: AppLinks.upiPaytm(), fallback: 'https://paytm.com/', label: 'Open Paytm', icon: '💸' };
     }
     if (title.includes('phonepe')) {
        return { url: AppLinks.upiPhonepe(), fallback: 'https://phonepay.com/', label: 'Open PhonePe', icon: '💸' };
     }
     // Generic UPI
     return { url: AppLinks.upiGeneric('demo@okaxis', 'Demo Transfer'), fallback: 'https://www.googlepay.com/', label: 'Try UPI Payment', icon: '💸' };
  }

  // 3. PHONE / CONTACTS MODULE
  if (title.includes('make call') || (text.includes('phone number') && text.includes('call'))) {
    return { url: AppLinks.phoneCall(), fallback: null, label: 'Make Phone Call', icon: '📞' };
  }
  
  if (title.includes('send sms') || (text.includes('sms') && text.includes('send'))) {
    return { url: AppLinks.smsSend(), fallback: null, label: 'Send SMS', icon: '💬' };
  }

  // 4. EMAIL MODULE
  if (title.includes('email') || title.includes('compose')) {
    return { url: AppLinks.emailCompose(), fallback: AppLinks.gmailApp(), label: 'Compose Email', icon: '📧' };
  }

  // 5. YOUTUBE MODULE
  if (text.includes('youtube') || text.includes('video')) {
    return { url: AppLinks.youtubeHome(), fallback: null, label: 'Open YouTube', icon: '▶️' };
  }

  // 6. MAPS MODULE
  if (text.includes('map') || text.includes('location')) {
    if (title.includes('direction') || text.includes('direction')) {
       return { url: AppLinks.mapsDir(), fallback: null, label: 'Get Directions', icon: '🗺️' };
    }
    return { url: AppLinks.mapsHome(), fallback: null, label: 'Open Maps', icon: '🗺️' };
  }

  // 7. DEVICE SETTINGS
  if (title.includes('wifi') || text.includes('connect to wifi')) {
    return { url: AppLinks.wifiSettings(), fallback: null, label: 'Open WiFi Settings', icon: '📶' };
  }
  if (title.includes('settings')) {
    return { url: AppLinks.deviceSettings(), fallback: null, label: 'Open Device Settings', icon: '⚙️' };
  }

  // 8. BROWSER / WEB MODULE
  if (text.includes('browser') || text.includes('google search') || text.includes('web')) {
    return { url: AppLinks.browserGoogle(), fallback: null, label: 'Open Browser', icon: '🌐' };
  }

  // Misc Gov Fallbacks
  if (text.includes('aadhaar') || text.includes('pan') || text.includes('digilocker')) {
    return { url: 'https://www.digilocker.gov.in/', fallback: null, label: 'Open DigiLocker', icon: '🏛️' };
  }

  // Default / Generic: If no explicit mapping found for the step, return null to suppress the button.
  return null;
};
