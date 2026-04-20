import { useState } from 'react';
import { useStudy } from '../context/StudyContext';
import { MdAdd, MdSearch, MdFilterList } from 'react-icons/md';
import SubjectCard from '../components/subjects/SubjectCard';
import SubjectModal from '../components/subjects/SubjectModal';
import TopicModal from '../components/subjects/TopicModal';
import { SubjectSkeleton } from '../components/common/Skeleton';

export default function Subjects() {
  const { subjects, loading, addSubject, updateSubject, deleteSubject, addTopic } = useStudy();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [activeSubjectId, setActiveSubjectId] = useState(null);

  const filteredSubjects = subjects.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditSubject = (subject) => {
    setEditingSubject(subject);
    setIsSubjectModalOpen(true);
  };

  const handleAddTopic = (subjectId) => {
    setActiveSubjectId(subjectId);
    setIsTopicModalOpen(true);
  };

  const handleSubjectSubmit = (data) => {
    if (editingSubject) {
      updateSubject(editingSubject.id, data);
    } else {
      addSubject(data);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-surface-800">Subjects</h2>
          <p className="mt-1 text-sm text-surface-700/60">Organize your syllabus and track topic mastery.</p>
        </div>
        <button
          onClick={() => {
            setEditingSubject(null);
            setIsSubjectModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-xl active:scale-[0.98]"
        >
          <MdAdd className="h-5 w-5" /> Add Subject
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <MdSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-700/40" />
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-surface-200 bg-white py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
          />
        </div>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-surface-200 bg-white px-4 py-2 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-50">
          <MdFilterList className="h-5 w-5 text-surface-700/40" />
          Filter
        </button>
      </div>

      {/* Subjects Grid */}
      {loading.subjects ? (
        <SubjectSkeleton />
      ) : filteredSubjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onEdit={handleEditSubject}
              onDelete={deleteSubject}
              onAddTopic={handleAddTopic}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-surface-200 py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-100 text-surface-300">
            <MdAdd className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold text-surface-800">No subjects found</h3>
          <p className="mt-1 text-sm text-surface-700/60">Create your first subject to start organizing your syllabus.</p>
        </div>
      )}

      {/* Modals */}
      <SubjectModal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        onSubmit={handleSubjectSubmit}
        initialData={editingSubject}
      />

      <TopicModal
        isOpen={isTopicModalOpen}
        onClose={() => setIsTopicModalOpen(false)}
        onSubmit={addTopic}
        subjectId={activeSubjectId}
      />
    </div>
  );
}
