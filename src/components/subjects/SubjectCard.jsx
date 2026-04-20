import { useState } from 'react';
import { MdEdit, MdDelete, MdExpandMore, MdAdd } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import TopicList from './TopicList';

export default function SubjectCard({ subject, onEdit, onDelete, onAddTopic }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-surface-200 transition-all hover:shadow-xl hover:ring-primary-200"
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${subject.color} text-lg font-bold text-white shadow-lg`}>
              {subject.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-surface-800">{subject.name}</h3>
              <p className="line-clamp-1 text-sm text-surface-700/60">{subject.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(subject)}
              className="rounded-lg p-2 text-surface-700/40 transition-colors hover:bg-surface-100 hover:text-primary-600"
              title="Edit Subject"
            >
              <MdEdit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(subject.id)}
              className="rounded-lg p-2 text-surface-700/40 transition-colors hover:bg-surface-100 hover:text-red-600"
              title="Delete Subject"
            >
              <MdDelete className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-surface-50 pt-4">
          <button
            onClick={() => onAddTopic(subject.id)}
            className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <MdAdd className="h-4 w-4" /> Add Topic
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-1 text-sm font-medium text-surface-700 transition-colors hover:text-primary-600 ${isExpanded ? 'text-primary-600' : ''}`}
          >
            Topics
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <MdExpandMore className="h-5 w-5" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Expanded topics list */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-surface-50/50"
          >
            <div className="border-t border-surface-100 p-5">
              <TopicList subjectId={subject.id} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
