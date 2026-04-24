import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Earrings', path: '/shop?category=Earrings' },
    { name: 'Necklaces', path: '/shop?category=Necklace' },
    { name: 'Bridal Sets', path: '/shop?category=Bridal' },
    { name: 'Lookbook', path: '/lookbook' },
  ];

  const isHome = location.pathname === '/';

  return (
    <>
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-brand-dark/95 backdrop-blur-md py-4 border-b border-brand-beige dark:border-white/5' 
          : isHome ? 'bg-transparent py-8' : 'bg-white dark:bg-brand-dark py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center text-brand-dark dark:text-white">
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden hover:text-brand-gold transition-colors" 
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Desktop Nav - Left */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(0, 3).map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-brand-gold transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0">
            <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-[0.2em]">
              SAIRA<span className="text-brand-gold">.</span>ORNAMENTS
            </h1>
          </Link>

          {/* Desktop Nav - Right + Icons */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="hidden lg:flex items-center space-x-8 mr-4">
              {navLinks.slice(3).map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-brand-gold transition-all duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4 md:space-x-6">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-brand-gold transition-colors"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
              
              <Link to="/wishlist" className="relative hover:text-brand-gold transition-colors hidden sm:block">
                <Heart size={20} strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[8px] w-3 h-3 flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative hover:text-brand-gold transition-colors">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-brand-dark text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button 
                onClick={toggleTheme}
                className="hover:text-brand-gold transition-colors"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon size={20} strokeWidth={1.5} /> : <Sun size={20} strokeWidth={1.5} />}
              </button>

              <div className="group relative">
                <Link to={user ? "/profile" : "/login"} className="hover:text-brand-gold transition-colors">
                  <User size={20} strokeWidth={1.5} />
                </Link>
                <AnimatePresence>
                  {user && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute right-0 w-56 mt-4 bg-brand-dark border border-white/10 shadow-2xl p-6 hidden group-hover:block"
                    >
                      <div className="mb-4 pb-4 border-b border-white/5">
                        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Signed in as</p>
                        <p className="text-xs text-white font-bold truncate">{user.name || user.email}</p>
                      </div>
                      <Link to="/profile" className="block py-2 text-[10px] uppercase tracking-widest text-white/60 hover:text-brand-gold transition-colors">My Profile</Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" className="block py-2 text-[10px] uppercase tracking-widest text-white/60 hover:text-brand-gold transition-colors">Admin Dashboard</Link>
                      )}
                      <button onClick={logout} className="w-full text-left py-2 text-[10px] uppercase tracking-widest text-red-500/80 hover:text-red-500 transition-colors mt-2">Logout</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-dark z-[200] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-xl font-serif font-bold tracking-widest text-white">SAIRA<span className="text-brand-gold">.</span></span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white"><X size={32} /></button>
            </div>
            
            <div className="flex flex-col space-y-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={link.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-serif text-white hover:text-brand-gold transition-colors flex items-center justify-between group"
                  >
                    {link.name}
                    <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-brand-gold" size={24} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-white/5 flex flex-col gap-6">
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Our Story</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Contact Us</Link>
              <div className="flex gap-4">
                {/* Social Icons could go here */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Search Experience */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-brand-dark flex flex-col p-8 md:p-20"
          >
            <div className="max-w-7xl mx-auto w-full">
              <div className="flex justify-between items-center mb-20">
                <span className="text-[10px] uppercase tracking-[0.8em] font-bold text-brand-gold">Discovery</span>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-white hover:rotate-90 transition-transform duration-500"
                >
                  <X size={40} strokeWidth={1} />
                </button>
              </div>

              <div className="relative mb-20">
                <input 
                  autoFocus
                  placeholder="SEARCH OUR COLLECTIONS..." 
                  className="w-full bg-transparent border-b border-white/10 py-8 text-4xl md:text-7xl font-serif text-white placeholder:text-white/10 focus:outline-none focus:border-brand-gold transition-colors"
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-gold/50" size={48} strokeWidth={1} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-6">Popular Categories</h4>
                  <div className="flex flex-col gap-4">
                    {['Necklaces', 'Earrings', 'Rings', 'Bangles'].map(cat => (
                      <Link key={cat} to={`/shop?category=${cat}`} onClick={() => setIsSearchOpen(false)} className="text-xl font-serif text-white hover:text-brand-gold transition-colors">{cat}</Link>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                   <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-6">Trending Now</h4>
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {/* Placeholder for trending search results or suggestions */}
                      <div className="aspect-[3/4] bg-white/5 border border-white/5 animate-pulse"></div>
                      <div className="aspect-[3/4] bg-white/5 border border-white/5 animate-pulse hidden sm:block"></div>
                      <div className="aspect-[3/4] bg-white/5 border border-white/5 animate-pulse hidden sm:block"></div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

