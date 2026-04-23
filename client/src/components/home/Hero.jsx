import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Jewellery" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="block text-white text-xs uppercase tracking-[0.5em] font-bold mb-6"
        >
          Timeless Elegance
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-serif text-white mb-10 leading-tight"
        >
          Saira <span className="italic">Ornaments</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link to="/shop" className="btn-luxury-filled bg-white text-brand-charcoal border-white hover:bg-transparent hover:text-white inline-block">
            Shop Collection
          </Link>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-white/50"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
