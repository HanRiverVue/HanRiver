<script setup>
import PostCard from '@/components/PostCard.vue';
import StatusBadge from '@/components/StatusBadge.vue';

defineProps({
  title: String,
  badgeText: String,
  badgeStatus: String,
  posts: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <article class="mb-[60px]">
    <div class="flex flex-wrap items-center gap-2.5 mb-6">
      <h2 class="h1-b text-gray-90">{{ title }}</h2>
      <StatusBadge :status="badgeStatus" class="px-2.5 py-[3px]">{{ badgeText }}</StatusBadge>
    </div>
    <div class="flex flex-wrap gap-6">
      <PostCard v-for="post in posts" :key="post.id" v-bind="post" />
    </div>
  </article>
</template>
