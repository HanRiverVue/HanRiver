<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  maxPage: {
    type: Number,
    required: true,
  },
});

// 프로그래스바 길이
const calculateProgressBarWidth = (currentPage, maxPage) => {
  return `${(currentPage / maxPage) * 100}%`;
};
</script>
<template>
  <div class="flex flex-col items-center">
    <span class="leading-6 h4-b text-primary-3">{{ currentPage }} / {{ maxPage }}</span>
    <div class="flex w-full h-3 rounded-full bg-gray-10">
      <div
        :style="{ width: calculateProgressBarWidth(currentPage, maxPage) }"
        class="h-full rounded-full bg-primary-3"
      ></div>
    </div>
  </div>
</template>
<style scoped></style>
