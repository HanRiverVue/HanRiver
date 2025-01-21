<script setup>
import PostCard from '@/components/PostCard.vue';
import PostcardUserImage from '@/assets/images/postcard-user-image.png';

const postCardData = {
  userImage: PostcardUserImage,
  userName: '파파고',
  projectTitle:
    '멋진프로젝트를 만들어봅시다 주제는 파파고 api를 이용한 어쩌고입니다 모집합니다모집합니다모집합니다모집... 모집...',
  skills: [
    'skills-logo-go.png',
    'skills-logo-go.png',
    'skills-logo-go.png',
    'skills-logo-go.png',
    'skills-logo-go.png',
    'skills-logo-go.png',
  ],
  position: '프론트엔드',
  applicationDeadline: '2025.01.29',
};
</script>

<template>
  <PostCard v-bind="postCardData" />
</template>
