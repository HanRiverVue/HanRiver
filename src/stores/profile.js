import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { MAX_POSITION_COUNT } from '@/constants';

export const useProfileStore = defineStore('profile', () => {
  const isCheckNickname = ref(false);
  const nicknameMessageStatus = ref('default');
  const nickname = ref('기본닉');
  const shortIntroduction = ref('안녕하세요!');
  const longIntroduction = ref('안녕하세요!\n\n저는 개발자입니다.');
  const links = ref(['', '']);
  const positionWithSkills = reactive({
    PM: [],
  });

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
  const addLink = () => {
    links.value = [...links.value, ''];
  };
  const updateLink = (targetIndex, value) => {
    links.value = links.value.map((link, index) => (targetIndex === index ? value : link));
  };
  const deleteLink = (targetIndex) => {
    links.value = links.value.filter((_, index) => targetIndex !== index);
  };
  const togglePosition = (position) => {
    const selectedCount = Object.keys(positionWithSkills).length;
    if (positionWithSkills[position]) {
      if (selectedCount === 1) return;
      delete positionWithSkills[position];
    } else {
      if (selectedCount === MAX_POSITION_COUNT) return;
      positionWithSkills[position] = [];
    }
  };
  const toggleSkill = (position, skill) => {
    const index = positionWithSkills[position].findIndex(
      (selectedSkill) => selectedSkill === skill,
    );
    if (index > -1) positionWithSkills[position].splice(index, 1);
    else positionWithSkills[position].push(skill);
  };

  return {
    isCheckNickname,
    nicknameMessageStatus,
    nickname,
    shortIntroduction,
    longIntroduction,
    links,
    positionWithSkills,

    setIsCheckNickname,
    setNickname,
    setShortIntroduction,
    setLongIntroduction,
    addLink,
    updateLink,
    deleteLink,
    togglePosition,
    toggleSkill,
  };
});
