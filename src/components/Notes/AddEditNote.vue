<template>
  <div class="card p-4 mb-5">
    <label class="has-text-primary" v-if="label">{{ label }}</label>

    <div class="field">
      <div class="control">
        <textarea
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          placeholder="Add a new note"
          ref="textareaRef"
          v-autofocus
        ></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
// Imports
import { ref } from "vue";

// Props
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
});

// Emits
const emit = defineEmits(["update:modelValue"]);

// Focus Textarea
const textareaRef = ref(null);

const focusTextarea = () => {
  textareaRef.value.focus();
};
// make the function available to its parent component
defineExpose({
  focusTextarea,
});

// Directives
const vAutofocus = {
  mounted: (el) => el.focus(),
};
</script>
