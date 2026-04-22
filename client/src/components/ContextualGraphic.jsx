import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Video, CreditCard, ShieldAlert, FileText, Settings, User } from 'lucide-react';

const ContextualGraphic = ({ title, content, moduleIcon, defaultColor }) => {
  const combinedText = `${title} ${content}`.toLowerCase();

  // Keyword extraction for contextual logic
  const isMessage = combinedText.includes('message') || combinedText.includes('chat');
  const isVideo = combinedText.includes('video call') || combinedText.includes('camera');
  const isCall = combinedText.includes('call') && !isVideo;
  const isPayment = combinedText.includes('upi') || combinedText.includes('payment') || combinedText.includes('money') || combinedText.includes('balance');
  const isFraud = combinedText.includes('fraud') || combinedText.includes('scam') || combinedText.includes('share') || combinedText.includes('fake');
  const isDocument = combinedText.includes('aadhaar') || combinedText.includes('pan') || combinedText.includes('document');
  const isSettings = combinedText.includes('settings');
  const isProfile = combinedText.includes('profile') || combinedText.includes('account');

  // --- Mockup Renderers ---

  if (isPayment) {
    return (
      <div className="w-full h-52 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-4 flex flex-col justify-center items-center relative overflow-hidden shadow-inner">
        <div className="absolute opacity-10 right-[-20px] top-[-20px]">
           <CreditCard size={180} />
        </div>
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl w-4/5 h-3/5 p-4 shadow-xl flex flex-col gap-3 relative z-10">
          <div className="flex items-center gap-3 border-b pb-2">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-bold">A</span>
            </div>
            <div>
              <div className="w-20 h-3 bg-gray-200 rounded-full"></div>
              <div className="w-12 h-2 bg-gray-100 rounded-full mt-2"></div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 px-2">
             <span className="font-black text-2xl text-wa-dark">₹1,000</span>
             <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
               <span className="text-white text-xs font-bold">✓</span>
             </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isMessage) {
    return (
      <div className="w-full h-52 bg-wa-chatBg border-2 border-wa-border rounded-3xl p-4 flex flex-col justify-end gap-3 relative overflow-hidden">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white shadow-sm self-start px-4 py-2 rounded-2xl rounded-tl-sm max-w-[70%]">
          <div className="w-24 h-2 bg-gray-200 rounded-full mb-2"></div>
          <div className="w-16 h-2 bg-gray-200 rounded-full"></div>
        </motion.div>
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-wa-light shadow-sm self-end px-4 py-2 rounded-2xl rounded-tr-sm max-w-[70%]">
          <div className="w-20 h-2 bg-wa-teal opacity-50 rounded-full mb-2"></div>
          <div className="flex justify-end gap-1">
             <span className="text-[10px] text-green-700 font-bold">✓✓</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isCall || isVideo) {
    return (
      <div className={`w-full h-52 bg-gradient-to-tr ${isVideo ? 'from-blue-600 to-cyan-500' : 'from-green-500 to-teal-500'} rounded-3xl p-4 flex flex-col justify-center items-center relative overflow-hidden shadow-inner`}>
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            {isVideo ? <Video size={30} className="text-blue-500" /> : <Phone size={30} className="text-green-500" />}
          </div>
        </motion.div>
        <div className="flex gap-4 mt-6">
           <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white"><Phone className="rotate-[135deg]" size={20} /></div>
           <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center text-white">{isVideo ? <Video size={20}/> : <MessageCircle size={20}/>}</div>
        </div>
      </div>
    );
  }

  if (isFraud) {
    return (
      <div className="w-full h-52 bg-red-50 rounded-3xl p-4 flex flex-col justify-center items-center relative border border-red-200">
         <motion.div initial={{ rotate: -10 }} animate={{ rotate: 10 }} transition={{ repeat: Infinity, duration: 0.5, repeatType: "reverse" }}>
            <ShieldAlert size={60} className="text-red-500 mb-2" />
         </motion.div>
         <div className="bg-white px-4 py-2 rounded-xl shadow border border-red-100 flex items-center gap-3">
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">SCAM</span>
            <div className="w-20 h-2 bg-gray-200 rounded-full"></div>
         </div>
      </div>
    );
  }

  if (isDocument) {
    return (
      <div className="w-full h-52 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-4 flex flex-col justify-center items-center relative shadow-inner">
         <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="w-3/5 h-4/5 bg-white rounded-lg shadow-xl p-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
               <div className="w-8 h-10 bg-amber-100 rounded flex-shrink-0"></div>
               <div className="flex flex-col gap-1 w-full">
                  <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                  <div className="w-3/4 h-2 bg-gray-200 rounded-full"></div>
               </div>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full"></div>
            <div className="flex items-center gap-2 justify-end mt-auto">
               <FileText size={16} className="text-amber-500" />
               <div className="w-10 h-2 bg-amber-200 rounded-full"></div>
            </div>
         </motion.div>
      </div>
    );
  }

  // Fallback dynamic icon representation if no specific mockup matched
  return (
    <div className={`w-full h-52 flex flex-col items-center justify-center py-10 rounded-3xl bg-gradient-to-br ${defaultColor}`}>
      <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-7xl drop-shadow-lg mb-2">
        {moduleIcon || '💡'}
      </motion.span>
    </div>
  );
};

export default ContextualGraphic;
