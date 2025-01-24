<script setup>
import { computed, ref } from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import PositionSelectButton from '@/components/PositionSelectButton.vue';
import { MAX_SHORT_INTRODUCE_LENGTH, MAX_NICKNAME_LENGTH, POSITION } from '@/constants';
import { getAllUserInfo } from '@/api/supabase/user';

const props = defineProps({
  registerData: {
    type: Object,
  },
});
const emit = defineEmits(['update', 'positionsSelect']);
const baseInputRef = ref(null);
const localRegisterData = ref({ ...props.registerData });

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

const nicknameCheckResult = ref(NicknameStatus.INITIAL); // 닉네임 상태

const NicknameMessage = computed(() => NicknameMessages[nicknameCheckResult.value]);
const NicknameMessageStyle = computed(() => NicknameMessageStyles[nicknameCheckResult.value]);

// const handleLocalRegisterDataInput = (newData) => {
//   Object.assign(localRegisterData, newData);
//   console.log('localRegisterData',JSON.stringify(registerData));
// };

const handleNickNameInput = (value) => {
  localRegisterData.value.name = value;
  emit('update', { name: value });
};

const handleShortIntroduceInput = (value) => {
  localRegisterData.value.short_introduce = value;
  emit('update', { short_introduce: value });
};

const handlePositionsSelect = (value) => {
  localRegisterData.value.positionsSelect = value;
  emit('positionsSelect', value);
};

// 닉네임 유효성 검사
//TODO: 앞부분 공백인 경우도 있음... 예) `  3` 이럴 경우 앞부분 공백을 지워줘야 함
const nicknameValidationStatus = async (nickname) => {
  console.log(nickname);
  if (!nickname.trim()) {
    baseInputRef.value.focus();
    localRegisterData.value.name = '';
    // 공백일 경우
    nicknameCheckResult.value = NicknameStatus.EMPTY;
    return;
  }
  const allUserInfo = await getAllUserInfo(); // 모든 유저 정보 가져오기
  const isDuplicate = allUserInfo.some((user) => user.name === nickname);
  if (isDuplicate) {
    nicknameCheckResult.value = NicknameStatus.DUPLICATE;
  } else if (!/^[a-zA-Z0-9ㄱ-ㅎ가-힣\s]*$/.test(nickname)) {
    // 특수문자 체크
    nicknameCheckResult.value = NicknameStatus.INVALID;
  } else {
    nicknameCheckResult.value = NicknameStatus.VALID; // 유효한 닉네임
  }
};
</script>

<template>
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
</template>

<style scoped></style>
