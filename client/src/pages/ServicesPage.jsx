import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, X, Activity, MapPin, Star, Phone, MessageCircle, 
  ShieldCheck, Video, ShieldAlert, Award, Languages, Clock, Sparkles, 
  Wrench, HeartPulse, ShoppingBag, AlertTriangle, CheckCircle, Volume2, VolumeX
} from 'lucide-react';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { subscribeToServiceBookings, createServiceBooking, clearServiceBookings } from '../utils/serviceBookingStore';
import PageTransition from '../components/PageTransition';

// Interactive Spotlighting 3D Perspective Card
const ServicesCard = ({ children, className = '', onClick, ...props }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightX, setSpotlightX] = useState(50);
  const [spotlightY, setSpotlightY] = useState(50);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    setRotateX(-(y - midY) / (rect.height / 20));
    setRotateY((x - midX) / (rect.width / 20));
    setSpotlightX((x / rect.width) * 100);
    setSpotlightY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={`glass-wood-card transition-all duration-100 ${className}`}
      {...props}
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay z-10"
        style={{
          background: `radial-gradient(circle 160px at ${spotlightX}% ${spotlightY}%, rgba(255,255,255,0.7), transparent)`,
        }}
      />
      {children}
    </motion.div>
  );
};

// Category Vector SVG Components with Micro-animations
const CleaningIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
    <svg className="w-10 h-10 text-blue-500 animate-svg-wand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v4M12 18v4M4 12H2M22 12h-2M5.75 5.75l2.12 2.12M16.13 16.13l2.12 2.12M18.25 5.75l-2.12 2.12M7.88 16.13l-2.12 2.12" strokeLinecap="round" opacity="0.6" />
      <path d="M19 3l-1 2.5L15.5 6 18 7l1 2.5 1-2.5 2.5-1-2.5-1L19 3z" fill="currentColor" />
      <path d="M11 13l-7 7M15 9l-2-2L4 16l2 2 9-9z" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

const ApplianceIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
    <svg className="w-10 h-10 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <g className="animate-svg-gear" style={{ transformOrigin: '50% 50%' }}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12" strokeLinecap="round" />
        <circle cx="12" cy="12" r="5" />
      </g>
      <g className="animate-svg-gear-reverse" style={{ transform: 'translate(6px, 6px) scale(0.5)', transformOrigin: 'bottom right' }}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12" strokeLinecap="round" />
        <circle cx="12" cy="12" r="5" />
      </g>
    </svg>
  </div>
);

const MedicineIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
    <svg className="w-10 h-10 text-emerald-500 animate-svg-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" className="opacity-20" fill="currentColor" />
      <path d="M12 6v12M6 12h12" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </div>
);

const ConvenienceIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
    <svg className="w-10 h-10 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" className="animate-bounce" style={{ animationDuration: '2.5s', transformOrigin: 'bottom center' }} />
      <path d="M3 9h18" />
      <path d="M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9" />
      <path d="m12 13-4-4h8z" className="animate-pulse" />
    </svg>
  </div>
);

const SafetyIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
    <svg className="w-10 h-10 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="6" className="animate-svg-radar" style={{ transformOrigin: '50% 50%' }} />
      <circle cx="12" cy="12" r="10" className="animate-svg-radar" style={{ animationDelay: '0.8s', transformOrigin: '50% 50%' }} />
    </svg>
  </div>
);

