import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const StudyContext = createContext();

export function useStudy() {
  return useContext(StudyContext);
}

export function StudyProvider({ children }) {
  const { currentUser } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState({
    subjects: false,
    topics: false,
    tasks: false,
    revisions: false,
    notes: false,
  });

  const [notes, setNotes] = useState([]);

  // Helper for safe Firestore operation
  const handleFirestoreError = useCallback((error, action) => {
    console.error(`Error ${action}:`, error);
    toast.error(`Failed to ${action}. Please try again.`);
  }, []);

  // ── Subjects ──────────────────────────────────────────────────────
  const fetchSubjects = useCallback(async () => {
    if (!currentUser) return;
    setLoading(prev => ({ ...prev, subjects: true }));
    try {
      const q = query(
        collection(db, 'subjects'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubjects(data);
    } catch (error) {
      handleFirestoreError(error, 'fetch subjects');
    } finally {
      setLoading(prev => ({ ...prev, subjects: false }));
    }
  }, [currentUser, handleFirestoreError]);

  const addSubject = useCallback(async (subjectData) => {
    if (!currentUser) return;
    try {
      const docRef = await addDoc(collection(db, 'subjects'), {
        ...subjectData,
        userId: currentUser.uid,
        createdAt: new Date(),
      });
      const newSubject = { id: docRef.id, ...subjectData };
      setSubjects(prev => [newSubject, ...prev]);
      toast.success('Subject added!');
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, 'add subject');
    }
  }, [currentUser, handleFirestoreError]);

  const updateSubject = useCallback(async (id, data) => {
    try {
      const docRef = doc(db, 'subjects', id);
      await updateDoc(docRef, data);
      setSubjects(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
      toast.success('Subject updated!');
    } catch (error) {
      handleFirestoreError(error, 'update subject');
    }
  }, [handleFirestoreError]);

  const deleteSubject = useCallback(async (id) => {
    try {
      await deleteDoc(doc(db, 'subjects', id));
      setSubjects(prev => prev.filter(s => s.id !== id));
      toast.info('Subject removed');
    } catch (error) {
      handleFirestoreError(error, 'delete subject');
    }
  }, [handleFirestoreError]);

  // ── Tasks ─────────────────────────────────────────────────────────
  const fetchTasks = useCallback(async () => {
    if (!currentUser) return;
    setLoading(prev => ({ ...prev, tasks: true }));
    try {
      const q = query(
        collection(db, 'tasks'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(data);
    } catch (error) {
      handleFirestoreError(error, 'fetch tasks');
    } finally {
      setLoading(prev => ({ ...prev, tasks: false }));
    }
  }, [currentUser, handleFirestoreError]);

  const addTask = useCallback(async (taskData) => {
    if (!currentUser) return;
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        ...taskData,
        userId: currentUser.uid,
        createdAt: new Date(),
      });
      const newTask = { id: docRef.id, ...taskData };
      setTasks(prev => [newTask, ...prev]);
      toast.success('Task created!');
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, 'add task');
    }
  }, [currentUser, handleFirestoreError]);

  const updateTask = useCallback(async (id, data) => {
    try {
      const docRef = doc(db, 'tasks', id);
      await updateDoc(docRef, data);
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
    } catch (error) {
      handleFirestoreError(error, 'update task');
    }
  }, [handleFirestoreError]);

  const deleteTask = useCallback(async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setTasks(prev => prev.filter(t => t.id !== id));
      toast.info('Task deleted');
    } catch (error) {
      handleFirestoreError(error, 'delete task');
    }
  }, [handleFirestoreError]);

  // ── Topics ────────────────────────────────────────────────────────
  const fetchTopics = useCallback(async (subjectId) => {
    if (!currentUser) return;
    setLoading(prev => ({ ...prev, topics: true }));
    try {
      const q = query(
        collection(db, 'topics'),
        where('userId', '==', currentUser.uid),
        where('subjectId', '==', subjectId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTopics(data);
    } catch (error) {
      handleFirestoreError(error, 'fetch topics');
    } finally {
      setLoading(prev => ({ ...prev, topics: false }));
    }
  }, [currentUser, handleFirestoreError]);

  const addTopic = useCallback(async (topicData) => {
    if (!currentUser) return;
    try {
      const docRef = await addDoc(collection(db, 'topics'), {
        ...topicData,
        userId: currentUser.uid,
        createdAt: new Date(),
      });
      toast.success('Topic added!');
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, 'add topic');
    }
  }, [currentUser, handleFirestoreError]);

  const updateTopic = useCallback(async (id, data) => {
    try {
      const docRef = doc(db, 'topics', id);
      await updateDoc(docRef, data);
      toast.success('Topic updated!');
    } catch (error) {
      handleFirestoreError(error, 'update topic');
    }
  }, [handleFirestoreError]);

  const deleteTopic = useCallback(async (id) => {
    try {
      await deleteDoc(doc(db, 'topics', id));
      toast.info('Topic removed');
    } catch (error) {
      handleFirestoreError(error, 'delete topic');
    }
  }, [handleFirestoreError]);
  const [revisions, setRevisions] = useState([]);

  // ── Notes ─────────────────────────────────────────────────────────
  const addNote = useCallback(async (noteData) => {
    if (!currentUser) return;
    try {
      const docRef = await addDoc(collection(db, 'notes'), {
        ...noteData,
        userId: currentUser.uid,
        createdAt: new Date(),
      });
      toast.success('Note saved to database!');
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, 'save note');
    }
  }, [currentUser, handleFirestoreError]);

  const updateNote = useCallback(async (id, data) => {
    try {
      const docRef = doc(db, 'notes', id);
      await updateDoc(docRef, data);
    } catch (error) {
      handleFirestoreError(error, 'update note');
    }
  }, [handleFirestoreError]);

  const deleteNote = useCallback(async (id) => {
    try {
      await deleteDoc(doc(db, 'notes', id));
      toast.info('Note deleted');
    } catch (error) {
      handleFirestoreError(error, 'delete note');
    }
  }, [handleFirestoreError]);

  // ── Revisions ─────────────────────────────────────────────────────
  const addRevision = useCallback(async (revisionData) => {
    if (!currentUser) return;
    try {
      await addDoc(collection(db, 'revisions'), {
        ...revisionData,
        userId: currentUser.uid,
        createdAt: new Date(),
        done: false
      });
    } catch (error) {
      handleFirestoreError(error, 'schedule revision');
    }
  }, [currentUser, handleFirestoreError]);

  const updateRevision = useCallback(async (id, data) => {
    try {
      const docRef = doc(db, 'revisions', id);
      await updateDoc(docRef, data);
    } catch (error) {
      handleFirestoreError(error, 'update revision');
    }
  }, [handleFirestoreError]);

  const deleteRevision = useCallback(async (id) => {
    try {
      await deleteDoc(doc(db, 'revisions', id));
    } catch (error) {
      handleFirestoreError(error, 'delete revision');
    }
  }, [handleFirestoreError]);

  // Real-time synchronization
  useEffect(() => {
    if (!currentUser) {
      setSubjects([]);
      setTasks([]);
      setTopics([]);
      setRevisions([]);
      setNotes([]);
      return;
    }

    const unsubSubjects = onSnapshot(query(collection(db, 'subjects'), where('userId', '==', currentUser.uid)), (snap) => {
      setSubjects(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubTasks = onSnapshot(query(collection(db, 'tasks'), where('userId', '==', currentUser.uid)), (snap) => {
      setTasks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubTopics = onSnapshot(query(collection(db, 'topics'), where('userId', '==', currentUser.uid)), (snap) => {
      setTopics(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubRevisions = onSnapshot(query(collection(db, 'revisions'), where('userId', '==', currentUser.uid)), (snap) => {
      setRevisions(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubNotes = onSnapshot(query(collection(db, 'notes'), where('userId', '==', currentUser.uid)), (snap) => {
      setNotes(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubSubjects();
      unsubTasks();
      unsubTopics();
      unsubRevisions();
      unsubNotes();
    };
  }, [currentUser]);

  // Derived state (optimization)
  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.done).length;
    const pending = total - completed;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, progress };
  }, [tasks]);

  const value = useMemo(() => ({
    subjects,
    topics,
    tasks,
    loading,
    taskStats,
    fetchSubjects,
    addSubject,
    updateSubject,
    deleteSubject,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    fetchTopics,
    addTopic,
    updateTopic,
    deleteTopic,
    revisions,
    addRevision,
    updateRevision,
    deleteRevision,
    notes,
    addNote,
    updateNote,
    deleteNote,
  }), [
    subjects, topics, tasks, loading, taskStats,
    fetchSubjects, addSubject, updateSubject, deleteSubject,
    fetchTasks, addTask, updateTask, deleteTask,
    fetchTopics, addTopic, updateTopic, deleteTopic,
    revisions, addRevision, updateRevision, deleteRevision,
    notes, addNote, updateNote, deleteNote
  ]);

  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  );
}
