import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      // API call will go here
      console.log(data);
      toast.success(isLogin ? 'Welcome back to The Jewel Vault!' : 'Account created successfully!');
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <div className="bg-luxury-black min-h-screen pt-32 pb-24 px-6 flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg z-10 glass-card !p-12 relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary" />
        
        <div className="flex flex-col items-center mb-10 text-center">
          <h1 className="text-4xl font-serif uppercase tracking-widest mb-2">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h1>
          <p className="text-white/40 text-sm italic">
            {isLogin ? 'Access your exclusive collection vault.' : 'Join RR Jewellers for a premium experience.'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-6 overflow-hidden"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      {...register('name')}
                      placeholder="Enter your name"
                      className="input-luxury w-full pl-8"
                    />
                  </div>
                  {errors.name && <span className="text-[9px] text-red-500 uppercase tracking-widest mt-1">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary font-bold">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      {...register('phone')}
                      placeholder="e.g. +91 9123456789"
                      className="input-luxury w-full pl-8"
                    />
                  </div>
                  {errors.phone && <span className="text-[9px] text-red-500 uppercase tracking-widest mt-1">{errors.phone.message}</span>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-primary font-bold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                {...register('email')}
                placeholder="example@vault.com"
                className="input-luxury w-full pl-8"
              />
            </div>
            {errors.email && <span className="text-[9px] text-red-500 uppercase tracking-widest mt-1">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-primary font-bold">Password</label>
            <div className="relative">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input-luxury w-full pl-8 pr-10"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span className="text-[9px] text-red-500 uppercase tracking-widest mt-1">{errors.password.message}</span>}
          </div>

          {!isLogin && (
             <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-primary font-bold">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  {...register('confirmPassword')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input-luxury w-full pl-8"
                />
              </div>
              {errors.confirmPassword && <span className="text-[9px] text-red-500 uppercase tracking-widest mt-1">{errors.confirmPassword.message}</span>}
            </div>
          )}

          {isLogin && (
            <div className="flex justify-end">
              <button type="button" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-primary transition-colors">
                Forgot Password?
              </button>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-premium-filled mt-4 flex items-center justify-center gap-3 py-4"
          >
            {isSubmitting ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-white/40 text-xs italic">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary uppercase tracking-[0.2em] text-[10px] font-bold hover:underline"
          >
            {isLogin ? 'Register Now' : 'Identity Secured? Login'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
