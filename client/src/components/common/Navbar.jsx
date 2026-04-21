import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Collections', path: '/lookbook' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-luxury-black/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Mobile Menu Icon */}
        <button 
          className="lg:hidden text-primary"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-sm uppercase tracking-widest hover:text-primary transition-colors ${
                location.pathname === link.path ? 'text-primary font-bold' : 'text-luxury-cream'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link to="/" className="flex flex-col items-center group">
          <span className="text-2xl md:text-3xl font-serif gold-text tracking-[0.2em] leading-none uppercase">
            The Jewel Vault
          </span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 group-hover:text-primary transition-colors">
            RR Jewellers
          </span>
        </Link>

        {/* Right Icons & Auth */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex gap-8 mr-4">
             {navLinks.slice(3).map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm uppercase tracking-widest hover:text-primary transition-colors ${
                  location.pathname === link.path ? 'text-primary font-bold' : 'text-luxury-cream'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <button className="text-luxury-cream hover:text-primary transition-colors">
            <Search size={20} />
          </button>
          <Link to="/auth" className="text-luxury-cream hover:text-primary transition-colors">
            <User size={20} />
          </Link>
          <Link to="/cart" className="relative text-luxury-cream hover:text-primary transition-colors">
            <ShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 bg-primary text-luxury-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-luxury-black z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-serif gold-text tracking-widest uppercase">Navigation</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-primary">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif text-luxury-cream hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
