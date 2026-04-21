import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCartStore();
  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="bg-luxury-black min-h-screen pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
          <ShoppingBag size={40} className="text-primary/30" />
        </div>
        <h1 className="text-3xl font-serif mb-4">Your Bag is Empty</h1>
        <p className="text-white/40 max-w-sm mb-12 italic">
          It seems you haven't added any masterpieces to your collection yet.
        </p>
        <Link to="/shop" className="btn-premium-filled">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-luxury-black min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif mb-16 text-center uppercase tracking-widest">
          Shopping <span className="gold-text italic">Bag</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main List */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="hidden md:grid grid-cols-4 pb-4 border-b border-white/5 text-[10px] uppercase tracking-widest text-white/30">
              <span className="col-span-2">Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Price</span>
            </div>
            {cart.map((item) => (
              <div key={item._id} className="grid grid-cols-1 md:grid-cols-4 items-center gap-6 pb-8 border-b border-white/5 group">
                {/* Product Detail */}
                <div className="col-span-2 flex gap-4 md:gap-8 items-center">
                  <div className="w-24 md:w-32 aspect-[4/5] bg-white/5 shrink-0 overflow-hidden">
                    <img src={item.images[0].url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-primary uppercase tracking-widest">{item.category.name}</span>
                    <Link to={`/product/${item._id}`} className="font-serif text-lg md:text-xl hover:text-primary transition-colors">{item.title}</Link>
                    <span className="text-white/30 text-xs italic">SKU: {item.sku}</span>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="flex items-center gap-2 text-red-500/50 hover:text-red-500 text-[10px] uppercase tracking-widest mt-4 transition-colors"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex justify-center">
                  <div className="flex items-center border border-white/10 bg-white/5 p-1">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >-</button>
                    <span className="w-8 flex justify-center font-bold">{item.quantity}</span>
                    <button 
                       onClick={() => updateQuantity(item._id, item.quantity + 1)}
                       className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >+</button>
                  </div>
                </div>

                {/* Total */}
                <div className="text-right flex md:flex-col justify-between md:justify-center items-center md:items-end">
                   <span className="md:hidden text-[10px] text-white/30 uppercase tracking-widest">Price</span>
                   <span className="text-xl font-bold text-primary">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            ))}

            <Link to="/shop" className="flex items-center gap-2 text-primary hover:text-white transition-colors text-xs uppercase tracking-widest mt-4">
              <ChevronLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/3 border border-white/5 p-8 flex flex-col gap-8 sticky top-32">
              <h3 className="font-serif text-2xl uppercase tracking-widest">Order Summary</h3>
              
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40">Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Tax (Estim.)</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="h-[1px] bg-white/5 my-2" />
                <div className="flex justify-between text-xl font-bold">
                  <span className="font-serif">Total</span>
                  <span className="text-primary">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Link to="/checkout" className="btn-premium-filled flex items-center justify-center gap-3 py-4 w-full">
                  Secure Checkout <ArrowRight size={18} />
                </Link>
                <div className="flex flex-col gap-2 items-center text-[10px] text-white/30 uppercase tracking-[0.2em] mt-4">
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
