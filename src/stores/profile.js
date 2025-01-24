import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { MAX_POSITION_COUNT } from '@/constants';

export const useProfileStore = defineStore('profile', () => {
  const isCheckNickname = ref(false);
  const nicknameMessageStatus = ref('default');
  const nickname = ref('');
  const newNickname = ref('');
  const profileImage = ref('');
  const shortIntroduction = ref('');
  const longIntroduction = ref('');
  const links = ref([]);
  const positionWithSkills = reactive({});

  const initialize = (myProfile) => {
    isCheckNickname.value = true;
    nicknameMessageStatus.value = 'success';
    nickname.value = myProfile.name;
    newNickname.value = myProfile.name;
    profileImage.value = myProfile.profile_img_path;
    shortIntroduction.value = myProfile.short_introduce;
    longIntroduction.value = myProfile.long_introduce;
    links.value = myProfile.link.length === 0 ? [''] : myProfile.link;
    myProfile.positions.forEach((data) => {
      positionWithSkills[data.position] = data.stacks;
    });
  };

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

  const updateProfileImage = (fileURL) => {
    profileImage.value = fileURL;
  };
  const deleteProfileImage = () => {
    profileImage.value = '';
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
    profileImage,
    shortIntroduction,
    longIntroduction,
    links,
    positionWithSkills,

    initialize,
    updateNewNickname,
    validateNickname,
    updateProfileImage,
    deleteProfileImage,
    updateShortIntroduction,
    setLongIntroduction,
    addLink,
    updateLink,
    deleteLink,
    togglePosition,
    toggleSkill,
  };
});
