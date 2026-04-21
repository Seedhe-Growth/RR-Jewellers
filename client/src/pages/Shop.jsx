import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ui/ProductCard';
import { MOCK_PRODUCTS, CATEGORIES } from '../utils/mockData';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCat = searchParams.get('cat') || 'all';
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    currentCat === 'all' || p.category.slug === currentCat
  );

  return (
    <div className="bg-luxury-black min-h-screen pt-24">
      {/* Header */}
      <div className="section-padding bg-[#050505] mb-12">
        <div className="flex flex-col gap-4">
          <span className="text-primary tracking-[0.4em] uppercase text-[10px]">The Collections</span>
          <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-widest leading-none">
            {currentCat === 'all' ? 'All Jewellery' : currentCat}
          </h1>
          <p className="text-white/40 max-w-xl text-sm italic">
            Meticulously crafted pieces designed to elevate your grace and radiance.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-wrap justify-between items-center gap-6 border-y border-white/5 py-6">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm uppercase tracking-widest text-primary hover:text-white transition-colors"
          >
            <Filter size={16} /> Filters
          </button>
          <div className="hidden md:flex gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSearchParams({ cat: cat.slug })}
                className={`text-[10px] uppercase tracking-[0.2em] transition-all relative pb-1 ${
                  currentCat === cat.slug ? 'text-primary' : 'text-white/40 hover:text-white'
                }`}
              >
                {cat.name}
                {currentCat === cat.slug && (
                  <motion.div layoutId="catUnderline" className="absolute bottom-0 left-0 w-full h-[1px] bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-white/30">Sort By:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-white/70 text-xs uppercase tracking-widest outline-none border-none cursor-pointer hover:text-primary transition-colors"
            >
              <option value="popular">Popularity</option>
              <option value="newest">New Arrivals</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
          <div className="flex items-center gap-4 text-white/20 border-l border-white/10 pl-6">
            <LayoutGrid size={18} className="text-primary cursor-pointer" />
            <List size={18} className="cursor-pointer hover:text-white" />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 border border-dashed border-white/10">
            <h3 className="text-xl text-white/30 font-serif italic">No pieces found in this collection.</h3>
            <button 
              onClick={() => setSearchParams({ cat: 'all' })}
              className="mt-6 text-primary uppercase text-[10px] tracking-widest hover:underline"
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
