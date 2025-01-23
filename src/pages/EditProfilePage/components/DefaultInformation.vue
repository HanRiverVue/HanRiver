<script setup>
import BaseInput from '@/components/BaseInput.vue';
import {
  MAX_NICKNAME_LENGTH,
  MAX_SHORT_INTRODUCE_LENGTH,
  NICKNAME_MESSAGE_STATUS,
} from '@/constants';
import { ref, computed, onMounted, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import TEMP_IMAGE from '@/assets/images/temp-profile.png';
import { twMerge } from 'tailwind-merge';
import { useProfileStore } from '@/stores/profile';
import DropdownButton from '@/components/DropdownButton.vue';
import { PencilIcon } from '@/assets/icons';
import DropdownMenu from '@/components/DropdownMenu.vue';

// TODO: 이미지 삭제 및 업로드 기능 추가
const profileStore = useProfileStore();
const { isCheckNickname, nicknameMessageStatus, nickname, shortIntroduction } =
  storeToRefs(profileStore);
const { setIsCheckNickname, setNickname, setShortIntroduction } = profileStore;

const newNickname = ref('');
const messageType = ref('default');
const dropdownList = reactive([
  {
    label: '이미지 변경하기',
    action: () => {
      console.log('프로필 사진 변경');
    },
  },
  {
    label: '이미지 삭제하기',
    action: () => {
      console.log('프로필 삭제');
    },
  },
]);
const nicknameMessage = computed(() => NICKNAME_MESSAGE_STATUS[nicknameMessageStatus.value]);
const nicknameMessageStyleClass = computed(() =>
  twMerge(
    (nicknameMessageStatus.value === 'symbol' || nicknameMessageStatus.value === 'duplicate') &&
      'text-accent-error',
    nicknameMessageStatus.value === 'success' && 'text-primary-3',
  ),
);

const handleNickNameInput = (value) => {
  newNickname.value = value;
  if (newNickname.value === nickname.value) {
    messageType.value = 'success';
    setIsCheckNickname(true);
  } else {
    messageType.value = 'default';
    setIsCheckNickname(false);
  }
};

const handleShortIntroductionInput = (value) => {
  setShortIntroduction(value);
};

const handleCheckNickname = () => {
  if (newNickname.value.trim() === '') {
    nicknameMessageStatus.value = 'blank';
    setIsCheckNickname(false);
    return;
  }

  if (!/^[a-zA-Z0-9ㄱ-ㅎ가-힣]*$/.test(newNickname.value)) {
    nicknameMessageStatus.value = 'symbol';
    setIsCheckNickname(false);
    return;
  }

  // TODO: 닉네임 중복 확인 API 호출
  // 만약 닉네임 중복에 문제가 없을 경우
  messageType.value = 'success';
  setIsCheckNickname(true);
  setNickname(newNickname.value);

  // 만약 닉네임 중복에 문제가 있을 경우
  // nicknameMessageStatus.value = 'duplicate';
  // setIsCheckNickname(false);
};

onMounted(() => {
  newNickname.value = nickname.value;
  messageType.value = 'success';
  setIsCheckNickname(true);
});
</script>
<template>
  <h2 class="text-gray-80 h2-b mb-2">기본 정보</h2>
  <div class="flex gap-[70px] items-center px-12">
    <DropdownButton>
      <template #trigger="{ toggleDropdown }">
        <div class="group w-[190px] h-[190px] rounded-full relative overflow-hidden">
          <button
            type="button"
            class="absolute w-[190px] h-[190px] bg-black/60 hidden group-hover:flex items-center justify-center"
            @click="toggleDropdown"
          >
            <PencilIcon class="text-white w-6 h-6" />
          </button>
          <img :src="TEMP_IMAGE" alt="임시 프로필 이미지" />
        </div>
      </template>
      <template #menu="{ isOpen, closeDropdown }">
        <DropdownMenu
          :isOpen="isOpen"
          :dropdownList="dropdownList"
          class="top-1/2 -translate-y-1/2 left-1/2 ml-6"
          @onClose="closeDropdown"
        />
      </template>
    </DropdownButton>
    <div class="grow">
      <section class="mb-6">
        <h3 class="h3-b text-gray-80 mb-2.5">닉네임을 입력해주세요.</h3>
        <BaseInput
          :value="newNickname"
          placeholder="닉네임"
          :maxLength="MAX_NICKNAME_LENGTH"
          className="pr-2 py-2"
          @input="handleNickNameInput"
        >
          <template #rightIcon>
            <button
              type="button"
              :disabled="isCheckNickname"
              class="primary-button px-3 py-1.5 shrink-0 body-r"
              @click="handleCheckNickname"
            >
              중복확인
            </button>
          </template>
        </BaseInput>
        <div class="flex justify-between gap-3 mt-1 body-r text-gray-50">
          <p :class="nicknameMessageStyleClass">{{ nicknameMessage }}</p>
          <p>{{ newNickname.length }}/{{ MAX_NICKNAME_LENGTH }}</p>
        </div>
      </section>
      <section>
        <h3 class="h3-b text-gray-80 mb-2.5">간단하게 본인을 소개해주세요.</h3>
        <BaseInput
          :value="shortIntroduction"
          placeholder="한 줄 소개"
          :maxLength="MAX_SHORT_INTRODUCE_LENGTH"
          @input="handleShortIntroductionInput"
        />
        <p class="body-r text-gray-50 justify-self-end mt-1">
          {{ shortIntroduction.length }}/{{ MAX_SHORT_INTRODUCE_LENGTH }}
        </p>
      </section>
    </div>
  </div>
</template>
<style scoped></style>
