import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Truck, Heart } from 'lucide-react';

const features = [
  {
    icon: <Award className="w-8 h-8" />,
    title: "Handcrafted Excellence",
    description: "Each piece is meticulously crafted by master artisans with decades of experience."
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Certified Quality",
    description: "We use premium materials and offer certifications for our high-end collections."
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Worldwide Shipping",
    description: "Secure, insured, and tracked shipping to over 50 countries globally."
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Emotional Connection",
    description: "Our designs are inspired by timeless emotions and modern elegance."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-white dark:bg-brand-dark text-brand-dark dark:text-white transition-colors duration-500 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-brand-gold text-[10px] uppercase tracking-[0.8em] font-bold block mb-6">Our Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
            Why Discerning <br />
            <span className="italic">Jewellery Lovers</span> <br />
            Choose Us
          </h2>
          <p className="text-brand-dark/60 dark:text-white/60 text-lg font-light mb-12 max-w-lg leading-relaxed">
            For over two decades, Saira Ornaments has been synonymous with trust and elegance. We don't just sell jewellery; we curate memories that last a lifetime.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="text-brand-gold">
                  {feature.icon}
                </div>
                <h4 className="text-sm uppercase tracking-widest font-bold">{feature.title}</h4>
                <p className="text-brand-dark/40 dark:text-white/40 text-xs leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square"
        >
          <div className="absolute inset-0 border border-brand-gold/20 m-12 transform rotate-3"></div>
          <img 
            src="https://images.unsplash.com/photo-1598560944732-435fa1086036?q=80&w=1000&auto=format&fit=crop" 
            alt="Artisan at work" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
          />
          <div className="absolute -bottom-6 -left-6 bg-brand-gold p-8 hidden md:block">
            <span className="text-brand-dark font-serif text-4xl block mb-2">25+</span>
            <span className="text-brand-dark/60 text-[9px] uppercase tracking-widest font-bold">Years of <br /> Heritage</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
