<script setup>
import { twMerge } from 'tailwind-merge';
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  className: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['input']);

const styleClass = computed(() =>
  twMerge(
    'input-shadow rounded-lg flex gap-1.5 items-center border border-transparent focus-within:border-primary-3 px-4 py-3',
    props.className,
  ),
);
</script>
<template>
  <div :class="styleClass">
    <slot name="leftIcon"></slot>
    <input
      :value="props.value"
      :type="props.type"
      :placeholder="props.placeholder"
      class="w-full text-gray-80 placeholder:text-gray-40"
      @input="($event) => emit('input', $event)"
    />
    <slot name="rightIcon"></slot>
  </div>
</template>
