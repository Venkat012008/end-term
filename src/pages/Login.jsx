import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to login with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 shadow-xl shadow-surface-200/50 sm:p-10"
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-lg font-bold text-white shadow-lg">
            AI
          </div>
          <h2 className="mt-6 text-3xl font-bold text-surface-800">Welcome Back</h2>
          <p className="mt-2 text-surface-700/60">Sign in to continue your progress.</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-surface-200 bg-white py-3 text-sm font-semibold text-surface-700 shadow-sm transition-all hover:bg-surface-50 hover:shadow-md active:scale-[0.98] disabled:opacity-70"
        >
          <FcGoogle className="h-5 w-5" />
          Continue with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-surface-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-surface-700/50 font-medium">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-surface-700">Email Address</label>
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-700/40" />
              <input
                {...register('email')}
                type="email"
                placeholder="name@example.com"
                className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm outline-none transition-all focus:ring-4 ${
                  errors.email
                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100'
                    : 'border-surface-200 bg-white focus:border-primary-400 focus:ring-primary-100'
                }`}
              />
            </div>
            {errors.email && <p className="text-xs font-medium text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-surface-700">Password</label>
              <Link to="/forgot-password" size="sm" className="text-xs font-medium text-primary-600 hover:text-primary-700">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <MdLock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-700/40" />
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full rounded-xl border py-3 pl-10 pr-12 text-sm outline-none transition-all focus:ring-4 ${
                  errors.password
                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100'
                    : 'border-surface-200 bg-white focus:border-primary-400 focus:ring-primary-100'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-700/40 hover:text-surface-700"
              >
                {showPassword ? <MdVisibilityOff className="h-5 w-5" /> : <MdVisibility className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-xs font-medium text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl disabled:opacity-70 active:scale-[0.98]"
          >
            {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-surface-700/60">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-700">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
