import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { MdMenu, MdSearch, MdNotificationsNone, MdPerson } from 'react-icons/md';

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
  const title = ROUTE_TITLES[pathname] || 'AI Study';

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

        {/* Avatar */}
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-xs font-semibold text-white ring-2 ring-primary-200 transition-shadow hover:ring-4"
          aria-label="Profile"
        >
          <MdPerson className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}

export default memo(TopNavbar);
