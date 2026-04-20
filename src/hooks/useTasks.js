import { useStudy } from '../context/StudyContext';
import { isBefore, startOfDay } from 'date-fns';

export function useTasks() {
  const { tasks, addTask, updateTask, deleteTask, loading } = useStudy();

  const getFilteredTasks = (filter) => {
    const today = startOfDay(new Date());

    switch (filter) {
      case 'Pending':
        return tasks.filter(t => !t.done && !isBefore(new Date(t.deadline), today));
      case 'Completed':
        return tasks.filter(t => t.done);
      case 'Overdue':
        return tasks.filter(t => !t.done && isBefore(new Date(t.deadline), today));
      case 'Revision':
        return tasks.filter(t => t.isRevision);
      case 'All':
      default:
        return tasks;
    }
  };

  return {
    tasks,
    getFilteredTasks,
    addTask,
    updateTask,
    deleteTask,
    isLoading: loading.tasks
  };
}
