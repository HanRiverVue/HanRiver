<script setup>
import { ref } from 'vue';
import AppButton from '@/components/AppButton.vue';

const props = defineProps({
  postDetails: Object,
  loading: Boolean,
  isAuthor: Boolean,
  isApplicantsPage: Boolean,
  handleViewApplicants: Function,
  handleBackToPost: Function,
  handleCloseRecruitment: Function,
  handleApplyOrCancel: Function,
  isApplied: Boolean,
});
</script>

<template>
  <div
    class="flex w-full md:w-[350px] bg-secondary-3 rounded-lg shadow-lg p-4 sticky top-[80px] md:shrink-0"
  >
    <div v-if="loading">
      <p>로딩 중...</p>
    </div>
    <div v-else-if="postDetails" class="flex-1">
      <div class="p-4 relative">
        <ul class="space-y-2 text-gray-80 text-xs">
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="caption-b">모집 인원</strong>
            <span class="caption-r"> {{ postDetails.recruit_count }}명 </span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="font-semibold">진행 기간</strong>
            <span class="caption-r"> {{ postDetails.start_date }} ~ {{ postDetails.end_date }} </span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="caption-b">모집 마감일</strong>
            <span>
              {{ postDetails.recruit_deadline }}
            </span class="caption-r">
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="caption-b">포지션</strong>
            <span class="caption-r" v-if="postDetails && postDetails.techStack">
              {{ postDetails.position.join(', ') }}
            </span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="caption-b">스킬</strong>
            <span class="caption-r" v-if="postDetails && postDetails.techStack">
              {{ postDetails.techStack.join(', ') }}
            </span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="caption-b">모집 지역</strong>
            <span class="caption-r"> {{ postDetails.recruit_area }}</span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="caption-b">진행 방식</strong>
            <span class="caption-r"> {{ postDetails.on_offline }}</span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="caption-b">연락 방법</strong>
            <span class="caption-r">{{ postDetails.call_method }} | {{ postDetails.call_link }}</span>
          </li>
        </ul>
        <div>
          <template v-if="isAuthor">
            <div class="flex flex-col">
              <AppButton
                v-if="!isApplicantsPage"
                text="참여 신청자 목록 조회"
                type="primary"
                class="w-[294px] h-11 mt-6 text-[16px]"
                @click="handleViewApplicants"
              />
              <AppButton
                v-else
                text="게시물로 돌아가기"
                type="primary"
                class="w-[294px] h-11 mt-6 text-[16px]"
                @click="handleBackToPost"
              />
              <AppButton
                text="모집 마감하기"
                type="secondary"
                class="w-[294px] h-11 mt-3 text-[16px]"
                @click="handleCloseRecruitment"
              />
            </div>
          </template>
          <template v-else>
            <AppButton
              :text="isApplied ? '신청 취소' : '참여 신청'"
              :type="isApplied ? 'secondary' : 'primary'"
              class="w-[294px] h-11 mt-6"
              @click="handleApplyOrCancel(postDetails.id)"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
