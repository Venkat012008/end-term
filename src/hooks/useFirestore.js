import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  where 
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

export function useFirestore(collectionName) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, collectionName),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setDocs(items);
      setLoading(false);
    });

    return unsubscribe;
  }, [collectionName, currentUser]);

  const add = async (data) => {
    return await addDoc(collection(db, collectionName), {
      ...data,
      userId: currentUser.uid,
      createdAt: new Date()
    });
  };

  const update = async (id, data) => {
    const docRef = doc(db, collectionName, id);
    return await updateDoc(docRef, data);
  };

  const remove = async (id) => {
    const docRef = doc(db, collectionName, id);
    return await deleteDoc(docRef);
  };

  return { docs, loading, add, update, remove };
}
