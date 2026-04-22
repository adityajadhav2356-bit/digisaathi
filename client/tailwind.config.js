/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // WhatsApp/Green palette upgraded for premium look
        wa: {
          green:     '#25D366',
          teal:      '#128C7E',
          dark:      '#075E54',
          light:     '#DCF8C6',
          bg:        'transparent',
          chatBg:    'transparent',
          panel:     'rgba(255, 255, 255, 0.65)', // Glass fallback
          header:    'rgba(18, 140, 126, 0.85)',
          bubble:    '#DCF8C6',
          bubbleSent:'#E7FFDB',
          text:      '#111B21',
          subtext:   '#4B5563',
          border:    'rgba(255, 255, 255, 0.3)',
          unread:    '#25D366',
          icon:      '#54656F',
        },
        brandBgDark: '#0f0c29',
        textPrimary:   '#111B21',
        textSecondary: '#667781',
      },
      backgroundImage: {
        'mesh-premium': "radial-gradient(at 0% 0%, rgba(18,140,126,0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(37,211,102,0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(14,165,233,0.1) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(139,92,246,0.1) 0px, transparent 50%)",
        'glass-panel': "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)",
        'glass-dark': "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.6) 100%)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        wa: '0 1px 3px rgba(0,0,0,0.12)',
        'wa-md': '0 2px 8px rgba(0,0,0,0.10)',
        'wa-lg': '0 4px 20px rgba(18,140,126,0.18)',
      },
      animation: {
        blob: 'blob 8s infinite',
        'ping-slow': 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(30px,-50px) scale(1.1)' },
          '66%':     { transform: 'translate(-20px,20px) scale(0.9)' },
        }
      }
    },
  },
  plugins: [],
}
