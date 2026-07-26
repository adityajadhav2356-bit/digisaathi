import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, ArrowRight, ArrowLeft, Camera, Upload, 
  CheckCircle, FileText, Lock, Smartphone, Mail, AlertCircle,
  Eye, Smile, Maximize, UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import PageTransition from '../../components/PageTransition';

const VolunteerVerification = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [personalDetails, setPersonalDetails] = useState({ fullName: '', dob: '', mobile: '', email: '' });
  const [aadhaar, setAadhaar] = useState({ number: '', otp: '', verified: false });
  const [faceStatus, setFaceStatus] = useState('idle'); // idle, initializing, detecting, blink, left, right, verifying, success, failed
  const [contactVerif, setContactVerif] = useState({ mobileOtp: '', emailOtp: '', verified: false });
  const [declaration, setDeclaration] = useState({ criminal: false, guidelines: false, signature: '' });

  const nextStep = () => setStep(s => Math.min(s + 1, 6));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  // Simulators
  const simulateAadhaarVerif = () => {
    setLoading(true);
    setTimeout(() => {
      setAadhaar({ ...aadhaar, verified: true });
      setLoading(false);
    }, 1500);
  };

  const simulateContactVerif = () => {
    setLoading(true);
    setTimeout(() => {
      setContactVerif({ ...contactVerif, verified: true });
      setLoading(false);
    }, 1500);
  };

  const startFaceVerification = () => {
    const states = [
      'initializing', 'detecting', 'blink', 'left', 'right', 'verifying', 'success'
    ];
    let i = 0;
    
    const interval = setInterval(() => {
      setFaceStatus(states[i]);
      i++;
      if (i >= states.length) {
        clearInterval(interval);
      }
    }, 1500);
  };

  const handleFinish = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      navigate('/volunteer/dashboard');
    }, 3000);
  };

  return (
    <PageTransition className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-3xl mb-8 flex items-center justify-between mt-8 md:mt-0">
        <button onClick={() => navigate('/volunteer')} className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold transition">
          <ArrowLeft size={18} /> Back
        </button>
        <div className="flex items-center gap-2 text-blue-700 font-bold bg-blue-100 px-4 py-2 rounded-full">
          <ShieldCheck size={20} /> Govt Identity Verification
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-3xl mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hidden md:block">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full z-0"></div>
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 5) * 100}%` }}
          ></motion.div>
          
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${step >= i ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
              {step > i ? <CheckCircle size={16} /> : i}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center text-sm font-bold text-slate-500 uppercase tracking-widest">
          {step === 1 && "Personal Details"}
          {step === 2 && "Aadhaar Identity"}
          {step === 3 && "AI Face Match"}
          {step === 4 && "Contact Verification"}
          {step === 5 && "Background & Consent"}
          {step === 6 && "Final Verification"}
        </div>
      </div>
      
      {/* Mobile Progress Text */}
      <div className="md:hidden w-full max-w-3xl mb-4 text-center text-sm font-bold text-slate-500 uppercase tracking-widest">
          Step {step} of 6: 
          {step === 1 && " Personal Details"}
          {step === 2 && " Aadhaar Identity"}
          {step === 3 && " AI Face Match"}
          {step === 4 && " Contact Verification"}
          {step === 5 && " Background & Consent"}
          {step === 6 && " Final Verification"}
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="p-6 md:p-8 pb-24 md:pb-24">
              <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2"><UserCheck className="text-blue-600"/> Personal Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1.5 block px-1">Full Name (as per Govt ID)</label>
                  <input type="text" value={personalDetails.fullName} onChange={e => setPersonalDetails({...personalDetails, fullName: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-base font-semibold rounded-2xl h-14 px-4 focus:bg-white focus:border-blue-500 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1.5 block px-1">Date of Birth</label>
                  <input type="date" value={personalDetails.dob} onChange={e => setPersonalDetails({...personalDetails, dob: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-base font-semibold rounded-2xl h-14 px-4 focus:bg-white focus:border-blue-500 outline-none transition-all" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1.5 block px-1">Mobile Number</label>
                    <input type="tel" value={personalDetails.mobile} onChange={e => setPersonalDetails({...personalDetails, mobile: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-base font-semibold rounded-2xl h-14 px-4 focus:bg-white focus:border-blue-500 outline-none transition-all" placeholder="+91" />
                  </div>
                  <div>
                    <label className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1.5 block px-1">Email ID</label>
                    <input type="email" value={personalDetails.email} onChange={e => setPersonalDetails({...personalDetails, email: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-base font-semibold rounded-2xl h-14 px-4 focus:bg-white focus:border-blue-500 outline-none transition-all" placeholder="name@example.com" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="p-6 md:p-8 pb-24 md:pb-24">
              <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2"><Lock className="text-blue-600"/> Aadhaar Identity</h2>
              
              <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-3xl p-6 text-center mb-6 hover:bg-blue-50 transition cursor-pointer">
                <Upload className="mx-auto text-blue-500 mb-3" size={32} />
                <p className="font-bold text-blue-800">Upload Aadhaar Card</p>
                <p className="text-sm text-blue-600 mt-1">Front & Back (up to 5MB)</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1.5 block px-1">Aadhaar Number</label>
                  <input type="text" value={aadhaar.number} onChange={e => setAadhaar({...aadhaar, number: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-base font-semibold rounded-2xl h-14 px-4 focus:bg-white focus:border-blue-500 outline-none transition-all tracking-widest text-center md:text-left" placeholder="XXXX-XXXX-1234" maxLength="14" />
                </div>
                
                {!aadhaar.verified ? (
                  <div className="flex flex-col md:flex-row gap-3">
                    <input type="text" value={aadhaar.otp} onChange={e => setAadhaar({...aadhaar, otp: e.target.value})} className="flex-1 bg-slate-50 border-2 border-slate-200 text-slate-800 text-base font-semibold rounded-2xl h-14 px-4 focus:bg-white focus:border-blue-500 outline-none transition-all" placeholder="Enter UIDAI OTP" />
                    <button onClick={simulateAadhaarVerif} className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-6 rounded-2xl h-14 transition disabled:opacity-50" disabled={loading}>
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl flex items-center gap-3 font-bold">
                    <CheckCircle className="text-green-500 shrink-0" /> Aadhaar Verified Successfully
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="p-6 md:p-8 pb-24 md:pb-24">
              <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2"><Camera className="text-blue-600"/> AI Face Verification</h2>
              
              <div className="bg-slate-900 rounded-3xl aspect-video relative overflow-hidden flex items-center justify-center mb-6 shadow-2xl shadow-blue-900/20">
                {faceStatus === 'idle' && (
                  <button onClick={startFaceVerification} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition z-10">
                    <Camera size={20} /> Open Camera
                  </button>
                )}
                
                {faceStatus !== 'idle' && faceStatus !== 'success' && (
                  <div className="absolute inset-0 bg-slate-800 flex flex-col items-center justify-center text-white">
                    {/* Simulated Camera View / Wireframe */}
                    <div className="w-40 h-56 md:w-48 md:h-64 border-2 border-blue-500/50 rounded-[40px] relative mb-6">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-3xl"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-3xl"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-3xl"></div>
                      
                      {/* Scanning Line Animation */}
                      <motion.div 
                        initial={{ top: 0 }}
                        animate={{ top: "100%" }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute left-0 w-full h-1 bg-blue-500/80 shadow-[0_0_10px_#3b82f6]"
                      ></motion.div>
                    </div>

                    <div className="text-lg md:text-xl font-bold flex items-center gap-3">
                      {faceStatus === 'initializing' && <><Camera className="animate-pulse" /> Camera Initializing...</>}
                      {faceStatus === 'detecting' && <><Eye className="animate-pulse text-blue-400" /> Detecting Face...</>}
                      {faceStatus === 'blink' && <><Smile className="animate-bounce text-yellow-400" /> Blink to Continue</>}
                      {faceStatus === 'left' && <><ArrowLeft className="animate-pulse text-purple-400" /> Turn Head Left</>}
                      {faceStatus === 'right' && <><ArrowRight className="animate-pulse text-purple-400" /> Turn Head Right</>}
                      {faceStatus === 'verifying' && <><ShieldCheck className="animate-pulse text-blue-400" /> Verifying Match (98%)...</>}
                    </div>
                  </div>
                )}

                {faceStatus === 'success' && (
                  <div className="absolute inset-0 bg-green-500 flex flex-col items-center justify-center text-white">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white/20 p-4 rounded-full mb-4">
                      <CheckCircle size={64} className="text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-black">Face Verified!</h3>
                    <p className="opacity-90 font-medium">99.8% Match Confidence</p>
                    <p className="text-xs mt-2 opacity-75">Anti-spoofing checks passed</p>
                  </div>
                )}
              </div>
              
              {faceStatus === 'success' && (
                <div className="text-center">
                  <button onClick={() => setFaceStatus('idle')} className="text-slate-500 font-bold hover:text-slate-800 underline text-sm">Retry Verification</button>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <motion.div key="step4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="p-6 md:p-8 pb-24 md:pb-24">
              <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2"><Smartphone className="text-blue-600"/> Contact Verification</h2>
              
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Smartphone className="text-slate-400 shrink-0" />
                    <div className="truncate">
                      <p className="font-bold text-slate-800">Mobile Verification</p>
                      <p className="text-sm text-slate-500 truncate">{personalDetails.mobile || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input type="text" placeholder="Enter SMS OTP" className="flex-1 bg-white border-2 border-slate-200 text-slate-800 font-semibold rounded-2xl h-12 px-4 focus:border-blue-500 outline-none" />
                    <button className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 rounded-2xl h-12 transition text-sm">Send OTP</button>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="text-slate-400 shrink-0" />
                    <div className="truncate">
                      <p className="font-bold text-slate-800">Email Verification</p>
                      <p className="text-sm text-slate-500 truncate">{personalDetails.email || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input type="text" placeholder="Enter Email Link/OTP" className="flex-1 bg-white border-2 border-slate-200 text-slate-800 font-semibold rounded-2xl h-12 px-4 focus:border-blue-500 outline-none" />
                    <button className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 rounded-2xl h-12 transition text-sm">Send Link</button>
                  </div>
                </div>

                <button onClick={simulateContactVerif} className={`w-full font-bold text-lg rounded-2xl h-14 flex items-center justify-center gap-2 transition-colors ${contactVerif.verified ? 'bg-green-500 text-white' : 'bg-slate-800 text-white hover:bg-slate-900'}`}>
                  {contactVerif.verified ? <><CheckCircle /> Verified</> : 'Verify Both'}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <motion.div key="step5" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="p-6 md:p-8 pb-24 md:pb-24">
              <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2"><FileText className="text-blue-600"/> Background & Declaration</h2>
              
              <div className="space-y-4">
                <label className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition">
                  <input type="checkbox" checked={declaration.criminal} onChange={e => setDeclaration({...declaration, criminal: e.target.checked})} className="w-5 h-5 mt-1 accent-blue-600 rounded shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">No Criminal Record Declaration</p>
                    <p className="text-sm text-slate-500 mt-1">I declare that I have no pending criminal cases or convictions against me in any court of law.</p>
                  </div>
                </label>

                <label className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition">
                  <input type="checkbox" checked={declaration.guidelines} onChange={e => setDeclaration({...declaration, guidelines: e.target.checked})} className="w-5 h-5 mt-1 accent-blue-600 rounded shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Accept Volunteer Guidelines</p>
                    <p className="text-sm text-slate-500 mt-1">I agree to abide by the DigiSaathi Volunteer Code of Conduct for assisting senior citizens with dignity and respect.</p>
                  </div>
                </label>

                <div className="mt-6">
                  <label className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1.5 block px-1">Digital Signature</label>
                  <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl h-32 relative">
                    <input 
                      type="text" 
                      placeholder="Type your full name..." 
                      className="absolute bottom-4 left-4 right-4 bg-white border border-slate-200 p-2 rounded-xl text-center font-caveat text-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 italic"
                      value={declaration.signature}
                      onChange={e => setDeclaration({...declaration, signature: e.target.value})}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 pb-10">
                      <span className="font-bold uppercase tracking-widest text-slate-400">Sign Here</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 6 */}
          {step === 6 && (
            <motion.div key="step6" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-6 md:p-8 text-center flex flex-col items-center justify-center">
              
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
                className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-500/40 mb-6 border-8 border-green-100 relative"
              >
                <motion.div 
                  className="absolute inset-0 rounded-full border-4 border-green-400"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
                />
                <ShieldCheck size={64} />
              </motion.div>

              <h2 className="text-3xl font-black text-slate-800 mb-2">Verification Complete</h2>
              <p className="text-slate-500 font-medium mb-8">You are now a certified volunteer.</p>

              <div className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 text-left mb-8 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full"></div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-green-200 shadow-sm">
                    <CheckCircle size={14} /> Trusted Volunteer Badge
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-700 font-semibold"><CheckCircle className="text-green-500" size={20}/> Identity Verified</div>
                  <div className="flex items-center gap-3 text-slate-700 font-semibold"><CheckCircle className="text-green-500" size={20}/> Face Match: 99.8%</div>
                  <div className="flex items-center gap-3 text-slate-700 font-semibold"><CheckCircle className="text-green-500" size={20}/> Mobile & Email Verified</div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Verification ID</p>
                    <p className="font-mono font-bold text-slate-800">DS-VOL-847291</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Renewal Date</p>
                    <p className="font-bold text-slate-800">26 Jul 2027</p>
                  </div>
                </div>
              </div>

              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={handleFinish}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl rounded-2xl h-16 shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-colors"
              >
                Enter Volunteer Dashboard <ArrowRight size={24} />
              </motion.button>
            </motion.div>
          )}
          
        </AnimatePresence>

        {/* Footer Navigation */}
        {step < 6 && (
          <div className="absolute bottom-0 left-0 w-full bg-slate-50 border-t border-slate-200 p-4 flex justify-between z-20">
            <button 
              onClick={prevStep} 
              disabled={step === 1}
              className={`font-bold px-4 md:px-6 py-3 rounded-xl transition ${step === 1 ? 'text-slate-300' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              Previous
            </button>
            
            <button 
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 md:px-8 py-3 rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-2 transition"
            >
              {step === 5 ? 'Submit Verification' : 'Next Step'} <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

    </PageTransition>
  );
};

export default VolunteerVerification;
