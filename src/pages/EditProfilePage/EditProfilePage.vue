<script setup>
import { MAX_POSITION_COUNT, POSITION } from '@/constants';
import { ref, reactive, onMounted } from 'vue';

import ProfileLinks from './components/ProfileLinks.vue';
import ProfilePositions from './components/ProfilePositions.vue';
import ProfileIntroduction from './components/ProfileIntroduction.vue';
import ProfileSkills from './components/ProfileSkills.vue';
import DefaultInformation from './components/DefaultInformation.vue';

const nickname = ref('');
const shortIntroduction = ref('');
const introduction = ref('');
const links = ref([]);
const selectedPositions = reactive([]);

// TODO: 유저 정보를 받아서 초기화
// TODO: 링크의 경우, id 삽입한 객체 배열로 변경

const handleNickNameInput = (value) => {
  nickname.value = value;
};

const handleShortIntroduction = (value) => {
  shortIntroduction.value = value;
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
  if (selectedPositions.includes(position)) {
    if (selectedPositions.length === 1) return;
    selectedPositions.splice(selectedPositions.indexOf(position), 1);
  } else {
    if (selectedPositions.length === MAX_POSITION_COUNT) return;
    selectedPositions.push(position);
  }
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
      <DefaultInformation
        :nickname="nickname"
        :shortIntroduction="shortIntroduction"
        @updateNickName="handleNickNameInput"
        @updateShortIntroduction="handleShortIntroduction"
      />
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
