import React from 'react';
import { motion } from 'framer-motion';

const AddressMap = ({ street, city, state, zipCode, country }) => {
  const fullAddress = `${street}, ${city}, ${state}, ${zipCode}, ${country}`;
  const encodedAddress = encodeURIComponent(fullAddress);
  
  // Using Google Maps Embed API (Standard search mode)
  // Note: For a production app, you'd use a real API key and the Maps JavaScript API
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyA_NOT_A_REAL_KEY_REPLACE_ME&q=${encodedAddress}`;
  
  // Since I don't have a real key, I'll use a public search URL in an iframe as a fallback or demonstration
  const publicMapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full h-64 rounded-luxury overflow-hidden border border-brand-beige mt-6 shadow-inner relative"
    >
      <iframe
        title="Shipping Location"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={publicMapUrl}
        allowFullScreen
      ></iframe>
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-luxury border border-brand-beige shadow-sm max-w-[200px]">
        <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1">Live Preview</p>
        <p className="text-[9px] text-brand-charcoal truncate italic">{fullAddress}</p>
      </div>
    </motion.div>
  );
};

export default AddressMap;
