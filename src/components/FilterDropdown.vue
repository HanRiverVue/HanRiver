<script setup>
import { computed, ref } from 'vue';
import dropdownArrow from '@/assets/icons/dropdown_arrow.svg';

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator(value) {
      return value.every((item) => 'id' in item && 'name' in item);
    },
  },
  defaultText: {
    type: String,
    default: '옵션 선택',
  },
  selected: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['click:select']);

// 임시 데이터
// const items = [
//   { id: 1, name: '서울특별시' },
//   { id: 2, name: '인천광역시' },
//   { id: 3, name: '대전광역시' },
// ];

// 드롭다운 상태
const isDropdownOpen = ref(false);
const handleDropdownClick = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// 선택한 아이템
const selected = ref(null);
const handleSelectClick = (item) => {
  if (selected.value === item) {
    selected.value = null;
    emit('click:select', null);
    return;
  } else {
    selected.value = item;
    emit('click:select', item); // 부모로 선택된 값 전달
    isDropdownOpen.value = false;
  }
};
</script>
<template>
  <div class="w-inherit">
    <div class="relative">
      <!-- 셀렉트 박스 버튼 -->
      <button
        :class="[
          'flex items-center justify-between min-w-[126px] w-full py-1 pl-3 pr-[6px] rounded-lg bg-white input-shadow body-r text-gray-50',
          { 'border border-primary-3 text-primary-3': selected },
        ]"
        @click="handleDropdownClick"
      >
        <span>{{ selected || defaultText }}</span>
        <img class="w-6 h-6" :src="dropdownArrow" alt="드롭다운 화살표" />
      </button>
      <!-- 드롭다운 메뉴 -->
      <ul
        v-if="isDropdownOpen"
        class="absolute flex flex-col min-w-[126px] w-full my-1 rounded-lg bg-white input-shadow body-r text-gray-50 top top-[38px]"
      >
        <li
          v-for="item in items"
          :class="[
            'px-4 py-1 hover:bg-secondary-3',
            {
              'text-primary-3': selected === item.name,
            },
          ]"
          :key="item.id"
          @click="handleSelectClick(item.name)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped></style>
