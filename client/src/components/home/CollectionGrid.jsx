import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const collections = [
  {
    title: 'Minimalist',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop',
    link: '/shop?collection=minimalist'
  },
  {
    title: 'Party Wear',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2000&auto=format&fit=crop',
    link: '/shop?collection=party'
  },
  {
    title: 'Daily Essentials',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop',
    link: '/shop?collection=daily'
  }
];

const CollectionGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {collections.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative h-[500px] overflow-hidden rounded-luxury"
        >
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-40"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
            <h3 className="text-3xl font-serif mb-4">{item.title}</h3>
            <Link 
              to={item.link} 
              className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white pb-1 hover:text-brand-gold hover:border-brand-gold transition-all"
            >
              Discover
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CollectionGrid;
