import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1515562141207-7a88bb7ce338?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Jewelry" 
          className="w-full h-full object-cover scale-105"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4"
        >
          <span className="text-primary tracking-[0.5em] uppercase text-xs font-semibold reveal-up">
            Curated for Every Moment
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight">
            Elevate Your <br /> 
            <span className="gold-text italic">Signature</span> Style
          </h1>
          <p className="text-white/70 max-w-lg text-lg leading-relaxed mt-4">
            Discover a collection where timeless craftsmanship meets contemporary design. 
            The Jewel Vault brings you pieces that resonate with your inner radiance.
          </p>
          <div className="flex flex-wrap gap-6 mt-10">
            <Link to="/shop" className="btn-premium-filled">
              View Collections
            </Link>
            <Link to="/lookbook" className="btn-premium">
              The Lookbook
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Aesthetic Accents */}
      <div className="absolute bottom-10 right-10 z-20 hidden md:flex flex-col items-end gap-2">
        <div className="w-1 h-20 bg-primary/20 relative">
          <motion.div 
            animate={{ height: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full bg-primary"
          />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-primary/50 vertical-text origin-right rotate-90 mt-12 whitespace-nowrap">
          Scroll to explore
        </span>
      </div>
    </section>
  );
};

export default Hero;
