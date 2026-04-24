import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, MessageCircle, Truck, ShieldCheck, Gem, ChevronRight, Star, Minus, Plus, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageGallery from '../components/shop/ImageGallery';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'react-toastify';
import ProductCard from '../components/common/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = product ? isInWishlist(product._id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.data.product);
        
        // Fetch related products
        const related = await api.get(`/products?limit=5&category=${data.data.product.category._id}`);
        setRelatedProducts(related.data.data.products.filter(p => p._id !== id).slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.title} added to cart!`);
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-brand-dark">
      <div className="w-20 h-[1px] bg-brand-gold animate-pulse mb-8"></div>
      <p className="font-serif italic text-brand-gold text-xl tracking-widest animate-pulse">SAIRA ORNAMENTS</p>
    </div>
  );

  if (!product) return <div className="h-screen flex items-center justify-center bg-brand-dark text-white">Product not found</div>;

  const tabs = [
    { id: 'description', label: 'The Story' },
    { id: 'materials', label: 'Specifications' },
    { id: 'care', label: 'Care Guide' },
  ];

  return (
    <div className="bg-brand-cream dark:bg-brand-dark min-h-screen pt-32 pb-32 transition-colors duration-300">
      {/* Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center justify-between">
        <Link to="/shop" className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-dark/40 dark:text-white/40 hover:text-brand-gold transition-colors">
          <ArrowLeft size={14} /> Back to Collection
        </Link>
        <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold text-brand-dark/20 dark:text-white/20">
          <Link to="/" className="hover:text-brand-gold">Home</Link>
          <ChevronRight size={8} />
          <Link to="/shop" className="hover:text-brand-gold">Shop</Link>
          <ChevronRight size={8} />
          <span className="text-brand-dark dark:text-white">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
        {/* Left: Gallery */}
        <div className="relative">
          <ImageGallery images={product.images.length > 0 ? product.images : [{ url: 'https://via.placeholder.com/600x800' }]} />
          
          {/* Quality Badge */}
          <div className="absolute -bottom-10 -right-10 hidden lg:flex flex-col items-center justify-center bg-brand-gold w-32 h-32 rounded-full border-[10px] border-brand-cream dark:border-brand-dark shadow-2xl">
             <Gem className="text-white mb-1" size={24} strokeWidth={1.5} />
             <span className="text-white text-[8px] uppercase tracking-widest font-bold text-center">Certified<br/>Masterpiece</span>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col gap-10">
          <div className="border-b border-brand-gold/10 pb-10">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-brand-gold text-[10px] uppercase tracking-[0.6em] font-bold block mb-6"
            >
              {product.category?.name || 'Exclusive Design'}
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-serif text-brand-dark dark:text-white mb-6 leading-tight">{product.title}</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <span className="text-3xl font-bold text-brand-dark dark:text-white tracking-tight font-sans">₹{product.price}</span>
                {product.discountPrice && (
                  <span className="text-xl text-brand-dark/20 dark:text-white/20 line-through font-light">₹{product.discountPrice}</span>
                )}
              </div>
              <div className="flex items-center gap-1.5 bg-brand-gold/5 px-4 py-2 rounded-full border border-brand-gold/10">
                <Star size={12} className="fill-brand-gold text-brand-gold" />
                <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">{product.ratingsAverage || '4.9'} / 5.0</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
             <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-dark dark:text-white/60">About this Piece</h4>
             <p className="text-brand-dark/60 dark:text-white/40 text-lg leading-relaxed font-light italic">
               {product.description}
             </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-6 pt-10 border-t border-brand-gold/10">
            <div className="flex gap-6">
              <div className="flex items-center border border-brand-gold/20 p-1 bg-white/5 backdrop-blur-sm">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center text-brand-dark/40 dark:text-white/40 hover:text-brand-gold transition-colors"><Minus size={16} /></button>
                <span className="w-10 text-center font-bold text-brand-dark dark:text-white text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center text-brand-dark/40 dark:text-white/40 hover:text-brand-gold transition-colors"><Plus size={16} /></button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-grow btn-luxury-filled flex items-center justify-center gap-4 py-5"
              >
                <ShoppingBag size={20} strokeWidth={1.5} /> Add to Collection
              </button>
              
              <button 
                onClick={() => toggleWishlist(product)}
                className={`w-16 h-16 border flex items-center justify-center transition-all duration-500 ${
                  isLiked 
                    ? 'bg-brand-gold border-brand-gold text-white' 
                    : 'border-brand-gold/20 text-brand-dark/40 dark:text-white/40 hover:border-brand-gold hover:text-brand-gold'
                }`}
              >
                <Heart size={24} strokeWidth={1.5} className={isLiked ? 'fill-current' : ''} />
              </button>
            </div>
            
            <button 
              onClick={() => window.open(`https://wa.me/919351420161?text=Hi, I'm interested in the ${product.title}`, '_blank')}
              className="w-full flex items-center justify-center gap-4 py-5 border border-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-white transition-all duration-500 font-bold uppercase tracking-[0.3em] text-[10px]"
            >
              <MessageCircle size={20} strokeWidth={1.5} /> Personal Concierge Inquiry
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-10">
            <div className="flex gap-10 border-b border-brand-gold/10 mb-10 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-brand-gold' : 'text-brand-dark/30 dark:text-white/30 hover:text-brand-gold'}`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="tabUnderlineDetail" className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-gold" />
                  )}
                </button>
              ))}
            </div>
            <div className="text-lg text-brand-dark/50 dark:text-white/40 leading-relaxed min-h-[120px] font-light">
              {activeTab === 'description' && <p>{product.description}</p>}
              {activeTab === 'materials' && (
                <ul className="space-y-4">
                  {product.materials?.map((m, i) => (
                    <li key={i} className="flex justify-between items-center border-b border-brand-gold/5 pb-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-brand-gold/40">Material {i+1}</span>
                      <span className="font-serif italic">{m}</span>
                    </li>
                  ))}
                  {product.purity && (
                    <li className="flex justify-between items-center border-b border-brand-gold/5 pb-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-brand-gold/40">Purity</span>
                      <span className="font-serif italic">{product.purity}</span>
                    </li>
                  )}
                </ul>
              )}
              {activeTab === 'care' && (
                <div className="bg-brand-gold/5 p-8 border-l-2 border-brand-gold">
                   <p className="italic mb-4">To maintain the brilliance of your Saira Ornaments piece:</p>
                   <p className="text-sm">{product.careInstructions || 'Avoid contact with water, perfumes, and chemical products. Store in the provided luxury box when not in use.'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Luxury Perks */}
          <div className="grid grid-cols-3 gap-8 pt-16 border-t border-brand-gold/10">
            {[
              { icon: Truck, label: 'Insured Delivery' },
              { icon: ShieldCheck, label: 'Quality Assured' },
              { icon: Gem, label: 'Handcrafted' }
            ].map((perk, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 group">
                <perk.icon className="text-brand-gold group-hover:scale-110 transition-transform" size={24} strokeWidth={1} />
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-brand-dark/40 dark:text-white/40 leading-tight">{perk.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-48">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-brand-gold/10 pb-10">
            <div className="max-w-xl text-left">
              <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Complete the Look</span>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-dark dark:text-white">You May Also <span className="italic text-brand-gold">Admire</span></h2>
            </div>
            <Link to="/shop" className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold hover:text-brand-dark dark:hover:text-white transition-colors mb-2">View Full Collection</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;

