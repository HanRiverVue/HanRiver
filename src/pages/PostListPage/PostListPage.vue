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
import LoadingPage from '../LoadingPage.vue';
import InitFilterButton from './components/InitFilterButton.vue';
import { usePagination } from '@/utils/usePagination';
import { useUserStore } from '@/stores/user';

const positionFilterList = ['전체', ...POSITION];
const regionFilterList = ['전체', ...REGION];
const methodFilterList = ['전체', ...METHOD];
const recruitmentStatusFilterList = ['전체', ...RECRUITMENT_STATUS];

const userStore = useUserStore();
const route = useRoute();

// 현재 포스트 유형(ex. 프로젝트, 스터디)
const currentPostType = computed(() => route.params.type);

// 검색 결과를 담을 게시물
const searchInput = ref('');

// 게시물 유형 감시(프로젝트 or 스터디)
watch(
  currentPostType,
  () => {
    handleInitFilter();
  },
  { flush: 'sync' },
);
onMounted(async () => {
  // 사용자 좋아요 업데이트
  await userStore.setUserPostLikes();
  fetchPostsWithPagination();
});

// 필터링 & 페이지네이션 처리된 게시물 불러오기
const fetchPostsWithPagination = async () => {
  const params = {
    position: selectedFilter.value.position,
    stacks: selectedFilter.value.skills, // 기술 스택 필터
    recruitArea: selectedFilter.value.recruitArea,
    recruitType: currentPostType.value === 'project' ? '프로젝트' : '스터디',
    onOffline: selectedFilter.value.meetingMethod,
    finished:
      selectedFilter.value.recruitStatus === '모집중'
        ? false
        : selectedFilter.value.recruitStatus === '모집완료'
        ? true
        : '',
    searchResults: selectedFilter.value.searchResults,
  };

  const response = await getAllPostsWithPagination(params, currentPage.value);

  return response;
};

const {
  isLoading,
  filteredPosts,
  currentPage,
  totalPage,
  selectedFilter,
  handleChangePage,
  handleUpdateFilter,
} = usePagination(fetchPostsWithPagination, 'filteredPosts', {
  skills: [],
  position: null,
  recruitArea: null,
  meetingMethod: null,
  recruitStatus: null,
  searchResults: null,
});

// 유형별 필터링 후 API 재호출
const handleSelectSkill = (skill) => {
  const skills = selectedFilter.value.skills;
  const skillIndex = selectedFilter.value.skills.findIndex(
    (selectedSkill) => selectedSkill === skill,
  );
  if (skillIndex === -1) {
    skills.push(skill);
  } else {
    skills.splice(skillIndex, 1);
  }
  handleUpdateFilter({ skills });
};
const handleSelectPosition = (position) => {
  position = position === '전체' ? null : position;
  handleUpdateFilter({ position });
};
const handleSelectRecruitArea = (recruitArea) => {
  recruitArea = recruitArea === '전체' ? null : recruitArea;
  handleUpdateFilter({ recruitArea });
};
const handleSelectMeetingMethod = (meetingMethod) => {
  meetingMethod = meetingMethod === '전체' ? null : meetingMethod;
  handleUpdateFilter({ meetingMethod });
};
const handleSelectRecruitStatus = (recruitStatus) => {
  recruitStatus = recruitStatus === '전체' ? null : recruitStatus;
  handleUpdateFilter({ recruitStatus });
};

const handleInputSearch = (searchResults) => {
  searchInput.value = searchResults;
};

//검색에 디바운싱 적용
let debounceTimeout;
watch(searchInput, (newValue) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    handleUpdateFilter({ searchResults: newValue });
  }, 1000);
  // });
});

// 필터링 초기화
const handleInitFilter = () => {
  currentPage.value = 1;
  handleUpdateFilter({
    skills: [],
    position: '',
    recruitArea: '',
    meetingMethod: '',
    recruitStatus: '',
    searchResults: '',
  });
};
</script>

<template>
  <LoadingPage v-if="isLoading" />
  <div v-else class="pt-12 pb-20 flex flex-col items-center">
    <section class="flex justify-between gap-4 mb-6 w-full">
      <div class="flex gap-3 items-center">
        <SkillFilterDropdown
          :selected="selectedFilter.skills"
          class="w-[126px]"
          @selectSkill="handleSelectSkill"
        />
        <FilterDropdown
          :items="positionFilterList"
          :selected="selectedFilter.position"
          defaultText="모집 포지션"
          @click:select="handleSelectPosition"
        />
        <FilterDropdown
          :items="regionFilterList"
          :selected="selectedFilter.recruitArea"
          defaultText="지역"
          class="min-w-[136px]"
          @click:select="handleSelectRecruitArea"
        />
        <FilterDropdown
          :items="methodFilterList"
          :selected="selectedFilter.meetingMethod"
          defaultText="진행 방식"
          @click:select="handleSelectMeetingMethod"
        />
        <FilterDropdown
          :items="recruitmentStatusFilterList"
          :selected="selectedFilter.recruitStatus"
          defaultText="모집 상태"
          @click:select="handleSelectRecruitStatus"
        />
        <!-- 초기화 버튼 -->
        <InitFilterButton @click="handleInitFilter" />
      </div>
      <SearchInput :value="searchInput" @search="handleInputSearch" />
    </section>

    <section v-if="filteredPosts.length > 0" class="grid grid-cols-4 gap-7 mb-12 w-full">
      <PostCard
        v-for="(item, index) in filteredPosts"
        :user_id="item.author"
        :key="index"
        :id="item.id"
        :userImage="item.profile_img_path"
        :userName="item.name"
        :projectTitle="item.title"
        :skills="item.tech_stacks"
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
