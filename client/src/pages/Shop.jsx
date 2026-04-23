import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, LayoutGrid, List, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/common/ProductCard';
import api from '../services/api';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  
  const currentCat = searchParams.get('category') || 'all';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `/products?sort=${sortBy}`;
        if (currentCat !== 'all') url += `&category=${currentCat}`;
        
        const { data } = await api.get(url);
        setProducts(data.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentCat, sortBy]);

  const categories = [
    { name: 'All', slug: 'all' },
    { name: 'Necklaces', slug: 'necklaces' },
    { name: 'Earrings', slug: 'earrings' },
    { name: 'Rings', slug: 'rings' },
    { name: 'Bangles', slug: 'bangles' },
  ];

  return (
    <div className="bg-[#FFFDFB] min-h-screen pt-24">
      {/* Page Header */}
      <div className="bg-brand-beige/30 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-4"
          >
            Saira Ornaments
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif text-brand-charcoal mb-6"
          >
            Explore <span className="italic">Jewellery</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-xl text-sm italic"
          >
            Discover meticulously crafted pieces designed to elevate your everyday elegance and special moments.
          </motion.p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-md border-y border-brand-beige">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSearchParams({ category: cat.slug })}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative pb-2 whitespace-nowrap ${
                  currentCat === cat.slug ? 'text-brand-gold' : 'text-gray-400 hover:text-brand-charcoal'
                }`}
              >
                {cat.name}
                {currentCat === cat.slug && (
                  <motion.div layoutId="catUnderline" className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Sort:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-brand-charcoal text-[10px] uppercase tracking-widest font-bold outline-none cursor-pointer hover:text-brand-gold transition-colors"
              >
                <option value="newest">Newest</option>
                <option value="low-high">Price: Low-High</option>
                <option value="high-low">Price: High-Low</option>
                <option value="popular">Popularity</option>
              </select>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-brand-beige border-l border-brand-beige pl-6">
              <LayoutGrid size={18} className="text-brand-gold cursor-pointer" />
              <List size={18} className="cursor-pointer hover:text-brand-charcoal transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-brand-beige/20 rounded-luxury mb-4"></div>
                <div className="h-4 bg-brand-beige/20 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-brand-beige/20 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40">
            <h3 className="text-2xl text-gray-300 font-serif italic mb-6">No pieces found in this collection.</h3>
            <button 
              onClick={() => setSearchParams({ category: 'all' })}
              className="btn-luxury"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
