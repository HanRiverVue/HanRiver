<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
</script>

<template>
  <div class="relative w-[258px] h-[37px]">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="제목 또는 내용을 검색하세요"
      class="w-full h-full pl-3 pr-[32px] rounded-lg text-gray-80 border border-solid border-gray-40 focus:border-primary-3 focus:outline-none"
    />
    <div class="absolute right-3 top-1/2 transform -translate-y-1/2 w-[20px] h-[20px]">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-full h-full text-gray-400"
        >
          <path
            fill-rule="evenodd"
            d="M12.743 11.743a7 7 0 1 0-1.414 1.414 5.5 5.5 0 1 1 1.414-1.414zM11 7a4 4 0 1 0 4 4 4 4 0 0 0-4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
