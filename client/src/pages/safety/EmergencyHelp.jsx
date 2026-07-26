import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneCall, ArrowLeft, ShieldAlert, CheckCircle, Clock, Star, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingVoiceAssistant from '../../components/FloatingVoiceAssistant';
import PageTransition from '../../components/PageTransition';

const EmergencyHelp = () => {
  const navigate = useNavigate();
  const [reported, setReported] = useState(false);

  const volunteers = [
    { name: "Rahul Deshmukh", ngo: "SeniorCare India", rating: "4.9", sessions: "142", languages: "Marathi, Hindi", faceVerified: true, govtVerified: true, img: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { name: "Priya Sharma", ngo: "Digital Saathi", rating: "4.8", sessions: "89", languages: "Hindi, English", faceVerified: true, govtVerified: true, img: "https://i.pravatar.cc/150?u=a042581f4e29026704b" },
  ];

  const pageAudioText = reported 
    ? "Help is on the way. Your trusted contacts have been notified, and a verified volunteer will assist you shortly. Please stay calm." 
    : "If you feel you have been scammed, tap the large red emergency button to stop all payments and request immediate help from a verified volunteer.";

  return (
    <PageTransition className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <FloatingVoiceAssistant textToRead={pageAudioText} autoPlay={true} />

      <div className="w-full max-w-lg flex flex-col items-center mt-4">
        <div className="w-full flex items-center mb-8">
          <button onClick={() => navigate('/safety')} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-100 transition">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-black text-slate-800 ml-4">Emergency Help</h1>
        </div>

        <AnimatePresence mode="wait">
          {!reported ? (
            <motion.div key="report" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full flex flex-col items-center">
              
              <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 text-center w-full mb-8 shadow-sm">
                <ShieldAlert size={48} className="text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-red-900 mb-2">Did someone ask for your OTP?</h2>
                <p className="text-red-700 font-medium text-sm">Or are you feeling confused about a payment? Don't worry, we are here to help.</p>
              </div>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setReported(true)}
                className="w-48 h-48 bg-red-600 rounded-full text-white shadow-[0_10px_30px_#dc262660] flex flex-col items-center justify-center border-8 border-red-100 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                <PhoneCall size={48} className="mb-2" />
                <span className="font-black text-2xl uppercase tracking-widest">Help</span>
              </motion.button>
              
              <p className="mt-8 text-slate-500 text-center font-bold text-sm">
                Pressing this will instantly notify your family <br/> and block further payments.
              </p>
            </motion.div>
          ) : (
            <motion.div key="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
              
              <div className="bg-green-600 text-white p-6 rounded-3xl shadow-xl shadow-green-600/20 mb-8 flex items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-black">Help Requested</h2>
                  <p className="opacity-90 text-sm font-medium">Your trusted contacts (Son, Daughter) have been notified via SMS.</p>
                </div>
              </div>

              <h3 className="font-black text-slate-800 mb-4 flex items-center gap-2"><ShieldCheck className="text-blue-600" /> Connecting to Verified Volunteers...</h3>
              <p className="text-slate-500 text-sm mb-6 font-medium">These volunteers are government-verified and trained to assist senior citizens securely.</p>

              <div className="space-y-4">
                {volunteers.map((vol, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex items-start gap-4">
                    <img src={vol.img} alt={vol.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100" />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-lg leading-none mb-1">{vol.name}</h4>
                      <p className="text-xs text-blue-600 font-bold mb-3">{vol.ngo}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"><ShieldCheck size={12}/> Govt Verified</span>
                        <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle size={12}/> Face Verified</span>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                        <span className="flex items-center gap-1"><Star size={14} className="text-amber-500"/> {vol.rating}</span>
                        <span className="flex items-center gap-1"><Clock size={14}/> {vol.sessions} sessions</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default EmergencyHelp;
