import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your message has been received. Our luxury concierge will contact you soon.');
  };

  return (
    <div className="bg-luxury-black min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-primary tracking-[0.4em] uppercase text-[10px] mb-4 block">Get in touch</span>
          <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-widest leading-none">
            Contact <span className="gold-text italic">Us</span>
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
              <h2 className="text-3xl font-serif">Visit the <span className="gold-text italic">Vault</span></h2>
              <p className="text-white/40 leading-relaxed text-sm italic">
                Experience luxury in person. Our boutique in Jaipur is open for private viewings and custom consultations.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-primary mb-2">Our Boutique</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    B-54 Gangwal Park Adarsh Nagar <br /> Jaipur (302004), Rajasthan, India
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-primary mb-2">Call Us</h4>
                  <p className="text-white/60 text-sm">
                    9351420161 / 6367383540
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-primary mb-2">Email Us</h4>
                  <p className="text-white/60 text-sm">
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
            className="glass-card !p-12 relative"
          >
            <div className="absolute top-0 right-10 w-1 h-20 bg-primary/20" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold">Your Name</label>
                  <input placeholder="Enter full name" className="input-luxury" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold">Phone Number</label>
                  <input placeholder="e.g. +91 98765 43210" className="input-luxury" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-primary font-bold">Email Address</label>
                <input type="email" placeholder="example@vault.com" className="input-luxury" required />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-primary font-bold">Subject</label>
                <select className="input-luxury bg-luxury-black">
                  <option>General Inquiry</option>
                  <option>Custom Jewellery Request</option>
                  <option>Order Tracking</option>
                  <option>Corporate Gifting</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-primary font-bold">Your Message</label>
                <textarea rows={4} placeholder="How can our artisans help you?" className="input-luxury resize-none" required />
              </div>

              <button type="submit" className="btn-premium-filled flex items-center justify-center gap-3 py-4 mt-4">
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="max-w-7xl mx-auto px-6 mt-32 h-[450px] bg-white/5 border border-white/10 flex items-center justify-center group overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
         <div className="flex flex-col items-center gap-4 text-center">
            <MapPin className="text-primary group-hover:scale-125 transition-transform duration-500" size={40} />
            <p className="text-white/20 uppercase tracking-[0.4em] text-[10px]">Location Map Integration Placeholder</p>
         </div>
      </div>
    </div>
  );
};

export default Contact;
