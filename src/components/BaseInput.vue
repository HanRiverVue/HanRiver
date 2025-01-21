<script setup>
import { twMerge } from 'tailwind-merge';
import { ref, computed } from 'vue';

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
  maxLength: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(['input']);
const isFocused = ref(false);

const styleClass = computed(() =>
  twMerge(
    'input-shadow w-full rounded-lg flex gap-1.5 items-center border border-transparent focus-within:border-primary-3 px-4 py-3 bg-white',
    props.className,
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
</script>
<template>
  <div :class="styleClass">
    <slot name="leftIcon"></slot>
    <input
      :value="props.value"
      :type="props.type"
      :placeholder="props.placeholder"
      class="w-full text-gray-80 placeholder:text-gray-40 bg-transparent"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <slot name="rightIcon"></slot>
  </div>
</template>
