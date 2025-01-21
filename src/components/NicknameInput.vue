<script setup>
import { ref } from 'vue';
import AppButton from '@/components/AppButton.vue';

const nickname = ref('');

const checkDuplicate = () => {
  console.log('중복 확인 클릭:', nickname.value);
};
</script>

<template>
  <div class="relative w-[534px] h-[46px]">
    <input
      v-model="nickname"
      type="text"
      placeholder="닉네임"
      class="w-full h-full pl-3 rounded-lg text-gray-80 border border-solid border-primary-1 focus:border-primary-3 focus:outline-none"
    />
    <AppButton
      text="중복확인"
      type="primary"
      @click="checkDuplicate"
      class="absolute right-2 top-1/2 transform -translate-y-1/2 w-16 h-7"
    />
  </div>
</template>
