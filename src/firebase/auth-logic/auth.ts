import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "..";
import { toast } from "react-toastify";
import { collection, doc, getDoc } from "firebase/firestore";
import { useMainContext } from "@/context/MainContext";
import { MainContextType } from "@/types";


// Sign up new user
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDocRef = doc(db, "users", userCredential.user.uid);
    const userDataSnapShot = await getDoc(userDocRef);
    const userData = userDataSnapShot.data();

    toast("Login successful", { type: "success", autoClose: 1000 });

    return { authUser: userCredential.user, ...userData };
  } catch (error: any) {
    toast(`Login Error: ${error?.message}`, { type: "error" });
    return null; // Always return something
  }
};


// Log out user
export const logOut = async () => {
  try {
    sessionStorage.clear()

    await signOut(auth);
    toast("Logout Successfully", { type: "info" })
    window.location.replace("/auth/")
  } catch (error) {
    throw error;
  }
};

// Check authentication state
export const onAuthStateChangedListener = (callback: (user: any | null) => void) => {
  return onAuthStateChanged(auth, callback);
};


