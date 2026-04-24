import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your message has been received. Our luxury concierge will contact you soon.');
  };

  return (
    <div className="bg-brand-cream dark:bg-brand-dark min-h-screen pt-32 pb-24 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-brand-gold tracking-[0.8em] uppercase text-[10px] mb-6 block font-bold">Connect With Us</span>
          <h1 className="text-5xl md:text-8xl font-serif uppercase tracking-widest leading-none text-brand-dark dark:text-white">
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
              <h2 className="text-4xl font-serif text-brand-dark dark:text-white leading-tight">Visit our <br /><span className="italic text-brand-gold">Private Vault</span></h2>
              <p className="text-brand-dark/40 dark:text-white/40 leading-relaxed text-lg font-light italic">
                Experience luxury in person. Our boutique in Jaipur is open for private viewings and custom consultations by appointment.
              </p>
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex gap-8 items-start">
                <div className="text-brand-gold">
                  <MapPin size={24} strokeWidth={1} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-brand-gold mb-3 font-bold">The Boutique</h4>
                  <p className="text-brand-dark/60 dark:text-white/60 text-sm leading-relaxed font-light uppercase tracking-widest">
                    B-54 Gangwal Park Adarsh Nagar <br /> Jaipur (302004), Rajasthan, India
                  </p>
                </div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="text-brand-gold">
                  <Phone size={24} strokeWidth={1} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-brand-gold mb-3 font-bold">Direct Line</h4>
                  <p className="text-brand-dark/60 dark:text-white/60 text-sm font-light tracking-widest">
                    +91 93514 20161 <br /> +91 63673 83540
                  </p>
                </div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="text-brand-gold">
                  <Mail size={24} strokeWidth={1} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-brand-gold mb-3 font-bold">Concierge</h4>
                  <p className="text-brand-dark/60 dark:text-white/60 text-sm font-light tracking-widest">
                    hello@sairaornaments.com
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
               <button 
                  onClick={() => window.open('https://wa.me/919351420161', '_blank')}
                  className="flex items-center gap-6 bg-brand-gold/5 border border-brand-gold/20 px-10 py-5 text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-brand-gold hover:text-white transition-all w-fit"
               >
                 <MessageCircle size={20} strokeWidth={1.5} /> Chat on WhatsApp
               </button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-brand-dark p-12 border border-white/5 relative transition-colors duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-[1px] bg-brand-gold" />
            <div className="absolute top-0 right-0 w-[1px] h-32 bg-brand-gold" />
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <label className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Full Name</label>
                  <input placeholder="ENTER YOUR NAME" className="bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-gold transition-colors" required />
                </div>
                <div className="flex flex-col gap-4">
                  <label className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Phone</label>
                  <input placeholder="CONTACT NUMBER" className="bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-gold transition-colors" />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Email Address</label>
                <input type="email" placeholder="EMAIL@DOMAIN.COM" className="bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-gold transition-colors" required />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Service</label>
                <select className="bg-transparent border-b border-white/10 py-3 text-white/50 focus:outline-none focus:border-brand-gold transition-colors appearance-none">
                  <option className="bg-brand-dark text-white">General Inquiry</option>
                  <option className="bg-brand-dark text-white">Custom Design Consultation</option>
                  <option className="bg-brand-dark text-white">Wedding Collection Inquiry</option>
                  <option className="bg-brand-dark text-white">Corporate Gifting</option>
                </select>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Message</label>
                <textarea rows={4} placeholder="HOW CAN WE HELP YOU?" className="bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-brand-gold transition-colors resize-none" required />
              </div>

              <button type="submit" className="btn-luxury-filled flex items-center justify-center gap-4 py-5 mt-8">
                Send Message <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Visual Break / Map Placeholder */}
      <div className="max-w-7xl mx-auto px-6 mt-32 h-[400px] border border-white/5 flex items-center justify-center group overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 bg-brand-dark relative">
         <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1598560944732-435fa1086036?q=80&w=2000')] bg-cover bg-center"></div>
         <div className="flex flex-col items-center gap-6 text-center relative z-10">
            <div className="w-16 h-16 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold">
               <MapPin className="group-hover:scale-125 transition-transform duration-500" size={32} strokeWidth={1} />
            </div>
            <p className="text-white/20 uppercase tracking-[0.6em] text-[9px] font-bold">Location Map Integration</p>
         </div>
      </div>
    </div>
  );
};

export default Contact;

