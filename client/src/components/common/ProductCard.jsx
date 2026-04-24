import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white dark:bg-[#151515] overflow-hidden"
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-brand-beige/20 group">
          <img 
            src={product.image || (product.images && product.images[0]?.url) || 'https://via.placeholder.com/400x500?text=Saira+Ornaments'} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4">
            <button 
              onClick={handleAddToCart}
              className="bg-brand-gold text-white px-6 py-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-white hover:text-brand-dark"
            >
              <ShoppingBag size={14} />
              Add to Cart
            </button>
            <div className="flex gap-4 transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-75">
               <button 
                onClick={handleWishlist}
                className={`w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-brand-dark transition-colors ${isLiked ? 'bg-white text-brand-dark' : ''}`}
              >
                <Heart size={16} className={isLiked ? 'fill-current' : ''} />
              </button>
              <div className="w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-brand-dark transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>

          {/* Badge */}
          {(product.isNewArrival || product.isFeatured) && (
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNewArrival && (
                <span className="bg-brand-gold text-white text-[8px] uppercase tracking-widest font-bold px-3 py-1">
                  New Arrival
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-brand-dark text-white text-[8px] uppercase tracking-widest font-bold px-3 py-1 border border-brand-gold/30">
                  Trending
                </span>
              )}
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-brand-dark dark:text-white font-serif text-lg leading-tight group-hover:text-brand-gold transition-colors duration-300">
              {product.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <p className="text-brand-gold font-bold text-xl">₹{product.price}</p>
            {product.discountPrice && (
              <p className="text-xs text-gray-400 line-through">₹{product.discountPrice}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-brand-beige dark:border-white/5">
            <p className="text-[9px] text-gray-400 dark:text-white/30 uppercase tracking-[0.2em] font-bold">
              {product.category?.name || 'Jewellery'}
            </p>
            <div className="flex items-center gap-1">
              <Star size={10} className="fill-brand-gold text-brand-gold" />
              <span className="text-[10px] text-brand-dark dark:text-white/60 font-bold">{product.ratingsAverage || '4.9'}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

