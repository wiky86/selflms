import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { StudyGroup } from "@/types";

const COLLECTION_NAME = "studies";

export async function getStudies(): Promise<StudyGroup[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("topic", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StudyGroup));
  } catch (error) {
    console.error("Error fetching studies:", error);
    return [];
  }
}

export async function addStudy(item: Omit<StudyGroup, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), item);
  return docRef.id;
}

export async function deleteStudy(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
