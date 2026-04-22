import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { SettingsContext } from '../context/SettingsContext';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { User, CheckCircle, UserPlus, Sparkles, GraduationCap, HandHelping, Phone } from 'lucide-react';

const Signup = () => {
  const { user, dbUser, setDbUser } = useContext(AuthContext);
  const { language } = useContext(SettingsContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [role, setRole] = useState('senior');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already full profile redirect
  useEffect(() => {
    if (dbUser) {
      navigate(dbUser.role === 'volunteer' ? '/volunteer' : '/dashboard');
    }
  }, [dbUser, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name) return setError('Please enter your full name.');
    
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/auth/profile', {
        name,
        role,
        language,
        phone: user?.phoneNumber || '',
        emergencyContact: '',
        fontPreference: 'normal'
      });
      setDbUser(res.data.user);
      navigate(role === 'volunteer' ? '/volunteer' : '/dashboard');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto text-center py-16 space-y-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto shadow-md">
           <UserPlus size={28} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">Join DigiSaathi</h1>
        <p className="text-sm text-gray-500 font-medium pb-4">Safe Registration via Mobile Number</p>
        
        <div className="card shadow-lg p-8">
           <button onClick={() => navigate('/login')} className="btn-primary h-12 w-full text-base font-semibold uppercase tracking-wider justify-center gap-2 shadow-inner">
              <Phone size={20} /> Verify Mobile First
           </button>
           <p className="text-xs text-gray-400 mt-4 leading-relaxed">For safety and fraud prevention, we securely link accounts using mobile verification. We never spam.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
           <CheckCircle size={28} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">Complete Profile</h1>
        <div className="inline-flex items-center justify-center gap-1 bg-green-50 dark:bg-green-900/40 text-green-600 text-xs px-3 py-1 rounded-full font-semibold">
           ✓ Linked {user.phoneNumber}
        </div>
      </div>

      <form onSubmit={handleSignup} className="space-y-6">
        <div className="card shadow-xl p-8 space-y-8 border-t-4 border-green-500">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
               <User size={16} /> Full Name (आपका नाम)
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex. Rahul Kumar"
              required
              className="input-field mt-1"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
               <Sparkles size={16} /> Choose your Path
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                type="button" 
                onClick={() => setRole('senior')}
                className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all ${role === 'senior' ? 'bg-indigo-50 border-primary shadow-sm ring-1 ring-primary/20' : 'bg-gray-50 border-gray-100 hover:bg-white'}`}
              >
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${role === 'senior' ? 'bg-primary text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}>
                    <GraduationCap size={24} />
                 </div>
                 <h3 className={`text-sm font-bold mb-0.5 ${role === 'senior' ? 'text-primary' : 'text-gray-600'}`}>Senior Learner</h3>
                 <p className={`text-xs font-medium ${role === 'senior' ? 'text-indigo-800' : 'text-gray-400'}`}>For elders looking to learn</p>
              </button>

              <button 
                type="button" 
                onClick={() => setRole('volunteer')}
                className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all ${role === 'volunteer' ? 'bg-purple-50 border-secondary shadow-sm ring-1 ring-secondary/20' : 'bg-gray-50 border-gray-100 hover:bg-white'}`}
              >
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${role === 'volunteer' ? 'bg-secondary text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}>
                    <HandHelping size={24} />
                 </div>
                 <h3 className={`text-sm font-bold mb-0.5 ${role === 'volunteer' ? 'text-secondary' : 'text-gray-600'}`}>Youth Volunteer</h3>
                 <p className={`text-xs font-medium ${role === 'volunteer' ? 'text-purple-800' : 'text-gray-400'}`}>For guiding our seniors</p>
              </button>
            </div>
          </div>
        </div>

        {error && <p className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-100 text-center">{error}</p>}

        <button 
          type="submit" 
          disabled={loading || !name}
          className={`btn-primary h-14 w-full text-base flex justify-center uppercase tracking-wider gap-2 shadow-md ${loading || !name ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Creating Profile...' : 'Create Account'}
          {!loading && <CheckCircle size={20} />}
        </button>
      </form>
    </motion.div>
  );
};

export default Signup;
