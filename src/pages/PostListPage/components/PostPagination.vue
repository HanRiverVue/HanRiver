<script setup>
import { twMerge } from 'tailwind-merge';
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['change']);

const pageNumbers = computed(() => {
  const start = Math.floor((props.currentPage - 1) / 5) * 5 + 1;
  const end = Math.min(start + 4, props.totalPage);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
});

const getButtonStyleClass = (page) =>
  twMerge(
    'input-shadow bg-white text-primary-2 body-large-m px-3 py-1 rounded-md disabled:text-gray-30',
    props.currentPage === page && 'bg-primary-2 text-white',
  );
</script>
<template>
  <section class="flex gap-1.5">
    <button
      type="button"
      :disabled="currentPage === 1"
      :class="getButtonStyleClass()"
      @click="emit('change', currentPage - 1)"
    >
      이전
    </button>
    <button
      type="button"
      v-for="page in pageNumbers"
      :key="page"
      :class="getButtonStyleClass(page)"
      @click="emit('change', page)"
    >
      {{ page }}
    </button>
    <button
      type="button"
      :disabled="currentPage === totalPage"
      :class="getButtonStyleClass()"
      @click="emit('change', currentPage + 1)"
    >
      다음
    </button>
  </section>
</template>
<style scoped></style>
