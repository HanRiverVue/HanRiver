<script setup>
import PostCard from '@/components/PostCard.vue';
import StatusBadge from '@/components/StatusBadge.vue';

defineProps({
  title: String,
  badgeText: String,
  badgeStatus: String,
  posts: Array,
  likedPosts: Set,
  bookmarkedPosts: Set,
  isAuthenticated: Boolean, // 이 prop을 추가해야 합니다.
});

defineEmits(['toggleLike', 'toggleBookmark', 'clickUserProfileimage', 'openLoginModal']); // openLoginModal 이벤트 추가
</script>

<template>
  <article class="mb-[60px]">
    <div class="flex flex-wrap items-center gap-2.5 mb-6">
      <h2 class="h1-b text-gray-90">{{ title }}</h2>
      <StatusBadge :status="badgeStatus" class="px-2.5 py-[3px]">{{ badgeText }}</StatusBadge>
    </div>
    <div class="flex flex-wrap gap-6">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        v-bind="post"
        :isLiked="likedPosts.has(post.id)"
        :isBookmarked="bookmarkedPosts.has(post.id)"
        :isAuthenticated="isAuthenticated"
        @toggleLike="$emit('toggleLike', post.id)"
        @toggleBookmark="$emit('toggleBookmark', post.id)"
        @clickUserProfileImage="$emit('clickUserProfileimage', post.id, post.userName)"
        @openLoginModal="$emit('openLoginModal')"
      />
    </div>
  </article>
</template>
