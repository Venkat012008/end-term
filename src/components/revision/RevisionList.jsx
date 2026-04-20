import { format, isBefore, startOfDay } from 'date-fns';
import { MdCheckCircleOutline, MdRadioButtonUnchecked, MdEventRepeat, MdDelete } from 'react-icons/md';
import { useStudy } from '../../context/StudyContext';

export default function RevisionList({ revisions }) {
  const { updateRevision, deleteRevision } = useStudy();
  const today = startOfDay(new Date());

  if (revisions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-100 text-surface-300">
          <MdEventRepeat className="h-8 w-8" />
        </div>
        <p className="text-sm font-medium text-surface-700/60">No revisions scheduled for this period.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {revisions.map((rev) => {
        const isUrgent = !rev.done && isBefore(new Date(rev.scheduledFor), today);
        
        return (
          <div 
            key={rev.id}
            className={`group relative flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 transition-all ${
              rev.done 
                ? 'ring-surface-100 opacity-60' 
                : isUrgent 
                  ? 'ring-rose-200 bg-rose-50/30' 
                  : 'ring-surface-200 hover:ring-primary-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => updateRevision(rev.id, { done: !rev.done })}
                className={`transition-colors ${rev.done ? 'text-emerald-500' : 'text-surface-300 hover:text-primary-500'}`}
              >
                {rev.done ? <MdCheckCircleOutline className="h-6 w-6" /> : <MdRadioButtonUnchecked className="h-6 w-6" />}
              </button>
              
              <div>
                <h4 className={`font-semibold text-surface-800 ${rev.done ? 'line-through text-surface-700/40' : ''}`}>
                  {rev.title}
                </h4>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className="font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {rev.subjectName}
                  </span>
                  <span className={`font-medium ${isUrgent ? 'text-rose-600' : 'text-surface-700/60'}`}>
                    Scheduled: {format(new Date(rev.scheduledFor), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => deleteRevision(rev.id)}
              className="rounded-lg p-2 text-surface-700/40 opacity-0 transition-all hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
            >
              <MdDelete className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
