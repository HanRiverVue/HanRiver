<script setup>
import SkillSelectButton from '@/components/SkillSelectButton.vue';
import { POSITION_SKILLS } from '@/constants/position';
import { SKILLS } from '@/constants/skill';
import { computed } from 'vue';

const props = defineProps({
  selectedPositions: {
    type: Array,
    required: true,
  },
});

const skillsBySelectedPositions = computed(() => {
  return props.selectedPositions.map((position) => ({
    name: position,
    skills: POSITION_SKILLS[position],
  }));
});
</script>
<template>
  <section>
    <h2 class="text-gray-80 h2-b mb-2">관심있거나 보유하고 있는 스킬</h2>
    <div class="input-shadow p-7 flex flex-col gap-8 rounded-lg">
      <div v-for="selected in skillsBySelectedPositions" :key="selected.name">
        <h3 class="text-gray-80 h3-b mb-3">{{ selected.name }}</h3>
        <div class="flex flex-wrap gap-x-4 gap-y-3">
          <SkillSelectButton v-for="skill in selected.skills" :key="skill">
            <template #icon="{ className }">
              <img :src="SKILLS[skill]" :alt="skill" :class="className" />
            </template>
            {{ skill }}
          </SkillSelectButton>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
