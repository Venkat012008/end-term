import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  MdMenuBook,
  MdAssignment,
  MdTrendingUp,
  MdTimer,
  MdArrowUpward,
  MdArrowDownward,
} from 'react-icons/md';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const STATS = [
  {
    label: 'Total Subjects',
    value: '8',
    change: '+2 this week',
    trend: 'up',
    icon: MdMenuBook,
    color: 'from-primary-500 to-primary-600',
    shadow: 'shadow-primary-500/20',
  },
  {
    label: 'Pending Tasks',
    value: '14',
    change: '-3 from yesterday',
    trend: 'down',
    icon: MdAssignment,
    color: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-500/20',
  },
  {
    label: 'Study Hours',
    value: '26.5',
    change: '+4.2 hrs this week',
    trend: 'up',
    icon: MdTimer,
    color: 'from-accent-500 to-emerald-500',
    shadow: 'shadow-accent-500/20',
  },
  {
    label: 'Avg Score',
    value: '82%',
    change: '+5% improvement',
    trend: 'up',
    icon: MdTrendingUp,
    color: 'from-violet-500 to-purple-600',
    shadow: 'shadow-violet-500/20',
  },
];

const CHART_DATA = [
  { day: 'Mon', hours: 3.2, tasks: 4 },
  { day: 'Tue', hours: 4.1, tasks: 6 },
  { day: 'Wed', hours: 2.8, tasks: 3 },
  { day: 'Thu', hours: 5.0, tasks: 7 },
  { day: 'Fri', hours: 4.5, tasks: 5 },
  { day: 'Sat', hours: 6.2, tasks: 8 },
  { day: 'Sun', hours: 3.8, tasks: 4 },
];

const UPCOMING_TASKS = [
  { id: 1, title: 'Revise Linear Algebra — Ch.4', subject: 'Mathematics', due: 'Today', priority: 'high' },
  { id: 2, title: 'Read Neural Networks paper', subject: 'AI/ML', due: 'Tomorrow', priority: 'medium' },
  { id: 3, title: 'Complete DBMS assignment', subject: 'Database Systems', due: 'Wed', priority: 'high' },
  { id: 4, title: 'Practice OS scheduling problems', subject: 'Operating Systems', due: 'Thu', priority: 'low' },
];

const PRIORITY_STYLES = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-emerald-100 text-emerald-700',
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function Dashboard() {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <h2 className="text-2xl font-bold text-surface-800 sm:text-3xl">
          {greeting}, Student 👋
        </h2>
        <p className="mt-1 text-surface-700/60">
          Here's an overview of your study progress.
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={item}
              className={`group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-lg ${stat.shadow}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-surface-700/60">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-surface-800">{stat.value}</p>
                </div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg ${stat.shadow}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium">
                {stat.trend === 'up' ? (
                  <MdArrowUpward className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <MdArrowDownward className="h-3.5 w-3.5 text-emerald-500" />
                )}
                <span className="text-emerald-600">{stat.change}</span>
              </div>
              {/* Decorative gradient blob */}
              <div
                className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${stat.color} opacity-[0.06] transition-transform group-hover:scale-150`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Charts & Tasks */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Chart */}
        <motion.div
          variants={item}
          className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-3"
        >
          <h3 className="mb-4 text-base font-semibold text-surface-800">
            Study Hours — This Week
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="hoursGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    fontSize: '13px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#hoursGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Upcoming tasks */}
        <motion.div
          variants={item}
          className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-2"
        >
          <h3 className="mb-4 text-base font-semibold text-surface-800">
            Upcoming Tasks
          </h3>
          <ul className="space-y-3">
            {UPCOMING_TASKS.map((task) => (
              <li
                key={task.id}
                className="group flex items-start gap-3 rounded-xl border border-surface-100 p-3 transition-colors hover:border-primary-200 hover:bg-primary-50/30"
              >
                <div
                  className={`mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${PRIORITY_STYLES[task.priority]}`}
                >
                  {task.priority}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-surface-800">
                    {task.title}
                  </p>
                  <p className="mt-0.5 text-xs text-surface-700/50">
                    {task.subject} · Due {task.due}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
