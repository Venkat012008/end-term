import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StudyProvider } from './context/StudyContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';

// Lazy load pages for performance
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Subjects = lazy(() => import('./pages/Subjects'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Revision = lazy(() => import('./pages/Revision'));
const AITools = lazy(() => import('./pages/AITools'));
const Notes = lazy(() => import('./pages/Notes'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex h-[80vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-100 border-t-primary-600" />
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <StudyProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Auth routes — no sidebar/navbar */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected routes — wrapped in Layout and ProtectedRoute */}
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/revision" element={<Revision />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/database" element={<Notes />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </StudyProvider>
    </AuthProvider>
  );
}
