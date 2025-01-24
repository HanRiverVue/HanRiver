<script setup>
import PostCard from '@/components/PostCard.vue';
// 임시 이미지
import baseProfile from '@/assets/icons/basic_profile.svg';
import { onMounted, ref } from 'vue';
import { getPostsByUser } from '@/api/supabase/post';
import { getUserInfo } from '@/api/supabase/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const myPosts = ref([]);
const loading = ref(true);
const user = ref(null);

onMounted(async () => {
  user.value = await getUserInfo();
  const userId = user.value.user_id;

  myPosts.value = await getPostsByUser(userId);
  loading.value = false;
});
</script>
<template>
  <!-- 로딩중일때  -->
  <div v-if="loading" class="flex justify-center items-center h-[600px]">
    <p class="text-center text-primary-4 h3-b">로딩 중...</p>
  </div>

  <!-- 모집 글이 있을때 -->
  <div
    v-else-if="myPosts.length > 0"
    class="flex px-4 justify-between items-center gap-y-4 flex-wrap"
  >
    <div v-for="post in myPosts" :key="post.id" class="cursor-pointer">
      <RouterLink :to="`RecruitPostDetail/${post.id}`">
        <PostCard
          :user-image="baseProfile"
          :user-name="user?.name"
          :project-title="post.title"
          :skills="post.teckStacks"
          :position="post.positions"
          :application-deadline="post.end_date"
        />
      </RouterLink>
    </div>
  </div>

  <!-- 모집 글이 없을때  -->
  <div
    v-else-if="myPosts.length === 0"
    class="flex flex-col justify-center items-center gap-5 flex-1 h-[600px]"
  >
    <p class="text-center text-primary-4 h3-b">아직 작성한 모집글이 없습니다.</p>
    <button
      @click="router.push('/editrecruitpost')"
      class="bg-primary-3 text-white rounded-lg body-large-m py-2 px-6"
    >
      모집하러 가볼까요?
    </button>
  </div>
</template>
<style scoped></style>
