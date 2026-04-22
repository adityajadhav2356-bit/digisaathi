import React from 'react';

const BlobBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full opacity-20 animate-blob" />
    <div className="absolute top-[40%] right-[-10%] w-80 h-80 bg-pink-500 rounded-full opacity-20 animate-blob" style={{ animationDelay: '2s' }} />
    <div className="absolute bottom-[-10%] left-[30%] w-72 h-72 bg-blue-500 rounded-full opacity-20 animate-blob" style={{ animationDelay: '4s' }} />
  </div>
);

export default BlobBackground;
