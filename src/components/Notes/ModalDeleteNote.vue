<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div ref="modalCardRef" class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button @click="closeModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button @click="closeModal" class="button">Cancel</button>
        <button class="button is-danger">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
// Imports
import { onMounted, onUnmounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
});

// Emits
const emit = defineEmits(["update:modelValue"]);

// Close modal
const closeModal = () => {
  emit("update:modelValue", false);
};

// Close outside to close Modal
const modalCardRef = ref(null);

//element target to close
onClickOutside(modalCardRef, closeModal);

// Keyboard control close modal
const handleKeyboardListener = (e) => {
  if (e.key === "Escape") closeModal();
};
onMounted(() => {
  document.addEventListener("keyup", handleKeyboardListener);
});
//as the addEventListener keeps living, we must stop it after the modal is closed (unmounted)
onUnmounted(() => {
  document.removeEventListener("keyup", handleKeyboardListener);
});
</script>
