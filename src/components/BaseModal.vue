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
  baseModal.hideModal();
};
</script>

<template>
  <!-- 흐린 배경 -->
  <div
    class="w-full h-full fixed top-0 left-0 flex justify-center items-center z-50 bg-black/50 backdrop-blur-sm"
  >
    <div
      class="py-8 px-12 w-[330px] max-w-[330px] flex flex-col items-start gap-[10px] absolute top-1/2 left-1/2 rounded-[20px] transform: -translate-x-1/2 -translate-y-1/2 bg-secondary-2"
    >
      <div class="flex flex-col items-center gap-4 self-stretch">
        <p class="h4-b text-gray-70">
          {{ title }}
        </p>
        <div class="flex gap-4 w-full mt-4">
          <button
            class="body-r bg-white/70 text-gray-70 modal-button-shadow p-2 rounded-lg flex-grow"
            @click="handleCancel"
          >
            {{ cancelText }}
          </button>
          <button
            class="body-r bg-primary-1/80 modal-button-shadow text-white p-2 rounded-lg flex-grow"
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
