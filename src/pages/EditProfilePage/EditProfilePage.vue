<script setup>
import { onMounted } from 'vue';

import ProfileLinks from './components/ProfileLinks.vue';
import ProfilePositions from './components/ProfilePositions.vue';
import ProfileIntroduction from './components/ProfileIntroduction.vue';
import ProfileSkills from './components/ProfileSkills.vue';
import DefaultInformation from './components/DefaultInformation.vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profile';

const router = useRouter();
const profileStore = useProfileStore();

const handleCancel = () => {
  router.push('/MyPage');
};

const handleSubmit = ($event) => {
  $event.preventDefault();
  // 닉네임 중복 체크 여부 확인해야 함
  if (!profileStore.isCheckNickname) {
    alert('닉네임 중복 확인을 해주세요.');
    return;
  }
};

onMounted(() => {
  // TODO: 유저 정보를 받아서 초기화
  // TODO: 링크의 경우, id 삽입한 객체 배열로 변경
  // TODO: 수파베이스 연결 시, 삭제해야 할 코드
  // 절대 아무것도 없는 케이스를 안 만들기 위한 임시 로직
});
</script>

<template>
  <form class="flex flex-col gap-10 pt-12 pb-20" @submit.prevent="handleSubmit">
    <section class="p-6 card-shadow rounded-lg bg-white">
      <DefaultInformation />
    </section>
    <section class="bg-white card-shadow p-6 gap-11 flex flex-col rounded-lg">
      <ProfileIntroduction />
      <ProfileLinks />
      <ProfilePositions />
      <ProfileSkills />
    </section>
    <section class="flex items-center justify-end gap-3">
      <button type="button" class="secondary-button px-6 py-1.5 body-m" @click="handleCancel">
        취소
      </button>
      <button type="submit" class="primary-button px-6 py-1.5 body-m">저장</button>
    </section>
  </form>
</template>
