import { format, isBefore, startOfDay } from 'date-fns';
import { MdOutlineCalendarToday, MdCheckCircleOutline, MdRadioButtonUnchecked, MdEdit, MdDelete, MdFlag } from 'react-icons/md';

const PRIORITY_COLORS = {
  High: 'text-rose-500 bg-rose-50',
  Medium: 'text-amber-500 bg-amber-50',
  Low: 'text-emerald-500 bg-emerald-50',
};

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const isOverdue = !task.done && isBefore(new Date(task.deadline), startOfDay(new Date()));

  return (
    <div className={`group relative rounded-2xl bg-white p-5 shadow-sm ring-1 transition-all hover:shadow-md ${
      task.done ? 'ring-surface-100 opacity-75' : 'ring-surface-200 hover:ring-primary-300'
    }`}>
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(task.id, !task.done)}
          className={`mt-1 transition-colors ${task.done ? 'text-emerald-500' : 'text-surface-300 hover:text-primary-500'}`}
        >
          {task.done ? <MdCheckCircleOutline className="h-6 w-6" /> : <MdRadioButtonUnchecked className="h-6 w-6" />}
        </button>

        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className={`font-semibold text-surface-800 transition-all ${task.done ? 'line-through text-surface-700/40' : ''}`}>
                {task.title}
              </h3>
              <div className="mt-1 flex flex-wrap gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                  {task.subjectName}
                </span>
                {task.topicName && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-surface-700/40 bg-surface-100 px-2 py-0.5 rounded-full">
                    {task.topicName}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button onClick={() => onEdit(task)} className="rounded-lg p-1.5 text-surface-700/40 hover:bg-surface-100 hover:text-primary-600">
                <MdEdit className="h-4 w-4" />
              </button>
              <button onClick={() => onDelete(task.id)} className="rounded-lg p-1.5 text-surface-700/40 hover:bg-surface-100 hover:text-rose-600">
                <MdDelete className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <div className={`flex items-center gap-1 text-xs font-medium ${isOverdue ? 'text-rose-600' : 'text-surface-700/60'}`}>
              <MdOutlineCalendarToday className="h-3.5 w-3.5" />
              {format(new Date(task.deadline), 'MMM d, yyyy')}
              {isOverdue && <span className="ml-1 font-bold">[OVERDUE]</span>}
            </div>

            <div className={`flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${PRIORITY_COLORS[task.priority]}`}>
              <MdFlag className="h-3 w-3" />
              {task.priority}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
