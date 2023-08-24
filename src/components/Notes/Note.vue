<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light mt-2">
          <small>{{ characterLength }} </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/editNote/${note.id}`" href="#" class="card-footer-item"
        >Edit</RouterLink
      >
      <a
        @click.prevent="modals.deleteNote = true"
        href="#"
        class="card-footer-item"
        >Delete</a
      >
    </footer>
    <ModalDeleteNote v-if="modals.deleteNote" v-model="modals.deleteNote" />
  </div>
</template>

<script setup>
// IMPORTS
import { computed, reactive } from "vue";
import { useNotesStore } from "@/stores/storeNotes.js";
import ModalDeleteNote from "@/components/Notes/ModalDeleteNote.vue";

/*
    store
*/
const storeNotes = useNotesStore();

// PROPS
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

// CHARACTERS LENGTH
const characterLength = computed(() => {
  const length = props.note.content.length;
  const char = length < 2 ? "character" : "characters";
  return `${length} ${char}`;
});

// MODALS
const modals = reactive({
  deleteNote: false,
});
</script>
