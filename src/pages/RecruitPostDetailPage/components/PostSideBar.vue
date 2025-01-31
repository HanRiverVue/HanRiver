<script setup>
import { ref, watch } from 'vue';
import { useBaseModalStore } from '@/stores/baseModal';
import AppButton from '@/components/AppButton.vue';
import ApplyModal from './ApplyModal.vue';

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

const baseModal = useBaseModalStore();
const isApplyModalOpen = ref(false);

// isRecruitmentClosed가 props.postDetails?.finished와 동기화되도록 watch 추가
const isRecruitmentClosed = ref(props.postDetails?.finished);

watch(() => props.postDetails?.finished, (newValue) => {
  isRecruitmentClosed.value = newValue;
});

const openApplyModal = () => {
  if (props.isApplied) {
    baseModal.showModal({
      title: '신청 취소 확인',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => {
        props.handleApplyOrCancel(props.postDetails.id);
      }
    });
  } else {
    isApplyModalOpen.value = true;
  }
};

const closeApplyModal = () => {
  isApplyModalOpen.value = false;
};
</script>

<template>
 <div class="flex w-full md:w-[350px] bg-secondary-3 rounded-lg shadow-lg p-4 sticky top-[80px] md:shrink-0">
    <div v-if="props.loading">
      <p>로딩 중...</p>
    </div>
    <div v-else-if="props.postDetails" class="flex-1">
      <div class="p-4 relative">
        <ul class="space-y-2 text-gray-80 text-xs">
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="caption-b">모집 인원</strong>
            <span class="caption-r"> {{ props.postDetails.recruit_count }}명 </span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="font-semibold">진행 기간</strong>
            <span class="caption-r"> {{ props.postDetails.start_date }} ~ {{ props.postDetails.end_date }} </span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="caption-b">모집 마감일</strong>
            <span>
              {{ props.postDetails.recruit_deadline }}
            </span class="caption-r">
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="caption-b">포지션</strong>
            <span class="caption-r" v-if="props.postDetails && props.postDetails.techStack">
              {{ props.postDetails.position.join(', ') }}
            </span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="caption-b">스킬</strong>
            <span class="caption-r" v-if="props.postDetails && props.postDetails.techStack">
              {{ props.postDetails.techStack.join(', ') }}
            </span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="caption-b">모집 지역</strong>
            <span class="caption-r"> {{ props.postDetails.recruit_area }}</span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="caption-b">진행 방식</strong>
            <span class="caption-r"> {{ props.postDetails.on_offline }}</span>
          </li>
          <li class="grid grid-cols-[120px_1fr]">
            <strong class="caption-b">연락 방법</strong>
            <span class="caption-r">{{ props.postDetails.call_method }} | {{ props.postDetails.call_link }}</span>
          </li>
        </ul>
        <div>
          <template v-if="props.isAuthor">
            <div class="flex flex-col">
              <AppButton
                v-if="!props.isApplicantsPage"
                text="참여 신청자 목록 조회"
                type="primary"
                class="w-[294px] h-11 mt-6 text-[16px]"
                @click="props.handleViewApplicants"
              />
              <AppButton
                v-else
                text="게시물로 돌아가기"
                type="primary"
                class="w-[294px] h-11 mt-6 text-[16px]"
                @click="props.handleBackToPost"
              />
              <AppButton
  :text="isRecruitmentClosed ? '모집 마감됨' : '모집 마감하기'"
  :type="isRecruitmentClosed ? 'disabled' : 'secondary'"
  class="w-[294px] h-11 mt-3 text-[16px]"
  :disabled="isRecruitmentClosed"
  @click="props.handleCloseRecruitment(props.postDetails.id)"
/>
            </div>
          </template>
          <template v-else>
            <AppButton
              :text="isRecruitmentClosed ? '모집 마감됨' : (props.isApplied ? '신청 취소' : '참여 신청')"
              :type="isRecruitmentClosed ? 'disabled' : (props.isApplied ? 'secondary' : 'primary')"
              class="w-[294px] h-11 mt-6"
              @click="openApplyModal"
              :disabled="isRecruitmentClosed"
            />
          </template>
        </div>
      </div>
    </div>
  </div>

<ApplyModal
    v-if="props.postDetails"
    :isOpen="isApplyModalOpen"
    :postId="props.postDetails.id"
    @apply="(postId, selectedPositions) => props.handleApplyOrCancel(postId, selectedPositions)"
    @close="closeApplyModal"
  />
</template>
