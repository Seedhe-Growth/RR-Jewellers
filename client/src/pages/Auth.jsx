import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const Auth = ({ isRegister = false }) => {
  const [isLoginMode, setIsLoginMode] = useState(!isRegister);
  const [showPassword, setShowPassword] = useState(false);
  const { login, register: registerUser, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoginMode(!isRegister);
  }, [isRegister]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(isLoginMode ? loginSchema : registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      if (isLoginMode) {
        await login(data.email, data.password);
        toast.success('Welcome back to Saira Ornaments!');
      } else {
        await registerUser(data);
        toast.success('Account created successfully! Welcome.');
      }
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="bg-[#FFFDFB] min-h-screen pt-32 pb-24 px-6 flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10 bg-white p-10 rounded-luxury shadow-xl border border-brand-beige relative"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <h1 className="text-3xl font-serif text-brand-charcoal mb-2">
            {isLoginMode ? 'Welcome Back' : 'Join the Elegance'}
          </h1>
          <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">
            {isLoginMode ? 'Sign in to your account' : 'Create an account to start shopping'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <AnimatePresence mode="wait">
            {!isLoginMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      {...register('name')}
                      placeholder="Jane Doe"
                      className="input-luxury w-full pl-12"
                    />
                  </div>
                  {errors.name && <span className="text-[9px] text-red-500 uppercase tracking-widest mt-1">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      {...register('phone')}
                      placeholder="+91 9123456789"
                      className="input-luxury w-full pl-12"
                    />
                  </div>
                  {errors.phone && <span className="text-[9px] text-red-500 uppercase tracking-widest mt-1">{errors.phone.message}</span>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                {...register('email')}
                placeholder="jane@example.com"
                className="input-luxury w-full pl-12"
              />
            </div>
            {errors.email && <span className="text-[9px] text-red-500 uppercase tracking-widest mt-1">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input-luxury w-full pl-12 pr-10"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-gold transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="text-[9px] text-red-500 uppercase tracking-widest mt-1">{errors.password.message}</span>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-luxury-filled w-full mt-4 flex items-center justify-center gap-3 py-4"
          >
            {isSubmitting ? 'Processing...' : isLoginMode ? 'Sign In' : 'Create Account'}
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-brand-beige flex flex-col items-center gap-4 text-center">
          <p className="text-gray-400 text-xs italic">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button 
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-brand-gold uppercase tracking-widest text-[10px] font-bold hover:underline"
          >
            {isLoginMode ? 'Create Account' : 'Login Instead'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
