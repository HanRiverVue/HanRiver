<script setup>
import { onMounted, ref } from 'vue';
import LargePostCard from './LargePostCard.vue';
import FilterDropdown from '@/components/FilterDropdown.vue';
import { getMyApplicationsListHandle } from '@/api/supabase/apply';
import { useRouter } from 'vue-router';
import { getPostDetails } from '@/api/supabase/post';

// 임시 데이터
const skills = ['React', 'Vue', 'Spring'];
const position = ['프론트엔드', '백엔드'];

const router = useRouter();

const myApplicationPosts = ref([]);
const loading = ref(true);

// 드롭다운으로 선택한 값
const status = ref(null);

onMounted(async () => {
  fetMyApplicationPosts();
});

// 내가 신청한 목록 불러오기
const fetMyApplicationPosts = async () => {
  myApplicationPosts.value = await getMyApplicationsListHandle();
  loading.value = false;
};
const handleGetStatus = (value) => {
  status.value = value;
};

// 포스트별 세부 내용 불러오기
// const fetchPostDetails = async (postId) => {
//   const postInfo = await getPostDetails(postId);

//   return {
//     name: postInfo.title,
//     end_date: postInfo.end_date,
//     positions: postInfo.position,
//     techStacks: postInfo.techStack,
//   };
// };
</script>
<template>
  <!-- 로딩중일 때 -->
  <div v-if="loading" class="flex justify-center items-center h-[600px]">
    <p class="text-center text-primary-4 h3-b">로딩 중...</p>
  </div>

  <!-- 목록이 있을때  -->
  <!-- v-else-if="myApplicationPosts.length > 0" -->
  <div class="px-6 flex flex-col justify-center items-end gap-5 self-stretch">
    <!-- 드롭다운 -->
    <div class="max-w-[126px]">
      <FilterDropdown
        :items="['전체', '수락 완료', '수락 대기중', '모집 마감']"
        default-text="수락 상태"
        @click:select="handleGetStatus"
      />
    </div>

    <!-- 신청 목록 -->
    <div class="flex justify-between items-start content-start self-stretch gap-y-5 flex-wrap">
      <!-- <div v-for="(post, index) in myApplicationPosts" :key="index">
          <LargePostCard
            :project-title="post.title"
            :skills="post.techStack"
            :position="post.position"
            :application-deadline="post.recruit_deadline"
            :status="post.accepted ? 'success' : post.finished ? 'done' : 'warning'"
            @click="router.push(`/RecruitPostDetail/${post.id}`)"
          />
      </div> -->

      <!--상태가 전체 or 초기 상태 or ...  -->

      <LargePostCard
        v-if="status === '전체' || !status || status === '수락 완료'"
        project-title="모집모집모집"
        :skills="skills"
        :position="position"
        application-deadline="2025.01.29"
        status="success"
        post-id="83"
        @click="router.push(`/RecruitPostDetail/${83}`)"
      />

      <LargePostCard
        v-if="status === '전체' || !status || status === '수락 대기중'"
        project-title="모집모집모집2"
        :skills="skills"
        :position="position"
        application-deadline="2025.01.29"
        status="warning"
        post-id="84"
        @click="router.push(`/RecruitPostDetail/${83}`)"
      />

      <LargePostCard
        v-if="status === '전체' || !status || status === '모집 마감'"
        project-title="모집모집모집3"
        :skills="skills"
        :position="position"
        application-deadline="2025.01.29"
        status="done"
        post-id="85"
        @click="router.push(`/RecruitPostDetail/${83}`)"
      />
    </div>
  </div>

  <!-- 목록이 없을 때 -->
  <!-- <div
    v-else-if="myApplicationPosts.length === 0"
    class="flex flex-col justify-center items-center gap-5 flex-1 h-[600px]"
  >
    <p class="text-center text-primary-4 h3-b">아직 신청한 글이 없습니다.</p>
    <button
      @click="router.push('/editrecruitpost')"
      class="bg-primary-3 text-white rounded-lg body-large-m py-2 px-6"
    >
      신청하러 가볼까요?
    </button>
  </div> -->
</template>
<style scoped></style>
