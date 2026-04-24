import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-luxury bg-brand-beige/20 mb-4 shadow-sm group-hover:shadow-gold-glow transition-all duration-500">
          <img 
            src={product.image || (product.images && product.images[0]?.url) || 'https://via.placeholder.com/400x500?text=Saira+Ornaments'} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
            <button className="w-10 h-10 bg-white dark:bg-[#1A1A1A] rounded-full flex items-center justify-center text-brand-charcoal dark:text-white hover:bg-brand-gold dark:hover:bg-brand-gold hover:text-white shadow-lg transition-colors">
              <Heart size={18} />
            </button>
            <button 
              onClick={handleAddToCart}
              className="w-10 h-10 bg-white dark:bg-[#1A1A1A] rounded-full flex items-center justify-center text-brand-charcoal dark:text-white hover:bg-brand-gold dark:hover:bg-brand-gold hover:text-white shadow-lg transition-colors"
            >
              <ShoppingBag size={18} />
            </button>
          </div>

          {/* Badge */}
          {product.isNewArrival && (
            <span className="absolute top-4 left-4 bg-brand-gold text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
              New
            </span>
          )}
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-brand-charcoal dark:text-white font-serif text-lg leading-tight group-hover:text-brand-gold transition-colors">{product.title}</h3>
            <p className="text-[10px] text-gray-400 dark:text-white/40 uppercase tracking-widest font-bold mt-1">
              {product.category?.name || 'Jewellery'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-brand-gold font-bold text-lg">₹{product.price}</p>
            {product.discountPrice && (
              <p className="text-[10px] text-gray-400 line-through">₹{product.discountPrice}</p>
            )}
          </div>
        </div>

        <div className="flex items-center mt-2 space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={12} 
              className={i < Math.floor(product.ratingsAverage || 5) ? "fill-brand-gold text-brand-gold" : "text-gray-200"} 
            />
          ))}
          <span className="text-[10px] text-gray-400 ml-1">({product.ratingsQuantity || 0})</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
