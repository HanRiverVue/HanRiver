import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', () => {
  const isCheckNickname = ref(false);
  const nicknameMessageStatus = ref('default');
  const nickname = ref('기본닉');
  const shortIntroduction = ref('안녕하세요!');
  const longIntroduction = ref('안녕하세요!\n\n저는 개발자입니다.');

  const setIsCheckNickname = (value) => {
    isCheckNickname.value = value;
  };
  const setNickname = (newNickname) => {
    nickname.value = newNickname;
  };
  const setShortIntroduction = (newShortIntroduction) => {
    shortIntroduction.value = newShortIntroduction;
  };
  const setLongIntroduction = (newLongIntroduction) => {
    longIntroduction.value = newLongIntroduction;
  };

  return {
    isCheckNickname,
    nicknameMessageStatus,
    nickname,
    shortIntroduction,
    longIntroduction,

    setIsCheckNickname,
    setNickname,
    setShortIntroduction,
    setLongIntroduction,
  };
});
