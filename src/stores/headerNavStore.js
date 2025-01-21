import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHeaderNavStore = defineStore('headerNav', () => {
  const navigateTarget = ref('');
  const setNavigate = (value) => {
    navigateTarget.value = value;
  };

  return {
    navigateTarget,
    setNavigate,
  };
});
