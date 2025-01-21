<script setup>
import { ref } from 'vue';
import dropdownArrow from '@/assets/icons/dropdown_arrow.svg';

const isDropdownOpen = ref(false);
const handleDropdownClick = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selected = ref(null);
// 선택됐을 때 버튼 스타일
const selectedStyle = computed(() =>
  selected.value ? 'bg-primary text-white' : 'bg-gray-50 text-gray-50',
);
// 선택한 아이템
const handleSelectClick = (item) => {
  if (selected.value === item) {
    selected.value = null;
    return;
  } else {
    selected.value = item;
    isDropdownOpen.value = false;
  }
};

// 데이터 변경
const items = [
  { id: 1, name: '서울특별시' },
  { id: 2, name: '인천광역시' },
  { id: 3, name: '대전광역시' },
];
</script>
<template>
  <div class="w-[250px]">
    <div class="relative">
      <!-- 셀렉트 박스 버튼 -->
      <button
        :class="[
          'flex items-center justify-between min-w-[126px] w-full py-1 pl-3 pr-[6px] rounded-lg input-shadow body-r text-gray-50',
          selectedStyle,
        ]"
        @click="handleDropdownClick"
      >
        <span>{{ selected || '옵션 선택' }}</span>
        <img class="w-6 h-6" :src="dropdownArrow" alt="드롭다운 화살표" />
      </button>
      <!-- 드롭다운 메뉴 -->
      <ul
        v-if="isDropdownOpen"
        class="absolute flex flex-col min-w-[126px] w-full my-1 rounded-lg input-shadow body-r text-gray-50 top top-[38px]"
      >
        <li
          v-for="item in items"
          class="px-4 py-1 hover:bg-secondary-3"
          :key="item.id"
          @click="handleSelectClick(item.name)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
* {
  border: 1px solid rgb(138, 144, 252);
}
</style>
