<script setup>
import BaseInput from '@/components/BaseInput.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { MAX_NICKNAME_LENGTH, MAX_SHORT_INTRODUCE_LENGTH } from '@/constants';
import { ref, reactive, defineProps, defineEmits, computed } from 'vue';
import TEMP_IMAGE from '@/assets/images/temp-profile.png';
import { PencilIcon } from '@/assets/icons';
import DropdownButton from '@/components/DropdownButton.vue';
import { twMerge } from 'tailwind-merge';

const props = defineProps({
  nickname: {
    type: String,
    required: true,
  },
  shortIntroduction: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['updateNickname', 'updateShortIntroduction']);

const nicknameMessageByType = {
  default: '중복된 이름ㆍ특수문자 사용불가',
  symbol: '특수문자는 사용할 수 없습니다',
  duplicate: '이미 사용 중인 닉네임입니다',
  success: '사용 가능한 닉네임입니다',
};
const messageType = ref('success');
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
const nicknameMessage = computed(() => nicknameMessageByType[messageType.value]);
const nicknameMessageStyleClass = computed(() =>
  twMerge(
    (messageType.value === 'symbol' || messageType.value === 'duplicate') && 'text-accent-error',
    messageType.value === 'success' && 'text-primary-3',
  ),
);

const handleNickNameInput = ($event) => {
  emit('updateNickname', $event.target.value);
};

const handleShortIntroductionInput = ($event) => {
  emit('updateShortIntroduction', $event.target.value);
};
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
          :value="props.nickname"
          placeholder="닉네임"
          :maxLength="MAX_NICKNAME_LENGTH"
          className="pr-2 py-2"
          @input="handleNickNameInput"
        >
          <template #rightIcon>
            <button type="button" class="primary-button px-3 py-1.5 shrink-0 body-r">
              중복확인
            </button>
          </template>
        </BaseInput>
        <div class="flex justify-between gap-3 mt-1 body-r text-gray-50">
          <p :class="nicknameMessageStyleClass">{{ nicknameMessage }}</p>
          <p>{{ props.nickname.length }}/{{ MAX_NICKNAME_LENGTH }}</p>
        </div>
      </section>
      <section>
        <h3 class="h3-b text-gray-80 mb-2.5">간단하게 본인을 소개해주세요.</h3>
        <BaseInput
          :value="props.shortIntroduction"
          placeholder="한 줄 소개"
          :maxLength="MAX_SHORT_INTRODUCE_LENGTH"
          @input="handleShortIntroductionInput"
        />
        <p class="body-r text-gray-50 justify-self-end mt-1">
          {{ props.shortIntroduction.length }}/{{ MAX_SHORT_INTRODUCE_LENGTH }}
        </p>
      </section>
    </div>
  </div>
</template>
<style scoped></style>
