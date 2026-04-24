import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'Lookbook', path: '/lookbook' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-[#0A0A0A] shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-brand-charcoal dark:text-white" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link to="/" className="text-2xl font-serif font-bold tracking-tighter text-brand-charcoal dark:text-white">
          SAIRA<span className="text-brand-gold">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal dark:text-white/80 dark:hover:text-brand-gold hover:text-brand-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5 text-brand-charcoal dark:text-white">
          <button className="hover:text-brand-gold transition-colors hidden sm:block">
            <Search size={20} />
          </button>
          <Link to="/wishlist" className="hover:text-brand-gold transition-colors hidden sm:block">
            <Heart size={20} />
          </Link>
          <Link to="/cart" className="relative hover:text-brand-gold transition-colors">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-brand-beige dark:hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="group relative">
            <Link to={user ? "/profile" : "/login"} className="hover:text-brand-gold transition-colors">
              <User size={20} />
            </Link>
            {user && (
              <div className="absolute right-0 w-48 mt-2 bg-white dark:bg-[#1A1A1A] shadow-xl rounded-luxury opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 border border-brand-beige dark:border-white/10">
                <Link to="/profile" className="block px-4 py-2 text-xs uppercase tracking-widest hover:bg-brand-beige dark:hover:bg-white/5">Profile</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block px-4 py-2 text-xs uppercase tracking-widest hover:bg-brand-beige dark:hover:bg-white/5">Dashboard</Link>
                )}
                <button onClick={logout} className="w-full text-left px-4 py-2 text-xs uppercase tracking-widest hover:bg-brand-beige dark:hover:bg-white/5 text-red-500">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-white z-[60] p-10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-2xl font-serif font-bold">SAIRA<span className="text-brand-gold">.</span></span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={28} /></button>
            </div>
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-serif text-brand-charcoal dark:text-white"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-serif text-brand-charcoal dark:text-white">Wishlist</Link>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-serif text-brand-charcoal dark:text-white">Account</Link>
              
              {/* Mobile Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="flex items-center gap-4 text-xl font-serif text-brand-charcoal dark:text-white"
              >
                {theme === 'light' ? (
                  <><Moon size={24} /> Dark Mode</>
                ) : (
                  <><Sun size={24} /> Light Mode</>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
