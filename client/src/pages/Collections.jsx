import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import api from '../services/api';

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const { data } = await api.get('/products'); 
        // Group by collection or just show categories as collections if backend doesn't have it
        const uniqueCollections = Array.from(new Set(data.data.products.map(p => p.collection?.name))).filter(Boolean).map(name => {
          const p = data.data.products.find(prod => prod.collection?.name === name);
          return { _id: p.collection?._id, name, slug: p.collection?.slug, coverImage: p.images[0] };
        });
        
        if (uniqueCollections.length > 0) {
          setCollections(uniqueCollections);
        } else {
          // Fallback
          setCollections([
            { _id: '1', name: 'Bridal Couture', slug: 'bridal', coverImage: { url: 'https://images.unsplash.com/photo-1611085583191-a3b1a3089d9a?auto=format&fit=crop&q=80&w=1200' } },
            { _id: '2', name: 'Minimalist Gold', slug: 'minimalist', coverImage: { url: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=1200' } },
            { _id: '3', name: 'Royal Heritage', slug: 'heritage', coverImage: { url: 'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&q=80&w=1200' } },
            { _id: '4', name: 'Daily Elegance', slug: 'daily', coverImage: { url: 'https://images.unsplash.com/photo-1573408302185-91275ca862fa?auto=format&fit=crop&q=80&w=1200' } }
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  return (
    <div className="bg-[#FFFDFB] dark:bg-[#0A0A0A] min-h-screen pt-24 pb-20 transition-colors duration-300">
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <Sparkles className="text-brand-gold mx-auto mb-6" size={32} />
          <h1 className="text-5xl md:text-7xl font-serif text-brand-charcoal dark:text-white mb-6 uppercase tracking-tighter">
            Our <span className="italic text-brand-gold">Curated</span> Collections
          </h1>
          <p className="text-brand-charcoal/60 dark:text-white/40 text-sm md:text-base italic leading-relaxed">
            Each collection tells a unique story of heritage, modern aesthetics, and unparalleled craftsmanship.
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {loading ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-[16/9] bg-brand-beige/20 animate-pulse rounded-luxury"></div>
          ))
        ) : collections.map((coll, idx) => (
          <motion.div
            key={coll._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative overflow-hidden rounded-luxury shadow-2xl aspect-[16/9]"
          >
            <img 
              src={coll.coverImage?.url || 'https://images.unsplash.com/photo-1515562141207-7a88bb7ce338?auto=format&fit=crop&q=80&w=1200'} 
              alt={coll.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex flex-col justify-end p-10">
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.4em] mb-4 font-bold">Explore Collection</span>
              <h2 className="text-4xl font-serif text-white mb-6 uppercase tracking-widest">{coll.name}</h2>
              <Link 
                to={`/shop?collection=${coll.slug}`}
                className="flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.2em] font-bold group/link"
              >
                View Pieces <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-2" />
              </Link>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Collections;
