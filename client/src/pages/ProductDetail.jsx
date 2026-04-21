import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, MessageCircle, Truck, ShieldCheck, Gem, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ImageGallery from '../components/shop/ImageGallery';
import { MOCK_PRODUCTS } from '../utils/mockData';
import useCartStore from '../store/useCartStore';

const ProductDetail = () => {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find(p => p._id === id) || MOCK_PRODUCTS[0];
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const handleWhatsAppInquiry = () => {
    const message = `Hi RR Jewellers, I'm interested in the ${product.title} (SKU: ${product.sku}). Please share more details.`;
    window.open(`https://wa.me/919351420161?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-luxury-black min-h-screen pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={10} />
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <ChevronRight size={10} />
        <Link to={`/shop?cat=${product.category.slug}`} className="hover:text-primary">{product.category.name}</Link>
        <ChevronRight size={10} />
        <span className="text-white">{product.title}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: Gallery */}
        <ImageGallery images={product.images} />

        {/* Right: Info */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-primary tracking-[0.4em] uppercase text-xs font-semibold">Handcrafted Perfection</span>
            <h1 className="text-4xl md:text-5xl font-serif leading-tight">{product.title}</h1>
            <div className="flex items-center gap-4 mt-2">
               <div className="flex gap-4 items-baseline">
                <span className="text-3xl text-primary font-bold">₹{product.discountPrice || product.price}</span>
                {product.discountPrice && (
                  <span className="text-xl text-white/20 line-through">₹{product.price}</span>
                )}
              </div>
              <span className="bg-primary/10 text-primary text-[10px] px-2 py-1 uppercase tracking-widest font-bold">In Stock</span>
            </div>
          </div>

          <p className="text-white/60 text-sm leading-relaxed border-b border-white/5 pb-8">
            This exquisite piece from our {product.category.name} collection showcases the pinnacle of luxury craftsmanship. 
            Designed for those who appreciate the finer things, it combines {product.material} with timeless aesthetics.
          </p>

          <div className="grid grid-cols-2 gap-y-6 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-white/30 uppercase text-[10px] tracking-widest">Material</span>
              <span className="text-white">{product.material}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/30 uppercase text-[10px] tracking-widest">SKU</span>
              <span className="text-white">{product.sku}</span>
            </div>
             <div className="flex flex-col gap-1">
              <span className="text-white/30 uppercase text-[10px] tracking-widest">Availability</span>
              <span className="text-white">Ships in 2-3 Days</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/30 uppercase text-[10px] tracking-widest">Certified</span>
              <span className="text-primary font-bold">100% Authentic</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex gap-4">
              <div className="flex items-center border border-white/20 bg-white/5">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-white/10 transition-colors"
                >-</button>
                <span className="px-4 font-bold">{quantity}</span>
                <button 
                   onClick={() => setQuantity(quantity + 1)}
                   className="px-4 py-2 hover:bg-white/10 transition-colors"
                >+</button>
              </div>
              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-grow btn-premium-filled flex items-center justify-center gap-3"
              >
                <ShoppingBag size={18} /> Add to Bag
              </button>
              <button className="w-14 h-14 border border-white/20 flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all text-white/50 hover:text-white">
                <Heart size={20} />
              </button>
            </div>
            <button 
              onClick={handleWhatsAppInquiry}
              className="w-full flex items-center justify-center gap-3 py-4 border border-green-500/30 text-green-500 bg-green-500/5 hover:bg-green-500 hover:text-white transition-all font-bold uppercase tracking-widest text-xs"
            >
              <MessageCircle size={18} /> Enquire on WhatsApp
            </button>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-3 gap-4 pt-10 border-t border-white/5">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="text-primary/50" size={20} />
              <span className="text-[9px] uppercase tracking-widest text-white/50">Free Insured Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="text-primary/50" size={20} />
              <span className="text-[9px] uppercase tracking-widest text-white/50">Lifetime Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Gem className="text-primary/50" size={20} />
              <span className="text-[9px] uppercase tracking-widest text-white/50">BIS Hallmarked Gold</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description Tabs & Reviews could go here */}
      <div className="max-w-7xl mx-auto px-6 mt-32">
        <h2 className="text-3xl font-serif mb-12 text-center uppercase tracking-widest">You May Also <span className="gold-text italic">Love</span></h2>
        {/* Related products grid */}
      </div>
    </div>
  );
};

export default ProductDetail;
