<script setup>
import PositionSelectButton from '@/components/PositionSelectButton.vue';
import { MAX_POSITION_COUNT, POSITION } from '@/constants';

const props = defineProps({
  selectedPositions: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['updatePositions']);
</script>
<template>
  <section>
    <div class="flex justify-between items-center mb-2 gap-10">
      <h2 class="text-gray-80 h2-b">희망하는 포지션</h2>
      <p class="body-r text-gray-50">최대 {{ MAX_POSITION_COUNT }}개 선택</p>
    </div>
    <div class="p-7 gap-4 flex items-center input-shadow flex-wrap">
      <PositionSelectButton
        v-for="name in POSITION"
        :key="name"
        size="small"
        :isSelected="props.selectedPositions.includes(name)"
        className="whitespace-nowrap flex-1 basis-0 px-3 max-w-[95px] min-w-fit"
        @click="emit('updatePositions', name)"
      >
        {{ name }}
      </PositionSelectButton>
    </div>
  </section>
</template>
<style scoped></style>
