<script setup>
import OnboardAside from './components/OnboardAside.vue';
import ProgressBar from './components/ProgressBar.vue';
import OnboardStep1 from './components/OnboardStep1.vue';
import OnboardStep2 from './components/OnboardStep2.vue';
import AppButton from '@/components/AppButton.vue';

import { computed, reactive, ref } from 'vue';
const registerData = reactive({
  name: '',
  short_introduce: '',
  position: [], // 빈 배열로 초기화
});

const step = ref(1); // 현재 온보딩 단계
const maxPage = 2;

// 폼 데이터 받기
const setRegisterData = (newData) => {
  Object.assign(registerData, newData);
  console.log(JSON.stringify(registerData));
};

// 선택된 포지션
const handlePositionsSelect = (value) => {
  if (registerData.position.includes(value)) {
    // 이미 선택된 포지션이면 제거
    const index = registerData.position.indexOf(value);
    registerData.position.splice(index, 1);
  } else if (registerData.position.length < 3) {
    // 선택 가능 개수를 초과하지 않으면 추가
    registerData.position.push(value);
  } else {
    alert('최대 3개의 포지션만 선택 가능합니다.');
  }
};

// 폼 유효성 검사
const isFormValid = computed(() => {
  return (
    //TODO: 닉네임 중복 검사 추가
    registerData.name.length > 0 &&
    registerData.short_introduce.length > 0 &&
    registerData.position.length > 0
  );
});

// 버튼 타입 결정
const buttonType = computed(() => {
  return isFormValid.value ? 'primary' : 'disabled';
});

// 온보딩 단계 초기화
step.value = 1;

// 다음 스탭
const nextStep = () => {
  step.value = step.value + 1;
};

// 이전 스탭
const prevStep = () => {
  if (step.value > 1) step.value = step.value - 1;
};
</script>

<template>
  <div class="w-full h-screen bg-secondary-3">
    <div class="relative flex justify-between max-w-[1200px] h-full py-8 px-10 text-gray-80 m-auto">
      <OnboardAside />
      <!-- 온보딩 폼-->
      <div class="flex flex-col justify-between w-[574px] h-full bg-white/85 z-10 p-5 rounded">
        <div class="flex flex-col gap-7">
          <ProgressBar :currentPage="step" :maxPage="maxPage" />
          <template v-if="step === 1">
            <OnboardStep1
              :register-data="registerData"
              @positions-select="handlePositionsSelect"
              @update="setRegisterData"
            />
          </template>
          <template v-if="step === 2">
            <OnboardStep2 :registerData="registerData" @update="setRegisterData" />
          </template>
        </div>
        <!-- TODO: disabled 클릭 막기 -->
        <!-- 버튼 -->
        <template v-if="step === 1">
          <AppButton
            :type="buttonType"
            text="다음"
            class="py-[14px] body-large-m rounded-lg"
            @click="nextStep"
          />
        </template>
        <template v-if="step > 1">
          <div class="flex gap-2">
            <AppButton
              type="secondary"
              text="이전"
              class="flex-1 py-[14px] body-large-m rounded-lg"
              @click="prevStep"
            />
            <AppButton
              type="primary"
              :text="maxPage === step ? '완료' : '다음'"
              class="flex-1 py-[14px] body-large-m rounded-lg"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
