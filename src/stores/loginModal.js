import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoginModalStore = defineStore('loginModal', () => {
  const loginModal = ref(false);
  const setLoginModal = (state) => {
    loginModal.value = state;
  };
  return { loginModal, setLoginModal };
});
