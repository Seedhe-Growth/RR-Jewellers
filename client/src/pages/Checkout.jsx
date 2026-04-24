import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, CreditCard, Truck, MapPin, Search, Loader2 } from 'lucide-react';
import { Country, State, City } from 'country-state-city';
import AddressMap from '../components/checkout/AddressMap';

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
    countryCode: 'IN',
    stateCode: '',
    taluka: '',
    paymentMethod: 'Cash on Delivery'
  });

  // Pre-fill address if user has saved addresses
  useEffect(() => {
    if (user && user.addresses && user.addresses.length > 0) {
      const defaultAddr = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
      setFormData(prev => ({
        ...prev,
        street: defaultAddr.street || '',
        city: defaultAddr.city || '',
        state: defaultAddr.state || '',
        zipCode: defaultAddr.zipCode || '',
        country: defaultAddr.country || 'India',
      }));
    }
  }, [user]);

  const [loadingPincode, setLoadingPincode] = useState(false);
  const countries = Country.getAllCountries();
  const states = formData.countryCode ? State.getStatesOfCountry(formData.countryCode) : [];
  const cities = (formData.countryCode && formData.stateCode) ? City.getCitiesOfState(formData.countryCode, formData.stateCode) : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'country') {
      const countryObj = countries.find(c => c.name === value);
      setFormData({ 
        ...formData, 
        country: value, 
        countryCode: countryObj?.isoCode || '',
        state: '',
        stateCode: '',
        city: ''
      });
    } else if (name === 'state') {
      const stateObj = states.find(s => s.name === value);
      setFormData({ 
        ...formData, 
        state: value, 
        stateCode: stateObj?.isoCode || '',
        city: ''
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Zip Code Lookup Logic (Targets India specifically for Taluka as per user request)
  useEffect(() => {
    const lookupPincode = async () => {
      if (formData.zipCode.length === 6 && formData.countryCode === 'IN') {
        setLoadingPincode(true);
        try {
          const res = await fetch(`https://api.postalpincode.in/pincode/${formData.zipCode}`);
          const data = await res.json();
          
          if (data[0].Status === 'Success') {
            const details = data[0].PostOffice[0];
            setFormData(prev => ({
              ...prev,
              taluka: details.Taluka || details.Block || details.Name,
              city: details.District,
              state: details.State,
              // Update codes for cascading logic
              stateCode: states.find(s => s.name === details.State)?.isoCode || prev.stateCode
            }));
            toast.success(`Found location: ${details.Name}`);
          }
        } catch (err) {
          console.error('Pincode lookup failed', err);
        } finally {
          setLoadingPincode(false);
        }
      }
    };
    lookupPincode();
  }, [formData.zipCode]);

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
          country: formData.country,
          taluka: formData.taluka
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
      navigate(`/profile`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FFFDFB] dark:bg-[#0A0A0A] min-h-screen pt-40 pb-20 text-center transition-colors duration-300">
        <h2 className="text-3xl font-serif mb-6 text-brand-charcoal dark:text-white">Your bag is empty</h2>
        <button onClick={() => navigate('/shop')} className="btn-luxury-filled">Go Shopping</button>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDFB] dark:bg-[#0A0A0A] min-h-screen pt-32 pb-24 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Final Step</span>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-charcoal dark:text-white">
            Secure <span className="italic">Checkout</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Shipping Form */}
          <div className="bg-white dark:bg-[#1A1A1A] p-10 rounded-luxury shadow-sm border border-brand-beige dark:border-white/10 transition-colors duration-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-brand-beige/50 dark:bg-white/[0.05] rounded-full flex items-center justify-center text-brand-gold">
                <MapPin size={20} />
              </div>
              <h2 className="text-xl font-serif text-brand-charcoal dark:text-white">Shipping Address</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-charcoal/40 dark:text-white/40">Street Address</label>
                <input 
                  name="street"
                  required
                  placeholder="Apartment, suite, unit, building, floor, etc."
                  className="input-luxury"
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-charcoal/40 dark:text-white/40">Zip Code</label>
                <div className="relative">
                  <input 
                    name="zipCode"
                    required
                    placeholder="400001"
                    className="input-luxury pr-10"
                    value={formData.zipCode}
                    onChange={handleChange}
                    maxLength={6}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {loadingPincode ? (
                      <Loader2 size={16} className="text-brand-gold animate-spin" />
                    ) : (
                      <Search size={16} className="text-brand-charcoal/20 dark:text-white/20" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-charcoal/40 dark:text-white/40">Taluka / Locality</label>
                <input 
                  name="taluka"
                  placeholder="Area / Sub-district"
                  className="input-luxury dark:bg-white/[0.02]"
                  value={formData.taluka}
                  onChange={handleChange}
                  readOnly={formData.countryCode === 'IN' && formData.taluka !== ''}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-charcoal/40 dark:text-white/40">Country</label>
                <select 
                  name="country"
                  required
                  className="input-luxury appearance-none"
                  value={formData.country}
                  onChange={handleChange}
                >
                  {countries.map(c => (
                    <option key={c.isoCode} value={c.name} className="dark:bg-[#1A1A1A]">{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-charcoal/40 dark:text-white/40">State</label>
                <select 
                  name="state"
                  required
                  className="input-luxury appearance-none"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={states.length === 0}
                >
                  <option value="" className="dark:bg-[#1A1A1A]">Select State</option>
                  {states.map(s => (
                    <option key={s.isoCode} value={s.name} className="dark:bg-[#1A1A1A]">{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-charcoal/40 dark:text-white/40">City</label>
                <select 
                  name="city"
                  required
                  className="input-luxury appearance-none"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={cities.length === 0 && formData.city === ''}
                >
                  <option value="" className="dark:bg-[#1A1A1A]">Select City</option>
                  {cities.map(c => (
                    <option key={c.name} value={c.name} className="dark:bg-[#1A1A1A]">{c.name}</option>
                  ))}
                  {formData.city && !cities.find(c => c.name === formData.city) && (
                    <option value={formData.city} className="dark:bg-[#1A1A1A]">{formData.city}</option>
                  )}
                </select>
              </div>

              <div className="md:col-span-2">
                <AnimatePresence>
                  {formData.street && formData.city && (
                    <AddressMap 
                      street={formData.street} 
                      city={formData.city} 
                      state={formData.state} 
                      zipCode={formData.zipCode} 
                      country={formData.country} 
                    />
                  )}
                </AnimatePresence>
              </div>

              <div className="md:col-span-2 pt-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-brand-beige/50 dark:bg-white/[0.05] rounded-full flex items-center justify-center text-brand-gold">
                    <CreditCard size={20} />
                  </div>
                  <h2 className="text-xl font-serif text-brand-charcoal dark:text-white">Payment Method</h2>
                </div>
                
                <div className="flex flex-col gap-4">
                  {['Cash on Delivery', 'Stripe', 'Razorpay'].map(method => (
                    <label key={method} className={`flex items-center justify-between p-4 rounded-luxury border cursor-pointer transition-all ${formData.paymentMethod === method ? 'border-brand-gold bg-brand-beige/10 dark:bg-white/[0.05]' : 'border-brand-beige dark:border-white/10'}`}>
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value={method} 
                          checked={formData.paymentMethod === method}
                          onChange={handleChange}
                          className="accent-brand-gold"
                        />
                        <span className="text-sm font-bold text-brand-charcoal dark:text-white uppercase tracking-widest">{method}</span>
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
            <h2 className="text-xl font-serif text-brand-charcoal dark:text-white mb-8 uppercase tracking-widest">Order Summary</h2>
            <div className="flex flex-col gap-6 mb-10">
              {cartItems.map((item) => (
                <div key={item._id} className="flex gap-4 items-center">
                  <div className="w-16 h-20 rounded-luxury overflow-hidden bg-brand-beige/20 dark:bg-white/[0.05] shrink-0">
                    <img src={item.image || item.images[0]?.url} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-brand-charcoal dark:text-white leading-tight">{item.title}</h4>
                    <p className="text-[10px] text-brand-charcoal/40 dark:text-white/40 font-bold uppercase tracking-widest">Qty: {item.qty}</p>
                  </div>
                  <span className="text-sm font-bold text-brand-gold">₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-beige dark:border-white/10 pt-6 flex flex-col gap-4">
              <div className="flex justify-between text-sm">
                <span className="text-brand-charcoal/40 dark:text-white/40">Subtotal</span>
                <span className="font-bold text-brand-charcoal dark:text-white">₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-charcoal/40 dark:text-white/40">Shipping</span>
                <span className="text-green-600 font-bold">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-brand-beige dark:border-white/10 pt-4">
                <span className="font-serif text-brand-charcoal dark:text-white">Total</span>
                <span className="text-brand-gold">₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-10 p-6 bg-brand-beige/20 dark:bg-white/[0.02] rounded-luxury transition-colors duration-300">
              <div className="flex items-center gap-3 text-brand-gold mb-2">
                <Truck size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Fast Delivery</span>
              </div>
              <p className="text-[10px] text-brand-charcoal/40 dark:text-white/40 leading-relaxed">
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
