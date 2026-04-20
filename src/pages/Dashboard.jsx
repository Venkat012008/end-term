import { useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { useTasks } from '../hooks/useTasks';
import { 
  MdAssignment, 
  MdCheckCircle, 
  MdPendingActions, 
  MdReplay, 
  MdWarning, 
  MdTrendingUp,
  MdTrendingDown
} from 'react-icons/md';
import ProgressChart from '../components/dashboard/ProgressChart';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-surface-200 transition-all hover:shadow-md"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-surface-700/60">{title}</p>
        <h3 className="mt-1 text-2xl font-bold text-surface-800">{value}</h3>
      </div>
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const { subjects, tasks, taskStats } = useStudy();
  const { getFilteredTasks } = useTasks();

  const overdueTasks = useMemo(() => getFilteredTasks('Overdue'), [getFilteredTasks]);
  const revisionTasks = useMemo(() => getFilteredTasks('Revision'), [getFilteredTasks]);

  // Calculate subject progress data for the chart
  const subjectProgressData = useMemo(() => {
    return subjects.map(subject => {
      const subjectTasks = tasks.filter(t => t.subjectId === subject.id);
      const completed = subjectTasks.filter(t => t.done).length;
      const total = subjectTasks.length;
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      // Map subject color classes to hex for Recharts
      const colorMap = {
        'from-indigo-500 to-indigo-600': '#6366f1',
        'from-blue-500 to-blue-600': '#3b82f6',
        'from-teal-500 to-teal-600': '#14b8a6',
        'from-emerald-500 to-emerald-600': '#10b981',
        'from-amber-500 to-amber-600': '#f59e0b',
        'from-rose-500 to-rose-600': '#f43f5e',
      };

      return {
        name: subject.name,
        progress,
        color: colorMap[subject.color] || '#6366f1'
      };
    }).sort((a, b) => b.progress - a.progress);
  }, [subjects, tasks]);

  // Identify insights
  const lowProgressSubjects = useMemo(() => {
    return subjectProgressData.filter(s => s.progress < 30 && s.progress > 0);
  }, [subjectProgressData]);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h2 className="text-2xl font-bold text-surface-800">Dashboard</h2>
        <p className="mt-1 text-sm text-surface-700/60">Here's an overview of your study performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Tasks" 
          value={taskStats.total} 
          icon={MdAssignment} 
          color="from-primary-500 to-primary-600"
          delay={0.1}
        />
        <StatCard 
          title="Completed" 
          value={taskStats.completed} 
          icon={MdCheckCircle} 
          color="from-emerald-500 to-emerald-600"
          delay={0.2}
        />
        <StatCard 
          title="Pending" 
          value={taskStats.pending} 
          icon={MdPendingActions} 
          color="from-amber-500 to-amber-600"
          delay={0.3}
        />
        <StatCard 
          title="Revision" 
          value={revisionTasks.length} 
          icon={MdReplay} 
          color="from-violet-500 to-violet-600"
          delay={0.4}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-surface-200">
            <h3 className="mb-6 text-lg font-semibold text-surface-800">Subject Mastery (%)</h3>
            {subjectProgressData.length > 0 ? (
              <ProgressChart data={subjectProgressData} />
            ) : (
              <div className="flex h-72 flex-col items-center justify-center text-center">
                <p className="text-sm text-surface-700/40 font-medium uppercase tracking-widest">No data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Insights Section */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-surface-200">
            <h3 className="mb-4 text-lg font-semibold text-surface-800">Smart Insights</h3>
            
            <div className="space-y-4">
              {/* Overdue Warning */}
              {overdueTasks.length > 0 && (
                <div className="flex gap-3 rounded-2xl bg-rose-50 p-4 border border-rose-100">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-500 text-white shadow-sm">
                    <MdWarning className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-rose-800">Action Required</h4>
                    <p className="mt-0.5 text-xs text-rose-700/70">
                      You have {overdueTasks.length} overdue tasks. Prioritize them today!
                    </p>
                  </div>
                </div>
              )}

              {/* Progress Insight */}
              {lowProgressSubjects.length > 0 ? (
                <div className="flex gap-3 rounded-2xl bg-amber-50 p-4 border border-amber-100">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white shadow-sm">
                    <MdTrendingDown className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-800">Low Progress</h4>
                    <p className="mt-0.5 text-xs text-amber-700/70">
                      Progress in {lowProgressSubjects[0].name} is low ({lowProgressSubjects[0].progress}%).
                    </p>
                  </div>
                </div>
              ) : taskStats.progress > 80 ? (
                <div className="flex gap-3 rounded-2xl bg-emerald-50 p-4 border border-emerald-100">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm">
                    <MdTrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-800">Great Job!</h4>
                    <p className="mt-0.5 text-xs text-emerald-700/70">
                      Overall mastery is high. Keep up the consistency!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex h-20 items-center justify-center text-center">
                   <p className="text-xs text-surface-700/40 font-medium italic">Collecting more data for insights...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
