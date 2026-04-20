import { useState, useMemo } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useStudy } from '../context/StudyContext';
import { useDebounce } from '../hooks/useDebounce';
import { MdAdd, MdChecklist } from 'react-icons/md';
import TaskCard from '../components/tasks/TaskCard';
import TaskModal from '../components/tasks/TaskModal';
import SearchFilterBar from '../components/common/SearchFilterBar';
import { motion, AnimatePresence } from 'framer-motion';
import { isBefore } from 'date-fns';
import { TaskSkeleton } from '../components/common/Skeleton';

const TABS = ['All', 'Pending', 'Completed', 'Overdue', 'Revision'];

export default function Tasks() {
  const { subjects } = useStudy();
  const { getFilteredTasks, addTask, updateTask, deleteTask, isLoading } = useTasks();
  
  const [activeTab, setActiveTab] = useState('Pending');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Search & Filter State
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [filters, setFilters] = useState({ subjectId: '', priority: '' });
  const [sort, setSort] = useState('date_desc');

  // Advanced Filtering Logic
  const filteredTasks = useMemo(() => {
    let baseTasks = getFilteredTasks(activeTab);

    // Apply Search
    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase();
      baseTasks = baseTasks.filter(t => 
        t.title.toLowerCase().includes(s) || 
        t.topicName?.toLowerCase().includes(s) ||
        t.subjectName.toLowerCase().includes(s)
      );
    }

    // Apply Subject Filter
    if (filters.subjectId) {
      baseTasks = baseTasks.filter(t => t.subjectId === filters.subjectId);
    }

    // Apply Priority Filter
    if (filters.priority) {
      baseTasks = baseTasks.filter(t => t.priority === filters.priority);
    }

    // Apply Sorting
    return [...baseTasks].sort((a, b) => {
      if (sort === 'date_asc') return new Date(a.deadline) - new Date(b.deadline);
      if (sort === 'date_desc') return new Date(b.deadline) - new Date(a.deadline);
      if (sort === 'priority_desc') {
        const pMap = { High: 3, Medium: 2, Low: 1 };
        return pMap[b.priority] - pMap[a.priority];
      }
      return 0;
    });
  }, [activeTab, debouncedSearch, filters, sort, getFilteredTasks]);

  const { addRevision } = useStudy();

  const handleToggleTask = (id, done) => {
    updateTask(id, { done });
    
    // Automatically schedule a revision when a task is completed
    if (done) {
      const task = filteredTasks.find(t => t.id === id);
      if (task) {
        const revisionDate = new Date();
        revisionDate.setDate(revisionDate.getDate() + 3); // Schedule for 3 days later
        
        addRevision({
          title: `Revision: ${task.title}`,
          subjectId: task.subjectId,
          subjectName: task.subjectName,
          topicName: task.topicName || '',
          scheduledFor: revisionDate.toISOString(),
          originalTaskId: id
        });
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-surface-800">Study Tasks</h2>
          <p className="mt-1 text-sm text-surface-700/60">Manage your daily study goals and deadlines.</p>
        </div>
        <button
          onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-xl active:scale-[0.98]"
        >
          <MdAdd className="h-5 w-5" /> New Task
        </button>
      </div>

      {/* Advanced Toolbar */}
      <SearchFilterBar 
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
        subjects={subjects}
        sort={sort}
        setSort={setSort}
      />

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide sm:gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-white text-primary-600 shadow-sm ring-1 ring-surface-200'
                : 'text-surface-700/60 hover:bg-white hover:text-surface-800'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-lg ring-1 ring-primary-500"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        {isLoading ? (
          <TaskSkeleton />
        ) : (
          <AnimatePresence mode="popLayout">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <TaskCard
                  task={task}
                  onToggle={handleToggleTask}
                  onEdit={handleEditTask}
                  onDelete={deleteTask}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-surface-200 py-16 text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-100 text-surface-300">
                <MdChecklist className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-surface-800">No tasks match your criteria</h3>
              <p className="mt-1 text-sm text-surface-700/60">Try adjusting your filters or search term.</p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => editingTask ? updateTask(editingTask.id, data) : addTask(data)}
        initialData={editingTask}
      />
    </div>
  );
}
