<script setup>
import PositionSmallBadge from '@/components/PositionSmallBadge.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import { ref } from 'vue';
import AppButton from '@/components/AppButton.vue';
import BaseModal from '@/components/BaseModal.vue';
import { deleteApplicationHandle } from '@/api/supabase/apply';
import { SKILLS } from '@/constants/skill';

const props = defineProps({
  projectTitle: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    default: () => [],
  },
  position: {
    type: Array,
    default: () => [],
  },
  applicationDeadline: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
});
// 전달받은 포스트 카드 클릭이벤트
const emit = defineEmits(['click']);

const showModal = ref(false);

// 게시물의 신청 상태에 따른 신청 상태,버튼 종류 설정
const text = ref('');
const type = ref('');

if (props.status === 'success') {
  text.value = '수락 완료';
  type.value = '';
} else if (props.status === 'done') {
  text.value = '모집 마감';
  type.value = 'disabled2';
} else if (props.status === 'warning') {
  text.value = '수락 대기중';
  type.value = 'cancel';
}

const handleClose = () => {
  showModal.value = false;
};
const handleSubmit = async () => {
  // ... 신청취소 API 호출
  await deleteApplicationHandle(props.postId);
  showModal.value = false;
};

// 모달창에서 돌아가기 버튼 클릭
const handleOpenModal = () => {
  showModal.value = true;
};
</script>

<template>
  <div class="w-[522px] py-6 px-6 rounded-lg text-gray-80 input-shadow" @click="$emit('click')">
    <!-- 제목 & 상태   -->
    <div class="flex justify-between items-center mb-[14px]">
      <p class="body-large-b text-gray-80 line-clamp-3">
        {{ projectTitle }}
      </p>
      <StatusBadge :status="status">{{ text }}</StatusBadge>
    </div>

    <!--  기술 스택  & 포지션 & 마감일 & 신청취소 버튼 -->
    <div class="flex flex-col gap-3">
      <ul class="flex gap-1">
        <li v-for="(skill, index) in skills" :key="index" class="w-7 h-7">
          <img :src="SKILLS[skill]" alt="Skill logo" />
        </li>
      </ul>
      <ul class="flex items-center gap-2">
        <li v-for="(position, index) in position" :key="index">
          <PositionSmallBadge :position="position" />
        </li>
      </ul>
      <div class="flex items-center justify-between">
        <p class="caption-r text-gray-50">마감일 | {{ applicationDeadline }}</p>
        <AppButton
          v-if="type"
          :type="type"
          text="신청취소"
          :disabled="status === 'done'"
          class="px-3 py-1.5 body-r rounded-[4px]"
          @click.stop="handleOpenModal"
        />
      </div>
    </div>
  </div>
  <!-- 신청취소 버튼 클릭시 띄워줄 모달 -->
  <BaseModal v-if="showModal" @cancel="handleClose" @submit="handleSubmit"
    >신청을 취소 하시겠어요?</BaseModal
  >
</template>
