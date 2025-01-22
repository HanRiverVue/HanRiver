<script setup>
import PositionSmallBadge from '@/components/PositionSmallBadge.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import { ref } from 'vue';
import AppButton from '@/components/AppButton.vue';
import * as logos from '@/assets/images/skills/index';

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
});

const text = ref('');

if (props.status === 'success') {
  text.value = '수락 완료';
} else if (props.status === 'done') {
  text.value = '모집 마감';
} else if (props.status === 'warning') {
  text.value = '수락 대기중';
}
</script>

<template>
  <div class="w-[522px] py-6 px-6 rounded-lg text-gray-80 input-shadow">
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
          <img :src="logos[`${skill}_logo`]" alt="Skill logo" />
        </li>
      </ul>
      <ul class="flex items-center gap-2">
        <li v-for="(position, index) in position" :key="index">
          <PositionSmallBadge :position="position" />
        </li>
      </ul>
      <div class="flex items-center justify-between">
        <p class="caption-r text-gray-50">마감일 | {{ applicationDeadline }}</p>
        <AppButton type="cancel" text="신청 취소" class="px-3 py-1.5 body-r rounded-[4px]" />
      </div>
    </div>
  </div>
</template>
