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

const regionFilterList = ['전체', ...REGION];
const methodFilterList = ['전체', ...METHOD];
const recruitmentStatusFilterList = ['전체', ...RECRUITMENT_STATUS];

const route = useRoute();

const currentPostType = computed(() => route.params.type);

const loading = ref(true);
const filteredPosts = ref([]);

const currentPage = ref(1);
const totalPage = computed(() => filteredPosts.value.totalPage);

const selectedSkills = ref([]);
const selectedPosition = ref('');
const selectedRecruitArea = ref('');
const selectedMeetingMethod = ref('');
const selectedRecruitStatus = ref('');

// 게시물 유형 감시(프로젝트 or 스터디)
watch(
  currentPostType,
  () => {
    currentPage.value = 1;
    selectedSkills.value = [];
    selectedPosition.value = '';
    selectedRecruitArea.value = '';
    selectedMeetingMethod.value = '';
    selectedRecruitStatus.value = '';
    fetchPostsWithPagination();
  },
  { flush: 'sync' },
);

onMounted(() => {
  fetchPostsWithPagination();
});

// 필터링 가능한 페이지네이션 처리된 게시물 불러오기
const fetchPostsWithPagination = async () => {
  filteredPosts.value = await getAllPostsWithPagination(
    {
      position: selectedPosition.value,
      techStack: selectedSkills.value,
      recruitArea: selectedRecruitArea.value,
      recruitType: currentPostType.value === 'project' ? '프로젝트' : '스터디',
      onOffline: selectedMeetingMethod.value,
      finished:
        selectedRecruitStatus.value === '모집중'
          ? false
          : selectedRecruitStatus.value === '모집완료'
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
  const index = selectedSkills.value.findIndex((selectedSkill) => selectedSkill === skill);
  if (index === -1) {
    selectedSkills.value.push(skill);
  } else {
    selectedSkills.value.splice(index, 1);
  }
  fetchPostsWithPagination();
};
const handleSelectPosition = (position) => {
  selectedPosition.value = position;
  fetchPostsWithPagination();
};
const handleSelectRecruitArea = (area) => {
  if (area === '전체') selectedRecruitArea.value = '';
  else selectedRecruitArea.value = area;
  fetchPostsWithPagination();
};
const handleSelectMeetingMethod = (method) => {
  if (method === '전체') selectedMeetingMethod.value = '';
  else selectedMeetingMethod.value = method;
  fetchPostsWithPagination();
};

const handleSelectRecruitStatus = (status) => {
  selectedRecruitStatus.value = status;
  fetchPostsWithPagination();
};
</script>

<template>
  <!-- 로딩중일때  -->
  <div v-if="loading" class="flex justify-center items-center h-[600px]">
    <p class="text-center text-primary-4 h3-b">로딩 중...</p>
  </div>

  <div v-else="!loading" class="pt-12 pb-20 flex flex-col items-center">
    <section class="flex items-center justify-around mb-6 w-full">
      <div class="flex gap-4">
        <SkillFilterDropdown
          :selected="selectedSkills"
          class="w-[126px]"
          @selectSkill="handleSelectSkill"
        />
        <FilterDropdown
          :items="POSITION"
          :selected="selectedPosition"
          defaultText="모집 포지션"
          @click:select="handleSelectPosition"
        />
        <FilterDropdown
          :items="regionFilterList"
          :selected="selectedRecruitArea"
          defaultText="지역"
          class="min-w-[136px]"
          @click:select="handleSelectRecruitArea"
        />
        <FilterDropdown
          :items="methodFilterList"
          :selected="selectedMeetingMethod"
          defaultText="진행 방식"
          @click:select="handleSelectMeetingMethod"
        />
        <FilterDropdown
          :items="recruitmentStatusFilterList"
          :selected="selectedRecruitStatus"
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
