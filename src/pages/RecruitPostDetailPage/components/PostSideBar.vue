<script setup>
import { ref, watch } from 'vue';
import { useBaseModalStore } from '@/stores/baseModal';
import AppButton from '@/components/AppButton.vue';
import ApplyModal from './ApplyModal.vue';
import { useLoginModalStore } from '@/stores/loginModal';
import { useUserStore } from '@/stores/user';

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

const isRecruitmentClosed = ref(props.postDetails?.finished);

watch(
  () => props.postDetails?.finished,
  (newValue) => {
    isRecruitmentClosed.value = newValue;
  },
);

const openApplyModal = () => {
  const store = useLoginModalStore();
  const storeUser = useUserStore();

  if (props.isApplied) {
    baseModal.showModal({
      title: '신청을 취소 하시겠어요?',
      confirmText: '취소하기',
      cancelText: '돌아가기',
      onConfirm: () => {
        props.handleApplyOrCancel(props.postDetails.id);
      },
    });
  } else {
    if (!storeUser.isLoggedIn) {
      store.setLoginModal(true);
    } else {
      isApplyModalOpen.value = true;
    }
  }
};

const openCloseRecruitmentModal = () => {
  baseModal.showModal({
    title: '모집을 마감하시겠어요?',
    confirmText: '마감하기',
    cancelText: '돌아가기',
    onConfirm: () => {
      handleCloseRecruitmentClick();
    },
  });
};

const closeApplyModal = () => {
  isApplyModalOpen.value = false;
};

const handleCloseRecruitmentClick = () => {
  props.handleCloseRecruitment(props.postDetails.id);
  isRecruitmentClosed.value = true;
};
</script>

<template>
  <div
    class="flex w-full max-w-[350px] bg-secondary-3 rounded-lg shadow-lg px-7 py-6 sticky top-[80px] md:shrink-0"
  >
    <div v-if="props.loading">
      <p>로딩 중...</p>
    </div>
    <div v-else-if="props.postDetails">
      <ul class="space-y-2 text-gray-80 text-xs">
        <li class="grid grid-cols-[82px_1fr]">
          <strong class="caption-b">모집 인원</strong>
          <span class="caption-r"> {{ props.postDetails.recruit_count }}명 </span>
        </li>
        <li class="grid grid-cols-[82px_1fr]">
          <strong class="font-semibold">진행 기간</strong>
          <span class="caption-r">
            {{ props.postDetails.start_date }} ~ {{ props.postDetails.end_date }}
          </span>
        </li>
        <li class="grid grid-cols-[82px_1fr]">
          <strong class="caption-b">모집 마감일</strong>
          <span class="caption-r">
            {{ props.postDetails.recruit_deadline }}
          </span>
        </li>
        <li class="grid grid-cols-[82px_1fr]">
          <strong class="caption-b">포지션</strong>
          <span class="caption-r" v-if="props.postDetails && props.postDetails.techStack">
            {{ props.postDetails.position.join(', ') }}
          </span>
        </li>
        <li class="grid grid-cols-[82px_1fr]">
          <strong class="caption-b">스킬</strong>
          <span
            class="caption-r break-words"
            v-if="props.postDetails && props.postDetails.techStack"
          >
            {{ props.postDetails.techStack.join(', ') }}
          </span>
        </li>
        <li class="grid grid-cols-[82px_1fr]">
          <strong class="caption-b">모집 지역</strong>
          <span class="caption-r"> {{ props.postDetails.recruit_area }}</span>
        </li>
        <li class="grid grid-cols-[82px_1fr]">
          <strong class="caption-b">진행 방식</strong>
          <span class="caption-r"> {{ props.postDetails.on_offline }}</span>
        </li>
        <li class="grid grid-cols-[82px_1fr]">
          <strong class="caption-b">연락 방법</strong>
          <span class="caption-r break-all"
            >{{ props.postDetails.call_method }} | {{ props.postDetails.call_link }}</span
          >
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
              :text="isRecruitmentClosed ? '모집이 마감되었습니다' : '모집 마감하기'"
              :type="isRecruitmentClosed ? 'disabled' : 'secondary'"
              class="w-[294px] h-11 mt-3 text-[16px]"
              :disabled="isRecruitmentClosed"
              @click="openCloseRecruitmentModal"
            />
          </div>
        </template>
        <template v-else>
          <AppButton
            :text="
              isRecruitmentClosed
                ? '모집이 마감되었습니다'
                : props.isApplied
                ? '신청 취소'
                : '참여 신청'
            "
            :type="isRecruitmentClosed ? 'disabled' : props.isApplied ? 'cancel' : 'primary'"
            class="w-[294px] h-11 mt-6"
            @click="openApplyModal"
            :disabled="isRecruitmentClosed"
          />
        </template>
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
