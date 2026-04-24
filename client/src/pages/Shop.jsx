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
  const currentColl = searchParams.get('collection') || 'all';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `/products?sort=${sortBy}`;
        if (currentCat !== 'all') url += `&category=${currentCat}`;
        if (currentColl !== 'all') url += `&collection=${currentColl}`;
        
        const { data } = await api.get(url);
        setProducts(data.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentCat, currentColl, sortBy]);

  const handleCategoryChange = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug === 'all') {
      params.delete('category');
    } else {
      params.set('category', slug);
    }
    setSearchParams(params);
  };

  const categories = [
    { name: 'All Pieces', slug: 'all' },
    { name: 'Necklaces', slug: 'necklaces' },
    { name: 'Earrings', slug: 'earrings' },
    { name: 'Rings', slug: 'rings' },
    { name: 'Bangles', slug: 'bangles' },
  ];

  return (
    <div className="bg-brand-cream dark:bg-brand-dark min-h-screen pt-24 transition-colors duration-300">
      {/* Page Header */}
      <div className="bg-brand-dark py-32 px-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=2000')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-brand-gold text-[10px] uppercase tracking-[0.8em] font-bold mb-6"
          >
            Our Collections
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif text-white mb-8"
          >
            The <span className="italic text-brand-gold">Selection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-xl text-lg font-light leading-relaxed italic"
          >
            Discover meticulously crafted pieces designed to elevate your everyday elegance and capture the essence of luxury.
          </motion.p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-[72px] md:top-[88px] z-40 bg-brand-cream/80 dark:bg-brand-dark/80 backdrop-blur-md border-y border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-between items-center gap-8">
          <div className="flex items-center gap-10 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative pb-2 whitespace-nowrap ${
                  currentCat === cat.slug ? 'text-brand-gold' : 'text-brand-dark/40 dark:text-white/40 hover:text-brand-dark dark:hover:text-white'
                }`}
              >
                {cat.name}
                {currentCat === cat.slug && (
                  <motion.div layoutId="catUnderline" className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-gold" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <span className="text-[9px] uppercase tracking-widest font-bold text-brand-dark/30 dark:text-white/30">Order By:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-brand-dark dark:text-white text-[10px] uppercase tracking-widest font-bold outline-none cursor-pointer hover:text-brand-gold transition-colors"
              >
                <option value="newest" className="dark:bg-brand-dark">New Arrivals</option>
                <option value="low-high" className="dark:bg-brand-dark">Price: Low to High</option>
                <option value="high-low" className="dark:bg-brand-dark">Price: High to Low</option>
                <option value="popular" className="dark:bg-brand-dark">Most Popular</option>
              </select>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-brand-dark/10 dark:text-white/10 border-l border-brand-gold/20 pl-10">
              <LayoutGrid size={18} className="text-brand-gold cursor-pointer" />
              <List size={18} className="cursor-pointer hover:text-brand-dark dark:hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-brand-dark/5 dark:bg-white/5 mb-6"></div>
                <div className="h-4 bg-brand-dark/5 dark:bg-white/5 w-3/4 mb-3"></div>
                <div className="h-4 bg-brand-dark/5 dark:bg-white/5 w-1/4"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-48">
            <h3 className="text-2xl text-brand-dark/20 dark:text-white/20 font-serif italic mb-10">No pieces found in this collection.</h3>
            <button 
              onClick={() => setSearchParams({ category: 'all' })}
              className="btn-luxury"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;

