import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, X, Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-brand-dark pt-32 pb-12 transition-colors duration-500 border-t border-brand-beige dark:border-white/5 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
        {/* Brand Info */}
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl font-serif text-brand-dark dark:text-white tracking-[0.2em]">SAIRA ORNAMENTS<span className="text-brand-gold">.</span></h2>
          <p className="text-brand-dark/40 dark:text-white/40 text-sm leading-relaxed font-light italic">
            Defining elegance through meticulously crafted masterpieces. Experience the essence of luxury that resonates with your unique style.
          </p>
          <div className="flex gap-4">
            {[
              { icon: Instagram, link: '#' },
              { icon: Facebook, link: '#' },
              { icon: X, link: '#' }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.link} 
                className="w-12 h-12 rounded-full border-brand-dark/10 dark:border-white/10 flex items-center justify-center text-brand-dark/40 dark:text-white/40 hover:text-brand-gold hover:border-brand-gold transition-all duration-500"
              >
                <social.icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 text-brand-gold">Collections</h3>
          <ul className="space-y-5 text-xs uppercase tracking-[0.2em] font-bold text-brand-dark/30 dark:text-white/30">
            <li><Link to="/shop?category=necklaces" className="hover:text-brand-gold transition-colors">Necklaces</Link></li>
            <li><Link to="/shop?category=earrings" className="hover:text-brand-gold transition-colors">Earrings</Link></li>
            <li><Link to="/shop?category=rings" className="hover:text-brand-gold transition-colors">Premium Rings</Link></li>
            <li><Link to="/shop?category=bridal" className="hover:text-brand-gold transition-colors">Bridal Couture</Link></li>
          </ul>
        </div>

        {/* Concierge */}
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 text-brand-gold">Concierge</h3>
          <ul className="space-y-5 text-xs uppercase tracking-[0.2em] font-bold text-brand-dark/30 dark:text-white/30">
            <li><Link to="/about" className="hover:text-brand-gold transition-colors">The Legacy</Link></li>
            <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Private Viewing</Link></li>
            <li><Link to="/shipping" className="hover:text-brand-gold transition-colors">Global Delivery</Link></li>
            <li><Link to="/care" className="hover:text-brand-gold transition-colors">Jewellery Care</Link></li>
          </ul>
        </div>

        {/* The Insider */}
        <div className="flex flex-col gap-8">
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold">The Insider</h3>
          <p className="text-brand-dark/40 dark:text-white/40 text-xs leading-relaxed font-light">Join our inner circle for early access to new collections and exclusive events.</p>
          <form className="relative group">
            <input 
              type="email" 
              placeholder="ENTER EMAIL ADDRESS" 
              className="w-full bg-transparent border-b border-brand-dark/10 dark:border-white/10 py-4 text-[10px] tracking-widest text-brand-dark dark:text-white placeholder:text-brand-dark/10 dark:placeholder:text-white/10 focus:outline-none focus:border-brand-gold transition-colors"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-dark/40 dark:text-white/40 group-hover:text-brand-gold transition-colors">
              <Send size={16} strokeWidth={1.5} />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-brand-dark/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[9px] uppercase tracking-[0.3em] text-brand-dark/20 dark:text-white/20 font-bold">
          &copy; {new Date().getFullYear()} SAIRA ORNAMENTS LUXURY. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-10 text-[9px] uppercase tracking-[0.3em] text-brand-dark/20 dark:text-white/20 font-bold">
          <Link to="/privacy" className="hover:text-brand-gold transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-brand-gold transition-colors">Terms</Link>
          <Link to="/cookies" className="hover:text-brand-gold transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

