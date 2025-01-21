<script setup>
import { ref } from 'vue';
import LargePostCard from './LargePostCard.vue';
import FilterDropdown from '@/components/FilterDropdown.vue';
const skills = ['react', 'react', 'react', 'react'];
const position = ref(['프론트엔드', '백엔드']);
</script>
<template>
  <div class="px-6 flex flex-col justify-center items-end gap-5 self-stretch">
    <!-- 드롭다운 -->
    <div class="max-w-[126px]">
      <FilterDropdown
        :items="[
          { id: 1, name: '수락 완료' },
          { id: 2, name: '수락 대기중' },
          { id: 3, name: '모집 마감' },
        ]"
        default-text="수락 상태"
      />
    </div>

    <!-- 신청 목록 -->
    <div class="flex justify-between items-start content-start self-stretch gap-y-5 flex-wrap">
      <LargePostCard
        project-title="저희와 같이 뜨겁게 코딩하실 분 찾습니다!!"
        :skills="skills"
        :position="position"
        application-deadline="2025.01.29"
        status="success"
      />

      <LargePostCard
        project-title="저희와 같이 뜨겁게 코딩하실 분 찾습니다!!"
        :skills="skills"
        :position="position"
        application-deadline="2025.01.29"
        status="warning"
      />
      <LargePostCard
        project-title="저희와 같이 뜨겁게 코딩하실 분 찾습니다!!"
        :skills="skills"
        :position="position"
        application-deadline="2025.01.29"
        status="done"
      />
    </div>
  </div>
</template>
<style scoped></style>
