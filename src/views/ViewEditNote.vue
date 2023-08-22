<template>
  <div class="edit-note">
    <AddEditNote label="Edit Note" v-model="noteContent" ref="addEditNoteRef">
      <template #buttons>
        <button @click="$router.back()" class="button is-light mr-3">
          Cancel
        </button>
        <button
          @click="handleSaveClicked"
          :disabled="!noteContent"
          class="button is-link"
        >
          Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<script setup>
// Imports
import { ref } from "vue";
import { useNotesStore } from "@/stores/storeNotes.js";
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useRouter, useRoute } from "vue-router";

//Router
const route = useRoute();
const router = useRouter();

// Note
//2-way binding parent-child with v-model='noteContent'
const noteContent = ref("");

// Store
const storeNotes = useNotesStore();

//Passing the ID route to the currentNoteId in the store file - to be used with computed method
storeNotes.currentNoteId = route.params.id;
//Assign the note content retreived to the text area
noteContent.value = storeNotes.getNoteContent;

// Handler Save Clicked
const handleSaveClicked = () => {
  storeNotes.updateNote(route.params.id, noteContent.value);
  router.push("/");
};
</script>
