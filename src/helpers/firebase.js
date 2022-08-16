// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT8GDkepJH1GGu2qCxZRJQ_uokrgsU77A",
  authDomain: "entertainment-web-app-1351d.firebaseapp.com",
  projectId: "entertainment-web-app-1351d",
  storageBucket: "entertainment-web-app-1351d.appspot.com",
  messagingSenderId: "508487331447",
  appId: "1:508487331447:web:d94574aa16f772278c2072",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage(app);

// Create a storage reference from our storage service
// const storageRef = ref(storage, "images");

export const uploadFile = async (file) => {
  const fileRef = ref(storage, `images/users/${file.name}`);

  await uploadBytes(fileRef, file);

  return await getDownloadURL(fileRef);
};

export const LogOut = async () => {
  await signOut(auth);
};
