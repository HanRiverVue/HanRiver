<script setup>
import { getBookmarkPostsByUser } from '@/api/supabase/post';
import FilterDropdown from '@/components/FilterDropdown.vue';
import PostCard from '@/components/PostCard.vue';
import LoadingPage from '@/pages/LoadingPage.vue';
import PostPagination from '@/pages/PostListPage/components/PostPagination.vue';
import { usePagination } from '@/utils/usePagination';
import { onMounted } from 'vue';

const orderFilterList = ['최신순', '오래된순', '인기순', '마감일순'];

onMounted(() => {
  fetchUserBookmarkWithPagination();
});

// 필터링 & 페이지네이션 처리된 게시물 불러오기
const fetchUserBookmarkWithPagination = async () => {
  return await getBookmarkPostsByUser(
    {
      order: selectedFilter.value.order,
    },
    currentPage.value,
    8,
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
} = usePagination(fetchUserBookmarkWithPagination, 'filteredBookmarkPosts', {
  order: '최신순',
});

const handleSelectOrder = (order) => {
  handleUpdateFilter({ order });
};
</script>
<template>
  <!-- 로딩중일 때 -->
  <LoadingPage v-if="isLoading" class="w-32 h-32" />

  <div v-else class="flex flex-col gap-5 px-4">
    <FilterDropdown
      class="w-[126px] ml-auto"
      :items="orderFilterList"
      :selected="selectedFilter.order"
      defaultText="정렬 순서"
      @click:select="handleSelectOrder"
    />

    <!-- 글이 있을때 -->
    <div v-if="filteredPosts.length > 0" class="flex pl-1 gap-4 flex-wrap">
      <div v-for="post in filteredPosts" :key="post.id" class="cursor-pointer">
        <PostCard
          :id="post.id"
          :user-image="post.profile_img_path"
          :user-name="post.name"
          :project-title="post.title"
          :skills="post.stack"
          :position="post.post_position"
          :application-deadline="post.end_date"
        />
      </div>
    </div>

    <!-- 글이 없을때 -->
    <div
      v-else-if="filteredPosts.length === 0"
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
    <PostPagination
      :currentPage="currentPage"
      :totalPage="totalPage"
      @change="handleChangePage"
      class="m-auto"
    />
  </div>
</template>
<style scoped></style>
