import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Zoom Effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Jewellery Model" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent dark:from-brand-dark/80 dark:via-brand-dark/40 dark:to-transparent transition-colors duration-500"></div>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-block text-brand-gold text-[10px] uppercase tracking-[0.8em] font-bold mb-6">
            Timeless Elegance & Luxury
          </span>
          
          <h1 className="text-5xl md:text-8xl font-serif text-brand-dark dark:text-white mb-8 leading-[1.1]">
            Elevate Your Style <br /> 
            <span className="italic text-brand-gold">with Premium</span> <br />
            Artificial Jewellery
          </h1>

          <p className="text-brand-dark/70 dark:text-white/70 text-lg md:text-xl font-light mb-12 max-w-lg leading-relaxed">
            Discover a curated collection of handcrafted pieces that define sophistication and emotion. Luxury made accessible for every occasion.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/shop" className="btn-luxury-filled">
              Shop Now
            </Link>
            <Link to="/collections" className="btn-luxury border-brand-dark dark:border-white text-brand-dark dark:text-white hover:bg-brand-dark dark:hover:bg-white hover:text-white dark:hover:text-brand-dark">
              Explore Collection
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Luxury Stats/Badges */}
      <div className="absolute bottom-12 right-12 hidden lg:flex flex-col gap-8">
        <div className="flex items-center gap-4 border-l border-brand-gold/30 pl-6 py-2">
          <span className="text-brand-dark dark:text-white font-serif text-3xl">500+</span>
          <span className="text-brand-dark/40 dark:text-white/40 text-[10px] uppercase tracking-widest leading-tight">Unique <br /> Designs</span>
        </div>
        <div className="flex items-center gap-4 border-l border-brand-gold/30 pl-6 py-2">
          <span className="text-brand-dark dark:text-white font-serif text-3xl">10k+</span>
          <span className="text-brand-dark/40 dark:text-white/40 text-[10px] uppercase tracking-widest leading-tight">Happy <br /> Customers</span>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] uppercase tracking-[0.5em] text-brand-dark/50 dark:text-white/50 font-bold">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-brand-gold to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;

