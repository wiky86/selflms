import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { LevelTest } from "@/types";

const COLLECTION_NAME = "levelTests";

export async function getLevelTests(): Promise<LevelTest[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("week", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LevelTest));
  } catch (error) {
    console.error("Error fetching level tests:", error);
    return [];
  }
}

export async function addLevelTest(item: Omit<LevelTest, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), item);
  return docRef.id;
}

export async function deleteLevelTest(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
