import { MdSearch, MdFilterList, MdSort } from 'react-icons/md';

export default function SearchFilterBar({ 
  search, 
  setSearch, 
  filters, 
  setFilters, 
  subjects = [],
  sort,
  setSort 
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-surface-200 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <MdSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-700/40" />
        <input
          type="text"
          placeholder="Search tasks or topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-surface-100 bg-surface-50 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Subject Filter */}
        <div className="relative">
          <select
            value={filters.subjectId || ''}
            onChange={(e) => setFilters({ ...filters, subjectId: e.target.value })}
            className="appearance-none rounded-xl border border-surface-100 bg-surface-50 py-2.5 pl-3 pr-8 text-xs font-semibold text-surface-700 outline-none transition-all hover:bg-surface-100 focus:border-primary-400"
          >
            <option value="">All Subjects</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <MdFilterList className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-700/40" />
        </div>

        {/* Priority Filter */}
        <div className="relative">
          <select
            value={filters.priority || ''}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="appearance-none rounded-xl border border-surface-100 bg-surface-50 py-2.5 pl-3 pr-8 text-xs font-semibold text-surface-700 outline-none transition-all hover:bg-surface-100 focus:border-primary-400"
          >
            <option value="">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <MdFilterList className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-700/40" />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none rounded-xl border border-surface-100 bg-surface-50 py-2.5 pl-3 pr-8 text-xs font-semibold text-surface-700 outline-none transition-all hover:bg-surface-100 focus:border-primary-400"
          >
            <option value="date_asc">Oldest First</option>
            <option value="date_desc">Soonest First</option>
            <option value="priority_desc">Priority (High-Low)</option>
          </select>
          <MdSort className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-700/40" />
        </div>
      </div>
    </div>
  );
}
