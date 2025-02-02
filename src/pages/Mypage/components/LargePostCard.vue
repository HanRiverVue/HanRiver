<script setup>
import PositionSmallBadge from '@/components/PositionSmallBadge.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import { ref } from 'vue';
import AppButton from '@/components/AppButton.vue';
import { deleteApplicationHandle } from '@/api/supabase/apply';
import { SKILLS } from '@/constants/skill';
import { useBaseModalStore } from '@/stores/baseModal';

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
    type: Number,
    required: true,
  },
});

const baseModal = useBaseModalStore();

// AppButton 클릭시
const handleOpenModal = () => {
  baseModal.showModal({
    title: '신청을 취소하시겠습니까?',
    confirmText: '취소하기',
    cancelText: '돌아가기',
    onConfirm: async () => await deleteApplicationHandle(props.postId),
  });
};

// 전달받은 포스트 카드 클릭이벤트
const emit = defineEmits(['click']);

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
</script>

<template>
  <div
    class="w-[522px] p-6 rounded-lg text-gray-80 input-shadow hover:card-shadow"
    @click="$emit('click')"
  >
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
</template>
