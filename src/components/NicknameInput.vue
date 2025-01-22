<script setup>
import { ref } from 'vue';
import AppButton from '@/components/AppButton.vue';

const nickname = ref('');

const checkDuplicate = () => {
  console.log('중복 확인 클릭:', nickname.value);
};
</script>

<template>
  <div class="relative h-[46px] min-w-[226px]">
    <input
      v-model="nickname"
      type="text"
      placeholder="닉네임"
      class="w-full h-full pl-3 pr-[70px] border border-solid rounded-lg text-gray-80 input-shadow focus:border-primary-3 focus:outline-none body-r"
      maxlength="10"
    />

    <button
      class="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-[66px] text-white bg-primary-1 caption-r px-3 py-[6px] rounded hover:bg-primary-hover"
    >
      중복확인
    </button>
  </div>
</template>
