import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { ContactInfo } from "@/types";

const COLLECTION_NAME = "contacts";

export async function getContacts(): Promise<ContactInfo[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("category", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactInfo));
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
}

export async function addContact(item: Omit<ContactInfo, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), item);
  return docRef.id;
}

export async function deleteContact(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
