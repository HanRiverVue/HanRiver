import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', () => {
  const isCheckNickname = ref(false);
  const nicknameMessageStatus = ref('default');
  const nickname = ref('기본닉');
  const shortIntroduction = ref('안녕하세요!');

  const setIsCheckNickname = (value) => {
    isCheckNickname.value = value;
  };
  const setNickname = (newNickname) => {
    nickname.value = newNickname;
  };
  const setShortIntroduction = (newShortIntroduction) => {
    shortIntroduction.value = newShortIntroduction;
  };

  return {
    isCheckNickname,
    nicknameMessageStatus,
    nickname,
    shortIntroduction,

    setIsCheckNickname,
    setNickname,
    setShortIntroduction,
  };
});
