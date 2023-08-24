<template>
  <div class="notes">
    <AddEditNote ref="addEditNoteRef" v-model="newNote">
      <template #buttons>
        <button :disabled="!newNote" @click="addNote" class="button is-link">
          Add New Note
        </button>
      </template>
    </AddEditNote>

    <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup>
/*
    Imports
*/
import { ref } from "vue";
import Note from "@/components/Notes/Note.vue";
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useNotesStore } from "@/stores/storeNotes.js";
import { useWatchCharacters } from "@/use/useWatchCharacters.js";

/*
    store
*/
const storeNotes = useNotesStore();

/*
    Notes
*/
const newNote = ref("");
const addEditNoteRef = ref(null);

const addNote = () => {
  //addNote to the Store - by triggering the store method
  storeNotes.addNote(newNote.value);
  //clear input textarea
  newNote.value = "";
  addEditNoteRef.value.focusTextarea();
};

// Watch characters - composable
useWatchCharacters(newNote, 100);
</script>
