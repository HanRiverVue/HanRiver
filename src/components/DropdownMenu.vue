<script setup>
import { twMerge } from 'tailwind-merge';
import { defineProps, defineEmits, ref, computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  dropdownList: {
    type: Array,
    required: true,
  },
  class: {
    type: String,
    default: '',
  },
});

const emit = defineEmits('onClose');
const menuRef = ref(null);

const styleClass = computed(() =>
  twMerge('absolute rounded bg-secondary-3 px-4 py-1.5 input-shadow w-fit h-fit', props.class),
);

const handleDropdownItemClick = (item) => {
  item.action();
  emit('onClose');
};
</script>
<template>
  <section v-if="props.isOpen" :class="styleClass" ref="menuRef">
    <ul class="flex flex-col gap-2.5 items-center">
      <li v-for="(item, index) in props.dropdownList" :key="index">
        <button
          type="button"
          class="text-gray-80 body-m hover:text-primary-3 whitespace-nowrap"
          @click="handleDropdownItemClick(item)"
        >
          {{ item.label }}
        </button>
      </li>
    </ul>
  </section>
</template>
<style scoped></style>
