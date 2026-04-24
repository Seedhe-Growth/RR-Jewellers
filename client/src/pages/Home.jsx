import React, { useEffect, useState } from 'react';
import Hero from '../components/home/Hero';
import CollectionGrid from '../components/home/CollectionGrid';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/common/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products?limit=4&isFeatured=true');
        setFeaturedProducts(data.data.products);
      } catch (err) {
        // Fallback to mock data if API fails
        setFeaturedProducts([
          { _id: '1', title: 'Golden Minimalist Earrings', price: 1299, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop', category: { name: 'Earrings' } },
          { _id: '2', title: 'Luxury Pearl Necklace', price: 2499, image: 'https://images.unsplash.com/photo-1515562141207-7a88bb7ce338?q=80&w=800&auto=format&fit=crop', category: { name: 'Necklace' } },
          { _id: '3', title: 'Diamond Studded Ring', price: 1899, image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop', category: { name: 'Ring' } },
          { _id: '4', title: 'Royal Gold Bangle', price: 3299, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop', category: { name: 'Bangle' } },
        ]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-[#FFFDFB] dark:bg-[#0A0A0A] transition-colors duration-300">
      <Hero />

      {/* Collections Section */}
      <section className="section-padding">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4"
          >
            Curated For You
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-white"
          >
            Shop by <span className="italic">Collection</span>
          </motion.h2>
        </div>
        <CollectionGrid />
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-brand-beige/30 dark:bg-white/[0.02]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Trending Now</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-white">Featured <span className="italic">Pieces</span></h2>
          </div>
          <Link to="/shop" className="text-xs uppercase tracking-widest font-bold border-b-2 border-brand-gold pb-1 hover:text-brand-gold dark:text-white/80 dark:hover:text-brand-gold transition-all mt-6 md:mt-0">
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-brand-gold text-[24px] font-serif mb-6 block">"</span>
          <p className="text-xl md:text-2xl font-serif text-brand-charcoal dark:text-white italic mb-8 leading-relaxed">
            The quality and design of Saira Ornaments are simply unmatched. I feel like royalty every time I wear their pieces.
          </p>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mb-4">
              <img src="https://i.pravatar.cc/150?u=saira" alt="Client" />
            </div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-brand-charcoal dark:text-white">Ananya Sharma</h4>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Verified Buyer</span>
          </div>
        </div>
      </section>

      {/* Instagram Social Proof */}
      <section className="pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-brand-charcoal dark:text-white">Follow Our Journey</h3>
          <p className="text-brand-gold font-serif italic text-lg">@SairaOrnaments</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 overflow-hidden">
              <img 
                src={`https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=400&auto=format&fit=crop&sig=${i}`} 
                alt="Instagram" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
