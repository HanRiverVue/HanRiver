<script setup>
import {
  MAX_NICKNAME_LENGTH,
  MAX_POSITION_COUNT,
  MAX_SHORT_INTRODUCE_LENGTH,
  POSITION,
} from '@/constants';
import { ref, reactive, onMounted } from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import { PencilIcon } from '@/assets/icons';

import TEMP_IMAGE from '@/assets/images/temp-profile.png';
import DropdownMenu from '@/components/DropdownMenu.vue';
import ProfileLinks from './components/ProfileLinks.vue';
import ProfilePositions from './components/ProfilePositions.vue';
import ProfileIntroduction from './components/ProfileIntroduction.vue';
import ProfileSkills from './components/ProfileSkills.vue';

const nickname = ref('');
const shortIntroduce = ref('');
const introduction = ref('');
const links = ref([]);
const selectedPositions = reactive([]);
const isDropdownOpen = ref(false);
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

// TODO: 유저 정보를 받아서 초기화
// TODO: 링크의 경우, id 삽입한 객체 배열로 변경

const handleNickNameInput = (value) => {
  nickname.value = value;
};

const handleShortIntroduceInput = (value) => {
  shortIntroduce.value = value;
};

const handleUpdateIntroduction = (value) => {
  introduction.value = value;
};

const handleAddLink = () => {
  links.value = [...links.value, { id: Date.now(), value: '' }];
};

const handleUpdateLink = (targetIndex, value) => {
  links.value = links.value.map((link, index) =>
    targetIndex === index ? { ...link, value } : link,
  );
};

const handleRemoveLink = (targetIndex) => {
  links.value = links.value.filter((_, index) => index !== targetIndex);
};

const handleSelectPositions = (position) => {
  console.log(position);
  if (selectedPositions.includes(position)) {
    if (selectedPositions.length === 1) return;
    selectedPositions.splice(selectedPositions.indexOf(position), 1);
  } else {
    if (selectedPositions.length === MAX_POSITION_COUNT) return;
    selectedPositions.push(position);
  }
};

const toggleDropdown = () => {
  console.log('test');
  isDropdownOpen.value = !isDropdownOpen.value;
};

onMounted(() => {
  if (links.value.length === 0) {
    // 초기 링크 2개 추가
    handleAddLink();
    handleAddLink();
  }

  // TODO: 수파베이스 연결 시, 삭제해야 할 코드
  // 절대 아무것도 없는 케이스를 안 만들기 위한 임시 로직
  if (selectedPositions.length === 0) {
    handleSelectPositions(POSITION[0]);
  }
});
</script>

<template>
  <div class="flex flex-col gap-10 pt-12 pb-20">
    <section class="p-6 card-shadow rounded-lg bg-white">
      <h2 class="text-gray-80 h2-b mb-2">기본 정보</h2>
      <div class="flex gap-[70px] items-center px-12">
        <div class="relative">
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
          <DropdownMenu
            :isOpen="isDropdownOpen"
            :dropdownList="dropdownList"
            class="top-1/2 -translate-y-1/2 left-1/2 ml-6"
            @onClose="isDropdownOpen = false"
          />
        </div>
        <div class="grow">
          <section class="mb-6">
            <h3 class="h3-b text-gray-80 mb-2.5">닉네임을 입력해주세요.</h3>
            <BaseInput
              :value="nickname"
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
              <p>중복된 이름ㆍ특수문자 사용불가</p>
              <p>{{ nickname.length }}/{{ MAX_NICKNAME_LENGTH }}</p>
            </div>
          </section>
          <section>
            <h3 class="h3-b text-gray-80 mb-2.5">간단하게 본인을 소개해주세요.</h3>
            <BaseInput
              :value="shortIntroduce"
              placeholder="한 줄 소개"
              :maxLength="MAX_SHORT_INTRODUCE_LENGTH"
              @input="handleShortIntroduceInput"
            />
            <p class="body-r text-gray-50 justify-self-end mt-1">
              {{ shortIntroduce.length }}/{{ MAX_SHORT_INTRODUCE_LENGTH }}
            </p>
          </section>
        </div>
      </div>
    </section>
    <section class="bg-white card-shadow p-6 gap-11 flex flex-col rounded-lg">
      <ProfileIntroduction
        :introduction="introduction"
        @updateIntroduction="handleUpdateIntroduction"
      />
      <ProfileLinks
        :links="links"
        @addLink="handleAddLink"
        @removeLink="handleRemoveLink"
        @updateLink="handleUpdateLink"
      />
      <ProfilePositions
        :selectedPositions="selectedPositions"
        @updatePositions="handleSelectPositions"
      />
      <ProfileSkills :selectedPositions="selectedPositions" />
    </section>
    <section class="flex items-center justify-end gap-3">
      <button type="button" class="secondary-button px-6 py-1.5 body-m">취소</button>
      <button type="button" class="primary-button px-6 py-1.5 body-m">저장</button>
    </section>
  </div>
</template>
