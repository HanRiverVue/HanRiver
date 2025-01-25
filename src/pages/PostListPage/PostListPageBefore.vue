<!-- tanstack query 적용 안한 version -->
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

const regionFilterList = ['전체', ...REGION];
const methodFilterList = ['전체', ...METHOD];
const recruitmentStatusFilterList = ['전체', ...RECRUITMENT_STATUS];

const route = useRoute();

const loading = ref(true);

// 현재 포스트 유형(ex. 프로젝트, 스터디)
const currentPostType = computed(() => route.params.type);

// 필터링 종류
const selectedFilters = ref({
  skills: [],
  position: '',
  recruitArea: '',
  meetingMethod: '',
  recruitStatus: '',
});

// 필터링된 게시물들
const filteredPosts = ref([]);

// 현재페이지, 전체 페이지
const currentPage = ref(1);
const totalPage = computed(() => filteredPosts.value.totalPage);

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
    fetchPostsWithPagination();
  },
  { flush: 'sync' },
);

onMounted(() => {
  fetchPostsWithPagination();
});

// 필터링 & 페이지네이션 처리된 게시물 불러오기
const fetchPostsWithPagination = async () => {
  filteredPosts.value = await getAllPostsWithPagination(
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
    },
    currentPage.value,
  );
  loading.value = false;
};

// 페이지 전환 함수
const handleChangePage = (page) => {
  currentPage.value = page;
  fetchPostsWithPagination();
};

// 유형별 필터링 후 API 재호출
const handleSelectSkill = (skill) => {
  const index = selectedFilters.value.skills.findIndex((selectedSkill) => selectedSkill === skill);
  if (index === -1) {
    selectedFilters.value.skills.push(skill);
  } else {
    selectedFilters.value.skills.splice(index, 1);
  }
  fetchPostsWithPagination();
};
const handleSelectPosition = (position) => {
  selectedFilters.value.position = position;
  fetchPostsWithPagination();
};
const handleSelectRecruitArea = (area) => {
  if (area === '전체') selectedFilters.value.recruitArea = '';
  else selectedFilters.value.recruitArea = area;
  fetchPostsWithPagination();
};
const handleSelectMeetingMethod = (method) => {
  if (method === '전체') selectedFilters.value.meetingMethod = '';
  else selectedFilters.value.meetingMethod = method;
  fetchPostsWithPagination();
};

const handleSelectRecruitStatus = (status) => {
  selectedFilters.value.recruitStatus = status;
  fetchPostsWithPagination();
};
</script>

<template>
  <LoadingPage v-if="loading" />

  <div v-else="!loading" class="pt-12 pb-20 flex flex-col items-center">
    <section class="flex items-center justify-around mb-6 w-full">
      <div class="flex gap-4">
        <SkillFilterDropdown
          :selected="selectedFilters.skills"
          class="w-[126px]"
          @selectSkill="handleSelectSkill"
        />
        <FilterDropdown
          :items="POSITION"
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
      </div>
      <SearchInput />
    </section>

    <section
      v-if="filteredPosts.data.length > 0"
      class="flex flex-wrap mx-auto pl-6 gap-x-3 gap-y-3 mb-12 w-full"
    >
      <PostCard
        v-for="(item, index) in filteredPosts.data"
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
