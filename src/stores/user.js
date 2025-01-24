import { getUserInfo } from '@/api/supabase/user';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);

  const fetchUserInfo = async () => {
    if (user.value) return; // 이미 로드된 경우 재요청 방지
    user.value = await getUserInfo();
  };

  return {
    user,
    fetchUserInfo,
  };
});
