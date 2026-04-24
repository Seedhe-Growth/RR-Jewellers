import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your message has been received. Our luxury concierge will contact you soon.');
  };

  return (
    <div className="bg-[#FFFDFB] dark:bg-[#0A0A0A] min-h-screen pt-32 pb-24 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-brand-gold tracking-[0.4em] uppercase text-[10px] mb-4 block">Get in touch</span>
          <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-widest leading-none text-brand-charcoal dark:text-white">
            Contact <span className="italic text-brand-gold">Us</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-12"
          >
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-serif text-brand-charcoal dark:text-white">Visit the <span className="italic text-brand-gold">Vault</span></h2>
              <p className="text-brand-charcoal/40 dark:text-white/40 leading-relaxed text-sm italic">
                Experience luxury in person. Our boutique in Jaipur is open for private viewings and custom consultations.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-brand-gold mb-2">Our Boutique</h4>
                  <p className="text-brand-charcoal/60 dark:text-white/60 text-sm leading-relaxed">
                    B-54 Gangwal Park Adarsh Nagar <br /> Jaipur (302004), Rajasthan, India
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-brand-gold mb-2">Call Us</h4>
                  <p className="text-brand-charcoal/60 dark:text-white/60 text-sm">
                    9351420161 / 6367383540
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-brand-gold mb-2">Email Us</h4>
                  <p className="text-brand-charcoal/60 dark:text-white/60 text-sm">
                    concierge@rrjewellers.com
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
               <button 
                  onClick={() => window.open('https://wa.me/919351420161', '_blank')}
                  className="flex items-center gap-4 bg-green-500/10 border border-green-500/20 px-8 py-4 text-green-500 uppercase tracking-widest text-[10px] font-bold hover:bg-green-500 hover:text-white transition-all w-fit"
               >
                 <MessageCircle size={18} /> Chat on WhatsApp
               </button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-[#1A1A1A] p-12 rounded-luxury border border-brand-beige dark:border-white/10 shadow-xl relative transition-colors duration-300"
          >
            <div className="absolute top-0 right-10 w-1 h-20 bg-brand-gold/20" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Your Name</label>
                  <input placeholder="Enter full name" className="input-luxury" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Phone Number</label>
                  <input placeholder="e.g. +91 98765 43210" className="input-luxury" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Email Address</label>
                <input type="email" placeholder="example@vault.com" className="input-luxury" required />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Subject</label>
                <select className="input-luxury appearance-none">
                  <option className="dark:bg-[#1A1A1A]">General Inquiry</option>
                  <option className="dark:bg-[#1A1A1A]">Custom Jewellery Request</option>
                  <option className="dark:bg-[#1A1A1A]">Order Tracking</option>
                  <option className="dark:bg-[#1A1A1A]">Corporate Gifting</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Your Message</label>
                <textarea rows={4} placeholder="How can our artisans help you?" className="input-luxury resize-none" required />
              </div>

              <button type="submit" className="btn-luxury-filled flex items-center justify-center gap-3 py-4 mt-4">
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="max-w-7xl mx-auto px-6 mt-32 h-[450px] bg-brand-beige/20 dark:bg-white/5 border border-brand-beige dark:border-white/10 flex items-center justify-center group overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
         <div className="flex flex-col items-center gap-4 text-center">
            <MapPin className="text-brand-gold group-hover:scale-125 transition-transform duration-500" size={40} />
            <p className="text-brand-charcoal/20 dark:text-white/20 uppercase tracking-[0.4em] text-[10px]">Location Map Integration Placeholder</p>
         </div>
      </div>
    </div>
  );
};

export default Contact;
