<script setup>
import onboardLeft from '@/assets/images/onboard_left.png';
import logo from '@/assets/icons/logo.svg';
</script>
<template>
  <aside>
    <div class="mt-[19px] mb-[22px]">
      <img :src="logo" alt="mergi 로고 아이콘" class="min-w-[96px]" />
    </div>
    <div>
      <h3 class="mb-1 h3-b">탐색의 시작은 간단한 소개에서!</h3>
      <p>프로젝트의 첫걸음을 위해 닉네임과 희망 직무를 설정해주세요.</p>
    </div>
    <img class="absolute bottom-8 left-10 w-[365px]" :src="onboardLeft" alt="온보딩 이미지" />
  </aside>
</template>
<style scoped></style>
