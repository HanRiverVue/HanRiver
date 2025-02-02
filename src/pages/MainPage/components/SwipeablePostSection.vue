<script setup>
import { ref, computed } from 'vue';
import { usePointerSwipe } from '@vueuse/core';
import PostSection from '@/pages/MainPage/components/PostSection.vue';
import ArrowRight from '@/assets/icons/arrow_right.svg';
import ArrowLeft from '@/assets/icons/arrow_left.svg';

const props = defineProps({
  title: String,
  badgeText: String,
  badgeStatus: String,
  posts: { type: Array, default: [] },
  visiblePosts: Number,
  isLoading: Boolean,
});

// 현재 표시 중인 포스트의 시작 인덱스
const startIndex = ref(0);
const swipeRef = ref(null);

// 현재 표시할 포스트들을 계산하는 computed 속성
const visiblePosts = computed(() => {
  const visiblePosts = [];
  for (let i = 0; i < props.visiblePosts; i++) {
    const index = (startIndex.value + i) % props.posts.length;
    visiblePosts.push(props.posts[index]);
  }

  return visiblePosts;
});

// 스크롤 버튼 클릭 또는 스와이프 시 호출되는 함수
const handleScroll = (direction) => {
  if (direction === 'left') {
    startIndex.value = (startIndex.value - 1 + props.posts.length) % props.posts.length;
  } else if (direction === 'right') {
    startIndex.value = (startIndex.value + 1) % props.posts.length;
  }
};

// usePointerSwipe 훅을 사용하여 스와이프 동작 감지 및 처리
const { isSwiping, direction } = usePointerSwipe(swipeRef, {
  onSwipeEnd(e, dir) {
    if (dir === 'left') {
      handleScroll('right');
    } else if (dir === 'right') {
      handleScroll('left');
    }
  },
});
</script>

<template>
  <div class="relative" ref="swipeRef">
    <button @click="() => handleScroll('left')" class="scroll-arrow left-arrow">
      <img :src="ArrowLeft" alt="postScrollLeftButton" />
    </button>
    <div class="swipe-container">
      <PostSection
        :title="title"
        :badgeText="badgeText"
        :badgeStatus="badgeStatus"
        :posts="visiblePosts"
        :isLoading="isLoading"
      />
    </div>
    <button @click="() => handleScroll('right')" class="scroll-arrow right-arrow">
      <img :src="ArrowRight" alt="postScrollRightButton" />
    </button>
  </div>
</template>
