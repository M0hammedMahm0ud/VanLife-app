import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  where,
  query,
} from "firebase/firestore/lite";

// web app Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDErVaA5pl6kGajTbyGYlCgMSaM_xW8jfE",
  authDomain: "vanlife-433ad.firebaseapp.com",
  projectId: "vanlife-433ad",
  storageBucket: "vanlife-433ad.firebasestorage.app",
  messagingSenderId: "890378739054",
  appId: "1:890378739054:web:a8c366f19fb1f03dbef57f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vansCollectionRef = collection(db, "vans");

// ==================================================================

export async function getVans() {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const vanSnapshot = await getDoc(docRef);
  const singleVan = {
    ...vanSnapshot.data(),
    id: vanSnapshot.id,
  };
  return singleVan;
}
export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"));
  const querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
