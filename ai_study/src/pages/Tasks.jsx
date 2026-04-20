import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdCheckCircle, MdRadioButtonUnchecked, MdFilterList } from 'react-icons/md';

const INITIAL_TASKS = [
  { id: 1, title: 'Solve integration problems (Ch.5)', subject: 'Mathematics', due: '2026-04-21', done: false, priority: 'high' },
  { id: 2, title: 'Watch CNN lecture recording', subject: 'AI/ML', due: '2026-04-21', done: true, priority: 'medium' },
  { id: 3, title: 'Write SQL joins practice sheet', subject: 'Database Systems', due: '2026-04-22', done: false, priority: 'medium' },
  { id: 4, title: 'Revise process synchronization', subject: 'Operating Systems', due: '2026-04-22', done: false, priority: 'high' },
  { id: 5, title: 'Implement Dijkstra's algorithm', subject: 'Data Structures', due: '2026-04-23', done: true, priority: 'low' },
  { id: 6, title: 'Read TCP/IP chapter', subject: 'Computer Networks', due: '2026-04-24', done: false, priority: 'low' },
];

const FILTERS = ['All', 'Pending', 'Completed'];
const PRIORITY_DOT = { high: 'bg-red-500', medium: 'bg-amber-500', low: 'bg-emerald-500' };

const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function Tasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    if (filter === 'Pending') return tasks.filter((t) => !t.done);
    if (filter === 'Completed') return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks, filter]);

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const stats = useMemo(() => ({
    total: tasks.length,
    done: tasks.filter((t) => t.done).length,
  }), [tasks]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-surface-800">Tasks</h2>
          <p className="mt-1 text-sm text-surface-700/60">{stats.done}/{stats.total} completed</p>
        </div>
        <button className="inline-flex items-center gap-2 self-start rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl active:scale-[0.97]">
          <MdAdd className="h-5 w-5" /> New Task
        </button>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-surface-700/60">
          <span>Overall progress</span>
          <span>{Math.round((stats.done / stats.total) * 100)}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-surface-100">
          <motion.div initial={{ width: 0 }} animate={{ width: `${(stats.done / stats.total) * 100}%` }} transition={{ duration: 1 }} className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <MdFilterList className="h-5 w-5 text-surface-700/40" />
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${filter === f ? 'bg-primary-600 text-white shadow-sm' : 'text-surface-700/60 hover:bg-surface-100'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Task list */}
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.05 } } }} className="space-y-2">
        {filtered.map((task) => (
          <motion.div key={task.id} variants={item} className={`flex items-center gap-4 rounded-xl border p-4 transition-all ${task.done ? 'border-surface-100 bg-surface-50' : 'border-surface-200 bg-white hover:border-primary-200 hover:shadow-sm'}`}>
            <button onClick={() => toggleTask(task.id)} className="shrink-0">
              {task.done ? (
                <MdCheckCircle className="h-6 w-6 text-accent-500" />
              ) : (
                <MdRadioButtonUnchecked className="h-6 w-6 text-surface-700/30 hover:text-primary-500" />
              )}
            </button>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-medium ${task.done ? 'text-surface-700/40 line-through' : 'text-surface-800'}`}>{task.title}</p>
              <p className="mt-0.5 text-xs text-surface-700/50">{task.subject} · Due {new Date(task.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${PRIORITY_DOT[task.priority]}`} title={task.priority} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && <p className="py-12 text-center text-surface-700/50">No tasks in this category.</p>}
    </div>
  );
}
