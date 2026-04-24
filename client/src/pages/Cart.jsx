import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FFFDFB] dark:bg-[#0A0A0A] min-h-screen pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 bg-brand-beige/20 dark:bg-white/[0.05] rounded-full flex items-center justify-center mb-8"
        >
          <ShoppingBag size={40} className="text-brand-gold/30 dark:text-white/20" />
        </motion.div>
        <h1 className="text-3xl font-serif text-brand-charcoal dark:text-white mb-4">Your Bag is Empty</h1>
        <p className="text-brand-charcoal/40 dark:text-white/40 max-w-sm mb-12 italic">
          It seems you haven't added any masterpieces to your collection yet.
        </p>
        <Link to="/shop" className="btn-luxury-filled">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDFB] dark:bg-[#0A0A0A] min-h-screen pt-32 pb-24 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Your Selection</span>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-white">
            Shopping <span className="italic">Bag</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main List */}
          <div className="lg:col-span-2">
            <div className="hidden md:grid grid-cols-4 pb-4 border-b border-brand-beige dark:border-white/10 text-[10px] uppercase tracking-widest font-bold text-brand-charcoal/40 dark:text-white/40">
              <span className="col-span-2">Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Price</span>
            </div>
            
            <div className="flex flex-col">
              {cartItems.map((item) => (
                <motion.div 
                  layout
                  key={item._id} 
                  className="grid grid-cols-1 md:grid-cols-4 items-center gap-6 py-8 border-b border-brand-beige dark:border-white/10 group"
                >
                  {/* Product Detail */}
                  <div className="col-span-2 flex gap-6 items-center">
                    <div className="w-24 md:w-32 aspect-[4/5] bg-brand-beige/20 dark:bg-white/[0.05] rounded-luxury overflow-hidden">
                      <img 
                        src={item.image || (item.images && item.images[0]?.url)} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-brand-gold uppercase tracking-widest font-bold">{item.category?.name || 'Jewellery'}</span>
                      <Link to={`/product/${item._id}`} className="font-serif text-lg text-brand-charcoal dark:text-white hover:text-brand-gold transition-colors">{item.title}</Link>
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        className="flex items-center gap-2 text-red-400 hover:text-red-600 text-[10px] uppercase tracking-widest mt-4 transition-colors font-bold"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-center">
                    <div className="flex items-center border border-brand-beige dark:border-white/10 rounded-luxury px-2 bg-white dark:bg-[#1A1A1A]">
                      <button 
                        onClick={() => updateQuantity(item._id, item.qty - 1)}
                        disabled={item.qty <= 1}
                        className="p-2 text-brand-charcoal/40 dark:text-white/40 hover:text-brand-gold disabled:opacity-30 transition-colors"
                      ><Minus size={14} /></button>
                      <span className="w-8 text-center font-bold text-brand-charcoal dark:text-white">{item.qty}</span>
                      <button 
                         onClick={() => updateQuantity(item._id, item.qty + 1)}
                         className="p-2 text-brand-charcoal/40 dark:text-white/40 hover:text-brand-gold transition-colors"
                      ><Plus size={14} /></button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="text-right">
                     <span className="text-xl font-bold text-brand-charcoal dark:text-white">₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to="/shop" className="flex items-center gap-2 text-brand-gold hover:text-brand-charcoal transition-colors text-xs uppercase tracking-widest mt-8 font-bold">
              <ChevronLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#1A1A1A] border border-brand-beige dark:border-white/10 rounded-luxury p-8 shadow-sm flex flex-col gap-8 sticky top-32 transition-colors duration-300">
              <h3 className="font-serif text-2xl text-brand-charcoal dark:text-white">Order Summary</h3>
              
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-brand-charcoal/40 dark:text-white/40">Subtotal ({cartCount} items)</span>
                  <span className="font-bold text-brand-charcoal dark:text-white">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-charcoal/40 dark:text-white/40">Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest">Free</span>
                </div>
                <div className="h-[1px] bg-brand-beige dark:bg-white/10 my-2" />
                <div className="flex justify-between text-xl font-bold">
                  <span className="font-serif text-brand-charcoal dark:text-white">Total</span>
                  <span className="text-brand-gold">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => navigate('/checkout')}
                  className="btn-luxury-filled flex items-center justify-center gap-3 py-4 w-full"
                >
                  Secure Checkout <ArrowRight size={18} />
                </button>
                <div className="flex flex-col gap-2 items-center text-[9px] text-brand-charcoal/40 dark:text-white/40 uppercase tracking-widest mt-4 font-bold text-center">
                   <span>Secure Encrypted Payments</span>
                   <span>Razorpay • Stripe • Cards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
