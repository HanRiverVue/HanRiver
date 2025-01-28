<script setup>
import { computed, ref, reactive, watch } from 'vue';
import { MAX_SHORT_INTRODUCE_LENGTH, MAX_NICKNAME_LENGTH, POSITION } from '@/constants';
import { checkDuplicateNickname } from '@/api/supabase/user';
import { twMerge } from 'tailwind-merge';
import BaseInput from '@/components/BaseInput.vue';
import PositionSelectButton from '@/components/PositionSelectButton.vue';
import ProgressBar from './ProgressBar.vue';
import AppButton from '@/components/AppButton.vue';

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

const emit = defineEmits(['setRegisterData', 'nextStep']);
const baseInputRef = ref(null);
const localRegisterData = reactive({ ...props.registerData });

const nicknameCheckResult = ref(props.registerData.nicknameResult); // 닉네임 상태

watch(
  () => props.registerData.nicknameResult,
  (newValue) => {
    nicknameCheckResult.value = newValue;
  },
);

const NicknameStatus = {
  EMPTY: 'EMPTY', // 공백일 경우
  INITIAL: 'INITIAL', // 초기 상태
  VALID: 'VALID', // 사용 가능한 닉네임
  DUPLICATE: 'DUPLICATE', // 중복된 닉네임
  INVALID: 'INVALID', // 특수문자 등 규칙 위반
};
const NicknameMessages = {
  EMPTY: '닉네임을 입력해주세요.',
  INITIAL: '중복된 이름ㆍ특수문자 사용불가',
  VALID: '사용 가능한 닉네임입니다',
  DUPLICATE: '이미 사용 중인 닉네임입니다',
  INVALID: '특수문자는 사용할 수 없습니다',
};
const NicknameMessageStyles = {
  EMPTY: 'text-gray-50',
  INITIAL: 'text-gray-50',
  VALID: 'text-primary-3',
  DUPLICATE: 'text-accent-error',
  INVALID: 'text-accent-error',
};

const NicknameMessage = computed(() => NicknameMessages[nicknameCheckResult.value]);
const NicknameMessageStyle = computed(() => NicknameMessageStyles[nicknameCheckResult.value]);

const handleNickNameInput = (value) => {
  const trimmedValue = value.trim();
  localRegisterData.name = trimmedValue;
  emit('setRegisterData', { nicknameResult: NicknameStatus.INITIAL });
  emit('setRegisterData', { name: trimmedValue });
};

// 한 줄 소개 입력
const handleShortIntroduceInput = (value) => {
  const trimmedValue = value.trim();
  localRegisterData.short_introduce = trimmedValue;
  emit('setRegisterData', { short_introduce: trimmedValue });
};

// 선택된 포지션
const handlePositionsSelect = (value) => {
  if (localRegisterData.position.includes(value)) {
    // 이미 선택된 포지션이면 제거
    const index = localRegisterData.position.indexOf(value);
    localRegisterData.position.splice(index, 1);
  } else if (localRegisterData.position.length < 3) {
    // 선택 가능 개수를 초과하지 않으면 추가
    localRegisterData.position.push(value);
    console.log(localRegisterData.position);
  } else {
    alert('최대 3개의 포지션만 선택 가능합니다.');
  }
};

// 닉네임 유효성 검사
const nicknameValidationStatus = async (nickname) => {
  // 앞뒤 공백 제거
  const trimmedNickname = nickname.trim();
  // 공백일 경우
  if (!trimmedNickname) {
    baseInputRef.value.focus();
    localRegisterData.name = '';
    emit('setRegisterData', { nicknameResult: NicknameStatus.EMPTY });
    return;
  }
  const result = await checkDuplicateNickname(trimmedNickname); // 중복 확인
  if (result) {
    emit('setRegisterData', { nicknameResult: NicknameStatus.DUPLICATE });
  } else if (!/^[a-zA-Z0-9ㄱ-ㅎ가-힣ㅏ-ㅣ\s]*$/.test(trimmedNickname)) {
    // 특수문자 체크
    emit('setRegisterData', { nicknameResult: NicknameStatus.INVALID });
  } else {
    emit('setRegisterData', { nicknameResult: NicknameStatus.VALID }); // 사용 가능한 닉네임
  }
};

