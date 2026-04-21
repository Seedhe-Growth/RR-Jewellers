import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import useCartStore from '../../store/useCartStore';

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white/3 p-4 flex flex-col gap-4 border border-white/5 hover:border-primary/20 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-luxury-black">
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.images[0].url} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 p-2 bg-luxury-black/50 backdrop-blur-md rounded-full text-white/50 hover:text-red-500 transition-colors">
          <Heart size={18} />
        </button>

        {/* Quick Add Button */}
        <button 
          onClick={() => addToCart(product)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 bg-primary text-luxury-black px-6 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2"
        >
          <ShoppingBag size={14} /> Quick Add
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 items-center text-center">
        <span className="text-[10px] text-primary uppercase tracking-[0.2em]">{product.category.name}</span>
        <Link to={`/product/${product._id}`}>
          <h3 className="font-serif text-lg text-luxury-cream group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="flex gap-3 items-center">
          {product.discountPrice && (
            <span className="text-white/30 line-through text-sm">₹{product.price}</span>
          )}
          <span className="text-primary font-bold">₹{product.discountPrice || product.price}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
