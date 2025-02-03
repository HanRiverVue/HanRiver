<script setup>
import SkillSelectButton from '@/components/SkillSelectButton.vue';
import { POSITION_SKILLS } from '@/constants/position';
import { SKILLS } from '@/constants/skill';
import { useProfileStore } from '@/stores/profile';
import { computed } from 'vue';

const profileStore = useProfileStore();

const positions = computed(() => Object.keys(profileStore.positionWithSkills));
const skillsByPositions = computed(() => {
  return positions.value.map((position) => ({
    name: position,
    skills: POSITION_SKILLS[position],
  }));
});
</script>
<template>
  <section>
    <h2 class="text-gray-80 h2-b mb-2">관심있거나 보유하고 있는 스킬</h2>
    <div class="input-shadow p-7 flex flex-col gap-8 rounded-lg">
      <div v-for="positionData in skillsByPositions" :key="positionData.name">
        <h3 class="text-gray-80 h3-b mb-3">{{ positionData.name }}</h3>
        <div class="flex flex-wrap gap-x-4 gap-y-3">
          <SkillSelectButton
            v-for="skill in positionData.skills"
            :key="skill"
            :isSelected="profileStore.positionWithSkills[positionData.name].includes(skill)"
            @click="profileStore.toggleSkill(positionData.name, skill)"
          >
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
