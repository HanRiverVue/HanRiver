<script setup>
import { onMounted } from 'vue';
import LargePostCard from './LargePostCard.vue';
import FilterDropdown from '@/components/FilterDropdown.vue';
import { useRouter } from 'vue-router';
import LoadingPage from '@/pages/LoadingPage.vue';
import PostPagination from '@/pages/PostListPage/components/PostPagination.vue';
import { getMyApplyPosts } from '@/api/supabase/post';
import { usePagination } from '@/utils/usePagination';
import { supabase } from '@/config/supabase';

const statusFilterList = ['전체', '수락 완료', '수락 대기중', '모집 마감'];
// queryClient.invalidateQueries({ queryKey: [키 값] })
// const queryClient = useQueryClient()
const router = useRouter();

onMounted(async () => {
  await fetchMyApplyPostsWithPagination();
  await subscribeCancelPostApply();
});

// 필터링 & 페이지네이션 처리된 게시물 불러오기
const fetchMyApplyPostsWithPagination = async () => {
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
  refetch,
  handleChangePage,
  handleUpdateFilter,
} = usePagination(
  fetchMyApplyPostsWithPagination,
  'filteredApplyPosts',
  {
    status: '',
  },
  false,
);

const handleGetStatus = (status) => {
  handleUpdateFilter({ status });
};

// post_apply_list  구독(delete시)
const subscribeCancelPostApply = async () => {
  return supabase
    .channel('cancel-apply-channel')
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'post_apply_list' },
      (payload) => {
        console.log('신청 취소 변경 감지됨!', payload);
        refetch();
      },
    )
    .subscribe();
};
</script>
<template>
  <!-- 로딩중일 때 -->
  <LoadingPage v-if="isLoading" class="w-32 h-32" />

  <div v-else class="flex flex-col gap-5 px-6">
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
    <div v-if="filteredPosts?.length > 0" class="flex flex-col gap-7">
      <div class="flex flex-col justify-center gap-6">
        <!-- 신청 목록 -->
        <div class="flex flex-wrap items-center gap-7">
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
            @click="router.push(`/RecruitPostDetail/${post.post_id}`)"
          />
        </div>
      </div>
      <PostPagination
        :currentPage="currentPage"
        :totalPage="totalPage"
        @change="handleChangePage"
        class="m-auto"
      />
    </div>

    <!-- 목록이 없을 때 -->
    <div
      v-else-if="filteredPosts?.length === 0"
      class="h-[400px] flex flex-col gap-4 items-center justify-center"
    >
      <p class="text-center text-primary-4 h3-b">아직 신청한 글이 없습니다.</p>
      <button
        @click="router.push('/PostList/project')"
        class="bg-primary-3 text-white rounded-lg body-large-m py-2 px-6"
      >
        신청하러 가볼까요?
      </button>
    </div>
  </div>
</template>
<style scoped></style>
