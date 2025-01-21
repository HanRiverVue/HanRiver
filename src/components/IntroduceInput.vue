<script setup>
import { ref } from 'vue';

const introduction = ref('');
</script>

<template>
  <div class="relative w-[534px] h-[46px]">
    <input
      v-model="introduction"
      type="text"
      placeholder="한 줄 소개"
      class="w-full h-full pl-3 rounded-lg text-gray-80 border border-solid border-primary-1 focus:border-primary-3 focus:outline-none"
    />
  </div>
</template>
