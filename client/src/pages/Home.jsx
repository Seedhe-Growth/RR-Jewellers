import React, { useEffect, useState } from 'react';
import Hero from '../components/home/Hero';
import CollectionGrid from '../components/home/CollectionGrid';
import WhyChooseUs from '../components/home/WhyChooseUs';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/common/ProductCard';
import { ArrowRight } from 'lucide-react';

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
          { _id: '1', title: 'Golden Minimalist Earrings', price: 1299, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop', category: { name: 'Earrings' }, isNewArrival: true },
          { _id: '2', title: 'Luxury Pearl Necklace', price: 2499, image: 'https://images.unsplash.com/photo-1515562141207-7a88bb7ce338?q=80&w=800&auto=format&fit=crop', category: { name: 'Necklace' }, isFeatured: true },
          { _id: '3', title: 'Diamond Studded Ring', price: 1899, image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop', category: { name: 'Ring' } },
          { _id: '4', title: 'Royal Gold Bangle', price: 3299, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop', category: { name: 'Bangle' }, isFeatured: true },
        ]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-brand-cream dark:bg-brand-dark transition-colors duration-300">
      <Hero />

      {/* Limited Time Offer */}
      <div className="bg-brand-gold py-4 overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white text-[10px] uppercase tracking-[0.5em] font-bold mx-8">
              Limited Time: Extra 15% Off on Bridal Sets • Use Code: LUXURY15 • Free Shipping Worldwide
            </span>
          ))}
        </motion.div>
      </div>

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
            className="text-4xl md:text-6xl font-serif text-brand-dark dark:text-white"
          >
            Shop by <span className="italic">Collection</span>
          </motion.h2>
          <div className="w-20 h-[1px] bg-brand-gold mx-auto mt-8"></div>
        </div>
        <CollectionGrid />
      </section>

      <WhyChooseUs />

      {/* Featured Products */}
      <section className="section-padding">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-xl">
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">The Selection</span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-dark dark:text-white leading-tight">Featured <br /> <span className="italic">Masterpieces</span></h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-dark dark:text-white mt-8 md:mt-0">
            View All Products
            <div className="w-10 h-10 rounded-full border border-brand-gold flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-all">
              <ArrowRight size={14} />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white dark:bg-brand-dark text-brand-dark dark:text-white text-center border-y border-brand-beige dark:border-white/5 transition-colors duration-500">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-1 mb-10">
            {[...Array(5)].map((_, i) => <span key={i} className="text-brand-gold">★</span>)}
          </div>
          <p className="text-2xl md:text-4xl font-serif italic mb-12 leading-relaxed">
            "The quality and design of Saira Ornaments are simply unmatched. I feel like royalty every time I wear their pieces. The attention to detail is breathtaking."
          </p>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-6 border-2 border-brand-gold p-1">
              <img src="https://i.pravatar.cc/150?u=ananya" alt="Client" className="w-full h-full rounded-full object-cover" />
            </div>
            <h4 className="text-xs uppercase tracking-widest font-bold">Ananya Sharma</h4>
            <span className="text-[10px] text-brand-dark/40 dark:text-white/40 uppercase tracking-widest mt-2">Verified Buyer • Mumbai</span>
          </div>
        </div>
      </section>

      {/* Instagram Social Proof */}
      <section className="section-padding">
        <div className="text-center mb-16">
          <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Social Feed</span>
          <h3 className="text-4xl font-serif text-brand-dark dark:text-white italic">#SairaOrnaments Moments</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1,2,3,4,5,6].map((i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="aspect-square bg-brand-beige overflow-hidden relative group"
            >
              <img 
                src={`https://images.unsplash.com/photo-1515562141207-7a88bb7ce338?q=80&w=400&auto=format&fit=crop&sig=${i}`} 
                alt="Instagram" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-bold uppercase tracking-widest">Shop Look</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

