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
  isLoading: {
    type: Boolean,
    default: false,
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
      <template v-if="isLoading">
        <!-- 카드 스켈레톤 UI -->
        <div
          v-for="i in 4"
          :key="i"
          class="animate-pulse flex flex-col justify-between w-[258px] h-[295px] py-6 px-6 rounded-lg bg-white shadow"
        >
          <div class="mb-auto">
            <div class="flex justify-between mb-5">
              <div class="flex items-center gap-2.5">
                <div class="w-[33px] h-[33px] rounded-full bg-gray-15"></div>
                <div class="w-20 h-4 bg-gray-15 rounded"></div>
              </div>
              <div class="flex gap-[6px]">
                <div class="w-6 h-6 bg-gray-15 rounded"></div>
                <div class="w-6 h-6 bg-gray-15 rounded"></div>
              </div>
            </div>
            <div class="w-full h-16 bg-gray-15 rounded"></div>
          </div>
          <!-- 스킬 로고 및 포지션 뱃지 스켈레톤 UI -->
          <div>
            <div class="flex gap-1 mb-[13px]">
              <div v-for="j in 5" :key="j" class="w-7 h-7 rounded-full bg-gray-15"></div>
            </div>
            <div class="flex gap-[5px] mb-4">
              <div v-for="k in 2" :key="k" class="w-16 h-6 bg-gray-15 rounded-md"></div>
            </div>
            <div class="w-32 h-4 bg-gray-15 rounded"></div>
          </div>
        </div>
      </template>
      <!-- 데이터 호출 완료된 뒤 -->
      <PostCard v-else v-for="post in posts" :key="post.id" v-bind="post" />
    </div>
  </article>
</template>
