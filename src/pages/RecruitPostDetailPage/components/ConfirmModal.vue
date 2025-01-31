<script setup>
defineProps({
  message: String,
});

const emit = defineEmits(['confirm', 'close']);

const confirm = () => {
  emit('confirm');
};

const close = () => {
  emit('close');
};
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded-md shadow-md">
      <p>{{ message }}</p>
      <div class="flex justify-end mt-4">
        <button @click="close" class="mr-4">취소</button>
        <button @click="confirm" class="text-red-500">확인</button>
      </div>
    </div>
  </div>
</template>
