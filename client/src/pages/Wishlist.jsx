import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/common/ProductCard';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen pt-40 pb-20 px-6 flex flex-col items-center justify-center bg-[#FFFDFB] dark:bg-[#0A0A0A] transition-colors duration-300">
        <Heart size={64} className="text-brand-gold/20 dark:text-white/10 mb-6" />
        <h1 className="text-3xl font-serif text-brand-charcoal dark:text-white mb-4">Your wishlist is empty</h1>
        <p className="text-brand-charcoal/40 dark:text-white/40 mb-8 italic">Save your favorite pieces to find them easily later.</p>
        <Link to="/shop" className="btn-luxury-filled">Explore Collection</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#FFFDFB] dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">My Favorites</span>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-white">Your <span className="italic">Wishlist</span></h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <div key={product._id} className="relative group">
              <ProductCard product={product} />
              <button 
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-4 left-4 w-8 h-8 bg-white dark:bg-[#1A1A1A] rounded-full flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10 border border-brand-beige dark:border-white/10"
                title="Remove from wishlist"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
