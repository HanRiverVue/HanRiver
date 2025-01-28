<script setup>
import { CancelIcon } from '@/assets/icons';
import { useUserProfileModalStore } from '@/stores/userProfileModal';
import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';
import PositionSmallBadge from '@/components/PositionSmallBadge.vue';

const userProfileModalStore = useUserProfileModalStore();
const { userProfileModal, userInfo, isLoading, error } = storeToRefs(userProfileModalStore);

const profileStore = useProfileStore();
const { DEFAULT_PROFILE_IMAGE_URL } = profileStore;

const closeUserProfile = () => {
  userProfileModalStore.setUserProfileModal(false);
};

const handleUserPageClick = () => {
  closeUserProfile();
};
</script>

<template>
  <div
    v-if="userProfileModal"
    @click="closeUserProfile"
    class="flex justify-center items-center z-40 w-full h-full fixed top-0 left-0"
    style="background-color: rgba(0, 0, 0, 0.5)"
  >
    <div
      @click.stop
      class="flex flex-col relative items-center w-[374px] h-[394px] px-[37px] pt-[35px] pb-7.5 rounded-[20px] bg-white card-shadow"
    >
      <CancelIcon
        @click="closeUserProfile"
        class="absolute top-7 right-7 w-6 h-6 text-gray-60 cursor-pointer"
      />
      <div v-if="isLoading" class="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
      <div v-else-if="error" class="flex items-center justify-center h-full">
        <p>{{ error }}</p>
      </div>
      <template v-else-if="userInfo">
        <div class="flex flex-col items-center mb-[37px]">
          <div class="w-[120px] h-[120px] rounded-full overflow-hidden mb-[18px]">
            <img
              class="w-full h-full object-cover rounded-full"
              :src="userInfo.profile_img_path || DEFAULT_PROFILE_IMAGE_URL"
              :alt="`${userInfo.userName}의 프로필
            사진`"
            />
          </div>
          <span class="mb-3 h2-b text-gray-80">{{ userInfo.name }}</span>
          <ul class="flex gap-2.5 mb-[17px]">
            <li v-for="(pos, index) in userInfo.positions" :key="index">
              <PositionSmallBadge style="margin-bottom: 17px" :position="pos.position" />
            </li>
          </ul>
          <p class="body-large-r text-gray-80">{{ userInfo.short_introduce || '' }}</p>
        </div>
        <RouterLink :to="`/UserPage/${userInfo.id}`" @click="handleUserPageClick">
          <button
            class="w-[300px] h-[45px] py-3 px-[10px] rounded-lg body-r text-white cursor-pointer"
            style="background-color: rgba(54, 72, 97, 0.8)"
          >
            유저 페이지로 이동하기
          </button>
        </RouterLink>
      </template>
    </div>
  </div>
</template>
