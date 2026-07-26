import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Camera, User, Calendar, MapPin, Type, Globe, ShieldCheck, MessageCircle, Wallet, FileText, Phone, CheckCircle, ArrowRight, ChevronLeft } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';

const DetailsPage = () => {
  const { t, setLang, lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [profilePic, setProfilePic] = useState(() => localStorage.getItem('digisaathi_profile_pic') || null);
  const [formData, setFormData] = useState({
    name: 'Ramesh Patil', age: '67', city: 'Pune', font: localStorage.getItem('digisaathi_font_size') || 'Normal', language: lang, goals: [], emergencyName: 'Priya Patil', relation: 'Daughter', emergencyPhone: '9876543210', shareProgress: false
  });
  const navigate = useNavigate();

  const handleLangChange = (l) => {
    setFormData({...formData, language: l});
    setLang(l);
  };

  const handleFontSizeChange = (key) => {
    setFormData({...formData, font: key});
    localStorage.setItem('digisaathi_font_size', key);
    let size = '16px';
    if (key === 'Large') size = '18px';
    if (key === 'Extra Large') size = '22px';
    document.documentElement.style.fontSize = size;
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handleComplete = () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#25D366', '#128C7E', '#DCF8C6'] });
    setTimeout(() => navigate('/home'), 1500);
  };

  /* ── Profile Image Upload Logic ── */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert(t('invalidFileType') || 'Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    // Validate size (Max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(t('fileTooLarge') || 'File size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setProfilePic(base64String);
      localStorage.setItem('digisaathi_profile_pic', base64String); // sync with ProfilePage!
    };
    reader.readAsDataURL(file);
  };

  const StepIndicator = ({ currentStep }) => (
    <div className="flex gap-2 w-full mb-6">
      {[1, 2, 3].map(s => (
        <div key={s} className="h-1.5 flex-1 rounded-full overflow-hidden bg-wa-border">
          {currentStep >= s && (
            <motion.div
              layoutId={`step-${s}`}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              className="h-full bg-wa-green"
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <PageTransition className="min-h-screen bg-wa-chatBg flex flex-col">
      {/* WhatsApp-style Header */}
      <header className="wa-header shadow-none bg-transparent">
        <div className="flex items-center gap-3">
          {step > 1 && (
            <button onClick={() => setStep(prev => prev - 1)} className="p-2 -ml-2 rounded-full hover:bg-black/5 transition">
              <ChevronLeft size={24} className="text-wa-teal" />
            </button>
          )}
          <h1 className="text-wa-teal font-black text-xl tracking-tight">Create Profile</h1>
        </div>
        <span className="text-wa-teal font-bold text-sm">Step {step} of 3</span>
      </header>

      <div className="flex-1 px-5 pb-8 flex flex-col max-w-xl mx-auto w-full pt-4">
        <StepIndicator currentStep={step} />
        
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
              <div className="mb-6">
                <h1 className="text-2xl font-black text-wa-text mb-1">{t('detailsStep1Title') || "Let's get to know you"}</h1>
                <p className="text-wa-subtext text-sm font-medium">{t('detailsStep1Sub') || "Please fill in your basic details"}</p>
              </div>

              <div className="wa-panel flex-1 flex flex-col pt-8 space-y-6">
                <div className="flex justify-center mb-2">
                  <div className="relative group w-28 h-28">
                    <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center border border-wa-border shadow-sm overflow-hidden ring-4 ring-white relative">
                      {profilePic ? (
                        <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User size={54} className="text-slate-400" />
                      )}
                    </div>
                    
                    <div className="absolute -bottom-1 -right-0 p-2.5 bg-wa-green hover:bg-green-600 rounded-full shadow-md text-white border-2 border-white pointer-events-none transition-colors z-10">
                      <Camera size={18} />
                    </div>

                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/webp" 
                      onChange={handleImageUpload} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                      title="Upload Profile Picture"
                    />
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <label className="text-wa-subtext text-xs font-bold uppercase tracking-widest mb-1.5 block px-1">Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-wa-icon shrink-0" size={20} />
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="wa-input pl-11" placeholder="Your full name" />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-1/3">
                      <label className="text-wa-subtext text-xs font-bold uppercase tracking-widest mb-1.5 block px-1">Age</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-wa-icon shrink-0" size={20} />
                        <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="wa-input pl-10" placeholder="Age" />
                      </div>
                    </div>
                    <div className="w-2/3">
                      <label className="text-wa-subtext text-xs font-bold uppercase tracking-widest mb-1.5 block px-1">City</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-wa-icon shrink-0" size={20} />
                        <select value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="wa-input pl-10 appearance-none bg-transparent focus:bg-white text-wa-text font-semibold">
                          <option>Pune</option>
                          <option>Mumbai</option>
                          <option>Delhi</option>
                          <option>Nagpur</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-wa-border mt-auto">
                   <motion.button whileTap={{ scale: 0.97 }} onClick={handleNext} className="btn-wa-primary w-full text-lg">
                     {t('nextStep') || 'Continue'} <ArrowRight size={20} className="ml-auto" />
                   </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
              <div className="mb-6">
                <h1 className="text-2xl font-black text-wa-text mb-1">{t('detailsStep2Title') || "App Preferences"}</h1>
                <p className="text-wa-subtext text-sm font-medium">{t('detailsStep2Sub') || "Customize DigiSaathi for you"}</p>
              </div>

              <div className="wa-panel flex-1 flex flex-col pt-6 space-y-6">
                <div className="space-y-6 flex-1">
                  <div>
                    <h3 className="flex items-center gap-2 text-wa-subtext text-xs font-bold uppercase tracking-widest mb-3 px-1"><Type size={16} /> {t('fontSize') || 'Text Size'}</h3>
                    <div className="flex gap-2">
                      {[
                        { label: 'Normal', display: t('fontNormal') || 'Normal', uiSize: 'text-base' }, 
                        { label: 'Large', display: t('fontLarge') || 'Large', uiSize: 'text-lg' }, 
                        { label: 'Extra Large', display: t('fontExtraLarge') || 'Extra Large', uiSize: 'text-xl' }
                      ].map((f) => (
                        <button key={f.label} onClick={() => handleFontSizeChange(f.label)} 
                          className={`flex-1 py-3 px-2 rounded-xl text-center font-bold border-2 transition-all ${f.uiSize}
                          ${formData.font === f.label ? 'border-wa-teal bg-wa-light text-wa-dark' : 'border-wa-border text-wa-subtext hover:border-wa-teal'}`}>
                          A
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-wa-subtext text-xs font-bold uppercase tracking-widest mb-3 px-1"><Globe size={16} /> {t('prefLang') || 'Language'}</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { code: 'hi', label: 'Hindi', name: 'हिंदी' }, 
                        { code: 'en', label: 'English', name: 'English' }, 
                        { code: 'mr', label: 'Marathi', name: 'मराठी' }, 
                        { code: 'gu', label: 'Gujarati', name: 'ગુજરાતી' },
                        { code: 'bn', label: 'Bengali', name: 'বাংলা' },
                        { code: 'ta', label: 'Tamil', name: 'தமிழ்' },
                        { code: 'te', label: 'Telugu', name: 'తెలుగు' }
                      ].map(l => (
                        <button key={l.code} onClick={() => handleLangChange(l.code)} 
                          className={`px-4 py-2 rounded-xl font-bold border-2 transition-all
                          ${formData.language === l.code ? 'border-wa-teal bg-wa-light text-wa-dark shadow-sm' : 'border-wa-border text-wa-subtext hover:border-wa-teal'}`}>
                          {l.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="flex items-center gap-2 text-wa-subtext text-xs font-bold uppercase tracking-widest mb-3 px-1"><CheckCircle size={16} /> {t('learnGoals') || 'What do you want to learn?'}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'upi', label: t('goalUpi') || 'UPI Payments', icon: Wallet, color: 'text-blue-500', bg: 'bg-blue-50' },
                        { id: 'whatsapp', label: t('goalWhatsapp') || 'WhatsApp', icon: MessageCircle, color: 'text-wa-green', bg: 'bg-wa-light' },
                        { id: 'govt', label: t('goalGovt') || 'Govt Services', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' },
                        { id: 'safety', label: t('goalSafety') || 'Online Safety', icon: ShieldCheck, color: 'text-red-500', bg: 'bg-red-50' }
                      ].map(g => {
                        const isSelected = formData.goals.includes(g.id);
                        return (
                          <button 
                            key={g.id} 
                            onClick={() => setFormData(prev => ({...prev, goals: prev.goals.includes(g.id) ? prev.goals.filter(id => id !== g.id) : [...prev.goals, g.id]}))}
                            className={`flex flex-col flex-1 items-center justify-center p-4 rounded-xl gap-2 border-2 transition-all
                            ${isSelected ? `border-wa-teal ${g.bg}` : 'border-wa-border bg-white hover:border-wa-teal hover:bg-wa-chatBg'}`}
                          >
                            <g.icon size={28} className={g.color} />
                            <span className={`font-bold text-sm text-center ${isSelected ? 'text-wa-dark' : 'text-wa-text'}`}>{g.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-wa-border mt-auto">
                   <motion.button whileTap={{ scale: 0.97 }} onClick={handleNext} className="btn-wa-primary w-full text-lg">
                     {t('nextStep') || 'Continue'} <ArrowRight size={20} className="ml-auto" />
                   </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
              <div className="mb-6">
                <h1 className="text-2xl font-black text-wa-text mb-1">{t('detailsStep3Title') || "Safety Setup"}</h1>
                <p className="text-wa-subtext text-sm font-medium">{t('detailsStep3Sub') || "Add an emergency trusted contact"}</p>
              </div>

              <div className="wa-panel flex-1 flex flex-col pt-6 space-y-6">
                
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex items-start gap-3">
                  <ShieldCheck size={24} className="text-amber-500 shrink-0" />
                  <p className="text-amber-800 text-sm font-medium">"{t('safetyTip') || "We never share your data. Your trusted contact helps you when you're stuck."}"</p>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <label className="text-wa-subtext text-xs font-bold uppercase tracking-widest mb-1.5 block px-1">Trusted Contact Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-wa-icon shrink-0" size={20} />
                      <input type="text" value={formData.emergencyName} onChange={e => setFormData({...formData, emergencyName: e.target.value})} className="wa-input pl-11" placeholder="Their name" />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="text-wa-subtext text-xs font-bold uppercase tracking-widest mb-1.5 block px-1">Relation</label>
                      <select value={formData.relation} onChange={e => setFormData({...formData, relation: e.target.value})} className="wa-input appearance-none bg-transparent focus:bg-white text-wa-text font-semibold px-4">
                        <option>Daughter</option>
                        <option>Son</option>
                        <option>Spouse</option>
                        <option>Friend</option>
                      </select>
                    </div>
                    <div className="w-1/2">
                      <label className="text-wa-subtext text-xs font-bold uppercase tracking-widest mb-1.5 block px-1">Phone</label>
                      <input type="tel" value={formData.emergencyPhone} onChange={e => setFormData({...formData, emergencyPhone: e.target.value})} className="wa-input px-4 text-wa-text font-semibold" placeholder="Mobile Number" />
                    </div>
                  </div>

                  <label className="flex items-center gap-3 bg-wa-chatBg p-4 rounded-xl border border-wa-border cursor-pointer hover:bg-wa-border/50 transition-colors mt-6">
                    <input type="checkbox" checked={formData.shareProgress} onChange={e => setFormData({...formData, shareProgress: e.target.checked})} 
                           className="w-5 h-5 rounded border-wa-border text-wa-green accent-wa-green focus:ring-wa-green cursor-pointer shrink-0" />
                    <span className="font-semibold text-sm text-wa-text flex-1">
                      {t('allowFamily') || 'Allow them to see my learning progress'}
                    </span>
                  </label>
                </div>

                <div className="pt-4 border-t border-wa-border mt-auto">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleComplete} className="btn-wa-primary w-full text-lg">
                    <CheckCircle size={20} /> {t('completeSetup') || 'Finish Setup'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default DetailsPage;
