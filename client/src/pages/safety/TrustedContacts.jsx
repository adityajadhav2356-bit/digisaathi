import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Plus, ShieldCheck, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingVoiceAssistant from '../../components/FloatingVoiceAssistant';
import PageTransition from '../../components/PageTransition';

const TrustedContacts = () => {
  const navigate = useNavigate();
  const [requesting, setRequesting] = useState(false);
  const [approved, setApproved] = useState(false);

  const contacts = [
    { name: "Rahul (Son)", phone: "+91 98765 43210", relation: "Son", verified: true },
    { name: "Priya (Daughter)", phone: "+91 91234 56789", relation: "Daughter", verified: true },
  ];

  const simulateApproval = () => {
    setRequesting(true);
    setTimeout(() => {
      setApproved(true);
    }, 4000);
  };

  const getAudioText = () => {
    if (approved) return "Payment approved by Rahul. You can now safely proceed with the payment.";
    if (requesting) return "Sending approval request to your son, Rahul. Please wait while he reviews the payment details.";
    return "These are your trusted family members. Any payment above 5,000 rupees will automatically require their approval first.";
  };

  return (
    <PageTransition className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <FloatingVoiceAssistant textToRead={getAudioText()} autoPlay={true} />

      <div className="w-full max-w-lg flex flex-col mt-4">
        <div className="w-full flex items-center mb-8">
          <button onClick={() => navigate('/safety')} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-100 transition">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-black text-slate-800 ml-4">Trusted Contacts</h1>
        </div>

        <div className="bg-teal-600 text-white p-6 rounded-3xl mb-8 shadow-lg shadow-teal-600/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <Users size={32} className="mb-4" />
          <h2 className="text-xl font-black mb-2">Family Protection Active</h2>
          <p className="font-medium text-sm opacity-90">Payments above ₹5,000 require approval from a trusted contact.</p>
        </div>

        <h3 className="font-bold text-slate-500 uppercase tracking-widest text-xs mb-4 px-2">Your Trusted Members</h3>
        
        <div className="space-y-4 mb-8">
          {contacts.map((contact, idx) => (
            <div key={idx} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-800 text-lg">{contact.name}</h4>
                <p className="text-slate-500 font-medium text-sm">{contact.phone}</p>
              </div>
              <div className="bg-green-100 text-green-700 w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
                <ShieldCheck size={20} />
              </div>
            </div>
          ))}
          
          <button className="w-full bg-slate-100 border-2 border-dashed border-slate-300 rounded-3xl p-4 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition gap-2 font-bold h-24">
            <Plus size={24} /> Add New Contact
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
          <h3 className="font-black text-slate-800 mb-2">Simulate Approval Workflow</h3>
          <p className="text-slate-500 text-sm mb-6">Test how the family approval system works before making a large payment.</p>
          
          <AnimatePresence mode="wait">
            {!requesting && !approved && (
              <motion.button key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={simulateApproval} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-lg rounded-2xl h-14 shadow-lg transition">
                Send Mock Request (₹10,000)
              </motion.button>
            )}
            
            {requesting && !approved && (
              <motion.div key="req" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex flex-col items-center justify-center">
                <Clock className="text-amber-500 animate-spin-slow mb-2" size={32} />
                <p className="font-bold text-amber-800">Waiting for Rahul's Approval...</p>
                <p className="text-xs text-amber-700 mt-1">He will receive an SMS link to approve.</p>
              </motion.div>
            )}

            {approved && (
              <motion.div key="app" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-50 border border-green-200 p-4 rounded-2xl flex flex-col items-center justify-center">
                <CheckCircle className="text-green-600 mb-2" size={40} />
                <p className="font-black text-green-800 text-lg">Approved by Rahul</p>
                <p className="text-sm text-green-700 mt-1 font-medium">You can now complete the payment.</p>
                <button onClick={() => {setRequesting(false); setApproved(false);}} className="mt-4 bg-green-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-green-700 transition text-sm">
                  Reset Simulation
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </PageTransition>
  );
};

export default TrustedContacts;
