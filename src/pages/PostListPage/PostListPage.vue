<script setup>
import SearchInput from '@/pages/PostListPage/components/SearchInput.vue';
import TEMP from '@/assets/images/temp-profile.png';
import PostCard from '@/components/PostCard.vue';
import FilterDropdown from '@/components/FilterDropdown.vue';
import SkillFilterDropdown from './components/SkillFilterDropdown.vue';
import { METHOD, RECRUITMENT_STATUS, REGION } from '@/constants/filter';
import { POSITION } from '@/constants';
import { ref, reactive } from 'vue';
import PostPagination from './components/PostPagination.vue';

const postCardData = {
  userImage: TEMP,
  userName: '파파고',
  projectTitle:
    '멋진프로젝트를 만들어봅시다 주제는 파파고 api를 이용한 어쩌고입니다 모집합니다모집합니다모집합니다모집... 모집...',
  skills: ['go.png', 'go.png', 'go.png', 'go.png', 'go.png', 'go.png'],
  position: '프론트엔드',
  applicationDeadline: '2025.01.29',
};
const listItems = [
  { ...postCardData },
  { ...postCardData },
  { ...postCardData },
  { ...postCardData },
  { ...postCardData },
  { ...postCardData },
  { ...postCardData },
  { ...postCardData },
  { ...postCardData },
  { ...postCardData },
  { ...postCardData },
  { ...postCardData },
];

const regionFilterList = ['전체', ...REGION];
const methodFilterList = ['전체', ...METHOD];
const recruitmentStatusFilterList = ['전체', ...RECRUITMENT_STATUS];

const currentPage = ref(1);
const totalPage = ref(20);
const selectedSkills = reactive([]);

const handleChangePage = (page) => {
  currentPage.value = page;
};

const handleSelectSkill = (skill) => {
  const index = selectedSkills.findIndex((selectedSkill) => selectedSkill === skill);
  if (index > -1) selectedSkills.splice(index, 1);
  else selectedSkills.push(skill);
};
</script>

<template>
  <div class="pt-12 pb-20 flex flex-col items-center">
    <section class="flex items-center justify-between mb-6">
      <div class="flex gap-4">
        <SkillFilterDropdown
          :selected="selectedSkills"
          class="w-[126px]"
          @selectSkill="handleSelectSkill"
        />
        <FilterDropdown :items="POSITION" defaultText="모집 포지션" />
        <FilterDropdown :items="regionFilterList" defaultText="지역" class="min-w-[136px]" />
        <FilterDropdown :items="methodFilterList" defaultText="진행 방식" />
        <FilterDropdown :items="recruitmentStatusFilterList" defaultText="모집 상태" />
      </div>
      <SearchInput />
    </section>
    <section class="flex flex-wrap justify-between gap-x-3 gap-y-6 mb-12">
      <PostCard v-for="(item, index) in listItems" :key="index" v-bind="item" />
    </section>
    <PostPagination :currentPage="currentPage" :totalPage="totalPage" @change="handleChangePage" />
  </div>
</template>
