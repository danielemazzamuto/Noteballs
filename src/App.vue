<template>
  <NavBar></NavBar>

  <div class="container is-max-desktop px-2 py-4">
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import NavBar from "@/components/Layout/NavBar.vue";
import { useNotesStore } from "@/stores/storeNotes.js";

const storeNotes = useNotesStore();

onMounted(() => {
  storeNotes.getNotes();
});
</script>

<style>
@import "bulma/css/bulma.min.css";
</style>
