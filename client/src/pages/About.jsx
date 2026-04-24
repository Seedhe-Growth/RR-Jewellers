import { motion } from 'framer-motion';
import { ShieldCheck, Gem, Sparkles, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-[#FFFDFB] dark:bg-[#0A0A0A] min-h-screen pt-24 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1573408302185-91275ca862fa?auto=format&fit=crop&q=80&w=2000" 
            alt="Jewelry Craftsmanship" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center flex flex-col items-center gap-6 px-6">
          <span className="text-brand-gold tracking-[0.5em] uppercase text-xs font-semibold">EST. 2024</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white uppercase tracking-widest">Our <span className="italic text-brand-gold">Legacy</span></h1>
          <p className="text-white/60 text-lg md:text-xl italic max-w-2xl">
            "Crafting emotions into timeless treasures."
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          <span className="text-brand-gold tracking-[0.3em] uppercase text-[10px] font-bold">The Journey</span>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-white">The Heart Behind <span className="italic text-brand-gold">Saira Ornaments</span></h2>
          <p className="text-brand-charcoal/60 dark:text-white/60 leading-loose">
            Saira Ornaments started with a simple vision: to make high-end luxury accessible to the modern woman who values both tradition and contemporary elegance. What began as an Instagram-first boutique in Jaipur has grown into a destination for those seeking meticulously crafted daily wear and bridal masterpieces.
          </p>
          <p className="text-brand-charcoal/60 dark:text-white/60 leading-loose">
            Our founder's passion for craftsmanship and attention to detail ensures that every piece in our collection tells a unique story. From the weight of the gold to the clarity of the gemstones, we never compromise on quality.
          </p>
          <div className="flex gap-12 mt-4 pt-8 border-t border-brand-beige dark:border-white/5">
             <div className="flex flex-col">
                <span className="text-3xl font-serif text-brand-gold">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-brand-charcoal/40 dark:text-white/40">Hallmarked</span>
             </div>
             <div className="flex flex-col">
                <span className="text-3xl font-serif text-brand-gold">500+</span>
                <span className="text-[10px] uppercase tracking-widest text-brand-charcoal/40 dark:text-white/40">Happy Clients</span>
             </div>
             <div className="flex flex-col">
                <span className="text-3xl font-serif text-brand-gold">Jaipur</span>
                <span className="text-[10px] uppercase tracking-widest text-brand-charcoal/40 dark:text-white/40">Heritage</span>
             </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square"
        >
          <div className="absolute top-0 left-0 w-full h-full border border-brand-gold/20 translate-x-6 translate-y-6" />
          <img 
            src="https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&q=80&w=1000" 
            alt="Our Philosophy" 
            className="relative z-10 w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="bg-brand-beige/20 dark:bg-white/[0.02] py-24 px-6 md:px-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-serif uppercase tracking-widest text-brand-charcoal dark:text-white">Our Core <span className="italic text-brand-gold">Essence</span></h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: 'Unmatched Trust', desc: 'Every piece is BIS hallmarked and comes with authenticity certification.' },
            { icon: Gem, title: 'Elite Quality', desc: 'Sourcing only the finest metals and conflict-free gemstones directly.' },
            { icon: Sparkles, title: 'Modern Luxury', desc: 'Designs that bridge the gap between heavy traditional and sleek minimal.' },
            { icon: Heart, title: 'Curated for You', desc: 'Each collection is hand-selected to represent various moods and moments.' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-6 group hover:-translate-y-4 transition-all duration-500 bg-white dark:bg-[#1A1A1A] p-10 rounded-luxury border border-brand-beige dark:border-white/10 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                <item.icon size={28} />
              </div>
              <h3 className="text-lg font-serif tracking-widest uppercase text-brand-charcoal dark:text-white">{item.title}</h3>
              <p className="text-brand-charcoal/40 dark:text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
