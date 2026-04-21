import { useState } from 'react';
import { 
  BarChart3, Box, ShoppingCart, Users, MessageSquare, 
  Settings, LogOut, Plus, Search, Filter, MoreVertical, ExternalLink 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Revenue', value: '₹12,45,000', icon: BarChart3, color: 'text-green-500' },
    { label: 'Active Orders', value: '24', icon: ShoppingCart, color: 'text-primary' },
    { label: 'New Inquiries', value: '08', icon: MessageSquare, color: 'text-blue-500' },
    { label: 'Total Products', value: '142', icon: Box, color: 'text-purple-500' },
  ];

  const recentOrders = [
    { id: '#ORD-7721', customer: 'Priya Sharma', amount: '₹45,000', status: 'Processing' },
    { id: '#ORD-7720', customer: 'Amit Verma', amount: '₹12,500', status: 'Delivered' },
    { id: '#ORD-7719', customer: 'Sneha Kapur', amount: '₹98,000', status: 'Shipped' },
  ];

  return (
    <div className="flex min-h-screen bg-[#050505]">
      {/* Sidebar */}
      <div className="w-64 bg-luxury-black border-r border-white/5 flex flex-col pt-24">
        <div className="px-8 mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Admin Console</span>
        </div>
        
        <nav className="flex flex-col gap-2 px-4">
          {[
            { id: 'overview', label: 'Dashboard', icon: BarChart3 },
            { id: 'products', label: 'Products', icon: Box },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 px-4 py-3 rounded-none text-sm tracking-widest uppercase transition-all ${
                activeTab === item.id ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-8 border-t border-white/5">
          <button className="flex items-center gap-4 text-white/30 hover:text-red-500 transition-colors text-sm uppercase tracking-widest">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow pt-24 px-10 pb-10">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-serif gold-text">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            <p className="text-white/30 text-sm mt-1">Welcome back, Admin. Here's what's happening today.</p>
          </div>
          <div className="flex gap-4">
             <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                <Search size={14} /> Search
             </button>
             <button className="btn-premium-filled flex items-center gap-2 !py-2 !px-6">
                <Plus size={16} /> New Product
             </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-10"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="glass-card flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</span>
                    <stat.icon className={stat.color} size={20} />
                  </div>
                  <span className="text-3xl font-serif text-white">{stat.value}</span>
                  <div className="flex items-center gap-2 text-[10px] text-green-500">
                    <span>+12%</span>
                    <span className="text-white/20 uppercase tracking-widest">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders table */}
            <div className="glass-card">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                <h3 className="font-serif text-xl uppercase tracking-widest">Recent Orders</h3>
                 <button className="text-[10px] uppercase tracking-widest text-primary hover:underline flex items-center gap-2">
                   View All <ExternalLink size={12} />
                 </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5">
                      <th className="pb-4 font-normal">Order ID</th>
                      <th className="pb-4 font-normal">Customer</th>
                      <th className="pb-4 font-normal">Amount</th>
                      <th className="pb-4 font-normal">Status</th>
                      <th className="pb-4 font-normal text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {recentOrders.map((order, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/3 transition-colors group">
                        <td className="py-4 font-bold text-white/80">{order.id}</td>
                        <td className="py-4 text-white/60">{order.customer}</td>
                        <td className="py-4 text-primary font-bold">{order.amount}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 text-[10px] uppercase tracking-widest rounded-none border ${
                            order.status === 'Delivered' ? 'border-green-500/30 text-green-500 bg-green-500/5' :
                            order.status === 'Processing' ? 'border-primary/30 text-primary bg-primary/5' :
                            'border-blue-500/30 text-blue-500 bg-blue-500/5'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button className="text-white/20 hover:text-white transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
