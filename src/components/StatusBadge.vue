<script setup>
import { computed, defineProps } from 'vue';
import { twMerge } from 'tailwind-merge';

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => ['success', 'warning', 'danger', 'done'].includes(value),
  },
});

const statusColor = {
  success: 'bg-[#F2FFF3] text-[#4AB556] border-[#4AB556]',
  warning: 'bg-[#FFFAEE] text-[#FFB908] border-[#FFB908]',
  danger: 'bg-[#FFE9E9] text-[#FF4242] border-[#FF4242]',
  done: 'bg-gray-5 text-gray-50 border-gray-50',
};

const styleClass = computed(() =>
  twMerge('caption-b py-1 border rounded-full px-2.5 justify-center', statusColor[props.status]),
);
</script>
<template>
  <span :class="styleClass">
    <slot></slot>
  </span>
</template>
<style scoped></style>
