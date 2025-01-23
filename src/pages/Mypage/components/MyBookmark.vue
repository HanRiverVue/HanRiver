<script setup>
import { getBookmarkedPostsHandle } from '@/api/supabase/bookmark';
import baseProfile from '@/assets/icons/basic_profile.svg';
import PostCard from '@/components/PostCard.vue';
import { onMounted, ref } from 'vue';

const myBookmarkPosts = ref([]);
const loading = ref(true);

onMounted(() => {
  fetchMyBookmarkPosts();
});

// 내 북마크 목록 불러오기
const fetchMyBookmarkPosts = async () => {
  myBookmarkPosts.value = await getBookmarkedPostsHandle();
  console.log(myBookmarkPosts.value);
  loading.value = false;
};
</script>
<template>
  <!-- 로딩중일 때 -->
  <div v-if="loading" class="flex justify-center items-center h-[600px]">
    <p class="text-center text-primary-4 h3-b">로딩 중...</p>
  </div>

  <!-- 글이 있을때 -->
  <div
    v-else-if="myBookmarkPosts.length > 0"
    class="flex px-4 justify-between items-center content-center gap-y-4 self-stretch flex-wrap"
  >
    <div v-for="post in myBookmarkPosts" :key="post.id" class="cursor-pointer">
      <RouterLink :to="`RecruitPostDetail/${post.id}`">
        <PostCard
          :user-image="baseProfile"
          user-name="현우"
          :project-title="post.title"
          :skills="post.teckStacks"
          :position="post.positions"
          :application-deadline="post.end_date"
        />
      </RouterLink>
    </div>
  </div>

  <!-- 글이 없을때 -->
  <div
    v-else-if="myBookmarkPosts.length === 0"
    class="flex flex-col justify-center items-center gap-5 flex-1 h-[600px]"
  >
    <p class="text-center text-primary-4 h3-b">찜 목록이 없습니다.</p>
    <RouterLink
      to="/Postlist/project"
      class="bg-primary-3 text-white rounded-lg body-large-m py-2 px-6"
    >
      찾아보러 가볼까요?
    </RouterLink>
  </div>
</template>
<style scoped></style>
