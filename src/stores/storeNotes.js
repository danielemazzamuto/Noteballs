import { defineStore } from "pinia";
import { computed, ref } from "vue";
//Importing Firebase DB
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/js/firebase.js";

const notesCollection = collection(db, "notes");

export const useNotesStore = defineStore("storeNotes", () => {
  const currentNoteId = ref(null);

  const notes = ref([
    // {
    //   id: "id1",
    //   content:
    //     "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam mollitia rerum reiciendis maxime in provident debitis nam amet nesciunt, animi ducimus, necessitatibus aliquam repellat eius consequuntur, quibusdam nihil neque beatae.",
    // },
    // {
    //   id: "id2",
    //   content: "This is a shorter note! Woo!",
    // },
  ]);

  //Get notes from Firebase DB
  const getNotes = async () => {
    // Realtime DB - Keeps listening for changes all time
    onSnapshot(notesCollection, (querySnapshot) => {
      const snapNotes = [];
      querySnapshot.forEach((doc) => {
        const note = {
          id: doc.id,
          content: doc.data().content,
        };
        snapNotes.push(note);
      });
      notes.value = snapNotes;
    });
  };

  const addNote = async (noteContent) => {
    const currentDate = new Date().getTime();
    const id = currentDate.toString();

    await setDoc(doc(notesCollection, id), {
      content: noteContent,
    });
  };

  const deleteNote = async (idToDelete) => {
    await deleteDoc(doc(notesCollection, idToDelete));
  };

  //We need to define the currentNoteId as a ref here, between the store and child component
  // in order to pass it to the computed method, as computed DON'T ACCEPT params
  const getNoteContent = computed(() => {
    const noteFound = notes.value.find(
      (note) => note.id === currentNoteId.value
    );
    return noteFound?.content;
  });

  const updateNote = async (idToUpdate, newContent) => {
    await updateDoc(doc(notesCollection, idToUpdate), {
      content: newContent,
    });
  };

  const totalNotesCount = computed(() => notes.value.length);

  const totalNotesCharacters = computed(() =>
    notes.value.reduce((acc, obj) => acc + obj.content.length, 0)
  );

  return {
    notes,
    addNote,
    deleteNote,
    getNoteContent,
    updateNote,
    currentNoteId,
    totalNotesCount,
    totalNotesCharacters,
    getNotes,
  };
});
