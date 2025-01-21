<script setup>
import PositionSelectButton from '@/components/PositionSelectButton.vue';
import SkillSelectButton from '@/components/SkillSelectButton.vue';
import {
  MAX_INTRODUCE_LENGTH,
  MAX_NICKNAME_LENGTH,
  MAX_POSITION_COUNT,
  MAX_SHORT_INTRODUCE_LENGTH,
  POSITION,
} from '@/constants';
import { POSITION_SKILLS } from '@/constants/skills';
import { ref, reactive, computed, onMounted } from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import { CancelIcon, LinkIcon, PencilIcon, PlusIcon } from '@/assets/icons';

import TEMP_IMAGE from '@/assets/images/temp-profile.png';
import DropdownMenu from '@/components/DropdownMenu.vue';

const nickname = ref('');
const shortIntroduce = ref('');
const introduce = ref('');
const links = reactive([]);
const selectedPosition = reactive([]);
const skillsBySelectedPosition = computed(() => {
  return selectedPosition.map((position) => ({
    name: position,
    skills: POSITION_SKILLS[position],
  }));
});
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

const handleIntroduceInput = (event) => {
  introduce.value = event.target.value;
};

const handleAddLinkClick = () => {
  links.push({ id: Date.now(), value: '' });
};

const handleLinkInput = (value, linkId) => {
  const index = links.findIndex((link) => link.id === linkId);
  if (index > -1) {
    links[index].value = value;
  }
};

const handleRemoveLinkClick = (id) => {
  const index = links.findIndex((link) => link.id === id);
  links.splice(index, 1);
};

const handleSelectPosition = (position) => {
  if (selectedPosition.includes(position)) {
    if (selectedPosition.length === 1) return;
    selectedPosition.splice(selectedPosition.indexOf(position), 1);
  } else {
    if (selectedPosition.length === MAX_POSITION_COUNT) return;
    selectedPosition.push(position);
  }
};

const toggleDropdown = () => {
  console.log('test');
  isDropdownOpen.value = !isDropdownOpen.value;
};

onMounted(() => {
  if (links.length === 0) {
    // 초기 링크 2개 추가
    handleAddLinkClick();
    handleAddLinkClick();
  }

  // TODO: 수파베이스 연결 시, 삭제해야 할 코드
  // 절대 아무것도 없는 케이스를 안 만들기 위한 임시 로직
  if (selectedPosition.length === 0) {
    handleSelectPosition(POSITION[0]);
  }
});
</script>

<template>
  <div class="flex flex-col gap-10 pt-12 pb-20">
    <section class="p-6 card-shadow rounded-lg">
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
                <button
                  type="button"
                  class="bg-primary-1 text-white px-3 py-1.5 shrink-0 rounded body-r"
                >
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
      <section>
        <h2 class="text-gray-80 h2-b mb-2">자기소개</h2>
        <textarea
          :value="introduce"
          placeholder="본인에 대해 더 자세하게 소개해주세요. (ex. 프로젝트 이력, 관심있는 분야 등)"
          class="input-shadow w-full px-4 py-3 rounded-lg resize-none placeholder:text-gray-40 gray-80 border border-transparent focus:border-primary-3"
          rows="8"
          @input="handleIntroduceInput"
        />
        <p class="text-gray-50 body-r justify-self-end">
          {{ introduce.length }}/{{ MAX_INTRODUCE_LENGTH }}
        </p>
      </section>
      <section>
        <div class="flex items-center justify-between gap-10 mb-3">
          <h2 class="text-gray-80 h2-b">링크</h2>
          <button
            type="button"
            class="flex items-center gap-1.5 body-r bg-primary-1 text-white px-3 py-1.5 rounded h-fit"
            @click="handleAddLinkClick"
          >
            <PlusIcon class="w-[18px] h-[18px] text-white" />
            링크 추가
          </button>
        </div>
        <div class="flex flex-col gap-3">
          <BaseInput
            v-for="link in links"
            :key="link.id"
            :value="link.value"
            placeholder="포트폴리오, 구글 드라이브 파일 등 업무 성과를 보여줄 수 있는 링크가 있다면 추가해 주세요"
            @input="handleLinkInput($event, link.id)"
          >
            <template #leftIcon="{ isFocused }">
              <LinkIcon
                :className="isFocused ? 'w-5 h-5 text-primary-3' : 'w-5 h-5 text-gray-50'"
              />
            </template>
            <template #rightIcon>
              <button type="button" @click="handleRemoveLinkClick(link.id)">
                <CancelIcon className="text-gray-50 w-5 h-5" />
              </button>
            </template>
          </BaseInput>
        </div>
      </section>
      <section>
        <div class="flex justify-between items-center mb-2 gap-10">
          <h2 class="text-gray-80 h2-b">희망하는 포지션</h2>
          <p class="body-r text-gray-50">최대 {{ MAX_POSITION_COUNT }}개 선택</p>
        </div>
        <div class="p-7 gap-4 flex items-center input-shadow flex-wrap">
          <PositionSelectButton
            v-for="name in POSITION"
            :key="name"
            size="small"
            :isSelected="selectedPosition.includes(name)"
            className="whitespace-nowrap flex-1 basis-0 px-3 max-w-[95px] min-w-fit"
            @click="handleSelectPosition(name)"
          >
            {{ name }}
          </PositionSelectButton>
        </div>
      </section>
      <section>
        <h2 class="text-gray-80 h2-b mb-2">관심있거나 보유하고 있는 스킬</h2>
        <div class="input-shadow p-7 flex flex-col gap-8 rounded-lg">
          <div v-for="selected in skillsBySelectedPosition" :key="selected.name">
            <h3 class="text-gray-80 h3-b mb-3">{{ selected.name }}</h3>
            <div class="flex flex-wrap gap-x-4 gap-y-3">
              <SkillSelectButton v-for="skill in selected.skills" :key="skill">
                <template #icon="{ className }">
                  <img :src="skill.image" :alt="skill.name" :class="className" />
                </template>
                {{ skill.name }}
              </SkillSelectButton>
            </div>
          </div>
        </div>
      </section>
    </section>
    <section class="flex items-center justify-end gap-3">
      <button
        type="button"
        class="bg-white border border-primary-1 text-primary-1 px-6 py-1.5 body-m rounded-md"
      >
        취소
      </button>
      <button type="button" class="bg-primary-1 text-white px-6 py-1.5 body-m rounded-md">
        저장
      </button>
    </section>
  </div>
</template>
