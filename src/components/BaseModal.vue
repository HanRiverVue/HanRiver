<script setup>
const props = defineProps({
  cancelText: {
    type: String,
    default() {
      return '취소하기';
    },
  },
  sumbitText: {
    type: String,
    default() {
      return '완료하기';
    },
  },
});
const emits = defineEmits(['cancel', 'submit']);

// 신청 취소를 취소할 경우
const handleCancel = () => {
  emits('cancel');
};

const handleSubmit = () => {
  emits('submit');
};
</script>

<template>
  <!-- 흐린 배경 -->
  <div
    class="w-full h-full fixed top-0 left-0 flex justify-center items-center"
    style="background-color: rgba(0, 0, 0, 0.5)"
  >
    <!-- 모달창 (opacity 적용 안됨) -->
    <div
      class="py-8 px-12 w-[330px] max-w-[330px] flex flex-col items-start gap-[10px] absolute top-1/2 left-1/2 rounded-[20px] transform: -translate-x-1/2 -translate-y-1/2 bg-secondary-2"
    >
      <div class="flex flex-col items-center gap-4 self-stretch">
        <p class="h4-b text-gray-70">
          <slot></slot>
        </p>
        <div class="flex gap-4 w-full mt-4">
          <button
            class="body-r bg-white text-gray-70 modal-button-shadow p-2 rounded-lg flex-grow"
            @click="handleCancel"
          >
            {{ cancelText }}
          </button>
          <button
            class="body-r bg-primary-1 modal-button-shadow text-white p-2 rounded-lg flex-grow opacity-80"
            @click="handleSubmit"
          >
            {{ sumbitText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
