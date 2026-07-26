import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Smartphone, Eye, BellRing, PhoneCall, BookOpen, QrCode, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import FloatingVoiceAssistant from '../../components/FloatingVoiceAssistant';
import PageTransition from '../../components/PageTransition';

const PaymentSafetyDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: "Safe Payment Simulator", subtitle: "Practice UPI Safely", icon: <Smartphone size={32} />, color: "bg-blue-100 text-blue-700", border: "border-blue-200", link: "/safety/simulator" },
    { title: "QR Code Checker", subtitle: "Scan Safely", icon: <QrCode size={32} />, color: "bg-indigo-100 text-indigo-700", border: "border-indigo-200", link: "/safety/qr-scanner" },
    { title: "AI Risk Analysis", subtitle: "Check Before Paying", icon: <Eye size={32} />, color: "bg-amber-100 text-amber-700", border: "border-amber-200", link: "/safety/risk-analysis" },
    { title: "Scam Awareness", subtitle: "Learn to be Safe", icon: <BookOpen size={32} />, color: "bg-purple-100 text-purple-700", border: "border-purple-200", link: "/safety/awareness" },
    { title: "Trusted Contacts", subtitle: "Family Approval", icon: <BellRing size={32} />, color: "bg-teal-100 text-teal-700", border: "border-teal-200", link: "/safety/trusted-contacts" },
    { title: "Emergency Help", subtitle: "Report Fraud", icon: <PhoneCall size={32} />, color: "bg-red-100 text-red-700", border: "border-red-200", link: "/safety/emergency" },
  ];

  const pageAudioText = "Welcome to the Payment Safety Dashboard. Here you can check your safety score, practice making safe payments, learn about scams, or get emergency help. Tap any button to continue.";

  return (
    <PageTransition className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center pb-24">
      <FloatingVoiceAssistant textToRead={pageAudioText} />
      
      {/* Header */}
      <div className="w-full max-w-2xl mb-6 flex items-center gap-4 mt-4">
        <button onClick={() => navigate('/home')} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-100 transition">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-black text-slate-800">Payment Safety</h1>
      </div>

      {/* Safety Score Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 shadow-xl shadow-green-600/20 text-white mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg text-green-600 shrink-0">
            <ShieldCheck size={40} />
          </div>
          <div>
            <h2 className="text-3xl font-black">Protected</h2>
            <p className="font-medium opacity-90 text-sm">AI Protection & Voice Assistance Active</p>
          </div>
        </div>
        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30 relative z-10 flex justify-between items-center">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold opacity-80">Last Security Check</p>
            <p className="font-bold text-lg">Just Now</p>
          </div>
          <div className="flex items-center gap-2 bg-green-700/50 px-3 py-1.5 rounded-full text-sm font-bold border border-green-400/30">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span> Safe
          </div>
        </div>
      </motion.div>

      {/* Grid of Actions */}
      <div className="w-full max-w-2xl grid grid-cols-2 md:grid-cols-3 gap-4">
        {menuItems.map((item, index) => (
          <motion.button 
            key={index}
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => navigate(item.link)}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all border-b-4 ${item.border} h-40 text-center gap-3`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <p className="font-black text-slate-800 leading-tight">{item.title}</p>
              <p className="text-xs font-bold text-slate-400 mt-1">{item.subtitle}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </PageTransition>
  );
};

export default PaymentSafetyDashboard;
