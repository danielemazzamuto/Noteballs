import { defineStore } from "pinia";
import { reactive } from "vue";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "@/js/firebase.js";
import { useNotesStore } from "@/stores/storeNotes.js";

export const useStoreAuth = defineStore("storeAuth", () => {
  const data = reactive({
    user: {},
  });

  //Do not use arrow function if we use this. keyword inside the store
  async function init() {
    const storeNotes = useNotesStore();
    onAuthStateChanged(auth, (authUser) => {
      //User is signed in
      if (authUser) {
        data.user.id = authUser.uid;
        data.user.email = authUser.email;
        this.router.push("/");
        storeNotes.init();
      } else {
        // User is signed out
        data.user = {};
        this.router.replace("/auth");
        storeNotes.clearNotes();
      }
    });
  }

  //Register user
  const registerUser = async (credentials) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      // Signed in
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const loginUser = async (credentials) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      // Signed in
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      console.log("signed out");
    } catch (error) {
      console.error(error.message);
    }
  };

  return { registerUser, loginUser, logoutUser, init, data };
});
