import { analytics } from '../firebase/firebase';
import { logEvent } from 'firebase/analytics';

/**
 * Log App Events in Firebase Analytics
 */
export const logAnalyticsEvent = (eventName, eventParams = {}) => {
  if (analytics) {
    try {
      logEvent(analytics, eventName, eventParams);
    } catch (e) {
      console.warn('Analytics logEvent warning:', e);
    }
  }
};

/**
 * Specialized Analytics Event Shortcuts
 */
export const logUserLogin = (method, role) => logAnalyticsEvent('user_login', { method, role });
export const logVolunteerRegistration = (status) => logAnalyticsEvent('volunteer_registration', { status });
export const logNGORegistration = (status) => logAnalyticsEvent('ngo_registration', { status });
export const logAIAssistantUsage = (topic) => logAnalyticsEvent('ai_assistant_usage', { topic });
export const logPaymentSimulatorUsage = (module) => logAnalyticsEvent('payment_simulator_usage', { module });
export const logVoiceAssistantUsage = (lang) => logAnalyticsEvent('voice_assistant_usage', { lang });
export const logGovtServicesUsage = (service) => logAnalyticsEvent('govt_services_usage', { service });
