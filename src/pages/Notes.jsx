import { useStudy } from '../context/StudyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MdNote, MdDelete, MdSearch, MdInfo } from 'react-icons/md';
import { useState } from 'react';
import { format } from 'date-fns';

export default function Notes() {
  const { notes, deleteNote } = useStudy();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(note => 
    note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-surface-800">Study Database</h2>
          <p className="mt-1 text-sm text-surface-700/60">Your saved AI summaries and study notes.</p>
        </div>

        <div className="relative w-full max-w-xs">
          <MdSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-surface-200 bg-white py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
          />
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-20 text-center shadow-sm ring-1 ring-surface-200">
          <div className="rounded-full bg-surface-50 p-6 text-surface-400">
            <MdNote className="h-12 w-12" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-surface-800">No notes found</h3>
          <p className="mt-2 text-sm text-surface-700/60 max-w-xs">
            Generate and save content using AI Tools to see them appear here in your database.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-surface-200 transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primary-50 p-2 text-primary-600">
                      <MdInfo className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-surface-800 line-clamp-1">{note.title}</h3>
                      <p className="text-xs text-surface-500">
                        {note.createdAt?.seconds 
                          ? format(new Date(note.createdAt.seconds * 1000), 'MMM dd, yyyy')
                          : 'Just now'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="rounded-lg p-2 text-surface-400 hover:bg-red-50 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MdDelete className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 flex-1">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-sm leading-relaxed text-surface-700 line-clamp-6">
                      {note.content}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-surface-50 pt-4">
                  <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                    {note.toolUsed || 'note'}
                  </span>
                  <button className="text-xs font-bold text-primary-600 hover:underline">
                    View Full Note
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
