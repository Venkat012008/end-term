import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MdReplay, MdStar, MdStarBorder, MdAccessTime } from 'react-icons/md';

const REVISION_ITEMS = [
  { id: 1, topic: 'Linear Algebra — Eigenvalues', subject: 'Mathematics', lastRevised: '2026-04-18', confidence: 4, nextDue: '2026-04-22' },
  { id: 2, topic: 'Backpropagation Algorithm', subject: 'AI/ML', lastRevised: '2026-04-16', confidence: 3, nextDue: '2026-04-20' },
  { id: 3, topic: 'Normalization (1NF–BCNF)', subject: 'Database Systems', lastRevised: '2026-04-14', confidence: 2, nextDue: '2026-04-19' },
  { id: 4, topic: 'Page Replacement Algorithms', subject: 'Operating Systems', lastRevised: '2026-04-17', confidence: 5, nextDue: '2026-04-25' },
  { id: 5, topic: 'Subnetting & CIDR', subject: 'Computer Networks', lastRevised: '2026-04-10', confidence: 1, nextDue: '2026-04-18' },
  { id: 6, topic: 'AVL Tree Rotations', subject: 'Data Structures', lastRevised: '2026-04-19', confidence: 4, nextDue: '2026-04-24' },
];

const CONFIDENCE_LABEL = { 1: 'Very Low', 2: 'Low', 3: 'Medium', 4: 'High', 5: 'Mastered' };
const CONFIDENCE_COLOR = { 1: 'text-red-500', 2: 'text-orange-500', 3: 'text-amber-500', 4: 'text-emerald-500', 5: 'text-primary-500' };

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Revision() {
  const [items] = useState(REVISION_ITEMS);

  const dueToday = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return items.filter((i) => i.nextDue <= today).length;
  }, [items]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-surface-800">Revision</h2>
          <p className="mt-1 text-sm text-surface-700/60">Spaced repetition tracker — {dueToday} topic(s) due for review.</p>
        </div>
      </div>

      {/* Revision cards */}
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.07 } } }} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((rev) => (
          <motion.div key={rev.id} variants={item} className="group rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h4 className="truncate font-semibold text-surface-800">{rev.topic}</h4>
                <p className="mt-0.5 text-xs text-surface-700/50">{rev.subject}</p>
              </div>
              <button className="ml-2 shrink-0 rounded-lg p-1.5 text-primary-400 transition-colors hover:bg-primary-50 hover:text-primary-600" title="Revise now">
                <MdReplay className="h-5 w-5" />
              </button>
            </div>

            {/* Confidence stars */}
            <div className="mt-4 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {star <= rev.confidence ? (
                    <MdStar className={`h-4 w-4 ${CONFIDENCE_COLOR[rev.confidence]}`} />
                  ) : (
                    <MdStarBorder className="h-4 w-4 text-surface-200" />
                  )}
                </span>
              ))}
              <span className={`ml-2 text-xs font-medium ${CONFIDENCE_COLOR[rev.confidence]}`}>
                {CONFIDENCE_LABEL[rev.confidence]}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-1 text-xs text-surface-700/50">
              <MdAccessTime className="h-3.5 w-3.5" />
              Next: {new Date(rev.nextDue).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
