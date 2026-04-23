import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, MessageCircle, Truck, ShieldCheck, Gem, ChevronRight, Star, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageGallery from '../components/shop/ImageGallery';
import api from '../services/api';
import { useCart } from '../context/CartContext';
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

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.data.product);
        
        // Fetch related products
        const related = await api.get(`/products?limit=4&category=${data.data.product.category._id}`);
        setRelatedProducts(related.data.data.products.filter(p => p._id !== id));
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

  if (loading) return <div className="h-screen flex items-center justify-center font-serif italic text-brand-gold">Loading Saira's Creation...</div>;
  if (!product) return <div className="h-screen flex items-center justify-center">Product not found</div>;

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'materials', label: 'Materials' },
    { id: 'care', label: 'Care' },
  ];

  return (
    <div className="bg-[#FFFDFB] min-h-screen pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400">
        <Link to="/" className="hover:text-brand-gold">Home</Link>
        <ChevronRight size={10} />
        <Link to="/shop" className="hover:text-brand-gold">Shop</Link>
        <ChevronRight size={10} />
        <span className="text-brand-charcoal">{product.title}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: Gallery */}
        <ImageGallery images={product.images.length > 0 ? product.images : [{ url: 'https://via.placeholder.com/600x800' }]} />

        {/* Right: Info */}
        <div className="flex flex-col gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-brand-gold text-[10px] uppercase tracking-[0.4em] font-bold block mb-4"
            >
              {product.category?.name || 'Handcrafted'}
            </motion.span>
            <h1 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-4 leading-tight">{product.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.ratingsAverage) ? "fill-brand-gold" : "text-gray-200"} />
                ))}
                <span className="text-[10px] text-gray-400 ml-2 font-bold uppercase tracking-widest">({product.ratingsQuantity} Reviews)</span>
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-brand-charcoal">₹{product.price}</span>
            {product.discountPrice && (
              <span className="text-xl text-gray-300 line-through">₹{product.discountPrice}</span>
            )}
          </div>

          <p className="text-gray-500 text-sm leading-relaxed border-b border-brand-beige pb-8 italic">
            {product.description}
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex items-center border border-brand-beige rounded-luxury px-2 bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-gray-400 hover:text-brand-gold transition-colors"><Minus size={16} /></button>
                <span className="w-10 text-center font-bold text-brand-charcoal">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-gray-400 hover:text-brand-gold transition-colors"><Plus size={16} /></button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-grow btn-luxury-filled flex items-center justify-center gap-3"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button className="w-14 h-14 border border-brand-beige rounded-luxury flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-all">
                <Heart size={20} />
              </button>
            </div>
            
            <a 
              href={`https://wa.me/919123456789?text=Hi, I'm interested in the ${product.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 py-4 border border-brand-gold text-brand-gold rounded-luxury hover:bg-brand-gold hover:text-white transition-all font-bold uppercase tracking-widest text-xs"
            >
              <MessageCircle size={18} /> Inquire on WhatsApp
            </a>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="flex border-b border-brand-beige mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all relative ${activeTab === tab.id ? 'text-brand-gold' : 'text-gray-400 hover:text-brand-charcoal'}`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold" />
                  )}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-500 leading-relaxed min-h-[100px]">
              {activeTab === 'description' && <p>{product.description}</p>}
              {activeTab === 'materials' && (
                <ul className="list-disc pl-5 space-y-2">
                  {product.materials.map((m, i) => <li key={i}>{m}</li>)}
                  {product.purity && <li>Purity: {product.purity}</li>}
                  {product.metalWeight && <li>Weight: {product.metalWeight}g</li>}
                </ul>
              )}
              {activeTab === 'care' && <p>{product.careInstructions || 'Handle with care. Avoid contact with water and perfume.'}</p>}
            </div>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-3 gap-4 pt-10 border-t border-brand-beige">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="text-brand-gold" size={20} />
              <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="text-brand-gold" size={20} />
              <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Authentic</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Gem className="text-brand-gold" size={20} />
              <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Premium Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-32">
          <div className="text-center mb-16">
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">You May Also Love</span>
            <h2 className="text-4xl font-serif text-brand-charcoal">Related <span className="italic">Pieces</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
