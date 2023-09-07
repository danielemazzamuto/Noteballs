import { defineStore } from "pinia";
import { computed, ref } from "vue";
//Importing Firebase DB
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { db } from "@/js/firebase.js";

const notesCollectionRef = collection(db, "notes");
const noteCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));

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

  const notesLoaded = ref(false);

  //Get notes from Firebase DB
  const getNotes = async () => {
    notesLoaded.value = false;
    // Realtime DB - Keeps listening for changes all time
    onSnapshot(noteCollectionQuery, (querySnapshot) => {
      const snapNotes = [];
      querySnapshot.forEach((doc) => {
        const note = {
          id: doc.id,
          content: doc.data().content,
          date: doc.data().date,
        };
        snapNotes.push(note);
      });

      notes.value = snapNotes;
      notesLoaded.value = true;
    });
  };

  const addNote = async (noteContent) => {
    const currentDate = new Date().getTime();
    const date = currentDate.toString();

    await addDoc(notesCollectionRef, {
      date,
      content: noteContent,
    });
  };

  const deleteNote = async (idToDelete) => {
    await deleteDoc(doc(notesCollectionRef, idToDelete));
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
    await updateDoc(doc(notesCollectionRef, idToUpdate), {
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
    notesLoaded,
  };
});
