<script setup>
import { twMerge } from 'tailwind-merge';
import { ref, computed, watch } from 'vue';

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
  class: {
    type: String,
    default: '',
  },
  maxLength: {
    type: Number,
    default: null,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['input', 'keydown']);
const isFocused = ref(false);
const inputRef = ref(null);

const styleClass = computed(() =>
  twMerge(
    'input-shadow w-full rounded-lg flex gap-1.5 items-center border border-transparent focus-within:border-primary-3 px-4 py-3 bg-white',
    props.class,
    props.value && 'border border-primary-3',
  ),
);

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};

const handleInput = (event) => {
  if (props.maxLength && event.target.value.length > props.maxLength) {
    event.target.value = event.target.value.slice(0, props.maxLength);
  }
  emit('input', event.target.value);
};

const handleKeydown = (event) => {
  emit('keydown', event);
};
</script>
<template>
  <div :class="styleClass">
    <slot name="leftIcon" :isFocused="isFocused"></slot>
    <input
      ref="inputRef"
      :value="props.value"
      :type="props.type"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
      class="w-full bg-transparent text-gray-80 placeholder:text-gray-40"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    />
    <slot name="rightIcon" :isFocused="isFocused"></slot>
  </div>
</template>
