<script setup>
import { getPostPositions } from '@/api/supabase/post';
import PositionSelectButton from '@/components/PositionSelectButton.vue';
import { ref, watch } from 'vue';

const positions = ref([]);
const selectedPositions = ref([]);

const APPLY_LIMIT = 3;

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  postId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['apply', 'close']);

// 포지션 데이터 불러오기
const fetchPositions = async () => {
  if (!props.postId) return;

  try {
    const data = await getPostPositions(props.postId);
    positions.value = data ?? [];
  } catch (error) {
    console.error('포지션 불러오기 실패:', error);
  }
};
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) fetchPositions();
  },
);

const togglePosition = (position) => {
  const index = selectedPositions.value.indexOf(position);
  if (index === -1) {
    if (selectedPositions.value.length >= APPLY_LIMIT) return;
    selectedPositions.value.push(position);
  } else {
    selectedPositions.value.splice(index, 1);
  }
};

const handleApply = () => {
  if (!selectedPositions.value || selectedPositions.value.length === 0) {
    alert('최소 1개의 포지션을 선택해주세요.');
    return;
  }
  emit('apply', props.postId, selectedPositions.value);
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
          v-for="position in positions"
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
