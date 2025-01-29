import { getUserInfo } from '@/api/supabase/user';
import { getUserLoggedIn } from '@/api/supabase/auth';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const isLoggedIn = ref(false);

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
    console.log('확인', user.value);
  };

  const updateLikes = (postId) => {
    if (!user.value.likes) user.value.likes = [];
    const index = user.value.likes.indexOf(postId);
    if (index > -1) {
      user.value.likes.splice(index, 1);
    } else {
      user.value.likes.push(postId);
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
    checkLoginStatus,
    fetchUserInfo,
    updateLikes,
    updateBookmarks,
  };
});
