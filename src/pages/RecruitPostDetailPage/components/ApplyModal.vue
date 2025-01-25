<script setup>
import PositionSelectButton from '@/components/PositionSelectButton.vue';
import { reactive } from 'vue';

const APPLY_LIMIT = 3;

// TODO: 실제 사용 시, 게시글에서 모집 포지션 받아서 넣어야 함 (임시 데이터)
const DUMMY_POSITIONS = ['PM', '디자인', '기획', '마케팅', '프론트엔드'];

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const selectedPositions = reactive([]);

const togglePosition = (position) => {
  const index = selectedPositions.indexOf(position);
  if (index === -1) {
    if (selectedPositions.length >= APPLY_LIMIT) return;
    selectedPositions.push(position);
  } else {
    selectedPositions.splice(index, 1);
  }
};

const handleApply = () => {
  // TODO: 신청하기 API 호출 하는 로직 어쩌구
  emit('close');
};
</script>
<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 w-full h-full bg-black/50 z-50 backdrop-blur-sm flex items-center justify-center"
  >
    <article class="bg-secondary-2 rounded-[20px] px-12 py-9">
      <section class="text-center mb-4">
        <h2 class="h4-b text-gray-70 mb-0.5">어떤 포지션으로 신청하시겠어요?</h2>
        <p class="caption-r text-gray-70">최대 {{ APPLY_LIMIT }}개까지 선택할 수 있어요.</p>
      </section>
      <section class="bg-white p-5 rounded-lg input-shadow grid grid-cols-3 gap-4">
        <PositionSelectButton
          v-for="position in DUMMY_POSITIONS"
          :key="position"
          size="small"
          :isSelected="selectedPositions.includes(position)"
          @click="togglePosition(position)"
        >
          {{ position }}
        </PositionSelectButton>
      </section>
      <section class="body-r flex gap-4 w-full mt-8">
        <button
          type="button"
          class="bg-white/70 text-gray-70 py-2.5 rounded-lg modal-button-shadow grow"
          @click="emit('close')"
        >
          돌아가기
        </button>
        <button
          type="button"
          class="bg-primary-1/80 text-white py-2.5 rounded-lg modal-button-shadow grow"
          @click="handleApply"
        >
          완료하기
        </button>
      </section>
    </article>
  </div>
</template>
<style scoped></style>
