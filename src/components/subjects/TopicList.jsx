import { useStudy } from '../../context/StudyContext';
import { MdEdit, MdDelete, MdLens } from 'react-icons/md';

const DIFFICULTY_COLORS = {
  Easy: 'text-emerald-500',
  Medium: 'text-amber-500',
  Hard: 'text-rose-500',
};

const STATUS_COLORS = {
  Pending: 'bg-surface-100 text-surface-700/60',
  'In Progress': 'bg-blue-50 text-blue-600',
  Mastered: 'bg-emerald-50 text-emerald-600',
};

export default function TopicList({ subjectId }) {
  const { topics, deleteTopic } = useStudy();
  const subjectTopics = topics.filter(t => t.subjectId === subjectId);

  if (subjectTopics.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-xs font-medium text-surface-700/40 uppercase tracking-widest">No topics yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {subjectTopics.map((topic) => (
        <div
          key={topic.id}
          className="group flex items-center justify-between rounded-xl bg-white p-3 ring-1 ring-surface-200 transition-all hover:ring-primary-300"
        >
          <div className="flex items-center gap-3">
            <MdLens className={`h-2 w-2 ${DIFFICULTY_COLORS[topic.difficulty] || 'text-surface-300'}`} />
            <div>
              <h4 className="text-sm font-semibold text-surface-800">{topic.name}</h4>
              <div className="mt-0.5 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[topic.status] || 'bg-surface-100'}`}>
                  {topic.status}
                </span>
                <span className="text-[10px] text-surface-700/40 font-medium">{topic.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => deleteTopic(topic.id)}
              className="rounded-lg p-1.5 text-surface-700/40 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <MdDelete className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
