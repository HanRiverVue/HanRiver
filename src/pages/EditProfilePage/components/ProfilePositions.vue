<script setup>
import PositionSelectButton from '@/components/PositionSelectButton.vue';
import { MAX_POSITION_COUNT, POSITION } from '@/constants';
import { useProfileStore } from '@/stores/profile';
import { computed } from 'vue';

const profileStore = useProfileStore();
const positions = computed(() => Object.keys(profileStore.positionWithSkills));
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
        :isSelected="positions.includes(name)"
        @click="profileStore.togglePosition(name)"
      >
        {{ name }}
      </PositionSelectButton>
    </div>
  </section>
</template>
<style scoped></style>
