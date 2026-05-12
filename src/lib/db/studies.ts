import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { Study } from "@/types";

const COLLECTION_NAME = "studies";

export async function getStudies(): Promise<Study[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("topic", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Study));
  } catch (error) {
    console.error("Error fetching studies:", error);
    return [];
  }
}

export async function addStudy(item: Omit<Study, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), item);
  return docRef.id;
}

export async function deleteStudy(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
