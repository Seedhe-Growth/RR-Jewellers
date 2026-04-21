import { motion } from 'framer-motion';
import { Camera, ExternalLink, Sparkles } from 'lucide-react';

const lookbookItems = [
  { id: 1, title: 'Summer Radiance', type: 'Editorial', image: 'https://images.unsplash.com/photo-1573408302185-91275ca862fa?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Bridal Grandeur', type: 'Signature', image: 'https://images.unsplash.com/photo-1515562141207-7a88bb7ce338?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Minimalist Chic', type: 'Daily Wear', image: 'https://images.unsplash.com/photo-1535633302703-94209144bd48?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Emerald Dreams', type: 'Occasion', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Golden Hour', type: 'Campaign', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'The Modern Heirloom', type: 'Legacy', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800' },
];

const Lookbook = () => {
  return (
    <div className="bg-[#050505] min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="section-padding text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="flex flex-col items-center gap-6"
        >
          <Sparkles className="text-primary animate-pulse" size={32} />
          <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-widest leading-none">
            The <span className="gold-text italic">Vault</span> Lookbook
          </h1>
          <p className="text-white/40 max-w-2xl text-sm md:text-base italic">
            Explore our curated visual journey. A celebration of craftsmanship, elegance, and the stories we wear.
          </p>
        </motion.div>
      </section>

      {/* Masonry Gallery Placeholder */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {lookbookItems.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group overflow-hidden break-inside-avoid shadow-2xl"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-all duration-500 flex flex-col justify-end p-8">
                 <span className="text-primary text-[10px] uppercase tracking-[0.4em] mb-2">{item.type}</span>
                 <h3 className="text-2xl font-serif text-white tracking-widest uppercase mb-4">{item.title}</h3>
                 <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                    Explore Details <ExternalLink size={12} />
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Instagram Bridge */}
      <section className="section-padding flex flex-col items-center mt-32 gap-12 bg-white/[0.02]">
        <div className="text-center">
          <Camera className="text-primary mx-auto mb-6" size={40} />
          <h2 className="text-4xl font-serif mb-4 uppercase tracking-widest">Follow Our <span className="gold-text italic">Radiance</span></h2>
          <p className="text-white/40 text-sm tracking-widest uppercase">@rrjewellers62 • Since 2024</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 w-full max-w-[1400px]">
           {[1,2,3,4,5,6].map((i) => (
             <div key={i} className="aspect-square bg-white/5 relative group cursor-pointer overflow-hidden">
                <img src={`https://picsum.photos/400/400?random=${i}`} alt="Insta" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Camera size={24} className="text-white" />
                </div>
             </div>
           ))}
        </div>

        <a 
          href="https://instagram.com/rrjewellers62" 
          target="_blank" 
          rel="noreferrer"
          className="btn-premium flex items-center gap-3"
        >
          View Full Profile <Camera size={18} />
        </a>
      </section>
    </div>
  );
};

export default Lookbook;
