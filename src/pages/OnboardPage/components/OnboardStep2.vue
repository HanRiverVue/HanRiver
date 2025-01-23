<script setup>
import { ref } from 'vue';
import OnboardTab from './OnboardTab.vue';
import SkillSelectButton from '@/components/SkillSelectButton.vue';
import { POSITION_SKILLS } from '@/constants/skills';

const activeIndex = ref(0);

// TODO: 유저가 선택한 값으로 받아서 변경
const positions = ['프론트엔드', '백엔드', '마케팅'];
const positionString = positions.join(', ');
</script>

<template>
  <div class="text-gray-80 h4-b mb-7">
    병알이 님은
    <span class="text-primary-3">{{ positionString }} </span> 을 선택해주셨어요. <br />
    관심있거나 보유하고 있는 스킬을 선택해주세요.
  </div>
  <!-- 탭 -->
  <div class="flex flex-col gap-5">
    <!-- 탭 메뉴 -->
    <OnboardTab :menu-items="positions" v-model:activeIndex="activeIndex" />

    <!-- 탭 내용 -->
    <div class="flex flex-wrap gap-3">
      <SkillSelectButton v-for="skill in POSITION_SKILLS[positions[activeIndex]]" :key="skill">
        <template #icon="{ className }">
          <img :src="skill.image" :alt="skill.name" :class="className" />
        </template>
        {{ skill.name }}
      </SkillSelectButton>
    </div>
  </div>
</template>
<style scoped></style>
