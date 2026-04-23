import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Package, ShoppingBag, Users, DollarSign, Plus, Edit, Trash2, Check, X, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [view, setView] = useState('overview');
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, users: 0 });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const prodRes = await api.get('/products');
        const orderRes = await api.get('/orders');
        
        setProducts(prodRes.data.data.products);
        setOrders(orderRes.data.data.orders);
        
        const totalRevenue = orderRes.data.data.orders.reduce((acc, order) => acc + order.totalPrice, 0);
        
        setStats({
          products: prodRes.data.results,
          orders: orderRes.data.results,
          revenue: totalRevenue,
          users: 0 // Fetch users count if needed
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
        toast.success('Product deleted');
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await api.patch(`/orders/${id}`, { status });
      setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
      toast.success('Order status updated');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="bg-[#F8F5F2] min-h-screen flex">
      {/* Admin Sidebar */}
      <div className="w-64 bg-brand-charcoal text-white flex flex-col p-6 fixed h-full">
        <h1 className="text-2xl font-serif font-bold mb-10 tracking-widest">ADMIN<span className="text-brand-gold">.</span></h1>
        
        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setView('overview')}
            className={`flex items-center gap-3 p-4 rounded-luxury text-xs uppercase tracking-widest font-bold transition-all ${view === 'overview' ? 'bg-brand-gold text-white' : 'hover:bg-white/5 text-gray-400'}`}
          >
            <LayoutDashboard size={18} /> Overview
          </button>
          <button 
            onClick={() => setView('products')}
            className={`flex items-center gap-3 p-4 rounded-luxury text-xs uppercase tracking-widest font-bold transition-all ${view === 'products' ? 'bg-brand-gold text-white' : 'hover:bg-white/5 text-gray-400'}`}
          >
            <Package size={18} /> Products
          </button>
          <button 
            onClick={() => setView('orders')}
            className={`flex items-center gap-3 p-4 rounded-luxury text-xs uppercase tracking-widest font-bold transition-all ${view === 'orders' ? 'bg-brand-gold text-white' : 'hover:bg-white/5 text-gray-400'}`}
          >
            <ShoppingBag size={18} /> Orders
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <button onClick={() => window.location.href = '/'} className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-brand-gold transition-colors">
            Back to Site
          </button>
        </div>
      </div>

      {/* Main Admin Content */}
      <div className="flex-grow ml-64 p-10">
        {view === 'overview' && (
          <div>
            <h2 className="text-3xl font-serif text-brand-charcoal mb-10">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-6 rounded-luxury shadow-sm border border-brand-beige">
                <DollarSign className="text-brand-gold mb-4" size={24} />
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Total Revenue</p>
                <h3 className="text-2xl font-bold text-brand-charcoal">₹{stats.revenue.toLocaleString()}</h3>
              </div>
              <div className="bg-white p-6 rounded-luxury shadow-sm border border-brand-beige">
                <ShoppingBag className="text-brand-gold mb-4" size={24} />
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Orders</p>
                <h3 className="text-2xl font-bold text-brand-charcoal">{stats.orders}</h3>
              </div>
              <div className="bg-white p-6 rounded-luxury shadow-sm border border-brand-beige">
                <Package className="text-brand-gold mb-4" size={24} />
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Products</p>
                <h3 className="text-2xl font-bold text-brand-charcoal">{stats.products}</h3>
              </div>
              <div className="bg-white p-6 rounded-luxury shadow-sm border border-brand-beige">
                <Users className="text-brand-gold mb-4" size={24} />
                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Customers</p>
                <h3 className="text-2xl font-bold text-brand-charcoal">{stats.users}</h3>
              </div>
            </div>

            <h3 className="text-xl font-serif text-brand-charcoal mb-6">Recent Orders</h3>
            <div className="bg-white rounded-luxury shadow-sm border border-brand-beige overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-brand-beige/30 text-[10px] uppercase tracking-widest font-bold text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-beige">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order._id} className="text-xs text-brand-charcoal">
                      <td className="px-6 py-4 font-bold">#{order._id.substring(order._id.length - 8)}</td>
                      <td className="px-6 py-4">{order.user?.name || 'Guest'}</td>
                      <td className="px-6 py-4 font-bold">₹{order.totalPrice.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[8px] uppercase tracking-tighter font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-brand-beige text-brand-gold'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-serif text-brand-charcoal">Product Management</h2>
              <button className="btn-luxury-filled flex items-center gap-2"><Plus size={16} /> Add Product</button>
            </div>
            
            <div className="bg-white rounded-luxury shadow-sm border border-brand-beige overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-brand-beige/30 text-[10px] uppercase tracking-widest font-bold text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-beige">
                  {products.map((product) => (
                    <tr key={product._id} className="text-xs text-brand-charcoal">
                      <td className="px-6 py-4 flex items-center gap-4">
                        <img src={product.image || product.images[0]?.url} className="w-10 h-12 object-cover rounded-md" />
                        <span className="font-bold">{product.title}</span>
                      </td>
                      <td className="px-6 py-4 uppercase tracking-widest text-[10px]">{product.category?.name || 'Misc'}</td>
                      <td className="px-6 py-4 font-bold text-brand-gold">₹{product.price}</td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"><Edit size={16} /></button>
                        <button onClick={() => handleDeleteProduct(product._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'orders' && (
          <div>
            <h2 className="text-3xl font-serif text-brand-charcoal mb-10">Order Management</h2>
            <div className="bg-white rounded-luxury shadow-sm border border-brand-beige overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-brand-beige/30 text-[10px] uppercase tracking-widest font-bold text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-beige">
                  {orders.map((order) => (
                    <tr key={order._id} className="text-xs text-brand-charcoal">
                      <td className="px-6 py-4 font-bold">#{order._id.substring(order._id.length - 8)}</td>
                      <td className="px-6 py-4">{order.user?.name}</td>
                      <td className="px-6 py-4 font-bold">₹{order.totalPrice.toLocaleString()}</td>
                      <td className="px-6 py-4">
                         <select 
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          className="bg-brand-beige/20 text-[9px] uppercase tracking-widest font-bold p-1 rounded-md outline-none border-none"
                         >
                           {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                         </select>
                      </td>
                      <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                         <button className="text-brand-gold hover:underline text-[10px] font-bold uppercase tracking-widest">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
