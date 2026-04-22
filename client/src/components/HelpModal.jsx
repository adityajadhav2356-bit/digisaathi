import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, Phone, MessageSquare, ShieldCheck, Mail, Smartphone } from 'lucide-react';

const HelpModal = ({ onClose }) => {
  const faqs = [
    { q: 'How do I start learning?', a: 'Tap on any big card (like "UPI Payments") on your home screen. It will guide you step-by-step with pictures and voice!', icon: <Smartphone className="text-navy" size={28} /> },
    { q: 'Can I hear the text aloud?', a: 'Yes! On every learning step, you will see a big orange button with a speaker icon. Tap it to hear the instructions.', icon: <MessageSquare className="text-saffron" size={28} /> },
    { q: 'What if I need help from a person?', a: 'Tap the big "Call My Volunteer" button on your home screen. A friendly volunteer will reach out to help you!', icon: <Phone className="text-green-600" size={28} /> },
    { q: 'Is this app safe?', a: 'Absolutely. We do not store passwords. We use secure OTP codes for login and teach you how to spot scammers.', icon: <ShieldCheck className="text-blue-600" size={28} /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ y: 50, scale: 0.9, opacity: 0 }} 
        animate={{ y: 0, scale: 1, opacity: 1 }} 
        exit={{ y: 50, scale: 0.9, opacity: 0 }}
        className="card w-full max-w-2xl bg-white dark:bg-gray-800 p-0 overflow-hidden shadow-2xl relative z-10 border-[12px] border-white dark:border-navy"
      >
        <div className="bg-navy p-8 text-white flex justify-between items-center h-28">
           <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-saffron rounded-full flex items-center justify-center text-white shadow-lg">
                 <HelpCircle size={40} />
              </div>
              <h2 className="text-white mb-0 text-3xl font-black">Need Help?</h2>
           </div>
           <button onClick={onClose} className="btn-secondary h-16 w-16 px-0 shadow-none bg-red-600 border-none text-white rounded-full hover:bg-red-700 active:scale-90 transition-all flex items-center justify-center">
              <X size={40} />
           </button>
        </div>

        <div className="p-10 space-y-12 max-h-[70vh] overflow-y-auto no-scrollbar">
           {faqs.map((faq, i) => (
             <div key={i} className="flex gap-8 group">
                <div className="shrink-0 w-16 h-16 bg-gray-50 dark:bg-navy rounded-3xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                   {faq.icon}
                </div>
                <div className="space-y-3">
                   <h3 className="text-2xl font-black text-navy dark:text-saffron mb-0 leading-tight">{faq.q}</h3>
                   <p className="text-xl font-bold text-gray-500 dark:text-gray-200 leading-relaxed">{faq.a}</p>
                </div>
             </div>
           ))}

           <div className="bg-orange-50 dark:bg-navy p-10 rounded-[3rem] text-center space-y-4 border-4 border-dashed border-saffron shadow-inner">
              <h3 className="text-2xl font-black text-navy dark:text-gray-100">Still have questions?</h3>
              <p className="text-xl font-bold text-gray-400">Our support team is available from 9 AM to 9 PM daily.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                 <button className="btn-primary flex-1 h-20 text-xl font-black bg-navy shadow-lg flex items-center justify-center gap-2">
                    <Phone size={24} /> CALL SUPPORT
                 </button>
                 <button className="btn-secondary flex-1 h-20 text-xl font-black border-navy text-navy shadow-lg flex items-center justify-center gap-2">
                    <Mail size={24} /> EMAIL US
                 </button>
              </div>
           </div>
        </div>

        <div className="bg-gray-100 dark:bg-navy p-6 text-center text-gray-400 font-bold text-lg uppercase tracking-widest">
           DigiSaathi – Together We Learn
        </div>
      </motion.div>
    </div>
  );
};

export default HelpModal;
