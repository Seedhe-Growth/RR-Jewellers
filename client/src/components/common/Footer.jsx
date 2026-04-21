import { Link } from 'react-router-dom';
import { Share2, MessageSquare, Camera, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Brand Section */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex flex-col">
            <span className="text-2xl font-serif gold-text tracking-widest uppercase">RR Jewellers</span>
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">The Jewel Vault</span>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Crafting timeless elegance and modern luxury since inception. Our pieces are 100% certified and designed for the contemporary woman.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-luxury-black transition-all">
              <Camera size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-luxury-black transition-all">
              <Share2 size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-luxury-black transition-all">
              <MessageSquare size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-primary font-serif uppercase tracking-widest mb-8">Navigation</h4>
          <ul className="flex flex-col gap-4">
            <li><Link to="/shop" className="text-white/60 hover:text-primary text-sm transition-colors">Shop All</Link></li>
            <li><Link to="/lookbook" className="text-white/60 hover:text-primary text-sm transition-colors">Collections</Link></li>
            <li><Link to="/about" className="text-white/60 hover:text-primary text-sm transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="text-white/60 hover:text-primary text-sm transition-colors">Contact</Link></li>
            <li><Link to="/auth" className="text-white/60 hover:text-primary text-sm transition-colors">My Account</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-primary font-serif uppercase tracking-widest mb-8">Categories</h4>
          <ul className="flex flex-col gap-4">
            <li><Link to="/shop?cat=bangles" className="text-white/60 hover:text-primary text-sm transition-colors">Bangles & Bracelets</Link></li>
            <li><Link to="/shop?cat=earrings" className="text-white/60 hover:text-primary text-sm transition-colors">Earrings</Link></li>
            <li><Link to="/shop?cat=necklaces" className="text-white/60 hover:text-primary text-sm transition-colors">Pendants & Necklaces</Link></li>
            <li><Link to="/shop?cat=minimal" className="text-white/60 hover:text-primary text-sm transition-colors">Minimal Daily Wear</Link></li>
            <li><Link to="/shop?cat=bridal" className="text-white/60 hover:text-primary text-sm transition-colors">Bridal Wear</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-primary font-serif uppercase tracking-widest mb-8">Visit Us</h4>
          <ul className="flex flex-col gap-6">
            <li className="flex gap-4 items-start">
              <MapPin className="text-primary shrink-0" size={20} />
              <span className="text-white/60 text-sm leading-relaxed">
                B-54 Gangwal Park Adarsh Nagar Jaipur (302004)
              </span>
            </li>
            <li className="flex gap-4 items-center">
              <Phone className="text-primary shrink-0" size={20} />
              <span className="text-white/60 text-sm">9351420161 / 6367383540</span>
            </li>
            <li className="flex gap-4 items-center">
              <Mail className="text-primary shrink-0" size={20} />
              <span className="text-white/60 text-sm">support@rrjewellers.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/30 text-[10px] uppercase tracking-widest">
          © {new Date().getFullYear()} RR Jewellers. All Rights Reserved.
        </p>
        <div className="flex gap-8">
          <Link to="/terms" className="text-white/30 hover:text-white text-[10px] uppercase tracking-widest transition-colors">Terms of Service</Link>
          <Link to="/privacy" className="text-white/30 hover:text-white text-[10px] uppercase tracking-widest transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
