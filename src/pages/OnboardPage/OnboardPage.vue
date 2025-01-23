<script setup>
import OnboardAside from './components/OnboardAside.vue';
import ProgressBar from './components/ProgressBar.vue';
import OnboardStep1 from './components/OnboardStep1.vue';
import OnboardStep2 from './components/OnboardStep2.vue';
import AppButton from '@/components/AppButton.vue';

import { onMounted, reactive, ref } from 'vue';
const registerData = reactive({}); // 회원가입 데이터
const step = ref(1); // 현재 온보딩 단계

const setRegisterData = (newData) => {
  Object.assign(registerData, newData);
  console.log(JSON.stringify(registerData));
};

// 온보딩 단계 초기화
step.value = 1;
</script>

<template>
  <div class="w-full h-screen bg-secondary-3">
    <div class="relative flex justify-between max-w-[1200px] h-full py-8 px-10 text-gray-80 m-auto">
      <OnboardAside />
      <!-- 온보딩 폼-->
      <div class="flex flex-col justify-between w-[574px] h-full bg-white/85 z-10 p-5 rounded">
        <div class="flex flex-col gap-7">
          <ProgressBar :currentPage="step" :maxPage="2" />
          <template v-if="step === 1">
            <OnboardStep1 @update="setRegisterData" />
          </template>
          <template v-if="step === 2">
            <OnboardStep2 />
          </template>
        </div>
        <AppButton text="다음" class="py-[14px] body-large-m rounded-lg" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
