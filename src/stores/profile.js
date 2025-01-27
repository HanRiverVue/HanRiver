import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { DEFAULT_PROFILE_IMAGE_URL, MAX_POSITION_COUNT } from '@/constants';
import { checkDuplicateNickname } from '@/api/supabase/user';

export const useProfileStore = defineStore('profile', () => {
  const isCheckNickname = ref(false);
  const nicknameMessageStatus = ref('default');
  const nickname = ref('');
  const newNickname = ref('');
  const profileImage = reactive({ local: '', file: '' });
  const shortIntroduction = ref('');
  const longIntroduction = ref('');
  const links = ref([]);
  const positionWithSkills = reactive({});

  const initialize = (myProfile) => {
    isCheckNickname.value = true;
    nicknameMessageStatus.value = 'success';
    nickname.value = myProfile.name;
    newNickname.value = myProfile.name;
    profileImage.local = myProfile.profile_img_path;
    profileImage.file = myProfile.profile_img_path;
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
  const validateNickname = async (newNickname) => {
    if (newNickname === '') {
      setNicknameMessageStatus('blank');
      setIsCheckNickname(false);
      return;
    }

    if (!/^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/.test(newNickname)) {
      setNicknameMessageStatus('symbol');
      setIsCheckNickname(false);
      return;
    }

    // TODO: 닉네임 중복 확인 API 호출
    const result = await checkDuplicateNickname(newNickname);

    if (result) {
      nicknameMessageStatus.value = 'duplicate';
      setIsCheckNickname(false);
    } else {
      setNicknameMessageStatus('success');
      setIsCheckNickname(true);
    }
  };

  const updateProfileImage = (localFileURL, file) => {
    profileImage.local = localFileURL;
    profileImage.file = file;
  };
  const deleteProfileImage = () => {
    profileImage.local = DEFAULT_PROFILE_IMAGE_URL;
    profileImage.file = DEFAULT_PROFILE_IMAGE_URL;
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

  const getNewProfile = () => ({
    name: newNickname.value,
    short_introduce: shortIntroduction.value,
    long_introduce: longIntroduction.value,
    profile_img_path: profileImage.file,
    link: links.value.filter((link) => link !== ''),
  });
  const getNewPositions = () => {
    return Object.keys(positionWithSkills).map((position) => ({
      position,
      stacks: positionWithSkills[position],
    }));
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
    getNewProfile,
    getNewPositions,
  };
});
