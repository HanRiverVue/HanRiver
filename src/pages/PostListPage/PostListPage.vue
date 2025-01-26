<!-- tanstack query 적용 -->

<script setup>
import SearchInput from '@/pages/PostListPage/components/SearchInput.vue';
import PostCard from '@/components/PostCard.vue';
import FilterDropdown from '@/components/FilterDropdown.vue';
import SkillFilterDropdown from './components/SkillFilterDropdown.vue';
import { METHOD, RECRUITMENT_STATUS, REGION } from '@/constants/filter';
import { POSITION } from '@/constants';
import { ref, onMounted, computed, watch } from 'vue';
import PostPagination from './components/PostPagination.vue';
import { getAllPostsWithPagination } from '@/api/supabase/post';
import { useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import LoadingPage from '../LoadingPage.vue';
import reset from '@/assets/icons/reset.svg';

const positionFilterList = ['전체', ...POSITION];
const regionFilterList = ['전체', ...REGION];
const methodFilterList = ['전체', ...METHOD];
const recruitmentStatusFilterList = ['전체', ...RECRUITMENT_STATUS];

const route = useRoute();

// 현재 포스트 유형(ex. 프로젝트, 스터디)
const currentPostType = computed(() => route.params.type);

// 필터링 종류
const selectedFilters = ref({
  skills: [],
  position: '',
  recruitArea: '',
  meetingMethod: '',
  recruitStatus: '',
  searchResults: '',
});

// 필터링된 게시물
const filteredPosts = computed(() => data?.value?.data || []);

// 현재 페이지, 전체 페이지
const currentPage = ref(1);
const totalPage = computed(() => data.value?.totalPage);

// 검색 결과를 담을 게시물
const searchInput = ref('');

// 게시물 유형 감시(프로젝트 or 스터디)
watch(
  currentPostType,
  () => {
    currentPage.value = 1;

    selectedFilters.value.skills = [];
    selectedFilters.value.position = '';
    selectedFilters.value.recruitArea = '';
    selectedFilters.value.meetingMethod = '';
    selectedFilters.value.recruitStatus = '';
    selectedFilters.value.searchResults = '';
    refetch();
  },
  { flush: 'sync' },
);

onMounted(() => {
  fetchPostsWithPagination();
});

// 필터링 & 페이지네이션 처리된 게시물 불러오기
const fetchPostsWithPagination = async () => {
  return await getAllPostsWithPagination(
    {
      position: selectedFilters.value.position,
      techStack: selectedFilters.value.skills,
      recruitArea: selectedFilters.value.recruitArea,
      recruitType: currentPostType.value === 'project' ? '프로젝트' : '스터디',
      onOffline: selectedFilters.value.meetingMethod,
      finished:
        selectedFilters.value.recruitStatus === '모집중'
          ? false
          : selectedFilters.value.recruitStatus === '모집완료'
          ? true
          : '',
      searchResults: selectedFilters.value.searchResults,
    },
    currentPage.value,
  );
};

const { isLoading, data, refetch, error } = useQuery({
  queryKey: ['filteredPosts', selectedFilters.value, currentPage.value],
  queryFn: fetchPostsWithPagination,
  staleTime: 1000 * 60 * 5, // 유통기한
  // retry: 3, // 재시도 횟수
  // retryDelay: 1000, // 재시도 텀
  structuralSharing: true, // 변경되지않은 데이터 재사용
  placeholderData: (prev) => prev, // 대기 상태때 표시해줄 데이터
});

// 필터링 적용시
watch(selectedFilters, () => {
  currentPage.value = 1;
  refetch();
});

// 페이지 전환시
const handleChangePage = (page) => {
  currentPage.value = page;
  refetch();
};

// 유형별 필터링 후 API 재호출
const handleSelectSkill = (skill) => {
  const index = selectedFilters.value.skills.findIndex((selectedSkill) => selectedSkill === skill);
  if (index === -1) {
    selectedFilters.value.skills.push(skill);
  } else {
    selectedFilters.value.skills.splice(index, 1);
  }
};
const handleSelectPosition = (position) => {
  selectedFilters.value.position = position;
};
const handleSelectRecruitArea = (area) => {
  selectedFilters.value.recruitArea = area;
};
const handleSelectMeetingMethod = (method) => {
  selectedFilters.value.meetingMethod = method;
};

const handleSelectRecruitStatus = (status) => {
  selectedFilters.value.recruitStatus = status;
};

//검색에 디바운싱 적용
let debounceTimeout;
watch(searchInput, (newValue) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    selectedFilters.value.searchResults = newValue;
  }, 400);
  // });

  // 검색에 쓰로틀링 적용
  // let throttleTimeout;
  // watch(searchInput, (newValue) => {
  //   if (throttleTimeout) return;
  //   clearInterval(throttleTimeout);
  //   throttleTimeout = setTimeout(() => {
  //     selectedFilters.value.searchResults = newValue;
  //     console.log(selectedFilters.value.searchResults);

  //     throttleTimeout = null;
  //   }, 300);
});
const handleInputSearch = (input) => {
  searchInput.value = input;
};

