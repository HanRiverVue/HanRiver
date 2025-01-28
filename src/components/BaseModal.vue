<script setup>
import { useBaseModalStore } from '@/stores/baseModal';
import { storeToRefs } from 'pinia';

const baseModal = useBaseModalStore();

const { title, confirmText, cancelText } = storeToRefs(baseModal);

const handleConfirm = () => {
  baseModal.onConfirm();
  baseModal.hideModal();
};
const handleCancel = () => {
  baseModal.onCancel && baseModal.onCancel();
  baseModal.hideModal();
};
</script>

<template>
  <!-- 흐린 배경 -->
  <div
    class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm"
  >
    <div
      class="py-8 px-12 w-[330px] max-w-[330px] flex flex-col items-start gap-[10px] absolute top-1/2 left-1/2 rounded-[20px] transform -translate-x-1/2 -translate-y-1/2 bg-secondary-2"
    >
      <div class="flex flex-col items-center self-stretch gap-4">
        <p class="h4-b text-gray-70">
          {{ title }}
        </p>
        <div class="flex w-full gap-4 mt-4">
          <button
            class="flex-grow p-2 rounded-lg body-r bg-white/70 text-gray-70 modal-button-shadow"
            @click="handleCancel"
          >
            {{ cancelText }}
          </button>
          <button
            class="flex-grow p-2 text-white rounded-lg body-r bg-primary-1/80 modal-button-shadow"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
