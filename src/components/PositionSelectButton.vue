<script setup>
import { twMerge } from 'tailwind-merge';
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    required: true,
    validator: (value) => ['large', 'small'].includes(value),
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['click']);

const sizeClass = {
  small: 'px-3 py-1.5 flex-1 basis-0 max-w-[100px] min-w-fit',
  large: 'py-2.5 w-[120px] h-11',
};

const activeClass = {
  selected: 'bg-secondary-2 text-primary-3 border-primary-3',
  nonSelected: 'bg-white text-gray-80 border-transparent',
};

const styleClass = computed(() =>
  twMerge(
    'border input-shadow w-full rounded-[10px] body-large-m whitespace-nowrap',
    sizeClass[props.size],
    props.isSelected ? activeClass.selected : activeClass.nonSelected,
    props.class,
  ),
);
</script>
<template>
  <button type="button" :class="styleClass" @click="emit('click')">
    <slot></slot>
  </button>
</template>
<style scoped></style>
