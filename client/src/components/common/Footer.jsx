import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, X, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-beige dark:bg-[#0A0A0A] pt-20 pb-10 transition-colors duration-300 border-t dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-serif font-bold mb-6 text-brand-charcoal dark:text-white">SAIRA<span className="text-brand-gold">.</span></h2>
          <p className="text-brand-charcoal/60 dark:text-white/60 text-sm leading-relaxed mb-8">
            Modern artificial jewellery crafted with elegance and precision. Discover luxury that resonates with your soul.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all">
              <X size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm uppercase tracking-widest font-bold mb-6 text-brand-charcoal dark:text-white">Quick Links</h3>
          <ul className="space-y-4 text-sm text-brand-charcoal/60 dark:text-white/60">
            <li><Link to="/shop" className="hover:text-brand-gold transition-colors">Shop All</Link></li>
            <li><Link to="/shop?collection=featured" className="hover:text-brand-gold transition-colors">Best Sellers</Link></li>
            <li><Link to="/about" className="hover:text-brand-gold transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-sm uppercase tracking-widest font-bold mb-6 text-brand-charcoal dark:text-white">Customer Care</h3>
          <ul className="space-y-4 text-sm text-brand-charcoal/60 dark:text-white/60">
            <li><Link to="/shipping" className="hover:text-brand-gold transition-colors">Shipping Policy</Link></li>
            <li><Link to="/returns" className="hover:text-brand-gold transition-colors">Returns & Exchanges</Link></li>
            <li><Link to="/faq" className="hover:text-brand-gold transition-colors">FAQs</Link></li>
            <li><Link to="/terms" className="hover:text-brand-gold transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm uppercase tracking-widest font-bold mb-6 text-brand-charcoal dark:text-white">Newsletter</h3>
          <p className="text-brand-charcoal/60 dark:text-white/60 text-sm mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="relative">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-white dark:bg-[#1A1A1A] border border-brand-gold/20 rounded-luxury px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors dark:text-white"
            />
            <button className="absolute right-2 top-2 bg-brand-gold text-white px-4 py-1.5 rounded-luxury text-xs font-bold uppercase">Join</button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-brand-gold/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-500 font-bold">
        <p>&copy; {new Date().getFullYear()} Saira Ornaments. All Rights Reserved.</p>
        <div className="mt-4 md:mt-0 flex space-x-6">
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
