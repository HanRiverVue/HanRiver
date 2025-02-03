<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
  },
  text: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['click']);

const baseClass = 'rounded-md text-sm';

const buttonClass = computed(() => {
  const additionalClass = props.class;
  switch (props.type) {
    case 'primary':
      return `${baseClass} ${additionalClass} bg-primary-1 text-white hover:bg-primary-hover`;
    case 'secondary':
      return `${baseClass} ${additionalClass} bg-white hover:bg-gray-20 text-primary-1 border border-solid border-primary-1`;
    case 'cancel':
      return `${baseClass} ${additionalClass} bg-white   text-accent-error border border-solid border-accent-error`;
    case 'disabled':
      return `${baseClass} ${additionalClass} bg-gray-30 text-white`;
    case 'disabled2':
      return `${baseClass} ${additionalClass} bg-white text-gray-30 border border-solid border-gray-30`;
    default:
      return `${additionalClass}`;
  }
});
const handleClick = (event) => {
  if (event && event.stopPropagation) {
    event.stopPropagation();
  }
  emit('click', event);
};
</script>

<template>
  <button :class="buttonClass" @click="handleClick">{{ props.text }}</button>
</template>
