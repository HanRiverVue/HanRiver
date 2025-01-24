<script setup>
import { ref, reactive, computed, watchEffect } from 'vue';
import OnboardTab from './OnboardTab.vue';
import SkillSelectButton from '@/components/SkillSelectButton.vue';
import { POSITION_SKILLS } from '@/constants/position';
import { SKILLS } from '@/constants/skill';
import ProgressBar from './ProgressBar.vue';
import AppButton from '@/components/AppButton.vue';
import { twMerge } from 'tailwind-merge';
import { postUserInfoOnboard } from '@/api/supabase/user';

const props = defineProps({
  registerData: {
    type: Object,
  },
  step: {
    type: Number,
    required: true,
  },
  maxPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['setRegisterData', 'prevStep']);

// 탭 인덱스
const activeIndex = ref(0);

// 선택한 포지션
const positions = reactive([...props.registerData.position]);
const positionString = positions.join(', ');

// 포지션과 스택
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
};

// 포지션 + 스킬 데이터 업데이트
watchEffect(() => {
  emit('setRegisterData', {
    userPositions: formattedData,
  });
});

// 폼 유효성 검사
const isFormValid = computed(() => {
  return (
    props.registerData.name.length > 0 &&
    props.registerData.short_introduce.length > 0 &&
    props.registerData.position.length > 0 &&
    props.registerData.userPositions.every((position) => position.stacks.length > 0)
  );
});

// 버튼 타입 결정
const buttonType = computed(() => {
  return isFormValid.value ? 'primary' : 'disabled';
});

const buttonStyle = computed(() => {
  return twMerge(
    'flex-1 py-[14px] body-large-m rounded-lg',
    !isFormValid.value && 'cursor-not-allowed',
  );
});

// 이전 단계로 이동
const prevStep = () => {
  emit('prevStep');
};

// 유저 정보 전송
const HandlePostUserInfoOnboard = () => {
  const userProfile = {
    name: props.registerData.name,
    short_introduce: props.registerData.short_introduce,
  };
  const userPositions = props.registerData.userPositions;

  console.log('전송', JSON.stringify(userProfile, null, 2), JSON.stringify(userPositions, null, 2));

  // postUserInfoOnboard(userProfile, userPositions);
};
</script>

<template>
  <div class="flex flex-col justify-between w-[574px] h-full bg-white/85 z-10 p-5 rounded">
    <div class="flex flex-col gap-7">
      <ProgressBar :currentPage="step" :maxPage="maxPage" />
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
    </div>
    <!-- 버튼 -->
    <div class="flex gap-2">
      <AppButton
        type="secondary"
        text="이전"
        class="flex-1 py-[14px] body-large-m rounded-lg"
        @click="prevStep"
      />
      <AppButton
        :type="buttonType"
        text="완료"
        :class="buttonStyle"
        @click="HandlePostUserInfoOnboard"
      />
    </div>
  </div>
</template>
<style scoped></style>
