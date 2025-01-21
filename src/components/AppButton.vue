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

const baseClass = 'rounded-md text-sm';

const buttonClass = computed(() => {
  const additionalClass = props.class;
  switch (props.type) {
    case 'primary':
      return `${baseClass} ${additionalClass} bg-primary-1 text-white hover:bg-primary-hover`;
    case 'secondary':
      return `${baseClass} ${additionalClass} bg-white hover:bg-gray-20 text-primary-1 border border-solid border-primary-1`;
    case 'disabled':
      return `${baseClass} ${additionalClass} bg-gray-30 text-white`;
  }
});
</script>

<template>
  <button :class="buttonClass">{{ text }}</button>
</template>