// 필터링 초기화
const handleInitFilter = () => {
  currentPage.value = 1;
  selectedFilters.value.skills = [];
  selectedFilters.value.position = '';
  selectedFilters.value.recruitArea = '';
  selectedFilters.value.meetingMethod = '';
  selectedFilters.value.recruitStatus = '';
  selectedFilters.value.searchResults = '';
  refetch();
};
</script>

<template>
  <div v-if="error">에러 발생: {{ error.message }}</div>

  <LoadingPage v-if="isLoading" />
  <div v-else class="pt-12 pb-20 flex flex-col items-center">
    <section class="flex justify-between gap-4 mb-6 w-full">
      <div class="flex gap-3 items-center">
        <SkillFilterDropdown
          :selected="selectedFilters.skills"
          class="w-[126px]"
          @selectSkill="handleSelectSkill"
        />
        <FilterDropdown
          :items="positionFilterList"
          :selected="selectedFilters.position"
          defaultText="모집 포지션"
          @click:select="handleSelectPosition"
        />
        <FilterDropdown
          :items="regionFilterList"
          :selected="selectedFilters.recruitArea"
          defaultText="지역"
          class="min-w-[136px]"
          @click:select="handleSelectRecruitArea"
        />
        <FilterDropdown
          :items="methodFilterList"
          :selected="selectedFilters.meetingMethod"
          defaultText="진행 방식"
          @click:select="handleSelectMeetingMethod"
        />
        <FilterDropdown
          :items="recruitmentStatusFilterList"
          :selected="selectedFilters.recruitStatus"
          defaultText="모집 상태"
          @click:select="handleSelectRecruitStatus"
        />
        <!-- 초기화 버튼 -->
        <div
          @click="handleInitFilter"
          class="cursor-pointer p-1 w-8 h-8 min-w-8 bg-primary-4 rounded-full input-shadow flex justify-center items-center gap-[10px]"
        >
          <img class="w-5 h-5 flex-shrink-0" :src="reset" alt="초기화 아이콘" />
        </div>
      </div>
      <SearchInput :value="searchInput" @search="handleInputSearch" />
    </section>

    <section v-if="filteredPosts.length > 0" class="grid grid-cols-4 gap-7 mb-12 w-full">
      <PostCard
        v-for="(item, index) in filteredPosts"
        :key="index"
        :id="item.id"
        :userImage="item.profile_img_path"
        :userName="item.name"
        :projectTitle="item.title"
        :skills="item.techStacks"
        :position="item.positions"
        :applicationDeadline="item.recruit_deadline"
      />
    </section>
    <section v-else>
      <div class="flex justify-center items-center h-[600px]">
        <p class="text-center text-primary-4 h3-b">조건에 맞는 모집글이 없습니다...</p>
      </div>
    </section>
    <PostPagination :currentPage="currentPage" :totalPage="totalPage" @change="handleChangePage" />
  </div>
</template>
