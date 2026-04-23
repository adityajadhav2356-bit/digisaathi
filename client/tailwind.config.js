/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SimpleSphere Modern UI Palette
        wa: {
          green:     '#3b82f6', // blue-500
          teal:      '#2563eb', // blue-600
          dark:      '#1e3a8a', // blue-900
          light:     '#eff6ff', // blue-50
          bg:        'transparent',
          chatBg:    'transparent',
          panel:     'rgba(255, 255, 255, 0.8)', // Modern Glass
          header:    'rgba(255, 255, 255, 0.9)', // Clean Header
          bubble:    '#dbeafe', // blue-100
          bubbleSent:'#bfdbfe', // blue-200
          text:      '#0f172a', // slate-900
          subtext:   '#475569', // slate-600
          border:    'rgba(37, 99, 235, 0.15)',
          unread:    '#3b82f6',
          icon:      '#64748b',
        },
        brandBgDark: '#020617', // slate-950
        textPrimary:   '#0f172a',
        textSecondary: '#64748b',
      },
      backgroundImage: {
        'mesh-premium': "radial-gradient(at 0% 0%, rgba(37,99,235,0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(59,130,246,0.1) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(99,102,241,0.1) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(139,92,246,0.1) 0px, transparent 50%)",
        'glass-panel': "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%)",
        'glass-dark': "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.6) 100%)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        wa: '0 1px 3px rgba(0,0,0,0.08)',
        'wa-md': '0 4px 12px rgba(0,0,0,0.06)',
        'wa-lg': '0 8px 30px rgba(37,99,235,0.12)',
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
