import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { PortfolioLink } from "@/types";

const COLLECTION_NAME = "portfolioLinks";

export async function getPortfolioLinks(): Promise<PortfolioLink[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("title", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PortfolioLink));
  } catch (error) {
    console.error("Error fetching portfolio links:", error);
    return [];
  }
}

export async function addPortfolioLink(item: Omit<PortfolioLink, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), item);
  return docRef.id;
}

export async function deletePortfolioLink(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
