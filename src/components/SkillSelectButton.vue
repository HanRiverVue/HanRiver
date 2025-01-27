<script setup>
import { twMerge } from 'tailwind-merge';
import { computed } from 'vue';

const props = defineProps({
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const activeClass = {
  selected: 'bg-secondary-2 text-primary-3 border-primary-3',
  nonSelected: 'bg-white text-gray-80 border-gray-30',
};

const styleClass = computed(() =>
  twMerge(
    'w-fit flex items-center gap-1.5 p-1.5 pr-2.5 rounded-full border hover:bg-secondary-1',
    props.isSelected ? activeClass.selected : activeClass.nonSelected,
  ),
);
</script>
<template>
  <button type="button" :class="styleClass" @click="emit('click')">
    <slot name="icon" :className="'w-6 h-6'"></slot>
    <slot class="text-gray-80 caption-r"></slot>
  </button>
</template>
<style scoped></style>
