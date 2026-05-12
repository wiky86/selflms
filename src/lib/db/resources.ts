import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { LearningResource } from "@/types";

const COLLECTION_NAME = "resources";

export async function getResources(): Promise<LearningResource[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("week", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LearningResource));
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
}

export async function addResource(item: Omit<LearningResource, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), item);
  return docRef.id;
}

export async function updateResource(id: string, resource: Partial<LearningResource>): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, resource);
}

export async function deleteResource(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
