import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotesStore = defineStore("storeNotes", () => {
  const notes = ref([
    {
      id: "id1",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam mollitia rerum reiciendis maxime in provident debitis nam amet nesciunt, animi ducimus, necessitatibus aliquam repellat eius consequuntur, quibusdam nihil neque beatae.",
    },
    {
      id: "id2",
      content: "This is a shorter note! Woo!",
    },
  ]);

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

  const getNoteContent = (id) => {
    const noteFound = notes.value.find((note) => note.id === id);
    return noteFound.content;
  };

  const updateNote = (idToUpdate, newContent) => {
    notes.value = notes.value.map((obj) => {
      if (obj.id === idToUpdate) return { ...obj, content: newContent };
      return obj;
    });
  };

  return { notes, addNote, deleteNote, getNoteContent, updateNote };
});
