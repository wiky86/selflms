import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { Notice } from "@/types";

const COLLECTION_NAME = "notices";

export async function getNotices(): Promise<Notice[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notice));
  } catch (error) {
    console.error("Error fetching notices:", error);
    return [];
  }
}

export async function addNotice(notice: Omit<Notice, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), notice);
  return docRef.id;
}

export async function updateNotice(id: string, notice: Partial<Notice>): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, notice);
}

export async function deleteNotice(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
