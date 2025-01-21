<script setup>
import { defineProps, defineEmits } from 'vue';

// props 받기
const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits();

// 드롭다운 닫기
const closeDropdown = () => {
  emit('update:modelValue', false);
};

// 메뉴 항목 클릭 이벤트
const navigateToMyPage = () => {
  console.log('마이페이지로 이동');
  closeDropdown();
};

const logout = () => {
  console.log('로그아웃 처리');
  closeDropdown();
};

// 사용할 프로필에 아래 함수를 사용하면 적용됨
// // 드롭다운 상태 관리
// const isDropdownOpen = ref(false);

// // 드롭다운 열기/닫기 토글
// const toggleDropdown = () => {
//   isDropdownOpen.value = !isDropdownOpen.value;
// };
</script>

<template>
  <div class="relative">
    <div
      v-if="props.modelValue"
      class="absolute mt-2 w-23 h-13 bg-white shadow-md rounded-1 z-20 right-0"
    >
      <ul class="flex flex-col">
        <li>
          <button
            class="w-full text-left px-4 h-8 text-sm hover:text-primary-3 rounded-1"
            @click="navigateToMyPage"
            style="white-space: nowrap"
          >
            마이페이지
          </button>
        </li>
        <li>
          <button
            class="w-full text-left px-4 h-8 text-sm hover:text-primary-3 rounded-1"
            @click="logout"
            style="white-space: nowrap"
          >
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
