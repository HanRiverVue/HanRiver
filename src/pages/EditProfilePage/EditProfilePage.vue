<script setup>
import { onMounted, ref } from 'vue';
import ProfileLinks from './components/ProfileLinks.vue';
import ProfilePositions from './components/ProfilePositions.vue';
import ProfileIntroduction from './components/ProfileIntroduction.vue';
import ProfileSkills from './components/ProfileSkills.vue';
import DefaultInformation from './components/DefaultInformation.vue';
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/profile';
import { getUserInfo, putUserInfo } from '@/api/supabase/user';
import { postUploadUserImage } from '@/api/supabase/imageUpload';

const router = useRouter();
const profileStore = useProfileStore();

const result = ref(null);

const getMyProfile = async () => {
  const res = await getUserInfo();
  result.value = res;
  profileStore.initialize(res);
};

const handleCancel = () => {
  router.push('/MyPage');
};

const handleSubmit = async () => {
  // 닉네임 중복 체크 여부 확인해야 함
  if (!profileStore.isCheckNickname) {
    alert('닉네임 중복 확인을 해주세요.');
    return;
  }

  const newProfile = profileStore.getNewProfile();
  const newPositions = profileStore.getNewPositions();

  // 이미지의 변경이 생겼을 때만
  if (typeof newProfile.profile_img_path === 'object') {
    const uploadedImage = await postUploadUserImage(newProfile.profile_img_path);
    newProfile.profile_img_path = uploadedImage;
  }

  const res = await putUserInfo(newProfile, newPositions);
  if (res) router.push('/MyPage');
};

onMounted(() => {
  getMyProfile();
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
