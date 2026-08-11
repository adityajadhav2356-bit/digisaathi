// Service Booking Store for Home Care & Services
// Manages simulated service bookings in localStorage with realtime state propagation

const STORAGE_KEY = 'digisaathi_service_bookings_db';

const getInitialDB = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

let db = getInitialDB();
let listeners = [];

const notifyListeners = () => {
  listeners.forEach(fn => fn(db));
};

export const subscribeToServiceBookings = (listener) => {
  listeners.push(listener);
  listener(db);
  return () => {
    listeners = listeners.filter(fn => fn !== listener);
  };
};

// Global sync across tabs
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) {
    db = getInitialDB();
    notifyListeners();
  }
});

const saveAndNotify = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  notifyListeners();
  window.dispatchEvent(new Event('ds_service_bookings_updated'));
};

window.addEventListener('ds_service_bookings_updated', () => {
  db = getInitialDB();
  notifyListeners();
});

// Mock Service Providers Data
export const serviceProviders = {
  cleaning: [
    { name: 'Ramesh Sharma', rating: 4.8, experience: '5 years', phone: '98234-56789', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh' },
    { name: 'Sita Gokhale', rating: 4.9, experience: '3 years', phone: '97654-32109', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sita' }
  ],
  appliance: [
    { name: 'Aniket Joshi', rating: 4.7, experience: '6 years', phone: '91234-56780', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aniket' },
    { name: 'Vijay Patil', rating: 4.9, experience: '8 years', phone: '98877-66554', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vijay' }
  ],
  medicine: [
    { name: 'Dr. Shalini Gupta', rating: 5.0, experience: '12 years', phone: '93344-55667', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shalini' },
    { name: 'Sister Latha Nair (Nurse)', rating: 4.9, experience: '9 years', phone: '94455-66778', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Latha' }
  ],
  convenience: [
    { name: 'Gopal Kulkarni (Companion)', rating: 5.0, experience: '4 years', phone: '99880-11223', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gopal' },
    { name: 'Arjun Dev (Delivery Partner)', rating: 4.8, experience: '2 years', phone: '97766-55443', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun' }
  ],
  safety: [
    { name: 'Inspector Sandeep Patil (Retd.)', rating: 5.0, experience: '35 years', phone: '112 / 90011-22334', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sandeep' },
    { name: 'DigiSaathi Security Team', rating: 4.9, experience: 'Ecosystem Guard', phone: '1800-SAFE-HELP', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guard' }
  ]
};

// Track and auto-progress bookings for realistic presentation demos
const triggerSimulation = (bookingId, provider) => {
  setTimeout(() => {
    // Stage 1: Assign Partner
    db = db.map(b => b.id === bookingId ? { ...b, status: 'assigned', provider, progressPct: 40 } : b);
    saveAndNotify();

    // Stage 2: On The Way
    setTimeout(() => {
      db = db.map(b => b.id === bookingId ? { ...b, status: 'on_the_way', progressPct: 60 } : b);
      saveAndNotify();

      // Stage 3: Arrived
      setTimeout(() => {
        db = db.map(b => b.id === bookingId ? { ...b, status: 'arrived', progressPct: 80 } : b);
        saveAndNotify();

        // Stage 4: Completed
        setTimeout(() => {
          db = db.map(b => b.id === bookingId ? { ...b, status: 'completed', progressPct: 100 } : b);
          saveAndNotify();
        }, 15000); // completed
      }, 10000); // arrived
    }, 7000); // on the way
  }, 4000); // assigned partner
};

// Create a new Service Booking
export const createServiceBooking = (serviceName, categoryId, bookingDate = 'Today', bookingTime = 'Immediate', address = 'Home') => {
  const providersList = serviceProviders[categoryId] || serviceProviders.convenience;
  const provider = providersList[Math.floor(Math.random() * providersList.length)];
  
  const newBooking = {
    id: `srv_${Date.now()}`,
    serviceName,
    categoryId,
    status: 'confirmed',
    provider: null,
    createdAt: new Date().toISOString(),
    progressPct: 20,
    bookingDate,
    bookingTime,
    address
  };

  db = [newBooking, ...db];
  saveAndNotify();

  // Trigger simulation if booked for today or immediate
  const isImmediate = !bookingDate || bookingDate.toLowerCase().includes('today') || bookingDate.toLowerCase().includes('immediate');
  if (isImmediate) {
    triggerSimulation(newBooking.id, provider);
  }

  return newBooking;
};

// Clear All Bookings
export const clearServiceBookings = () => {
  db = [];
  saveAndNotify();
};
