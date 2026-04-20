import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MdClose } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const schema = yup.object().shape({
  name: yup.string().required('Topic name is required'),
  difficulty: yup.string().oneOf(['Easy', 'Medium', 'Hard']).required('Difficulty is required'),
  status: yup.string().oneOf(['Pending', 'In Progress', 'Mastered']).required('Status is required'),
  notes: yup.string(),
});

export default function TopicModal({ isOpen, onClose, onSubmit, subjectId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      difficulty: 'Medium',
      status: 'Pending',
    }
  });

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, subjectId });
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
                <h3 className="text-lg font-semibold text-surface-800">New Topic</h3>
                <button onClick={onClose} className="rounded-lg p-1 hover:bg-surface-100 transition-colors">
                  <MdClose className="h-5 w-5 text-surface-700/50" />
                </button>
              </div>

              <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-surface-700">Topic Name</label>
                  <input
                    {...register('name')}
                    placeholder="e.g. Differentiation"
                    className={`w-full rounded-xl border py-2.5 px-4 text-sm outline-none transition-all focus:ring-4 ${
                      errors.name ? 'border-red-300 focus:ring-red-100' : 'border-surface-200 focus:border-primary-400 focus:ring-primary-100'
                    }`}
                  />
                  {errors.name && <p className="text-xs font-medium text-red-500">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-surface-700">Difficulty</label>
                    <select
                      {...register('difficulty')}
                      className="w-full rounded-xl border border-surface-200 bg-white py-2.5 px-4 text-sm outline-none transition-all focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-surface-700">Initial Status</label>
                    <select
                      {...register('status')}
                      className="w-full rounded-xl border border-surface-200 bg-white py-2.5 px-4 text-sm outline-none transition-all focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Mastered">Mastered</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-surface-700">Notes (Optional)</label>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    placeholder="Key concepts or reminders..."
                    className="w-full rounded-xl border border-surface-200 py-2.5 px-4 text-sm outline-none transition-all focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl active:scale-[0.98]"
                  >
                    Add Topic
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
