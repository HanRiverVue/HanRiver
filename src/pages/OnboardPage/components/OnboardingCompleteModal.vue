<script setup>
import onboardIcon from '@/assets/images/onboard_icon.png';
const props = defineProps({
  registerData: {
    type: Object,
  },
});
</script>
<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="flex flex-col items-center w-[550px] py-[58px] rounded-[20px] bg-secondary-2">
      <p class="mb-[17px] h2-b text-gray-80">
        환영합니다, <span class="text-primary-3">{{ props.registerData.name }}</span> 님!
      </p>
      <span class="text-center body-large-m text-gray-80"
        >이 외에도 더 많은 항목을 프로필에 추가할 수 있어요.<br />
        지금 추가하러 가볼까요?</span
      >
      <img class="w-[119px]" :src="onboardIcon" alt="온보딩 아이콘" />
      <div class="flex gap-[10px] mt-4">
        <RouterLink
          :to="{ path: '/', replace: true }"
          class="flex justify-center items-center w-[179px] h-[45px] bg-white rounded-lg body-r text-gray-70 modal-button-shadow"
        >
          나중에 할게요
        </RouterLink>
        <RouterLink
          :to="{ path: '/EditProfile', replace: true }"
          class="flex justify-center items-center w-[179px] h-[45px] text-white rounded-lg body-r bg-primary-1 modal-button-shadow opacity-80"
        >
          네, 추가할게요
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
