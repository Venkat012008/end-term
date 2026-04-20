import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MdClose } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  color: yup.string().required('Color is required'),
});

const COLORS = [
  { name: 'Indigo', value: 'from-indigo-500 to-indigo-600', ring: 'ring-indigo-200' },
  { name: 'Blue', value: 'from-blue-500 to-blue-600', ring: 'ring-blue-200' },
  { name: 'Teal', value: 'from-teal-500 to-teal-600', ring: 'ring-teal-200' },
  { name: 'Emerald', value: 'from-emerald-500 to-emerald-600', ring: 'ring-emerald-200' },
  { name: 'Amber', value: 'from-amber-500 to-amber-600', ring: 'ring-amber-200' },
  { name: 'Rose', value: 'from-rose-500 to-rose-600', ring: 'ring-rose-200' },
];

export default function SubjectModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || { color: 'from-indigo-500 to-indigo-600' },
  });

  const selectedColor = watch('color');

  const handleFormSubmit = (data) => {
    onSubmit(data);
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
                  {initialData ? 'Edit Subject' : 'New Subject'}
                </h3>
                <button onClick={onClose} className="rounded-lg p-1 hover:bg-surface-100 transition-colors">
                  <MdClose className="h-5 w-5 text-surface-700/50" />
                </button>
              </div>

              <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-surface-700">Subject Name</label>
                  <input
                    {...register('name')}
                    placeholder="e.g. Mathematics"
                    className={`w-full rounded-xl border py-2.5 px-4 text-sm outline-none transition-all focus:ring-4 ${
                      errors.name ? 'border-red-300 focus:ring-red-100' : 'border-surface-200 focus:border-primary-400 focus:ring-primary-100'
                    }`}
                  />
                  {errors.name && <p className="text-xs font-medium text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-surface-700">Description</label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    placeholder="Short summary of what you'll study..."
                    className={`w-full rounded-xl border py-2.5 px-4 text-sm outline-none transition-all focus:ring-4 ${
                      errors.description ? 'border-red-300 focus:ring-red-100' : 'border-surface-200 focus:border-primary-400 focus:ring-primary-100'
                    }`}
                  />
                  {errors.description && <p className="text-xs font-medium text-red-500">{errors.description.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-surface-700">Theme Color</label>
                  <div className="flex flex-wrap gap-3">
                    {COLORS.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setValue('color', color.value)}
                        className={`h-8 w-8 rounded-full bg-gradient-to-br transition-all hover:scale-110 ${color.value} ${
                          selectedColor === color.value ? `ring-offset-2 ring-2 ${color.ring}` : ''
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                  {errors.color && <p className="text-xs font-medium text-red-500">{errors.color.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl active:scale-[0.98]"
                  >
                    {initialData ? 'Save Changes' : 'Create Subject'}
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
