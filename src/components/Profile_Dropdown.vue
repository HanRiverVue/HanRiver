<script setup>
import { ref } from 'vue';

// 드롭다운 열림 상태 관리
const isDropdownOpen = ref(false);

// 드롭다운 영역 내에서 닫히지 않도록 처리
let closeTimeout;

const openDropdown = () => {
  if (closeTimeout) clearTimeout(closeTimeout); // 기존의 닫기 타이머를 초기화
  isDropdownOpen.value = true;
};

const closeDropdown = () => {
  closeTimeout = setTimeout(() => {
    isDropdownOpen.value = false;
  }, 200); // 드롭다운이 닫히는 딜레이 시간 설정
};
</script>

<template>
  <div class="relative">
    <div class="w-max" @mouseenter="openDropdown" @mouseleave="closeDropdown">
      <slot name="button"></slot>
    </div>
    <div
      v-show="isDropdownOpen"
      class="absolute mt-2 w-[93px] h-[64px] bg-white shadow-md rounded-[4px] z-10"
      @mouseenter="openDropdown"
      @mouseleave="closeDropdown"
    >
      <ul class="flex flex-col">
        <li>
          <button
            class="w-full text-left px-4 h-[32px] text-sm text-gray-800 hover:text-primary-3 rounded-[4px]"
          >
            마이페이지
          </button>
        </li>
        <li>
          <button
            class="w-full text-left px-4 h-[32px] text-sm text-gray-800 hover:text-primary-3 rounded-[4px]"
          >
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
