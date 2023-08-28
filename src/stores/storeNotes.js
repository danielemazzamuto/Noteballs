import { defineStore } from "pinia";
import { computed, ref } from "vue";
//Importing Firebase DB
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/js/firebase.js";

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
    const querySnapshot = await getDocs(collection(db, "notes"));
    querySnapshot.forEach((doc) => {
      const note = {
        id: doc.id,
        content: doc.data().content,
      };
      notes.value.push(note);
    });
  };

  const addNote = (noteContent) => {
    const currentDate = new Date().getTime();
    const id = currentDate.toString();

    const note = {
      id,
      content: noteContent,
    };
    notes.value.unshift(note);
  };

  const deleteNote = (idToDelete) => {
    notes.value = notes.value.filter((note) => note.id !== idToDelete);
  };

  //We need to define the currentNoteId as a ref here, between the store and child component
  // in order to pass it to the computed method, as computed DON'T ACCEPT params
  const getNoteContent = computed(() => {
    const noteFound = notes.value.find(
      (note) => note.id === currentNoteId.value
    );
    return noteFound?.content;
  });

  const updateNote = (idToUpdate, newContent) => {
    notes.value = notes.value.map((obj) => {
      if (obj.id === idToUpdate) return { ...obj, content: newContent };
      return obj;
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