// 폼 유효성 검사
const isFormValid = computed(() => {
  return (
    props.registerData.name.length > 0 &&
    props.registerData.nicknameResult === 'VALID' &&
    props.registerData.short_introduce.length > 0 &&
    props.registerData.position.length > 0
  );
});

// 버튼 타입 결정
const buttonType = computed(() => {
  return isFormValid.value ? 'primary' : 'disabled';
});

const buttonStyle = computed(() => {
  return twMerge('py-[14px] body-large-m rounded-lg', !isFormValid.value && 'cursor-not-allowed');
});

// 다음 단계로 이동
const nextStep = () => {
  if (!isFormValid.value) return;
  emit('nextStep');
};
</script>

<template>
  <div class="flex flex-col justify-between w-[574px] h-full bg-white/85 z-10 p-5 rounded">
    <div class="flex flex-col gap-7">
      <ProgressBar :currentPage="step" :maxPage="maxPage" />
      <div class="flex flex-col w-full">
        <article class="flex flex-col w-full gap-7">
          <!-- 닉네임 입력 -->
          <section>
            <h3 class="h4-b text-gray-80 mb-[10px]">닉네임을 입력해주세요.</h3>
            <BaseInput
              ref="baseInputRef"
              :value="localRegisterData.name"
              placeholder="닉네임"
              :maxLength="MAX_NICKNAME_LENGTH"
              className="pr-2 py-2"
              @input="handleNickNameInput"
            >
              <template #rightIcon>
                <button
                  type="button"
                  class="primary-button px-3 py-1.5 shrink-0 body-r"
                  @click="nicknameValidationStatus(localRegisterData.name)"
                >
                  중복확인
                </button>
              </template>
            </BaseInput>
            <div class="flex justify-between gap-3 mt-1 caption-r text-gray-50">
              <p :class="NicknameMessageStyle">{{ NicknameMessage }}</p>
              <p>{{ localRegisterData.name.length }}/{{ MAX_NICKNAME_LENGTH }}</p>
            </div>
          </section>

          <!-- 한 줄 소개 -->
          <section>
            <h3 class="h4-b text-gray-80 mb-[10px]">간단하게 본인을 소개해주세요.</h3>
            <BaseInput
              :value="localRegisterData.short_introduce"
              placeholder="한 줄 소개"
              :maxLength="MAX_SHORT_INTRODUCE_LENGTH"
              @input="handleShortIntroduceInput"
            />
            <div class="mt-1 body-r text-gray-50 justify-self-end">
              <p>{{ localRegisterData.short_introduce.length }}/{{ MAX_SHORT_INTRODUCE_LENGTH }}</p>
            </div>
          </section>

          <!-- 포지션 -->
          <section>
            <div class="flex justify-between w-full">
              <h3 class="h4-b text-gray-80 mb-[10px]">희망하는 포지션을 선택해주세요.</h3>
              <div class="caption-r text-gray-50">최대 3개 선택</div>
            </div>
            <div class="flex flex-wrap gap-[18px]">
              <PositionSelectButton
                v-for="name in POSITION"
                :key="name"
                size="large"
                :isSelected="props.registerData.position.includes(name)"
                @click="handlePositionsSelect(name)"
              >
                {{ name }}
              </PositionSelectButton>
            </div>
          </section>
        </article>
      </div>
    </div>
    <!-- 버튼 -->
    <AppButton :type="buttonType" text="다음" :class="buttonStyle" @click="nextStep" />
  </div>
</template>

<style scoped></style>
