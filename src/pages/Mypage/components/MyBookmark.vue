<script setup>
import baseProfile from '@/assets/icons/basic_profile.svg';
import PostCard from '@/components/PostCard.vue';

const arr = ['skills-logo-spring.png', 'skills-logo-nodejs.png'];
</script>
<template>
  <!-- 모집 글이 있을때 화면 -->

  <!-- <div class="flex px-4 justify-between items-center content-center gap-y-4 self-stretch flex-wrap">
    <PostCard
      :user-image="baseProfile"
      user-name="현우"
      project-title="백엔드 개발자 구합니다~"
      :skills="arr"
      position="백엔드"
      application-deadline="2025.01.29"
    />
  </div> -->

  <!-- 모집 글이 없을때 화면 -->
  <div class="flex flex-col justify-center items-center gap-5 flex-1 h-[600px]">
    <p class="text-center text-primary-4 h3-b">찜 목록이 없습니다.</p>
    <button class="bg-primary-3 text-white rounded-lg body-large-m py-2 px-6">
      찾아보러 가볼까요?
    </button>
  </div>
</template>
<style scoped></style>
