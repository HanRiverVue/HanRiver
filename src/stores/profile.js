import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { MAX_POSITION_COUNT } from '@/constants';

export const useProfileStore = defineStore('profile', () => {
  const isCheckNickname = ref(true);
  const nicknameMessageStatus = ref('success');
  const nickname = ref('기본닉');
  const newNickname = ref('기본닉');
  const shortIntroduction = ref('안녕하세요!');
  const longIntroduction = ref('안녕하세요!\n\n저는 개발자입니다.');
  const links = ref(['', '']);
  const positionWithSkills = reactive({
    PM: [],
  });

  const setIsCheckNickname = (value) => {
    isCheckNickname.value = value;
  };
  const setNicknameMessageStatus = (value) => {
    nicknameMessageStatus.value = value;
  };
  const updateNewNickname = (str) => {
    newNickname.value = str;

    if (newNickname.value === nickname.value) {
      setNicknameMessageStatus('success');
      setIsCheckNickname(true);
    } else {
      setNicknameMessageStatus('default');
      setIsCheckNickname(false);
    }
  };
  const validateNickname = (newNickname) => {
    if (newNickname === '') {
      setNicknameMessageStatus('blank');
      setIsCheckNickname(false);
      return;
    }

    if (!/^[a-zA-Z0-9ㄱ-ㅎ가-힣]*$/.test(newNickname)) {
      setNicknameMessageStatus('symbol');
      setIsCheckNickname(false);
      return;
    }

    // TODO: 닉네임 중복 확인 API 호출
    // 만약 닉네임 중복에 문제가 없을 경우
    setNicknameMessageStatus('success');
    setIsCheckNickname(true);
    //setNickname(newNickname.value);

    // 만약 닉네임 중복에 문제가 있을 경우
    // nicknameMessageStatus.value = 'duplicate';
    // setIsCheckNickname(false);
  };

  const updateShortIntroduction = (newShortIntroduction) => {
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
    newNickname,
    shortIntroduction,
    longIntroduction,
    links,
    positionWithSkills,

    updateNewNickname,
    validateNickname,
    updateShortIntroduction,
    setLongIntroduction,
    addLink,
    updateLink,
    deleteLink,
    togglePosition,
    toggleSkill,
  };
});
