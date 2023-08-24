import { watch } from "vue";

export const useWatchCharacters = (valToWatch, maxChars = 100) => {
  watch(valToWatch, (newVal) => {
    if (newVal.length === maxChars)
      alert(`Only ${maxChars} characters allowed!`);
  });
};
