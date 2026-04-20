import { useState, useCallback, memo } from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdDashboard,
  MdMenuBook,
  MdAssignment,
  MdReplay,
  MdAutoAwesome,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: MdDashboard },
  { to: '/subjects', label: 'Subjects', icon: MdMenuBook },
  { to: '/tasks', label: 'Tasks', icon: MdAssignment },
  { to: '/revision', label: 'Revision', icon: MdReplay },
  { to: '/ai-tools', label: 'AI Tools', icon: MdAutoAwesome },
];

const NavItem = memo(function NavItem({ to, label, icon: Icon, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
            : 'text-surface-200/70 hover:bg-white/8 hover:text-white'
        } ${collapsed ? 'justify-center' : ''}`
      }
      title={collapsed ? label : undefined}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  );
});

function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col border-r border-white/10 bg-surface-900 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Logo area */}
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-sm font-bold text-white shadow-lg">
          AI
        </div>
        {!collapsed && (
          <span className="text-lg font-semibold tracking-tight text-white">
            AI Study
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.to} {...item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-lg py-2 text-surface-200/50 transition-colors hover:bg-white/8 hover:text-white"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <MdChevronRight className="h-5 w-5" />
          ) : (
            <MdChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  );
}

export default memo(Sidebar);
