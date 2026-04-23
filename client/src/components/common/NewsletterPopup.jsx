import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles } from 'lucide-react';

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeen = localStorage.getItem('newsletterSeen');
      if (!hasSeen) {
        setIsOpen(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletterSeen', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(handleClose, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-luxury overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-brand-charcoal z-10">
              <X size={20} />
            </button>

            {/* Left: Image */}
            <div className="hidden md:block md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2000&auto=format&fit=crop" 
                alt="Jewellery" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2 p-10 flex flex-col justify-center text-center">
              {isSubscribed ? (
                <div className="flex flex-col items-center py-10">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
                    <Sparkles size={32} />
                  </div>
                  <h2 className="text-2xl font-serif text-brand-charcoal mb-2">Thank You!</h2>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Your 10% discount is on the way.</p>
                </div>
              ) : (
                <>
                  <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Join The Club</span>
                  <h2 className="text-3xl font-serif text-brand-charcoal mb-4">Get <span className="italic">10% Off</span></h2>
                  <p className="text-gray-500 text-xs italic mb-8">Subscribe to our newsletter and receive a special gift on your first purchase.</p>
                  
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input 
                        type="email" 
                        required
                        placeholder="Enter your email" 
                        className="input-luxury w-full pl-12 text-xs"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn-luxury-filled w-full py-4 text-[10px]">
                      Claim Discount
                    </button>
                  </form>
                  <p className="mt-6 text-[9px] text-gray-400 uppercase tracking-widest font-bold">No spam, just pure elegance.</p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
