<script setup>
import service from '@/assets/images/service.png';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
    <div class="flex flex-col items-center bg-secondary-2 gap-5">
      <img :src="service" alt="서비스 페이지 이미지" class="w-[500px]" />
      <p class="body-large-m font-jalnan text-primary-3 text-[40px] mb-3">준비중인 페이지입니다.</p>
      <p class="text-primary-2 body-large-m">좋은 서비스로 만나뵙겠습니다!!</p>
      <button
        @click="router.push('/')"
        class="px-10 py-3.5 bg-primary-3 text-white rounded-lg body-large-m"
      >
        홈으로 돌아가기
      </button>
    </div>
  </div>
</template>
