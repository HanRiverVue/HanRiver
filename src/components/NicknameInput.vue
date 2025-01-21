<script setup>
import { ref } from 'vue';

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
    <button
      @click="checkDuplicate"
      class="absolute text-sm right-2 top-1/2 transform -translate-y-1/2 w-[66px] h-[30px] bg-primary-1 text-white rounded-[4px]"
    >
      중복확인
    </button>
  </div>
</template>
