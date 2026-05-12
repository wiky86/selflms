import { db } from "../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { JobInfo } from "@/types";

const COLLECTION_NAME = "jobs";

export async function getJobs(): Promise<JobInfo[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("endDate", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobInfo));
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function addJob(item: Omit<JobInfo, "id">): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), item);
  return docRef.id;
}

export async function deleteJob(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
