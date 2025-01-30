import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationModalStore = defineStore('notificationModal', () => {
  const isNotificationModalOpen = ref(false);
  const openNotificationModal = () => {
    isNotificationModalOpen.value = true;
  };
  const closeNotificationModal = () => {
    isNotificationModalOpen.value = false;
  };

  return {
    isNotificationModalOpen,
    openNotificationModal,
    closeNotificationModal,
  };
});
