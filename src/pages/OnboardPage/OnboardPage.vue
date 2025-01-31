<script setup>
import OnboardAside from './components/OnboardAside.vue';
import OnboardStep1 from './components/OnboardStep1.vue';
import OnboardStep2 from './components/OnboardStep2.vue';
import { onBeforeMount, reactive, ref, watch } from 'vue';
import OnboardingCompleteModal from './components/OnboardingCompleteModal.vue';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';

const step = ref(1); // 온보딩 단계
const maxPage = 2; // 최대 온보딩 단계

// 온보딩 데이터
const registerData = reactive({
  name: '',
  short_introduce: '',
  position: [],
  userPositions: [], // 포지션 + 스택
  nicknameResult: 'INITIAL',
  isComplete: false,
});

// 데이터 받기
const setRegisterData = (newData) => {
  Object.assign(registerData, newData);
};

const nextStep = () => {
  if (step.value < maxPage) step.value += 1;
};

const prevStep = () => {
  if (step.value > 1) step.value -= 1;
};

// 온보딩 완료
const completeOnboarding = () => {
  registerData.isComplete = true;
  sessionStorage.removeItem('to');
};

// 온보딩 이탈
onBeforeMount(() => {
  sessionStorage.setItem('to', '/Onboard');
});
</script>

<template>
  <template v-if="registerData.isComplete === true">
    <OnboardingCompleteModal :registerData="registerData" />
  </template>
  <div class="w-full h-screen bg-secondary-3">
    <div class="relative flex justify-between max-w-[1200px] h-full py-8 px-10 text-gray-80 m-auto">
      <OnboardAside />
      <!-- 온보딩 폼-->
      <template v-if="step === 1">
        <OnboardStep1
          :registerData="registerData"
          :step="step"
          :maxPage="maxPage"
          @setRegisterData="setRegisterData"
          @nextStep="nextStep"
      /></template>
      <template v-if="step === 2">
        <OnboardStep2
          :registerData="registerData"
          :step="step"
          :maxPage="maxPage"
          @setRegisterData="setRegisterData"
          @prevStep="prevStep"
          @completeOnboarding="completeOnboarding"
      /></template>
    </div>
  </div>
</template>

<style scoped></style>
