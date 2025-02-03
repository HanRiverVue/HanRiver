import { getUserInfo } from '@/api/supabase/user';
import { getUserLoggedIn } from '@/api/supabase/auth';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUserPostLikes } from '@/api/supabase/like_and_bookmark';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const isLoggedIn = ref(false);
  const userPostLikes = ref([]);

  const checkLoginStatus = async () => {
    const loggedInUser = await getUserLoggedIn();
    isLoggedIn.value = !!loggedInUser?.id;
    return isLoggedIn.value;
  };

  const fetchUserInfo = async () => {
    if (user.value) return; // 이미 로드된 경우 재요청 방지
    const userInfo = await getUserInfo();
    if (userInfo === null) return;
    user.value = userInfo;
  };

  const refetchUserInfo = async () => {
    // 의도적인 재요청
    const userInfo = await getUserInfo();
    if (userInfo === null) return;
    user.value = userInfo;
  };

  const setUserPostLikes = async () => {
    const res = await getUserPostLikes();
    if (res) {
      userPostLikes.value = res;
    }
  };

  const updateLikes = (postId) => {
    const index = userPostLikes.value.indexOf(postId);
    if (index > -1) {
      userPostLikes.value.splice(index, 1);
    } else {
      userPostLikes.value.push(postId);
    }
  };

  const updateBookmarks = (postId) => {
    if (!user.value.bookmarks) user.value.bookmarks = [];
    const index = user.value.bookmarks.indexOf(postId);
    if (index > -1) {
      user.value.bookmarks.splice(index, 1);
    } else {
      user.value.bookmarks.push(postId);
    }
  };

  return {
    user,
    isLoggedIn,
    userPostLikes,
    checkLoginStatus,
    fetchUserInfo,
    refetchUserInfo,
    setUserPostLikes,
    updateLikes,
    updateBookmarks,
  };
});
