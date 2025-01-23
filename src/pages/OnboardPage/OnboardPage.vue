<script setup>
import onboardLeft from '@/assets/images/onboard_left.png';
import logo from '@/assets/icons/logo.svg';
import OnboardStep1 from './components/OnboardStep1.vue';
import ProgressBar from './components/ProgressBar.vue';
import AppButton from '@/components/AppButton.vue';
</script>

<template>
  <div class="w-full h-screen bg-secondary-3">
    <div class="relative flex justify-between max-w-[1200px] h-full py-8 px-10 text-gray-80 m-auto">
      <section>
        <div class="mt-[19px] mb-[22px]">
          <img :src="logo" alt="mergi 로고 아이콘" class="min-w-[96px]" />
        </div>
        <div>
          <h3 class="mb-1 h3-b">탐색의 시작은 간단한 소개에서!</h3>
          <p>프로젝트의 첫걸음을 위해 닉네임과 희망 직무를 설정해주세요.</p>
        </div>
        <img class="absolute bottom-8 left-10 w-[365px]" :src="onboardLeft" alt="온보딩 이미지" />
      </section>
      <!-- 온보딩 폼-->
      <div class="flex flex-col justify-between w-[574px] h-full bg-white/85 z-10 p-5 rounded">
        <div class="flex flex-col gap-7">
          <ProgressBar :currentPage="1" :maxPage="2" />
          <OnboardStep1 />
        </div>
        <AppButton text="다음" class="py-[14px] body-large-m rounded-lg" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
