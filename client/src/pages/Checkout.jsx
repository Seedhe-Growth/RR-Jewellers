import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import { motion } from 'framer-motion';
import { CheckCircle, CreditCard, Truck, MapPin } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    paymentMethod: 'Cash on Delivery'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          title: item.title,
          quantity: item.qty,
          image: item.image || item.images[0]?.url,
          price: item.price,
          product: item._id
        })),
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod,
        itemsPrice: cartTotal,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: cartTotal
      };

      const { data } = await api.post('/orders', orderData);
      toast.success('Order placed successfully!');
      clearCart();
      navigate(`/profile`); // Or to an order confirmation page
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-3xl font-serif mb-6 text-brand-charcoal">Your bag is empty</h2>
        <button onClick={() => navigate('/shop')} className="btn-luxury-filled">Go Shopping</button>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDFB] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Final Step</span>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-charcoal">
            Secure <span className="italic">Checkout</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Shipping Form */}
          <div className="bg-white p-10 rounded-luxury shadow-sm border border-brand-beige">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-brand-beige/50 rounded-full flex items-center justify-center text-brand-gold">
                <MapPin size={20} />
              </div>
              <h2 className="text-xl font-serif text-brand-charcoal">Shipping Address</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Street Address</label>
                <input 
                  name="street"
                  required
                  placeholder="123 Luxury Lane"
                  className="input-luxury"
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">City</label>
                <input 
                  name="city"
                  required
                  placeholder="Mumbai"
                  className="input-luxury"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">State</label>
                <input 
                  name="state"
                  required
                  placeholder="Maharashtra"
                  className="input-luxury"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Zip Code</label>
                <input 
                  name="zipCode"
                  required
                  placeholder="400001"
                  className="input-luxury"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Country</label>
                <input 
                  name="country"
                  required
                  placeholder="India"
                  className="input-luxury"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2 pt-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-brand-beige/50 rounded-full flex items-center justify-center text-brand-gold">
                    <CreditCard size={20} />
                  </div>
                  <h2 className="text-xl font-serif text-brand-charcoal">Payment Method</h2>
                </div>
                
                <div className="flex flex-col gap-4">
                  {['Cash on Delivery', 'Stripe', 'Razorpay'].map(method => (
                    <label key={method} className={`flex items-center justify-between p-4 rounded-luxury border cursor-pointer transition-all ${formData.paymentMethod === method ? 'border-brand-gold bg-brand-beige/10' : 'border-brand-beige'}`}>
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value={method} 
                          checked={formData.paymentMethod === method}
                          onChange={handleChange}
                          className="accent-brand-gold"
                        />
                        <span className="text-sm font-bold text-brand-charcoal uppercase tracking-widest">{method}</span>
                      </div>
                      {formData.paymentMethod === method && <CheckCircle size={16} className="text-brand-gold" />}
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 mt-8">
                <button type="submit" className="btn-luxury-filled w-full py-5 text-sm">
                  Complete Purchase • ₹{cartTotal.toLocaleString()}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-10">
            <h2 className="text-xl font-serif text-brand-charcoal mb-8 uppercase tracking-widest">Order Summary</h2>
            <div className="flex flex-col gap-6 mb-10">
              {cartItems.map((item) => (
                <div key={item._id} className="flex gap-4 items-center">
                  <div className="w-16 h-20 rounded-luxury overflow-hidden bg-brand-beige/20 shrink-0">
                    <img src={item.image || item.images[0]?.url} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-brand-charcoal leading-tight">{item.title}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Qty: {item.qty}</p>
                  </div>
                  <span className="text-sm font-bold text-brand-gold">₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-beige pt-6 flex flex-col gap-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-bold text-brand-charcoal">₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Shipping</span>
                <span className="text-green-600 font-bold">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-brand-beige pt-4">
                <span className="font-serif text-brand-charcoal">Total</span>
                <span className="text-brand-gold">₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-10 p-6 bg-brand-beige/20 rounded-luxury">
              <div className="flex items-center gap-3 text-brand-gold mb-2">
                <Truck size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Fast Delivery</span>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed">
                Your order will be processed within 24 hours. Free insured shipping across India. Estimated delivery 3-5 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
