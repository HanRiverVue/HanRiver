<script setup>
import { ref, reactive, computed } from 'vue';
import OnboardTab from './OnboardTab.vue';
import SkillSelectButton from '@/components/SkillSelectButton.vue';
import { POSITION_SKILLS } from '@/constants/position';
import { SKILLS } from '@/constants/skill';

const props = defineProps({
  registerData: {
    type: Object,
  },
});

const emit = defineEmits(['update']);

// 탭 인덱스
const activeIndex = ref(0);

// 선택한 포지션
const positions = reactive([...props.registerData.position]);
const positionString = positions.join(', ');

// 선택한 스킬
const skills = reactive([]);

// 포지션과 스택 초기화
const formattedData = reactive(
  positions.map((position) => ({
    position,
    stacks: [], // 초기 스택
  })),
);

const handleSkillSelect = (skill) => {
  const currentPosition = formattedData[activeIndex.value]; // 현재 탭 포지션 데이터
  if (currentPosition.stacks.includes(skill)) {
    // 이미 선택된 스킬이면 제거
    const index = currentPosition.stacks.indexOf(skill);
    currentPosition.stacks.splice(index, 1);
  } else {
    // 선택된 스킬 추가
    currentPosition.stacks.push(skill);
  }
  console.log('Updated formattedData:', formattedData);
};

// 포지션 + 스킬 데이터 업데이트
const handleUserPositionsSelect = () => {
  emit('update', { position: formattedData });
};
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
      <SkillSelectButton
        v-for="skill in POSITION_SKILLS[positions[activeIndex]]"
        :key="skill"
        :isSelected="formattedData[activeIndex].stacks.includes(skill)"
        @click="handleSkillSelect(skill)"
      >
        <template #icon="{ className }">
          <img :src="SKILLS[skill]" :alt="skill.name" :class="className" />
          {{ skill.name }}
        </template>
        {{ skill }}
      </SkillSelectButton>
    </div>
  </div>
</template>
<style scoped></style>
