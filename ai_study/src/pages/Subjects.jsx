import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAdd, MdSearch, MdMenuBook, MdMoreVert, MdClose } from 'react-icons/md';

const INITIAL_SUBJECTS = [
  { id: 1, name: 'Mathematics', chapters: 12, completed: 8, color: '#6366f1', examDate: '2026-05-15' },
  { id: 2, name: 'AI / Machine Learning', chapters: 10, completed: 6, color: '#14b8a6', examDate: '2026-05-18' },
  { id: 3, name: 'Database Systems', chapters: 8, completed: 3, color: '#f59e0b', examDate: '2026-05-20' },
  { id: 4, name: 'Operating Systems', chapters: 14, completed: 10, color: '#ef4444', examDate: '2026-05-22' },
  { id: 5, name: 'Computer Networks', chapters: 9, completed: 2, color: '#8b5cf6', examDate: '2026-05-25' },
  { id: 6, name: 'Data Structures', chapters: 11, completed: 9, color: '#06b6d4', examDate: '2026-05-28' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const card = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
};

export default function Subjects() {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(
    () => INITIAL_SUBJECTS.filter((s) => s.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const toggleAdd = useCallback(() => setShowAdd((v) => !v), []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-surface-800">Subjects</h2>
          <p className="mt-1 text-sm text-surface-700/60">Manage your subjects and track chapter progress.</p>
        </div>
        <button onClick={toggleAdd} className="inline-flex items-center gap-2 self-start rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl active:scale-[0.97]">
          <MdAdd className="h-5 w-5" /> Add Subject
        </button>
      </div>

      <div className="relative max-w-md">
        <MdSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-700/40" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search subjects…" className="w-full rounded-xl border border-surface-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-surface-700/35 focus:border-primary-400 focus:ring-4 focus:ring-primary-100" />
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden rounded-2xl border border-primary-200 bg-primary-50/50 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-surface-800">New Subject</h3>
              <button onClick={toggleAdd} className="text-surface-700/40 hover:text-surface-700"><MdClose className="h-5 w-5" /></button>
            </div>
            <p className="mt-2 text-sm text-surface-700/60">Subject creation form — react-hook-form + yup validation ready.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((subject) => {
          const pct = Math.round((subject.completed / subject.chapters) * 100);
          return (
            <motion.div key={subject.id} variants={card} className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-lg">
              <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl" style={{ backgroundColor: subject.color }} />
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ backgroundColor: subject.color }}>
                    <MdMenuBook className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-surface-800">{subject.name}</h4>
                    <p className="text-xs text-surface-700/50">Exam: {new Date(subject.examDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
                <button className="text-surface-700/30 hover:text-surface-700"><MdMoreVert className="h-5 w-5" /></button>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-surface-700/60">{subject.completed}/{subject.chapters} chapters</span>
                  <span className="font-semibold" style={{ color: subject.color }}>{pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-100">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.2 }} className="h-full rounded-full" style={{ backgroundColor: subject.color }} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {filtered.length === 0 && <p className="py-12 text-center text-surface-700/50">No subjects match your search.</p>}
    </div>
  );
}
