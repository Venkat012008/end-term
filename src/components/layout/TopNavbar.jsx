import { memo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdMenu, MdSearch, MdNotificationsNone, MdPerson, MdLogout } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ROUTE_TITLES = {
  '/dashboard': 'Dashboard',
  '/subjects': 'Subjects',
  '/tasks': 'Tasks',
  '/revision': 'Revision',
  '/ai-tools': 'AI Tools',
  '/login': 'Login',
};

function TopNavbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const title = ROUTE_TITLES[pathname] || 'AI Study';

  const handleLogout = async () => {
    try {
      await logout();
      toast.info('Logged out');
      navigate('/login');
    } catch {
      toast.error('Failed to log out');
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-surface-200 bg-white/80 px-4 glass sm:px-6">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-surface-700 transition-colors hover:bg-surface-100 lg:hidden"
          aria-label="Toggle menu"
        >
          <MdMenu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-surface-800 sm:text-xl">
          {title}
        </h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Search */}
        <button
          className="hidden items-center gap-2 rounded-lg border border-surface-200 bg-surface-50 px-3 py-1.5 text-sm text-surface-700/60 transition-colors hover:border-primary-300 hover:text-primary-600 sm:flex"
          aria-label="Search"
        >
          <MdSearch className="h-4 w-4" />
          <span>Search…</span>
          <kbd className="ml-4 rounded bg-surface-200 px-1.5 py-0.5 text-xs font-medium text-surface-700/60">
            ⌘K
          </kbd>
        </button>

        {/* Mobile search */}
        <button
          className="rounded-lg p-2 text-surface-700 transition-colors hover:bg-surface-100 sm:hidden"
          aria-label="Search"
        >
          <MdSearch className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 text-surface-700 transition-colors hover:bg-surface-100"
          aria-label="Notifications"
        >
          <MdNotificationsNone className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white" />
        </button>

        {/* Profile / Logout */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-xs font-semibold text-white ring-2 ring-primary-200 transition-shadow hover:ring-4"
            aria-label="Profile"
          >
            {currentUser?.photoURL ? (
              <img src={currentUser.photoURL} alt="" className="h-full w-full rounded-full object-cover" />
            ) : (
              <MdPerson className="h-5 w-5" />
            )}
          </button>

          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-surface-200 bg-white p-2 shadow-xl ring-1 ring-black/5 glass z-40">
                <div className="px-3 py-2">
                  <p className="text-xs font-medium text-surface-700/50 uppercase tracking-wider">User</p>
                  <p className="truncate text-sm font-semibold text-surface-800">
                    {currentUser?.displayName || currentUser?.email || 'Student'}
                  </p>
                </div>
                <div className="my-1 h-px bg-surface-100" />
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <MdLogout className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default memo(TopNavbar);
