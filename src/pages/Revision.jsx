import { useMemo } from 'react';
import { useStudy } from '../context/StudyContext';
import { isBefore, startOfDay, isAfter, endOfDay } from 'date-fns';
import RevisionList from '../components/revision/RevisionList';
import { MdAutoGraph } from 'react-icons/md';

export default function Revision() {
  const { revisions } = useStudy();
  const today = startOfDay(new Date());

  const upcomingRevisions = useMemo(() => {
    return revisions
      .filter(r => !r.done && (isAfter(new Date(r.scheduledFor), today) || isBefore(new Date(r.scheduledFor), today)))
      .sort((a, b) => new Date(a.scheduledFor) - new Date(b.scheduledFor));
  }, [revisions, today]);

  const completedRevisions = useMemo(() => {
    return revisions.filter(r => r.done);
  }, [revisions]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-surface-800">Revision Planner</h2>
          <p className="mt-1 text-sm text-surface-700/60">Spaced repetition schedule based on your completed tasks.</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg">
          <MdAutoGraph className="h-6 w-6" />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Upcoming Revisions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-surface-800">Upcoming Revisions</h3>
            <span className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-bold text-primary-700">
              {upcomingRevisions.length} Pending
            </span>
          </div>
          <RevisionList revisions={upcomingRevisions} />
        </div>

        {/* History / Completed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-surface-800">Recently Completed</h3>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
              {completedRevisions.length} Done
            </span>
          </div>
          <RevisionList revisions={completedRevisions} />
        </div>
      </div>
    </div>
  );
}
