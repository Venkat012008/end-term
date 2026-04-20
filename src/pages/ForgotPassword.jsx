import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { MdEmail, MdArrowBack } from 'react-icons/md';
import { motion } from 'framer-motion';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

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
      await resetPassword(data.email);
      toast.success('Check your inbox for further instructions');
    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
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
          <Link to="/login" className="inline-flex items-center gap-1 text-sm font-medium text-surface-700/60 hover:text-primary-600 transition-colors mb-6">
            <MdArrowBack className="h-4 w-4" />
            Back to Login
          </Link>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-lg font-bold text-white shadow-lg">
            AI
          </div>
          <h2 className="mt-6 text-3xl font-bold text-surface-800">Reset Password</h2>
          <p className="mt-2 text-surface-700/60">Enter your email and we'll send you a link to reset your password.</p>
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

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl disabled:opacity-70 active:scale-[0.98]"
          >
            {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : 'Send Reset Link'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
