import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdAutoAwesome } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // TODO: Firebase auth integration
      navigate('/dashboard');
    },
    [navigate]
  );

  const toggleMode = useCallback(() => {
    setIsSignUp((prev) => !prev);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Left panel — branding */}
      <div className="hidden flex-col justify-between bg-gradient-to-br from-primary-900 via-primary-800 to-surface-900 p-10 text-white lg:flex lg:w-1/2">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-sm font-bold backdrop-blur-sm">
              AI
            </div>
            <span className="text-xl font-semibold tracking-tight">AI Study</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-4xl leading-tight font-bold xl:text-5xl">
            Study smarter,
            <br />
            <span className="bg-gradient-to-r from-accent-400 to-primary-300 bg-clip-text text-transparent">
              not harder.
            </span>
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-primary-200">
            AI-powered study planner that adapts to your schedule, tracks your
            progress, and helps you ace every exam.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 pt-2">
            {['Smart Scheduling', 'Spaced Repetition', 'AI Insights', 'Exam Ready'].map(
              (feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-sm font-medium text-primary-100"
                >
                  {feature}
                </span>
              )
            )}
          </div>
        </motion.div>

        <p className="text-sm text-primary-300">© 2026 AI Study. All rights reserved.</p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center bg-surface-50 p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-sm font-bold text-white">
              AI
            </div>
            <span className="text-xl font-semibold text-surface-800">AI Study</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-surface-800 sm:text-3xl">
              {isSignUp ? 'Create account' : 'Welcome back'}
            </h2>
            <p className="mt-2 text-surface-700/60">
              {isSignUp
                ? 'Start your smart study journey today.'
                : 'Sign in to continue your study journey.'}
            </p>
          </div>

          {/* Google sign-in */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-surface-200 bg-white px-4 py-3 text-sm font-medium text-surface-700 shadow-sm transition-all hover:border-surface-700/30 hover:shadow-md active:scale-[0.98]"
          >
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-surface-200" />
            <span className="text-xs font-medium uppercase tracking-wider text-surface-700/40">
              or
            </span>
            <div className="h-px flex-1 bg-surface-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-surface-700">
                Email
              </label>
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-700/40" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-surface-200 bg-white py-3 pl-10 pr-4 text-sm text-surface-800 outline-none transition-all placeholder:text-surface-700/35 focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-surface-700">
                Password
              </label>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-700/40" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-surface-200 bg-white py-3 pl-10 pr-12 text-sm text-surface-800 outline-none transition-all placeholder:text-surface-700/35 focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-700/40 transition-colors hover:text-surface-700"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <MdVisibilityOff className="h-5 w-5" />
                  ) : (
                    <MdVisibility className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 active:scale-[0.98]"
            >
              <MdAutoAwesome className="h-4 w-4" />
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-center text-sm text-surface-700/60">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="font-semibold text-primary-600 hover:text-primary-700"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
