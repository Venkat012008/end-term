import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MdClose } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudy } from '../../context/StudyContext';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  subjectId: yup.string().required('Subject is required'),
  topicId: yup.string(),
  deadline: yup.date().typeError('Invalid date').required('Deadline is required'),
  priority: yup.string().oneOf(['High', 'Medium', 'Low']).required('Priority is required'),
  isRevision: yup.boolean(),
});

export default function TaskModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const { subjects, topics } = useStudy();
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData ? {
      ...initialData,
      deadline: initialData.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : ''
    } : {
      priority: 'Medium',
      isRevision: false,
    }
  });

  const selectedSubjectId = watch('subjectId');
  const availableTopics = topics.filter(t => t.subjectId === selectedSubjectId);

  const handleFormSubmit = (data) => {
    const subject = subjects.find(s => s.id === data.subjectId);
    const topic = topics.find(t => t.id === data.topicId);
    
    onSubmit({
      ...data,
      subjectName: subject?.name || 'Unknown',
      topicName: topic?.name || '',
      deadline: new Date(data.deadline).toISOString(), // Standardize date
      done: initialData?.done || false,
    });
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl pointer-events-auto">
              <div className="flex items-center justify-between border-b border-surface-100 px-6 py-4">
                <h3 className="text-lg font-semibold text-surface-800">
                  {initialData ? 'Edit Task' : 'New Study Task'}
                </h3>
                <button onClick={onClose} className="rounded-lg p-1 hover:bg-surface-100 transition-colors">
                  <MdClose className="h-5 w-5 text-surface-700/50" />
                </button>
              </div>

              <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-surface-700">Task Title</label>
                  <input
                    {...register('title')}
                    placeholder="e.g. Complete chapter 5 exercise"
                    className={`w-full rounded-xl border py-2.5 px-4 text-sm outline-none transition-all focus:ring-4 ${
                      errors.title ? 'border-red-300 focus:ring-red-100' : 'border-surface-200 focus:border-primary-400 focus:ring-primary-100'
                    }`}
                  />
                  {errors.title && <p className="text-xs font-medium text-red-500">{errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-surface-700">Subject</label>
                    <select
                      {...register('subjectId')}
                      className="w-full rounded-xl border border-surface-200 bg-white py-2.5 px-4 text-sm outline-none transition-all focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                    >
                      <option value="">Select Subject</option>
                      {subjects.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                    {errors.subjectId && <p className="text-xs font-medium text-red-500">{errors.subjectId.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-surface-700">Topic (Optional)</label>
                    <select
                      {...register('topicId')}
                      disabled={!selectedSubjectId}
                      className="w-full rounded-xl border border-surface-200 bg-white py-2.5 px-4 text-sm outline-none transition-all focus:border-primary-400 focus:ring-4 focus:ring-primary-100 disabled:bg-surface-50"
                    >
                      <option value="">Select Topic</option>
                      {availableTopics.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-surface-700">Deadline</label>
                    <input
                      {...register('deadline')}
                      type="date"
                      className="w-full rounded-xl border border-surface-200 bg-white py-2.5 px-4 text-sm outline-none transition-all focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                    />
                    {errors.deadline && <p className="text-xs font-medium text-red-500">{errors.deadline.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-surface-700">Priority</label>
                    <select
                      {...register('priority')}
                      className="w-full rounded-xl border border-surface-200 bg-white py-2.5 px-4 text-sm outline-none transition-all focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    {...register('isRevision')}
                    type="checkbox"
                    id="isRevision"
                    className="h-4 w-4 rounded border-surface-200 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="isRevision" className="text-sm font-medium text-surface-700">
                    Mark as Revision Task
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl active:scale-[0.98]"
                  >
                    {initialData ? 'Save Changes' : 'Create Task'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
