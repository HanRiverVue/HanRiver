<script setup>
import { defineProps, defineEmits } from 'vue';

// props 받기
const props = defineProps({
  isOpen: Boolean,
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits();

// 드롭다운 닫기
const closeDropdown = () => {
  emit('update:isOpen', false);
};
</script>

<template>
  <div class="relative">
    <!-- 외부에서 클릭할 버튼을 슬롯으로 받음 -->
    <slot name="button"></slot>

    <!-- 드롭다운 메뉴 -->
    <div v-if="props.isOpen" class="absolute mt-2 w-23 h-13 bg-white shadow-md rounded-1">
      <ul class="flex flex-col">
        <li v-for="(item, index) in props.items" :key="index">
          <button
            class="w-full text-left px-4 h-8 text-sm hover:text-primary-3 rounded-1"
            @click="
              () => {
                item.action();
                closeDropdown();
              }
            "
          >
            {{ item.label }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
