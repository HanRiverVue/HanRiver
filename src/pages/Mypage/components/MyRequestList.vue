<script setup>
import { onMounted } from 'vue';
import LargePostCard from './LargePostCard.vue';
import FilterDropdown from '@/components/FilterDropdown.vue';
import { useRouter } from 'vue-router';
import LoadingPage from '@/pages/LoadingPage.vue';
import PostPagination from '@/pages/PostListPage/components/PostPagination.vue';
import { getMyApplyPosts } from '@/api/supabase/post';
import { usePagination } from '@/utils/usePagination';

const statusFilterList = ['전체', '수락 완료', '수락 대기중', '모집 마감'];

const router = useRouter();

onMounted(async () => {
  fetMyApplyPostsWithPagination();
});

// 필터링 & 페이지네이션 처리된 게시물 불러오기
const fetMyApplyPostsWithPagination = async () => {
  return await getMyApplyPosts(
    {
      status: selectedFilter.value.status,
    },
    currentPage.value,
    4,
  );
};

const {
  isLoading,
  filteredPosts,
  currentPage,
  totalPage,
  selectedFilter,
  handleChangePage,
  handleUpdateFilter,
} = usePagination(fetMyApplyPostsWithPagination, 'filteredApplyPosts', {
  status: '',
});

const handleGetStatus = (status) => {
  handleUpdateFilter({ status });
};
</script>
<template>
  <!-- 로딩중일 때 -->
  <LoadingPage v-if="isLoading" class="w-32 h-32" />

  <div v-else class="flex flex-col gap-5 px-4">
    <!-- 드롭다운 -->
    <div class="max-w-[126px] ml-auto">
      <FilterDropdown
        :items="statusFilterList"
        :selected="filteredPosts.status"
        default-text="수락 상태"
        @click:select="handleGetStatus"
      />
    </div>
    <!-- 목록이 있을때  -->
    <div v-if="filteredPosts?.length > 0" class="flex flex-col justify-center gap-5">
      <!-- 신청 목록 -->
      <div class="flex flex-wrap items-center gap-y-10 justify-between">
        <LargePostCard
          class="cursor-pointer"
          v-for="(post, index) in filteredPosts"
          :key="index"
          v-if="
            filteredPosts.status === '전체' ||
            !filteredPosts.status ||
            filteredPosts.status === '수락 완료'
          "
          :post-id="post.id"
          :project-title="post.title"
          :skills="post.techStack"
          :position="post.position"
          :application-deadline="post.recruit_deadline"
          :status="post.accepted ? 'success' : post.finished ? 'done' : 'warning'"
          @click="router.push(`/RecruitPostDetail/${post.id}`)"
        />
      </div>
    </div>

    <!-- 목록이 없을 때 -->
    <div
      v-else-if="filteredPosts?.length === 0"
      class="flex flex-col justify-center items-center gap-5 flex-1 h-[600px]"
    >
      <p class="text-center text-primary-4 h3-b">아직 신청한 글이 없습니다.</p>
      <button
        @click="router.push('/editrecruitpost')"
        class="bg-primary-3 text-white rounded-lg body-large-m py-2 px-6"
      >
        신청하러 가볼까요?
      </button>
    </div>
    <PostPagination
      :currentPage="currentPage"
      :totalPage="totalPage"
      @change="handleChangePage"
      class="m-auto"
    />
  </div>
</template>
<style scoped></style>
