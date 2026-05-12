import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { Resource } from "@/types";

const COLLECTION_NAME = "resources";

export async function getResources(): Promise<Resource[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("title", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Resource));
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
}

export async function addResource(resource: Omit<Resource, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), resource);
  return docRef.id;
}

export async function updateResource(id: string, resource: Partial<Resource>): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, resource);
}

export async function deleteResource(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