const ProgressBarTracker = ({ status }) => {
  const { t } = useLanguage();
  const steps = [
    { key: 'confirmed', label: t('statusPendingPartner') || 'Pending partner...' },
    { key: 'assigned', label: t('statusPartnerAssigned') || 'Partner assigned!' },
    { key: 'on_the_way', label: t('statusOnTheWay') || 'On The Way!' },
    { key: 'arrived', label: t('statusPartnerArrived') || 'Partner arrived!' },
    { key: 'completed', label: t('statusServiceCompleted') || 'Service completed!' }
  ];

  const currentIdx = status === 'confirmed' ? 0 
                   : status === 'assigned' ? 1 
                   : status === 'on_the_way' ? 2 
                   : status === 'arrived' ? 3 
                   : status === 'completed' ? 4 
                   : 0;

  return (
    <div className="w-full py-5 px-1">
      <div className="relative flex justify-between items-center w-full">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 rounded-full z-0" />
        
        {/* Progress line */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-wa-green to-wa-teal -translate-y-1/2 rounded-full transition-all duration-1000 z-0" 
          style={{ width: `${(currentIdx / 4) * 100}%` }}
        />
        
        {steps.map((s, idx) => {
          const isDone = idx < currentIdx;
          const isCurrent = idx === currentIdx;

          return (
            <div key={s.key} className="flex flex-col items-center z-10 relative">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500
                  ${isDone ? 'bg-wa-teal text-white shadow-md' : ''}
                  ${isCurrent ? 'bg-wa-green text-white ring-4 ring-green-100 scale-110 shadow-lg animate-pulse' : ''}
                  ${!isDone && !isCurrent ? 'bg-slate-100 text-slate-400 border border-slate-300' : ''}
                `}
              >
                {isDone ? '✓' : idx + 1}
              </div>
              <span 
                className={`text-[8px] min-[360px]:text-[10px] font-black tracking-tight mt-1.5 text-center leading-none transition-colors duration-300
                  ${isCurrent ? 'text-wa-green scale-105' : ''}
                  ${isDone ? 'text-wa-teal' : 'text-slate-400'}
                `}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const categoryMap = {
  cleaning: { emoji: '🛏️' },
  appliance: { emoji: '🔧' },
  medicine: { emoji: '💊' },
  convenience: { emoji: '🛍️' },
  safety: { emoji: '🆘' }
};

const serviceImageMap = {
  "Room Cleaning": '/services/room_cleaning.png',
  "Bathroom Cleaning": '/services/bathroom_cleaning.png',
  "Kitchen Cleaning": '/services/kitchen_cleaning.png',
  "Deep Home Cleaning": 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
  "Sofa Cleaning": 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=400&q=80',
  "Balcony Cleaning": 'https://images.unsplash.com/photo-1597528662465-55ece5734101?auto=format&fit=crop&w=400&q=80'
};

const categoryImageFallback = {
  cleaning: '/services/cleaning.png',
  appliance: '/services/appliance.png',
  medicine: '/services/medicine.png',
  convenience: '/services/convenience.png',
  safety: '/services/safety.png'
};

// Cost database
const costDatabase = {
  "Room Cleaning": 299, "Bathroom Cleaning": 349, "Kitchen Cleaning": 399, "Deep Home Cleaning": 899, "Sofa Cleaning": 499, "Balcony Cleaning": 249, "Floor Cleaning": 199,
  "Stove Repair": 329, "Fan Repair": 219, "AC Repair": 599, "Refrigerator Repair": 699, "TV Repair": 799, "Electrician": 249, "Plumber": 279, "Water Purifier Service": 399, "Mobile Repair Assistance": 449,
  "Medicine Delivery": 199, "Doctor Appointment": 499, "Video Doctor Consultation": 399, "Nurse Assistance": 799, "Blood Test Booking": 299, "Health Checkup": 899, "Physiotherapy": 599, "Ambulance Assistance": 999,
  "Grocery Delivery": 249, "Cab Booking": 449, "Bill Payment Help": 199, "Document Assistance": 299, "Bank Visit Assistance": 399, "Aadhaar/PAN Help": 229, "Companion Visit": 349, "Meal Delivery": 269,
  "Emergency SOS": 399, "Scam Reporting": 279, "Trusted Contact Alert": 219, "Emergency Calling": 199, "Nearby Hospital Help": 349, "Live Location Sharing": 299, "Safety Guidance": 239, "Fraud Awareness": 259
};

// Generator helper for service stats
const getServiceDetails = (serviceName, t) => {
  let hash = 0;
  for (let i = 0; i < serviceName.length; i++) {
    hash = serviceName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const rating = (4.5 + Math.abs(hash) % 6 * 0.1).toFixed(1);
  const experience = (3 + Math.abs(hash) % 10) + ' ' + (t ? t('years') : 'Years');
  const basicCost = costDatabase[serviceName] || 199;
  const standardCost = basicCost + 150;
  const premiumCost = basicCost + 300;
  const providersCount = 2 + Math.abs(hash) % 5;
  const isAvailable = Math.abs(hash) % 3 !== 0;
  
  const languagesList = [
    ['Hindi', 'Marathi'],
    ['Hindi', 'English', 'Marathi'],
    ['Hindi', 'Gujarati'],
    ['English', 'Hindi'],
    ['Hindi', 'Bengali'],
    ['Hindi', 'Telugu', 'Tamil']
  ];
  const languagesSpoken = languagesList[Math.abs(hash) % languagesList.length].map(l => t ? t(l) : l).join(', ');
  const description = t ? t(serviceName + '_sub') : '';

  return {
    rating,
    experience,
    costBasic: basicCost,
    costStandard: standardCost,
    costPremium: premiumCost,
    providersCount,
    isAvailable,
    languagesSpoken,
    description
  };
};
// Simulated walking path around Pune (Fergusson College Road / Shivajinagar area)
const SIMULATED_PATH = [
  { lat: 18.5284, lng: 73.8488, address: "Fergusson College Rd, Shivajinagar, Pune, Maharashtra 411004" },
  { lat: 18.5295, lng: 73.8499, address: "Ghole Rd, Shivajinagar, Pune, Maharashtra 411005" },
  { lat: 18.5306, lng: 73.8509, address: "Model Colony, Shivajinagar, Pune, Maharashtra 411016" },
  { lat: 18.5318, lng: 73.8521, address: "University Road, Shivajinagar, Pune, Maharashtra 411007" },
  { lat: 18.5332, lng: 73.8535, address: "SPPU Campus, Ganeshkhind, Pune, Maharashtra 411007" }
];

// Helper to dynamically load Leaflet Map dependencies safely from CDN
const loadLeaflet = (callback) => {
  if (window.L) {
    callback();
    return;
  }
  if (!document.getElementById('leaflet-css-link')) {
    const link = document.createElement('link');
    link.id = 'leaflet-css-link';
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
  }
  if (!document.getElementById('leaflet-js-script')) {
    const script = document.createElement('script');
    script.id = 'leaflet-js-script';
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => callback();
    document.head.appendChild(script);
  } else {
    const checkInterval = setInterval(() => {
      if (window.L) {
        clearInterval(checkInterval);
        callback();
      }
    }, 100);
  }
};

const GpsLiveTracker = () => {
  const { lang, t, speakText } = useLanguage();
  const [tracking, setTracking] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: 18.5204, lng: 73.8567 }); // Pune center fallback
  const [accuracy, setAccuracy] = useState(25);
  const [speed, setSpeed] = useState(0);
  const [altitude, setAltitude] = useState(560);
  const [address, setAddress] = useState("Home (12, Ashoka Heights, Pune, Maharashtra 411001)");
  const [simulating, setSimulating] = useState(false);
  const [shared, setShared] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);
  const watchIdRef = useRef(null);
  const simIntervalRef = useRef(null);

  useEffect(() => {
    loadLeaflet(() => {
      setLeafletLoaded(true);
    });
    return () => {
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
      if (simIntervalRef.current) clearInterval(simIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !window.L) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = window.L.map('leaflet-map-live-location', { zoomControl: false }).setView([coordinates.lat, coordinates.lng], 15);
    mapRef.current = map;

    window.L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Ultra-clean senior-friendly CARTO Voyager tiles
    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const pulsingIcon = window.L.divIcon({
      className: 'custom-pulsing-icon',
      html: `<div class="relative w-6 h-6 flex items-center justify-center">
               <div class="absolute inset-0 rounded-full bg-blue-500 opacity-35 animate-ping"></div>
               <div class="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-lg"></div>
             </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const marker = window.L.marker([coordinates.lat, coordinates.lng], { icon: pulsingIcon }).addTo(map);
    markerRef.current = marker;

    const circle = window.L.circle([coordinates.lat, coordinates.lng], {
      radius: accuracy,
      color: '#2563eb',
      fillColor: '#3b82f6',
      fillOpacity: 0.12,
      weight: 1
    }).addTo(map);
    circleRef.current = circle;
  }, [leafletLoaded]);

  useEffect(() => {
    if (mapRef.current && markerRef.current && circleRef.current && window.L) {
      const pos = [coordinates.lat, coordinates.lng];
      markerRef.current.setLatLng(pos);
      circleRef.current.setLatLng(pos);
      circleRef.current.setRadius(accuracy);
      mapRef.current.setView(pos, mapRef.current.getZoom());
    }
  }, [coordinates, accuracy]);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
        headers: { 'Accept-Language': lang }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.display_name) {
          const parts = data.display_name.split(',');
          const short = parts.slice(0, 4).join(',').trim();
          setAddress(short);
          return;
        }
      }
    } catch (e) {
      console.warn("Reverse-geocoding API error, using local match.");
    }

    const match = SIMULATED_PATH.find(p => Math.abs(p.lat - lat) < 0.005 && Math.abs(p.lng - lng) < 0.005);
    if (match) {
      setAddress(match.address);
    } else {
      setAddress(`Local Pune Area (Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)})`);
    }
  };

  const toggleTracking = () => {
    if (simulating) stopSimulation();

    if (tracking) {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      setTracking(false);
      speakText(t('gpsInactiveText') || "Live tracking deactivated.");
    } else {
      setTracking(true);
      speakText(t('gpsActiveText') || "Live GPS tracking activated. Finding your device signal...");

      if (navigator.geolocation) {
        // Request single high accuracy reading first
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude, accuracy: acc, speed: spd, altitude: alt } = position.coords;
            setCoordinates({ lat: latitude, lng: longitude });
            setAccuracy(acc || 15);
            setSpeed(spd ? Math.round(spd * 3.6) : 0);
            setAltitude(alt ? Math.round(alt) : 560);
            fetchAddress(latitude, longitude);
          },
          () => {},
          { enableHighAccuracy: true }
        );

        // Start continuous watch
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude, accuracy: acc, speed: spd, altitude: alt } = position.coords;
            setCoordinates({ lat: latitude, lng: longitude });
            setAccuracy(acc || 15);
            setSpeed(spd ? Math.round(spd * 3.6) : 0);
            setAltitude(alt ? Math.round(alt) : 560);
            fetchAddress(latitude, longitude);
          },
          (error) => {
            console.error("GPS Watch error:", error);
            speakText(t('gpsErrorText') || "GPS Signal weak. Please verify device location permissions.");
            setTracking(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
      } else {
        speakText("Your device does not support GPS tracking.");
        setTracking(false);
      }
    }
  };

  const startSimulation = () => {
    if (tracking) {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      setTracking(false);
    }

    setSimulating(true);
    setShared(false);
    speakText(t('simActiveText') || "Simulating live device movement along Fergusson College Road.");

    let idx = 0;
    const move = () => {
      const step = SIMULATED_PATH[idx];
      setCoordinates({ lat: step.lat, lng: step.lng });
      setAccuracy(5 + Math.round(Math.random() * 3));
      setSpeed(5 + Math.round(Math.random() * 7)); // Simulated speed
      setAltitude(550 + Math.round(Math.random() * 10));
      setAddress(step.address);
      idx = (idx + 1) % SIMULATED_PATH.length;
    };

    move();
    simIntervalRef.current = setInterval(move, 4000);
  };

  const stopSimulation = () => {
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
      simIntervalRef.current = null;
    }
    setSimulating(false);
    setSpeed(0);
    speakText(t('simInactiveText') || "Simulation stopped.");
  };

  const handleVocalize = () => {
    const txt = `${t('currentLocSpoken') || 'Your current device location is'}: ${address}. ${t('latitude')}: ${coordinates.lat.toFixed(4)}, ${t('longitude')}: ${coordinates.lng.toFixed(4)}.`;
    speakText(txt);
  };

  const handleShare = () => {
    setShared(true);
    speakText(t('locationSharedSuccess') || "Live location successfully shared with your trusted family!");
    setTimeout(() => setShared(false), 5000);
  };

  return (
    <div className="mt-4 pt-4 border-t border-dashed border-slate-200 relative z-10 w-full">
      <style>{`
        .custom-pulsing-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #leaflet-map-live-location {
          width: 100%;
          height: 220px;
          border-radius: 20px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          z-index: 10;
        }
      `}</style>
      
      {/* Map display */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-inner border border-slate-200/80 mb-4 bg-slate-50">
        <div id="leaflet-map-live-location"></div>
        
        {/* GPS Live Pulsing Signal indicator */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-100 shadow-md flex items-center gap-1.5 z-20">
          <span className={`w-2.5 h-2.5 rounded-full ${tracking || simulating ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`} />
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">
            {tracking ? (t('gpsActive') || 'GPS ACTIVE') : simulating ? (t('liveTracking') || 'SIMULATING') : (t('gpsSearching') || 'GPS INACTIVE')}
          </span>
        </div>
      </div>

      {/* Live coordinates read-out card */}
      <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4 mb-4 space-y-3 shadow-sm">
        <div className="flex items-start gap-2.5">
          <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">{t('addressLabel') || 'Current Address'}</span>
            <p className="text-sm font-extrabold text-slate-800 leading-tight">{address}</p>
          </div>
        </div>

        {/* Technical coordinates stats row */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200/40">
          <div className="bg-white/60 p-2 rounded-xl border border-slate-100 flex flex-col">
            <span className="text-[9px] uppercase font-black text-slate-400">{t('latitude')} & {t('longitude')}</span>
            <span className="text-xs font-extrabold text-slate-700 mt-0.5">{coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}</span>
          </div>
          <div className="bg-white/60 p-2 rounded-xl border border-slate-100 flex flex-col">
            <span className="text-[9px] uppercase font-black text-slate-400">{t('speed')} & {t('accuracy')}</span>
            <span className="text-xs font-extrabold text-slate-700 mt-0.5">
              {speed} km/h • ±{accuracy}m
            </span>
          </div>
        </div>
      </div>

      {/* Console actions grid */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={toggleTracking}
          className={`flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 border-2
            ${tracking 
              ? 'bg-red-500 border-red-500 text-white hover:bg-red-600' 
              : 'bg-white border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300'
            }`}
        >
          <Activity size={14} className={tracking ? 'animate-pulse' : ''} />
          {tracking ? (t('gpsInactiveText')?.split('.')[0] || "Stop GPS") : (t('liveTracking') || "Start GPS")}
        </button>

        <button
          onClick={simulating ? stopSimulation : startSimulation}
          className={`flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 border-2
            ${simulating
              ? 'bg-orange-500 border-orange-500 text-white hover:bg-orange-600'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
        >
          <Sparkles size={14} className={simulating ? 'animate-spin' : ''} />
          {simulating ? (t('stopSimulation') || "Stop Walk") : (t('simMovement') || "Simulate Walk")}
        </button>

        <button
          onClick={handleVocalize}
          className="col-span-1 flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-sm"
        >
          <Volume2 size={14} />
          {t('vocalizeLocation') || "Read Aloud"}
        </button>

        <button
          onClick={handleShare}
          className="col-span-1 flex items-center justify-center gap-2 py-3 bg-wa-teal hover:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-sm"
        >
          <ShieldCheck size={14} />
          {t('shareWithFamily') || "Share Alert"}
        </button>
      </div>

      {/* Sharing Confirmed alert badge */}
      <AnimatePresence>
        {shared && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-3 p-3 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-[11px] font-black text-center uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-sm"
          >
            <CheckCircle size={14} className="text-green-600" />
            {t('locationSharedSuccess')}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ServicesPage = () => {
  const navigate = useNavigate();
  const { lang, t, setLang } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [focusedService, setFocusedService] = useState(null);
  const [bookingConfirmedOpen, setBookingConfirmedOpen] = useState(false);
  const [bookingStates, setBookingStates] = useState({});
  const [voiceAssistActive, setVoiceAssistActive] = useState(true); // Active by default for user preference

  useEffect(() => {
    // Pre-load voices for speech synthesis
    window.speechSynthesis.getVoices();

    const unsubscribe = subscribeToServiceBookings((data) => {
      setBookings(data || []);
    });
    
    // Check url search params for pre-expanded category
    const urlParams = new URLSearchParams(window.location.search);
    const expandCat = urlParams.get('expand');
    if (expandCat) {
      setSelectedCategory(expandCat);
      setTimeout(() => {
        const el = document.getElementById(`cat-card-${expandCat}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
    
    return () => {
      unsubscribe();
      window.speechSynthesis.cancel();
    };
  }, []);

  // Built-in speech synthesis read-out function with robust async onvoiceschanged loading support
  const speakText = useCallback((text) => {
    if (!voiceAssistActive || !text) return;
    window.speechSynthesis.cancel();
    
    const targetVoiceCode = {
      'en': 'en-IN', 'hi': 'hi-IN', 'mr': 'mr-IN',
      'gu': 'gu-IN', 'ta': 'ta-IN', 'bn': 'bn-IN', 'te': 'te-IN'
    }[lang] || 'en-IN';

    const doSpeak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetVoiceCode;
      utterance.rate = 0.88; // Senior-friendly slower speed
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v =>
        v.lang === targetVoiceCode || v.lang.startsWith(lang)
      );
      if (selectedVoice) utterance.voice = selectedVoice;
      window.speechSynthesis.speak(utterance);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      doSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = () => doSpeak();
    }
  }, [lang, voiceAssistActive]);

  const speakServiceBookingStatus = (booking) => {
    const statusMsg = booking.status === 'confirmed' ? t('statusPending') || 'Searching for a trusted partner.'
                    : booking.status === 'assigned' ? `${t('statusAssigned') || 'Helper assigned.'} ${booking.provider?.name} is ready.`
                    : booking.status === 'on_the_way' ? t('statusArriving') || 'Helper is arriving shortly.'
                    : booking.status === 'arrived' ? 'Helper has arrived at your home.'
                    : booking.status === 'completed' ? t('statusCompleted') || 'Service completed successfully!'
                    : '';
    speakText(`${t(booking.serviceName) || booking.serviceName}. ${statusMsg}`);
  };

  const getRecentServices = () => {
    const recent = [];
    const added = new Set();
    bookings.forEach(b => {
      if (!added.has(b.serviceName)) {
        added.add(b.serviceName);
        recent.push({
          name: b.serviceName,
          categoryId: b.categoryId,
          title: t(b.serviceName),
          emoji: categoryMap[b.categoryId]?.emoji || '🔧'
        });
      }
    });

    // Seed defaults if less than 3
    const defaults = [
      { name: 'Medicine Delivery', categoryId: 'medicine', title: t('Medicine Delivery'), emoji: '💊' },
      { name: 'Video Doctor Consultation', categoryId: 'medicine', title: t('Video Doctor Consultation'), emoji: '📹' },
      { name: 'Emergency SOS', categoryId: 'safety', title: t('Emergency SOS'), emoji: '🆘' }
    ];

    while (recent.length < 3 && defaults.length > 0) {
      const def = defaults.shift();
      if (!added.has(def.name)) {
        added.add(def.name);
        recent.push({
          name: def.name,
          categoryId: def.categoryId,
          title: t(def.name),
          emoji: def.emoji
        });
      }
    }

    return recent.slice(0, 3);
  };

  const getIcon = (catId) => {
    if (catId === 'cleaning') return <CleaningIcon />;
    if (catId === 'appliance') return <ApplianceIcon />;
    if (catId === 'medicine') return <MedicineIcon />;
    if (catId === 'convenience') return <ConvenienceIcon />;
    if (catId === 'safety') return <SafetyIcon />;
    return <ApplianceIcon />;
  };

  const getBorderColor = (catId) => {
    if (catId === 'cleaning') return 'border-l-blue-500';
    if (catId === 'appliance') return 'border-l-orange-500';
    if (catId === 'medicine') return 'border-l-teal-500';
    if (catId === 'convenience') return 'border-l-purple-500';
    if (catId === 'safety') return 'border-l-red-500';
    return 'border-l-wa-teal';
  };

  const getServiceState = (serviceName) => {
    return bookingStates[serviceName] || {
      date: 'Today',
      time: '09:00 AM - 11:00 AM',
      packageType: 'Standard',
      address: 'Home (12, Ashoka Heights, Pune)',
      customAddress: ''
    };
  };

  const updateServiceState = (serviceName, key, value) => {
    setBookingStates(prev => ({
      ...prev,
      [serviceName]: {
        ...getServiceState(serviceName),
        [key]: value
      }
    }));
  };

  const categories = [
    {
      id: 'cleaning',
      titleKey: 'cleaningCat',
      icon: Sparkles,
      color: 'from-blue-500 to-indigo-600',
      lightBg: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      items: ['Room Cleaning', 'Bathroom Cleaning', 'Kitchen Cleaning', 'Deep Home Cleaning', 'Sofa Cleaning', 'Balcony Cleaning', 'Floor Cleaning']
    },
    {
      id: 'appliance',
      titleKey: 'applianceCat',
      icon: Wrench,
      color: 'from-orange-400 to-amber-600',
      lightBg: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      items: ['Stove Repair', 'Fan Repair', 'AC Repair', 'Refrigerator Repair', 'TV Repair', 'Electrician', 'Plumber', 'Water Purifier Service', 'Mobile Repair Assistance']
    },
    {
      id: 'medicine',
      titleKey: 'medicineCat',
      icon: HeartPulse,
      color: 'from-teal-400 to-emerald-600',
      lightBg: 'bg-teal-50',
      borderColor: 'border-teal-200',
      textColor: 'text-teal-700',
      items: ['Medicine Delivery', 'Doctor Appointment', 'Video Doctor Consultation', 'Nurse Assistance', 'Blood Test Booking', 'Health Checkup', 'Physiotherapy', 'Ambulance Assistance']
    },
    {
      id: 'convenience',
      titleKey: 'convenienceCat',
      icon: ShoppingBag,
      color: 'from-purple-400 to-violet-600',
      lightBg: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      items: ['Grocery Delivery', 'Cab Booking', 'Bill Payment Help', 'Document Assistance', 'Bank Visit Assistance', 'Aadhaar/PAN Help', 'Companion Visit', 'Meal Delivery']
    },
    {
      id: 'safety',
      titleKey: 'safetyCat',
      icon: AlertTriangle,
      color: 'from-red-50 to-rose-50',
      lightBg: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      items: ['Emergency SOS', 'Scam Reporting', 'Trusted Contact Alert', 'Emergency Calling', 'Nearby Hospital Help', 'Live Location Sharing', 'Safety Guidance', 'Fraud Awareness']
    }
  ];

  const handleBookService = (serviceName, categoryId) => {
    const state = getServiceState(serviceName);
    const finalAddress = state.address === 'custom' ? (state.customAddress || 'Custom Address') : state.address;
    
    setFocusedService(serviceName);
    
    // Create new booking
    const booking = createServiceBooking(serviceName, categoryId, state.date, state.time, finalAddress);
    setBookingConfirmedOpen(true);
    
    // Voice speech
    const price = state.packageType === 'Basic' ? getServiceDetails(serviceName, t).costBasic
                : state.packageType === 'Standard' ? getServiceDetails(serviceName, t).costStandard
                : getServiceDetails(serviceName, t).costPremium;
    
    speakText(`${t('bookingConfirmedTitle') || 'Booking Confirmed!'} ${t(serviceName) || serviceName} successfully booked for ${price} rupees. We are matching you with a partner.`);
  };

  const handleOneTapBook = (serviceName, categoryId) => {
    setFocusedService(serviceName);
    const booking = createServiceBooking(serviceName, categoryId, 'Today (Immediate)', 'Immediate', 'Home (12, Ashoka Heights, Pune)');
    setBookingConfirmedOpen(true);
    
    const price = getServiceDetails(serviceName, t).costStandard;
    speakText(`${t('bookingConfirmedTitle') || 'Booking Confirmed!'} ${t(serviceName) || serviceName} booked in 1-Tap for ${price} rupees. Partner is arriving shortly.`);
  };

  const handleCategoryExpand = (catId) => {
    const isNew = selectedCategory !== catId;
    setSelectedCategory(isNew ? catId : null);
    
    if (isNew) {
      const cat = categories.find(c => c.id === catId);
      if (cat) {
        speakText(`${t(cat.titleKey)}. Tap any helper service below to configure and book.`);
      }
    }
  };

  const filteredCategories = searchQuery.trim() !== ''
    ? categories.map(cat => {
        const matched = cat.items.filter(item => 
          item.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (t(item) && t(item).toLowerCase().includes(searchQuery.toLowerCase()))
        );
        return { ...cat, items: matched };
      }).filter(cat => cat.items.length > 0)
    : categories;

  const currentActiveBooking = bookings.find(b => b.serviceName === focusedService && b.status !== 'completed') || bookings[0];

  return (
    <PageTransition className="min-h-screen pb-36 bg-wa-chatBg">
      
      {/* ── Header ── */}
      <header className="wa-header">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/home')} 
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 active:scale-95 transition"
            aria-label="Go back"
          >
            <ArrowLeft size={24} className="text-wa-text" />
          </button>
          <div>
            <h1 className="wa-header-title text-wa-text">{t('homeCareTitle') || 'Home Care & Services'}</h1>
            <p className="text-wa-subtext text-xs font-semibold">
              {t('homeCareSubtitle')?.slice(0, 48) || 'Elderly-friendly trusted home help'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button 
            onClick={() => {
              const langs = Object.keys(LANGUAGES);
              const nextLang = langs[(langs.indexOf(lang) + 1) % langs.length];
              setLang(nextLang);
              
              const welcomeMsgs = {
                en: "Language changed to English.",
                hi: "भाषा बदलकर हिंदी हो गई है।",
                mr: "भाषा बदलून मराठी झाली आहे.",
                gu: "ભાષા બદલીને ગુજરાતી થઈ ગઈ છે.",
                bn: "भाषा परिवर्तन করে বাংলা করা হয়েছে।",
                ta: "மொழி தமிழுக்கு மாற்றப்பட்டது.",
                te: "భాష తెలుగులోకి మార్చబడింది."
              };
              
              window.speechSynthesis.cancel();
              const msgText = welcomeMsgs[nextLang] || welcomeMsgs.en;
              const utterance = new SpeechSynthesisUtterance(msgText);
              utterance.lang = LANGUAGES[nextLang]?.voice || 'en-IN';
              utterance.rate = 0.88;
              window.speechSynthesis.speak(utterance);
            }} 
            className="text-xs font-black bg-slate-100 border border-slate-200 px-3 py-2 rounded-full hover:bg-slate-200 transition active:scale-95 flex items-center gap-1 text-slate-700 font-sans"
            title="Change Language"
          >
            🌐 {lang.toUpperCase()}
          </button>

          {/* Voice Assistant Toggle */}
          <button 
            onClick={() => {
              const newState = !voiceAssistActive;
              setVoiceAssistActive(newState);
              if (newState) {
                speakText('Voice Assistant activated. I will read service options out loud.');
              } else {
                window.speechSynthesis.cancel();
              }
            }} 
            className={`p-2 rounded-full border transition active:scale-95 ${voiceAssistActive ? 'bg-wa-teal border-wa-teal text-white animate-pulse' : 'bg-slate-100 border-slate-200 text-slate-500'}`}
            title="Toggle Speech Assistant"
          >
            {voiceAssistActive ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          <button 
            onClick={() => { if(confirm(t('confirmClearLogs') || 'Clear all booking logs?')) { clearServiceBookings(); speakText(t('logsResetSuccess') || 'Booking history reset successfully.'); } }}
            className="text-xs font-bold text-red-500 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full hover:bg-red-500 hover:text-white transition"
          >
            {t('resetBtn') || 'Reset'}
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 pt-5 space-y-6">

        {/* ── Search Input ── */}
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-wa-subtext pointer-events-none z-20" size={22} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // Speak query feedback
                if (e.target.value.trim() === '') {
                  window.speechSynthesis.cancel();
                }
              }}
              placeholder={t('askSomething') || 'Search services...'}
              className="wa-input pl-12 pr-10 shadow-sm border border-white/50 bg-white relative z-10 font-bold"
              style={{ minHeight: '56px', fontSize: '18px' }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500 z-20"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* ── Active Bookings Live panel ── */}
        {bookings.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            className="glass-wood-card animated-gradient-border p-5 rounded-3xl border-l-4 border-l-wa-teal shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-wa-teal/5 rounded-full blur-xl pointer-events-none" />
            <h3 className="text-base font-black text-slate-800 flex items-center gap-2 mb-3">
              <Activity size={20} className="text-wa-teal animate-pulse" />
              {t('activeServiceBookings') || 'Active Bookings & Live Tracking'}
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {bookings.map(b => (
                <div key={b.id} className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/80 shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-slate-200 pb-2 mb-3">
                    <div>
                      <h4 className="text-base font-black text-wa-text flex items-center gap-1.5">
                        <span>{categoryMap[b.categoryId]?.emoji || '🔧'}</span>
                        {t(b.serviceName) || b.serviceName}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                        {t('scheduledFor') || 'Scheduled for'}: <span className="text-wa-teal font-extrabold">{b.bookingDate === 'Today' ? t('today') : (b.bookingDate === 'Tomorrow' ? t('tomorrow') : b.bookingDate)}</span> {t('at') || 'at'} <span className="text-wa-teal font-extrabold">{b.bookingTime === 'Immediate' ? t('immediate') : b.bookingTime}</span>
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => speakServiceBookingStatus(b)} 
                      className={`text-[10px] font-black py-1 px-3 rounded-full uppercase tracking-wider flex items-center gap-1
                        ${b.status === 'confirmed' ? 'bg-amber-100 text-amber-700 animate-pulse' : ''}
                        ${b.status === 'assigned' ? 'bg-blue-100 text-blue-700' : ''}
                        ${b.status === 'on_the_way' ? 'bg-indigo-100 text-indigo-700 animate-bounce' : ''}
                        ${b.status === 'arrived' ? 'bg-purple-100 text-purple-700' : ''}
                        ${b.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                      `}
                    >
                      {b.status === 'confirmed' && (t('statusPendingPartner') || 'Pending partner...')}
                      {b.status === 'assigned' && (t('statusPartnerAssigned') || 'Partner assigned!')}
                      {b.status === 'on_the_way' && (t('statusOnTheWay') || 'On The Way!')}
                      {b.status === 'arrived' && (t('statusPartnerArrived') || 'Partner arrived!')}
                      {b.status === 'completed' && `${t('statusServiceCompleted') || 'Completed'} 🎉`}
                      <Volume2 size={12} className="ml-1 opacity-70" />
                    </button>
                  </div>
                  
                  <ProgressBarTracker status={b.status} />

                  <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3 mt-3 text-xs font-semibold text-slate-600 space-y-1">
                    <p className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-wa-teal" /> 
                      <strong>{t('addressLabel') || 'Address'}:</strong> {b.address.includes('Home') ? t('homeAddressSlot') : (b.address.includes('Office') ? t('officeAddressSlot') : b.address)}
                    </p>
                  </div>

                  {b.provider && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/40 p-2.5 rounded-xl">
                      <div className="flex items-center gap-2.5">
                        <img src={b.provider.avatar} alt="" className="w-10 h-10 rounded-full ring-2 ring-wa-teal/20 object-cover" />
                        <div>
                          <span className="font-extrabold text-sm text-wa-text block">{b.provider.name}</span>
                          <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                            <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" />
                            {b.provider.rating} {t('ratingLabel') || 'Rating'} • {b.provider.experience}
                          </span>
                        </div>
                      </div>
                      <a 
                        href={`tel:${b.provider.phone}`} 
                        onClick={() => speakText(`Calling your partner ${b.provider.name}`)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-wa-teal hover:bg-blue-600 text-white rounded-xl text-xs font-black shadow-sm active:scale-95 transition-all"
                      >
                        <Phone size={12} /> {t('callBtn') || 'Call'}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Recently Used Quick Actions ── */}
        {!searchQuery.trim() && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-wa-text flex items-center gap-2">
                <Clock size={20} className="text-wa-teal" />
                {t('recentlyUsed') || 'Recently Used (1-Tap Booking)'}
              </h2>
              <span className="text-[10px] font-black uppercase text-wa-teal bg-wa-light px-2.5 py-1 rounded-full tracking-wider">
                {t('seniorsDeck') || 'Seniors Deck'}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {getRecentServices().map(s => (
                <ServicesCard 
                  key={s.name} 
                  onClick={() => handleOneTapBook(s.name, s.categoryId)}
                  className="p-3.5 flex flex-col justify-between items-center text-center rounded-3xl shadow-md border-l-4 bg-white/80"
                  style={{ minHeight: '135px', borderColor: getBorderColor(s.categoryId) }}
                >
                  <div className="mb-1.5 shrink-0 scale-90">
                    {getIcon(s.categoryId)}
                  </div>
                  <h3 className="text-xs font-black text-slate-800 leading-tight tracking-tight min-h-[32px] flex items-center justify-center">
                    {s.title}
                  </h3>
                  <span className="text-[8px] font-black text-wa-teal uppercase tracking-widest bg-wa-light px-2 py-0.5 rounded-md mt-1 shadow-sm shrink-0">
                    {t('oneTapBook') || '1-Tap Book'}
                  </span>
                </ServicesCard>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Search Results or Category listing ── */}
        {searchQuery.trim() !== '' ? (
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 border-b border-slate-200/80 pb-2">
              <Search size={22} className="text-wa-teal" />
              Search Results for "{searchQuery}"
            </h3>
            
            {(() => {
              const matchedResults = [];
              categories.forEach(cat => {
                cat.items.forEach(item => {
                  const details = getServiceDetails(item, t);
                  const title = t(item);
                  if (
                    item.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (title && title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (details.description && details.description.toLowerCase().includes(searchQuery.toLowerCase()))
                  ) {
                    matchedResults.push({ item, category: cat });
                  }
                });
              });

              if (matchedResults.length === 0) {
                return (
                  <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-md">
                    <p className="text-slate-500 font-bold text-lg">{t('noMatchingFound') || 'No matching services found.'}</p>
                    <p className="text-slate-400 text-sm mt-1">{t('trySearchingFor') || 'Try searching for "AC", "Cleaning", "Doctor", or "SOS".'}</p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 gap-4">
                  {matchedResults.map(({ item, category }) => {
                    const details = getServiceDetails(item, t);
                    const state = getServiceState(item);

                    return (
                      <ServicesCard 
                        key={item} 
                        className="animated-gradient-border moving-shimmer-bg p-5 rounded-3xl border border-slate-200 relative overflow-hidden transition-all duration-300 text-left bg-white/70"
                      >
                        {/* Image banner */}
                        <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-4 border border-slate-200/80 shadow-inner z-10">
                          <img 
                            src={serviceImageMap[item] || categoryImageFallback[category.id]} 
                            alt={t(item)} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {details.isAvailable && (
                          <div className="absolute top-4 right-4 bg-green-100 border border-green-200 text-green-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm z-20">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            {t('availableNow') || 'Available Now'}
                          </div>
                        )}

                        <div className="flex items-start gap-3.5 pr-20 relative z-10">
                          <span className="p-2 bg-white/80 rounded-2xl shadow-md border border-slate-200 shrink-0">
                            {getIcon(category.id)}
                          </span>
                          <div>
                            <h4 className="font-black text-lg text-slate-800 leading-tight flex items-center gap-1">
                              {t(item)}
                              <button 
                                onClick={() => speakText(`${t(item)}. ${details.description}`)}
                                className="p-1 text-wa-teal hover:bg-wa-light rounded-full transition"
                              >
                                <Volume2 size={16} />
                              </button>
                            </h4>
                            
                            <div className="flex flex-wrap items-center gap-2.5 mt-1.5 text-[10px] min-[360px]:text-xs text-slate-500 font-bold">
                              <span className="flex items-center gap-0.5 text-amber-500">
                                <Star size={13} className="fill-amber-500" />
                                {details.rating} Rating
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-wa-teal">
                                <Award size={13} />
                                {details.experience} Experience
                              </span>
                              <span>•</span>
                              <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-semibold">
                                👤 {details.providersCount} {t('helpersNearby') || 'Helpers Nearby'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm font-semibold text-slate-600 leading-relaxed mt-4 bg-white/50 p-3 rounded-2xl border border-slate-100 relative z-10">
                          {details.description}
                        </p>

                        {/* Package Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t border-dashed border-slate-200/80 pt-4 relative z-10">
                          <div>
                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">{t('pricingPackages') || '💰 Pricing Packages'}</span>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { id: 'Basic', cost: details.costBasic, desc: t('quickSweep') || 'Quick sweep' },
                                { id: 'Standard', cost: details.costStandard, desc: t('deepScrub') || 'Deep scrub' },
                                { id: 'Premium', cost: details.costPremium, desc: t('ecoWash') || 'Eco wash' }
                              ].map(pkg => (
                                <button
                                  key={pkg.id}
                                  onClick={() => {
                                    updateServiceState(item, 'packageType', pkg.id);
                                    speakText(`${pkg.id} package selected. Total cost ${pkg.cost} rupees.`);
                                  }}
                                  className={`p-2.5 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center gap-0.5
                                    ${state.packageType === pkg.id 
                                      ? 'border-wa-teal bg-wa-light text-wa-dark shadow-sm scale-102 font-extrabold' 
                                      : 'border-slate-200 bg-white text-slate-600'
                                    }`}
                                >
                                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">{pkg.id}</span>
                                  <span className="text-base font-black text-slate-800">₹{pkg.cost}</span>
                                  <span className="text-[8px] text-slate-400 leading-none">{pkg.desc}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Time Slots */}
                          <div>
                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">{t('bookSlotOption') || '⏱ Book Slot Option'}</span>
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <label className="text-[9px] font-black text-slate-400 block mb-0.5 uppercase">{t('selectDateDay') || 'Select Date & Day'}</label>
                                <select 
                                  value={state.date} 
                                  onChange={(e) => updateServiceState(item, 'date', e.target.value)}
                                  className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-white"
                                >
                                  <option>Today (Thursday)</option>
                                  <option>Tomorrow (Friday)</option>
                                  <option>30th May (Saturday)</option>
                                  <option>31st May (Sunday)</option>
                                </select>
                              </div>
                              <div className="flex-1">
                                <label className="text-[9px] font-black text-slate-400 block mb-0.5 uppercase">{t('selectTimeSlot') || 'Select Time Slot'}</label>
                                <select 
                                  value={state.time} 
                                  onChange={(e) => updateServiceState(item, 'time', e.target.value)}
                                  className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-white"
                                >
                                  <option>09:00 AM - 11:00 AM</option>
                                  <option>12:00 PM - 02:00 PM</option>
                                  <option>03:00 PM - 05:00 PM</option>
                                  <option>06:00 PM - 08:00 PM</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Languages and Address */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t border-slate-100 pt-4 relative z-10">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <Languages size={15} className="text-slate-400 shrink-0" />
                            <span>{t('languagesLabel') || 'Languages'}: <strong className="text-slate-700">{details.languagesSpoken}</strong></span>
                          </div>
                          <div>
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">{t('addressSelection') || '👤 Address Selection'}</label>
                            <select 
                              value={state.address} 
                              onChange={(e) => updateServiceState(item, 'address', e.target.value)}
                              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-white"
                            >
                              <option>Home (12, Ashoka Heights, Pune)</option>
                              <option>Office (Phase 3, Hinjewadi, Pune)</option>
                              <option>Children's Home (Block B, Kothrud, Pune)</option>
                              <option value="custom">Add New Address...</option>
                            </select>
                            {state.address === 'custom' && (
                              <input 
                                type="text"
                                value={state.customAddress}
                                placeholder={t('typeAddressPlaceholder') || 'Type your complete address here...'}
                                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 bg-white mt-2 shadow-inner focus:border-wa-teal outline-none"
                                onChange={(e) => updateServiceState(item, 'customAddress', e.target.value)}
                              />
                            )}
                          </div>
                        </div>

                        {/* Confirm Button */}
                        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                          <div className="text-slate-500 text-xs font-bold">
                            {t('totalPackagesCost') || 'Total Packages Cost'}:{' '}
                            <span className="text-wa-teal font-extrabold text-lg">
                              ₹{state.packageType === 'Basic' ? details.costBasic 
                                : state.packageType === 'Standard' ? details.costStandard 
                                : details.costPremium}
                            </span>
                          </div>
                          
                          <button 
                            onClick={() => handleBookService(item, category.id)}
                            className={`px-8 py-3 rounded-2xl text-white font-black text-sm transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2
                              ${category.id === 'safety' ? 'bg-red-500 hover:bg-red-600' : 'bg-wa-teal hover:bg-blue-600'}`}
                          >
                            <CheckCircle size={16} /> {t('confirmBooking') || 'Confirm Booking'}
                          </button>
                        </div>
                      </ServicesCard>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-black text-wa-text mb-4 flex items-center gap-2">
              <Sparkles size={22} className="text-wa-teal animate-pulse" />
              {t('selectHelpService') || 'Select Help Service'}
            </h2>
            
            <div className="grid grid-cols-2 gap-3 mb-5">
              {categories.map((cat, idx) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    onClick={() => handleCategoryExpand(cat.id)}
                    id={`cat-card-${cat.id}`}
                    key={cat.id}
                    className={`relative overflow-hidden rounded-3xl cursor-pointer shadow-lg border-2 p-0 flex flex-col justify-end group transition-all duration-300
                      ${isSelected ? 'ring-2 ring-wa-teal ring-offset-2 border-wa-teal/40' : 'border-white/60 hover:shadow-xl hover:border-white'}
                      ${idx === 4 ? 'col-span-2' : ''}
                    `}
                    style={{ minHeight: idx === 4 ? '145px' : '175px' }}
                  >
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={categoryImageFallback[cat.id]} 
                        alt={t(cat.titleKey)} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                    </div>

                    <div className="relative z-10 h-full flex flex-col justify-end p-4 text-left">
                      <div className="flex justify-between items-end w-full">
                        <div>
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-2 bg-gradient-to-br ${cat.color} text-white shadow-lg`}>
                            {getIcon(cat.id)}
                          </div>
                          <h3 className="text-white font-black text-base leading-tight drop-shadow-lg">
                            {t(cat.titleKey)}
                          </h3>
                          <p className="text-white/80 text-[10px] font-bold mt-0.5">
                            {cat.items.length} {t('optionsAvailable') || 'Options available'}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="bg-white/20 backdrop-blur-md rounded-full p-1.5 mb-1 mr-1">
                            <CheckCircle size={16} className="text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {categories.filter(c => c.id === selectedCategory).map(cat => (
                    <div key={cat.id} className="space-y-4 pt-2">
                      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                        <h3 className={`text-lg font-black ${cat.textColor} flex items-center gap-2`}>
                          {getIcon(cat.id)}
                          {t(cat.titleKey)} {t('availableServices') || 'Available Services'}
                        </h3>
                        <button 
                          onClick={() => setSelectedCategory(null)}
                          className="text-xs font-black text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-full transition-all"
                        >
                          {t('closeBtn') || 'Close'} ✕
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {cat.items.map(item => {
                          const details = getServiceDetails(item, t);
                          const state = getServiceState(item);

                          return (
                            <ServicesCard 
                              key={item}
                              className="animated-gradient-border moving-shimmer-bg p-5 rounded-3xl border border-slate-200 relative overflow-hidden transition-all duration-300 text-left bg-white/70"
                            >
                              <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-4 border border-slate-200/80 shadow-inner z-10">
                                <img 
                                  src={serviceImageMap[item] || categoryImageFallback[cat.id]} 
                                  alt={t(item)} 
                                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                              </div>

                              {details.isAvailable && (
                                <div className="absolute top-4 right-4 bg-green-100 border border-green-200 text-green-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm z-20">
                                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                  Available Now
                                </div>
                              )}

                              <div className="flex items-start gap-3.5 pr-20 relative z-10">
                                <span className="p-2 bg-white/80 rounded-2xl shadow-md border border-slate-200 shrink-0">
                                  {getIcon(cat.id)}
                                </span>
                                <div>
                                  <h4 className="font-black text-lg text-slate-800 leading-tight flex items-center gap-1.5">
                                    {t(item)}
                                    <button 
                                      onClick={() => speakText(`${t(item)}. ${details.description}`)}
                                      className="p-1 text-wa-teal hover:bg-wa-light rounded-full transition"
                                    >
                                      <Volume2 size={16} />
                                    </button>
                                  </h4>
                                  <div className="flex flex-wrap items-center gap-2.5 mt-1.5 text-[10px] min-[360px]:text-xs text-slate-500 font-bold">
                                    <span className="flex items-center gap-0.5 text-amber-500">
                                      <Star size={13} className="fill-amber-500" />
                                      {details.rating} Rating
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1 text-wa-teal">
                                      <Award size={13} />
                                      {details.experience} Experience
                                    </span>
                                    <span>•</span>
                                    <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-semibold">
                                      👤 {details.providersCount} Helpers Nearby
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <p className="text-sm font-semibold text-slate-600 leading-relaxed mt-4 bg-white/50 p-3 rounded-2xl border border-slate-100 relative z-10">
                                {details.description}
                              </p>

                              {item === 'Live Location Sharing' ? (
                                <GpsLiveTracker />
                              ) : (
                                <>
                                  {/* Pricing options */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t border-dashed border-slate-200/80 pt-4 relative z-10">
                                    <div>
                                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">💰 Pricing Packages</span>
                                      <div className="grid grid-cols-3 gap-2">
                                        {[
                                          { id: 'Basic', cost: details.costBasic, desc: t('quickSweep') || 'Quick sweep' },
                                          { id: 'Standard', cost: details.costStandard, desc: t('deepScrub') || 'Deep scrub' },
                                          { id: 'Premium', cost: details.costPremium, desc: t('ecoWash') || 'Eco wash' }
                                        ].map(pkg => (
                                          <button
                                            key={pkg.id}
                                            onClick={() => {
                                              updateServiceState(item, 'packageType', pkg.id);
                                              speakText(`${pkg.id} package selected. Total cost ${pkg.cost} rupees.`);
                                            }}
                                            className={`p-2.5 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center gap-0.5
                                              ${state.packageType === pkg.id 
                                                ? 'border-wa-teal bg-wa-light text-wa-dark shadow-sm scale-102 font-extrabold' 
                                                : 'border-slate-200 bg-white text-slate-600'
                                              }`}
                                          >
                                            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">{pkg.id}</span>
                                            <span className="text-base font-black text-slate-800">₹{pkg.cost}</span>
                                            <span className="text-[8px] text-slate-400 leading-none">{pkg.desc}</span>
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Slot Selection */}
                                    <div>
                                      <span className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">⏱ Book Slot Option</span>
                                      <div className="flex gap-2">
                                        <div className="flex-1">
                                          <label className="text-[9px] font-black text-slate-400 block mb-0.5 uppercase">Select Date & Day</label>
                                          <select 
                                            value={state.date} 
                                            onChange={(e) => updateServiceState(item, 'date', e.target.value)}
                                            className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-white"
                                          >
                                            <option value="Today">{t('today') || 'Today'}</option>
                                            <option value="Tomorrow">{t('tomorrow') || 'Tomorrow'}</option>
                                            <option value="30th May">30th May</option>
                                            <option value="31st May">31st May</option>
                                          </select>
                                        </div>
                                        <div className="flex-1">
                                          <label className="text-[9px] font-black text-slate-400 block mb-0.5 uppercase">Select Time Slot</label>
                                          <select 
                                            value={state.time} 
                                            onChange={(e) => updateServiceState(item, 'time', e.target.value)}
                                            className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-white"
                                          >
                                            <option>09:00 AM - 11:00 AM</option>
                                            <option>12:00 PM - 02:00 PM</option>
                                            <option>03:00 PM - 05:00 PM</option>
                                            <option>06:00 PM - 08:00 PM</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t border-slate-100 pt-4 relative z-10">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                      <Languages size={15} className="text-slate-400 shrink-0" />
                                      <span>Languages: <strong className="text-slate-700">{details.languagesSpoken}</strong></span>
                                    </div>
                                    <div>
                                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">👤 Address Selection</label>
                                      <select 
                                        value={state.address} 
                                        onChange={(e) => updateServiceState(item, 'address', e.target.value)}
                                        className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-white"
                                      >
                                        <option value="Home (12, Ashoka Heights, Pune)">{t('homeAddressSlot') || 'Home (12, Ashoka Heights, Pune)'}</option>
                                        <option value="Office (Phase 3, Hinjewadi, Pune)">{t('officeAddressSlot') || 'Office (Phase 3, Hinjewadi, Pune)'}</option>
                                        <option value="Children's Home (Block B, Kothrud, Pune)">{t('childrenAddressSlot') || "Children's Home (Block B, Kothrud, Pune)"}</option>
                                        <option value="custom">{t('addNewAddressSlot') || 'Add New Address...'}</option>
                                      </select>
                                      {state.address === 'custom' && (
                                        <input 
                                          type="text"
                                          value={state.customAddress}
                                          placeholder="Type your complete address here..."
                                          className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 bg-white mt-2 shadow-inner focus:border-wa-teal outline-none"
                                          onChange={(e) => updateServiceState(item, 'customAddress', e.target.value)}
                                        />
                                      )}
                                    </div>
                                  </div>

                                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                                    <div className="text-slate-500 text-xs font-bold">
                                      Total Packages Cost:{' '}
                                      <span className="text-wa-teal font-extrabold text-lg">
                                        ₹{state.packageType === 'Basic' ? details.costBasic 
                                          : state.packageType === 'Standard' ? details.costStandard 
                                          : details.costPremium}
                                      </span>
                                    </div>
                                    <button 
                                      onClick={() => handleBookService(item, cat.id)}
                                      className={`px-8 py-3 rounded-2xl text-white font-black text-sm transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2
                                        ${cat.id === 'safety' ? 'bg-red-500 hover:bg-red-600' : 'bg-wa-teal hover:bg-blue-600'}`}
                                    >
                                      <CheckCircle size={16} /> Confirm Booking
                                    </button>
                                  </div>
                                </>
                              )}
                            </ServicesCard>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* ── Booking Confirmed Success Modal ── */}
      <AnimatePresence>
        {bookingConfirmedOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-wa-green to-wa-teal" />
              <button 
                onClick={() => setBookingConfirmedOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition"
              >
                <X size={20} />
              </button>
              
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-3 mt-2 ring-4 ring-green-100 mx-auto">
                <CheckCircle size={38} className="text-green-500 animate-bounce" />
              </div>
              
              <h3 className="text-xl font-black text-slate-800 mb-1">
                {t('bookingConfirmedTitle') || 'Booking Confirmed!'}
              </h3>
              
              <p className="text-xs font-bold text-slate-500 leading-relaxed mb-4">
                {t('bookingConfirmedSub') || t('matchingPartner') || 'We are matching you with a verified, friendly DigiSaathi partner.'}
              </p>

              {currentActiveBooking && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-extrabold text-sm text-wa-dark flex items-center gap-1">
                      <span>{categoryMap[currentActiveBooking.categoryId]?.emoji || '🔧'}</span>
                      {t(currentActiveBooking.serviceName) || currentActiveBooking.serviceName}
                    </span>
                    <span className="text-[10px] font-black uppercase text-wa-teal animate-pulse">
                      {currentActiveBooking.status === 'confirmed' && (t('statusPendingPartner') || 'Pending partner...')}
                      {currentActiveBooking.status === 'assigned' && (t('statusPartnerAssigned') || 'Partner assigned!')}
                      {currentActiveBooking.status === 'on_the_way' && (t('statusOnTheWay') || 'On The Way!')}
                      {currentActiveBooking.status === 'arrived' && (t('statusPartnerArrived') || 'Partner arrived!')}
                      {currentActiveBooking.status === 'completed' && (t('statusServiceCompleted') || 'Service completed!')}
                    </span>
                  </div>
                  
                  <ProgressBarTracker status={currentActiveBooking.status} />

                  <div className="wa-progress-track bg-slate-200 mt-2 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="wa-progress-fill h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-wa-green to-wa-teal"
                      style={{ width: `${currentActiveBooking.progressPct}%` }}
                    />
                  </div>

                  {currentActiveBooking.provider && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-slate-100"
                    >
                      <div className="flex items-center gap-2">
                        <img src={currentActiveBooking.provider.avatar} alt="" className="w-9 h-9 rounded-full ring-2 ring-wa-teal/10" />
                        <div className="text-left">
                          <span className="font-extrabold text-xs text-wa-text block leading-tight">{currentActiveBooking.provider.name}</span>
                          <span className="text-[10px] text-slate-500 font-bold flex items-center gap-0.5">
                            <Star size={10} className="text-amber-400 fill-amber-400 shrink-0" />
                            {currentActiveBooking.provider.rating} {t('ratingLabel') || 'Rating'}
                          </span>
                        </div>
                      </div>
                      <a 
                        href={`tel:${currentActiveBooking.provider.phone}`} 
                        onClick={() => speakText(`Calling your partner ${currentActiveBooking.provider.name}`)}
                        className="flex items-center gap-1 px-3 py-1 bg-wa-teal text-white rounded-lg text-[10px] font-black shadow-sm transition-all active:scale-95"
                      >
                        <Phone size={10} /> {t('callBtn') || 'Call'}
                      </a>
                    </motion.div>
                  )}
                </div>
              )}

              <button 
                onClick={() => setBookingConfirmedOpen(false)}
                className="w-full py-3.5 font-black border-2 border-wa-teal text-wa-teal hover:bg-wa-teal hover:text-white rounded-2xl mt-5 transition-all text-sm"
              >
                {t('closeFollowStatus') || 'Close & Follow Status'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default ServicesPage;
