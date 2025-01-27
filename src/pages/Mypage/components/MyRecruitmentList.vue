<script setup>
import PostCard from '@/components/PostCard.vue';
// 임시 이미지
import { computed, onMounted, ref, watch } from 'vue';
import { getPostsByUser } from '@/api/supabase/post';
import { getUserInfo } from '@/api/supabase/user';
import { useRouter } from 'vue-router';
import FilterDropdown from '@/components/FilterDropdown.vue';
import { useQuery } from '@tanstack/vue-query';
import PostPagination from '@/pages/PostListPage/components/PostPagination.vue';
import LoadingPage from '@/pages/LoadingPage.vue';

const router = useRouter();
const loading = ref(true);
const user = ref(null);

const selectedFilter = ref({
  order: '최신순',
});

const orderFilterList = ['최신순', '오래된순', '인기순'];
// 필터링된 게시물
const filteredPosts = computed(() => data?.value || []);

// 현재 페이지, 전체 페이지
const currentPage = ref(1);
const totalPage = computed(() => data?.value?.total_page || 1);

onMounted(() => {
  fetchUserPostsWithPagination();
});

// 필터링 & 페이지네이션 처리된 게시물 불러오기
const fetchUserPostsWithPagination = async () => {
  user.value = await getUserInfo();
  const userId = user.value.user_id;
  loading.value = false;

  console.log(
    await getPostsByUser(
      userId,
      {
        order: selectedFilter.value.order,
      },
      currentPage.value,
      8,
    ),
  );

  return await getPostsByUser(
    userId,
    {
      order: selectedFilter.value.order,
    },
    currentPage.value,
    8,
  );
};

const { isLoading, data, refetch } = useQuery({
  queryKey: ['filteredUserPosts', selectedFilter.value, currentPage.value],
  queryFn: fetchUserPostsWithPagination,
  staleTime: 1000 * 60 * 5, // 유통기한
  gcTime: 1000 * 60 * 5,
  structuralSharing: true, // 변경되지않은 데이터 재사용
  placeholderData: (prev) => prev, // 대기 상태때 표시해줄 데이터
});

// 필터링 적용시
watch(selectedFilter, () => {
  currentPage.value = 1;
});

// 페이지 전환시
const handleChangePage = (page) => {
  currentPage.value = page;
  refetch();
};

const handleSelectOrder = (order) => {
  selectedFilter.value.order = order;
  refetch();
};
</script>

<template>
  <!-- 로딩중일때  -->
  <LoadingPage v-if="loading" class="w-32 h-32" />

  <div v-else class="flex flex-col px-4 gap-4">
    <FilterDropdown
      class="w-[126px] ml-auto"
      :items="orderFilterList"
      :selected="selectedFilter.order"
      defaultText="정렬 순서"
      @click:select="handleSelectOrder"
    />
    <!-- 모집 글이 있을때 -->
    <div v-if="filteredPosts.length > 0" class="flex px-4 items-center gap-4 flex-wrap">
      <div v-for="post in filteredPosts" :key="post.id" class="cursor-pointer">
        <RouterLink :to="`RecruitPostDetail/${post.id}`">
          <PostCard
            :id="post.id"
            :user-image="user?.profile_img_path"
            :user-name="user?.name"
            :project-title="post.title"
            :skills="post.tech_stacks"
            :position="post.positions"
            :application-deadline="post.end_date"
          />
        </RouterLink>
      </div>
    </div>

    <!-- 모집 글이 없을때  -->
    <div
      v-else-if="filteredPosts.length === 0"
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
    <PostPagination
      :currentPage="currentPage"
      :totalPage="totalPage"
      @change="handleChangePage"
      class="m-auto"
    />
  </div>
</template>
<style scoped></style>
