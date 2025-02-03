import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUserInfoToUserId } from '@/api/supabase/user';
import { DEFAULT_PROFILE_IMAGE_URL } from '@/constants';

export const useUserProfileModalStore = defineStore('userProfileModal', () => {
  const userProfileModal = ref(false);
  const userInfo = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  const setUserProfileModal = (state) => {
    userProfileModal.value = state;
  };

  const fetchModalUserProfile = async (userId) => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await getUserInfoToUserId(userId);
      if (data === null) {
        throw new Error('User not found');
      }
      userInfo.value = {
        ...data,
        id: userId,
        profile_img_path: data.profile_img_path || DEFAULT_PROFILE_IMAGE_URL,
      };
    } catch (err) {
      console.error('Error fetching user profile info:', err);
      error.value = err.message;
      userInfo.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    userProfileModal,
    setUserProfileModal,
    userInfo,
    fetchModalUserProfile,
    isLoading,
    error,
  };
});
