import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check expiry
        if (decoded.exp * 1000 < Date.now()) {
          throw new Error('Token expired');
        }
        setUser({ uid: decoded.uid, phoneNumber: decoded.phone });
        fetchProfile();
      } catch (err) {
        console.error('Invalid or expired token', err);
        logout();
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/profile');
      setDbUser(res.data);
    } catch (error) {
      console.error("User not fully registered yet");
    } finally {
      setLoading(false);
    }
  };

  const requestOTP = async (phone) => {
    const res = await api.post('/auth/request-otp', { phone });
    return res.data;
  };

  const verifyOTP = async (phone, otp) => {
    const res = await api.post('/auth/verify-otp', { phone, otp });
    const { token, user: userProfile } = res.data;
    
    if (token) {
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser({ uid: decoded.uid, phoneNumber: decoded.phone });
      
      if (userProfile) {
        setDbUser(userProfile);
      }
      return decoded;
    }
    throw new Error('No token returned');
  };

  const logout = () => {
    setUser(null);
    setDbUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, dbUser, setDbUser, loading, requestOTP, verifyOTP, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
