<script setup>
import { defineProps, defineEmits } from 'vue';
import AppButton from '@/components/AppButton.vue';

const props = defineProps({
  postDetails: Object,
  loading: Boolean,
  isAuthor: Boolean,
  isApplicantsPage: Boolean,
  isApplied: Boolean,
});

const emit = defineEmits(['applyOrCancel', 'viewApplicants', 'backToPost', 'closeRecruitment']);

const handleApplyOrCancel = () => {
  emit('applyOrCancel');
};

const handleViewApplicants = () => {
  emit('viewApplicants');
};

const handleBackToPost = () => {
  emit('backToPost');
};

const handleCloseRecruitment = () => {
  emit('closeRecruitment');
};
</script>

<template>
  <div
    :class="{
      'h-[368px]': isAuthor,
      'h-[312px]': !isAuthor,
    }"
    class="w-full md:w-[350px] bg-secondary-3 rounded-lg shadow-lg p-4 sticky top-[80px] md:shrink-0"
  >
    <div v-if="loading">
      <p>로딩 중...</p>
    </div>
    <div v-else-if="postDetails" class="flex-1">
      <div class="p-4 relative">
        <ul class="space-y-2 text-gray-80 text-xs">
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="font-semibold">모집 인원</strong>
            <span> {{ postDetails.recruit_count }}명 </span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="font-semibold">진행 기간</strong>
            <span> {{ postDetails.start_date }} ~ {{ postDetails.end_date }} </span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="font-semibold">모집 마감일</strong>
            <span> {{ postDetails.recruit_deadline }} </span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="font-semibold">포지션</strong>
            <span v-if="postDetails && postDetails.techStack">
              {{ postDetails.position.join(', ') }}
            </span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="font-semibold">스킬</strong>
            <span v-if="postDetails && postDetails.techStack">
              {{ postDetails.techStack.join(', ') }}
            </span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="font-semibold">모집 지역</strong>
            <span> {{ postDetails.recruit_area }}</span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="font-semibold">진행 방식</strong>
            <span> {{ postDetails.on_offline }}</span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="font-semibold">연락 방법</strong>
            <span> {{ postDetails.call_method }} | {{ postDetails.call_link }}</span>
          </li>
        </ul>
        <div>
          <template v-if="isAuthor">
            <div class="flex flex-col">
              <AppButton
                v-if="!isApplicantsPage"
                text="참여 신청자 목록 조회"
                type="primary"
                class="w-[294px] h-11 mt-6"
                @click="handleViewApplicants"
              />
              <AppButton
                v-else
                text="게시물로 돌아가기"
                type="primary"
                class="w-[294px] h-11 mt-6"
                @click="handleBackToPost"
              />
              <AppButton
                text="모집 마감하기"
                type="secondary"
                class="w-[294px] h-11 mt-3"
                @click="handleCloseRecruitment"
              />
            </div>
          </template>
          <template v-else>
            <AppButton
              :text="isApplied ? '신청 취소' : '참여 신청'"
              :type="isApplied ? 'secondary' : 'primary'"
              class="w-[294px] h-11 mt-6"
              @click="handleApplyOrCancel"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
