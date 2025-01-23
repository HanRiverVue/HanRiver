<script setup>
import { twMerge } from 'tailwind-merge';
import { computed } from 'vue';

const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
  activeIndex: {
    type: Number,
    required: true,
  },
});

const activeClass = {
  selected:
    'text-primary-3 after:content-[""] after:block after:w-full after:h-[2px] after:bg-primary-3 after:mt-[2px]',
  nonSelected:
    'text-gray-50 after:content-[""] after:block after:w-full after:h-[2px] after:bg-transparent after:mt-[4px]',
};

const styleClass = computed(() => {
  return (index) =>
    twMerge(
      'cursor-pointer',
      props.activeIndex === index ? activeClass.selected : activeClass.nonSelected,
    );
});

const emit = defineEmits(['update:activeIndex']);
</script>
<template>
  <div class="w-full">
    <nav>
      <ul class="flex gap-[12px] text-gray-50 body-b">
        <li
          v-for="(item, index) in props.menuItems"
          :key="index"
          :class="styleClass(index)"
          @click="emit('update:activeIndex', index)"
        >
          {{ item }}
        </li>
      </ul>
    </nav>
  </div>
</template>
<style scoped></style>
