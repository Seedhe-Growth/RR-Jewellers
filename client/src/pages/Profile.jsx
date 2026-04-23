import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Package, User as UserIcon, LogOut, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data.data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="bg-[#FFFDFB] min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-luxury shadow-sm border border-brand-beige sticky top-32">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 bg-brand-beige rounded-full flex items-center justify-center text-brand-gold mb-4">
                  <UserIcon size={32} />
                </div>
                <h2 className="text-xl font-serif text-brand-charcoal">{user?.name}</h2>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{user?.email}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button className="flex items-center justify-between p-4 rounded-luxury bg-brand-beige/50 text-brand-gold font-bold text-[10px] uppercase tracking-widest">
                  <span className="flex items-center gap-3"><Package size={16} /> Order History</span>
                  <ChevronRight size={14} />
                </button>
                <button 
                  onClick={logout}
                  className="flex items-center justify-between p-4 rounded-luxury text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all font-bold text-[10px] uppercase tracking-widest mt-4"
                >
                  <span className="flex items-center gap-3"><LogOut size={16} /> Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-serif text-brand-charcoal mb-8 uppercase tracking-widest">Order History</h2>
            
            {loading ? (
              <div className="flex flex-col gap-4">
                {[1, 2].map(i => <div key={i} className="h-32 bg-brand-beige/20 animate-pulse rounded-luxury" />)}
              </div>
            ) : orders.length > 0 ? (
              <div className="flex flex-col gap-6">
                {orders.map((order) => (
                  <motion.div 
                    key={order._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-luxury border border-brand-beige shadow-sm"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-6 border-b border-brand-beige">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Order ID</p>
                        <p className="text-xs font-bold text-brand-charcoal">#{order._id.substring(order._id.length - 8)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Date</p>
                        <p className="text-xs font-bold text-brand-charcoal">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Status</p>
                        <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-600' : 'bg-brand-beige text-brand-gold'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Total</p>
                        <p className="text-sm font-bold text-brand-gold">₹{order.totalPrice.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {order.orderItems.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center shrink-0 bg-brand-beige/10 p-2 rounded-luxury border border-brand-beige/30">
                          <div className="w-12 h-16 rounded-luxury overflow-hidden bg-brand-beige/20">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-brand-charcoal max-w-[120px] truncate">{item.title}</p>
                            <p className="text-[9px] text-gray-400">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-20 rounded-luxury border border-dashed border-brand-beige flex flex-col items-center text-center">
                <ShoppingBag size={48} className="text-gray-200 mb-6" />
                <h3 className="text-lg font-serif text-gray-400 italic mb-4">You haven't placed any orders yet.</h3>
                <button onClick={() => navigate('/shop')} className="text-brand-gold uppercase text-[10px] tracking-widest font-bold hover:underline">Start Shopping</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
