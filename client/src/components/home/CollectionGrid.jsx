import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const collections = [
  {
    title: 'Modern Minimalist',
    subtitle: 'Pure & Simple',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop',
    link: '/shop?collection=minimalist'
  },
  {
    title: 'Grand Party Wear',
    subtitle: 'Shine Everywhere',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop',
    link: '/shop?collection=party'
  },
  {
    title: 'Daily Essentials',
    subtitle: 'Everyday Luxury',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    link: '/shop?collection=daily'
  }
];

const CollectionGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {collections.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="group relative h-[600px] overflow-hidden"
        >
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-brand-dark via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-end text-brand-dark dark:text-white p-12 text-center">
            <span className="text-brand-gold text-[8px] uppercase tracking-[0.5em] font-bold mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">{item.subtitle}</span>
            <h3 className="text-4xl font-serif mb-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">{item.title}</h3>
            <Link 
              to={item.link} 
              className="px-8 py-3 border border-brand-dark/30 dark:border-white/30 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-brand-dark dark:hover:bg-white hover:text-white dark:hover:text-brand-dark transition-all duration-300 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-150"
            >
              Explore Collection
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CollectionGrid;

