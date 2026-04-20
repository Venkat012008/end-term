import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserProfile(profile) {
    return updateProfile(auth.currentUser, profile);
  }

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    loginWithGoogle,
    resetPassword,
    updateUserProfile,
    isAuthReady: !!auth
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex min-h-screen items-center justify-center bg-surface-50">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-100 border-t-primary-600" />
        </div>
      ) : (
        !auth ? (
          <div className="flex min-h-screen items-center justify-center bg-surface-50 p-6 text-center">
            <div className="max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-xl">
              <h2 className="text-xl font-bold text-red-600">Firebase Configuration Error</h2>
              <p className="text-surface-700/60">
                Firebase failed to initialize. Please check your <code className="bg-surface-100 px-1 rounded">.env</code> file credentials and restart the dev server.
              </p>
            </div>
          </div>
        ) : children
      )}
    </AuthContext.Provider>
  );
}
