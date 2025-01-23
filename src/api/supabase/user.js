import { supabase } from '@/config/supabase';
import { getUserLoggedIn } from '@/api/supabase/auth';

// 온보딩 post API /////////////////////////////////////////////////////////////////////////

// 테스트 데이터(이 형식에 맞춰서 데이터를 만들면 됩니다.)
const userProfile = {
  name: '지원',
  short_introduce: '안녕하세요 저는 안지원입니다.',
};
const userPositions = [
  { position: '기획', stacks: ['adobe'] },
  { position: '백엔드', stacks: ['jango', 'php'] },
];

// 온보드 데이터 전송 API(본체) - 해당 요청의 return값으로 온보딩 값이 온전하게 담겨있습니다. 필요시 유저 온보딩 정보를 업데이트 하는 용도로 사용할 수 있습니다.
export const postUserInfoOnboard = async (userProfile, userPositions) => {
  const userList = await postUserProfile(userProfile);
  if (userList === 'user_id_error' || userList === 'name_error') {
    return console.log(
      `중복된 닉네임 혹은 이미 생성된 온보드임을 확인해 전송을 중단합니다. 에러명 : ${userList}`,
    );
  } else if (userList === 'other_error') {
    return console.log(
      `예상하지 못 한 오류가 발생해 전송을 중단합니다. 콘솔창에서 에러를 확인해주세요 ${userList}`,
    );
  }

  // position 데이터 담을 Array
  const positionArr = [];
  userPositions.map(async (position) => {
    const userPosition = await postUserPositions({ position: position.position }, userList.id);
    const userStack = await postUserStacks({ stacks: position.stacks }, userPosition.id);
    const positionItem = {
      id: userPosition.id,
      position: userPosition.position,
      stacks: userStack.stacks.split('/'),
    };
    positionArr.push(positionItem);
  });

  const result = { ...userList, positions: positionArr };

  alert('온보드 데이터 전송 완료');
  console.log('결과', result);
  return result;
};

// 유저 프로필 post API
const postUserProfile = async (insertObject) => {
  // 이미 생성된 온보딩 데이터가 존재하거나 중복되는 닉네임일 경우 각각 "user_id_error", "name_error" 문자열을 return합니다. 이 값을 이용해 프론트에서 에러처리를 할 수 있습니다.
  const { data, error } = await supabase //
    .from('user_list')
    .insert([insertObject])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      if (error.message.includes('user_id')) {
        console.log('이미 생성된 온보드 정보가 있습니다. 마이페이지에서 정보를 수정해주세요.');
        return 'user_id_error';
      } else if (error.message.includes('name')) {
        console.log('중복된 닉네임이 있습니다.');
        return 'name_error';
      }
    } else {
      console.log('오류 발생', error);
      return 'other_error';
    }
  }
  console.log('data', data);
  return data;
};

// 유저 포지션 post API
const postUserPositions = async (insertObject, user_id) => {
  const { data, error } = await supabase //
    .from('user_list_positions')
    .insert([{ ...insertObject, profile_id: user_id }])
    .select()
    .single();

  if (error) {
    return console.log(error);
  }
  return data;
};

// 유저 스택 post API
const postUserStacks = async (insertObject, positionId) => {
  const joinedInsertArray = insertObject.stacks.join('/');

  const { data, error } = await supabase //
    .from('user_list_stacks')
    .insert([{ stacks: joinedInsertArray, position_id: positionId }])
    .select()
    .single();

  if (error) {
    return console.log(error);
  }
  return data;
};
// 온보딩 post API /////////////////////////////////////////////////////////////////////////
//
//
//
// 유저 정보 get API ///////////////////////////////////////////////////////////////////////////

// 로그인 유저 정보 get API(API 조합 키트)
export const getUserInfo = async () => {
  const data = await getUserLoggedIn();
  const getProfile = await getUserProfile(data.id);

  if (!getProfile) {
    return null;
  }

  const getPositions = await getUserPositions(getProfile.id);
  const positions = await Promise.all(
    getPositions.map(async (position) => {
      const stacks = await getUserStacks(position.id);
      return { id: position.id, position: position.position, stacks: stacks.stacks.split('/') };
    }),
  );

  const realProfile = { ...getProfile, link: getProfile.link.split('*') };
  console.log({ ...realProfile, positions: positions });
  return { ...realProfile, positions: positions };
};

// 다른 사용자 유저 정보 getAPI(API 조합 키트) - 파라미터에 찾으려는 유저의 user_id값을 넣으면 됩니다.
export const getUserInfoToUserId = async (user_id) => {
  const getProfile = await getUserProfile(user_id);

  if (!getProfile) {
    console.log('해당 유저의 유저 정보가 없습니다.');
    return null;
  }
  const realProfile = { ...getProfile, link: getProfile.link.split('*') };
  const getPositions = await getUserPositions(getProfile.id);
  const positions = await Promise.all(
    getPositions.map(async (position) => {
      const stacks = await getUserStacks(position.id);
      return { ...position, stacks: stacks.stacks.split('/') };
    }),
  );
  console.log({ ...realProfile, positions: positions });
  return { ...realProfile, positions: positions };
};

// 유저 프로필 get API
const getUserProfile = async (user_id) => {
  const { data, error } = await supabase //
    .from('user_list')
    .select()
    .eq('user_id', user_id)
    .single();

  if (data) {
    return data;
  } else {
    console.log(error);
    return null;
  }
};

// 유저 포지션 get API
const getUserPositions = async (profile_id) => {
  const { data, error } = await supabase //
    .from('user_list_positions')
    .select('id, position')
    .eq('profile_id', profile_id);

  if (data) {
    return data;
  } else {
    console.log(error);
  }
};

// 유저 스택 get API
const getUserStacks = async (position_id) => {
  const { data, error } = await supabase //
    .from('user_list_stacks')
    .select('stacks')
    .eq('position_id', position_id)
    .single();

  if (data) {
    return data;
  } else {
    console.log(error);
  }
};

// 유저 정보 get API ///////////////////////////////////////////////////////////////////////////
//
//
//
// 마이페이지 유저 정보 수정 put API ////////////////////////////////////////////////////////////

// 테스트 데이터(이 형식에 맞춰서 데이터를 만들면 됩니다.)
const updatingUserProfile = {
  name: '지원2',
  short_introduce: '안녕하세요 테스트 하고 있어요요.',
  long_introduce: '달디달고달디단밤양갱',
  profile_img_path: '22이미지 주소',
  link: ['https://github.com', 'https://naver.com'],
};
const updatingUserPositions = [
  { position: '프론트엔드', stacks: ['react', 'vue'] },
  { position: '디자이너', stacks: ['adobe', 'figma'] },
];

// 마이페이지 온보딩 수정 API(본체) - 해당 요청의 return값으로 온보딩 값이 온전하게 담겨있습니다. 필요시 유저 온보딩 정보를 업데이트 하는 용도로 사용할 수 있습니다.
export const putUserInfo = async (updatingUserProfile, updatingUserPositions) => {
  const user = await getUserLoggedIn();

  const realLink = updatingUserProfile.link.join('*');
  const realUpdatingUserProfile = { ...updatingUserProfile, link: realLink };
  console.log(realLink, realUpdatingUserProfile);

  const userList = await putUserProfile(realUpdatingUserProfile, user.id);

  if (userList === 'name_error') {
    return console.log(`중복된 닉네임이 존재해 수정 요청을 종료합니다. 에러명 ${userList}`);
  } else if (userList === 'other_error') {
    return console.log(
      `예상하지 못 한 오류가 발생해 수정 요청을 중단합니다. 콘솔창에서 에러를 확인해주세요 ${userList}`,
    );
  }

  await deleteUserPositions(userList);

  const positionsArr = [];
  for (const position of updatingUserPositions) {
    const updateUserPosition = await postUpdateUserPositions(
      { position: position.position },
      userList,
    );

    const updateUserStacks = await postUpdateUserStacks(
      { stacks: position.stacks },
      updateUserPosition,
    );
    const positions = {
      id: await updateUserPosition.id,
      position: await updateUserPosition.position,
      stacks: await updateUserStacks.stacks.split('/'),
    };
    positionsArr.push(positions);
  }

  const realUserList = { ...userList, link: userList.link.split('*') };
  return { ...realUserList, positions: positionsArr };
};

// 유저 프로필 put(사실상 update) API
const putUserProfile = async (updateObject, user_id) => {
  const { data, error } = await supabase //
    .from('user_list')
    .update(updateObject)
    .eq('user_id', user_id)
    .select()
    .single();

  if (error) {
    if (error.code === '23505' && error.details.includes('name')) {
      console.log('닉네임 중복 오류');
      return 'name_error';
    } else {
      console.log('오류발생', error);
      return 'other_error';
    }
  }
  return data;
};

// 이전 유저 포지션 delete API
const deleteUserPositions = async (profile) => {
  const { error } = await supabase
    .from('user_list_positions')
    .delete()
    .eq('profile_id', profile.id);
};

// 수정된 유저 포지션 post API
const postUpdateUserPositions = async (insertObject, profile) => {
  const { data, error } = await supabase //
    .from('user_list_positions')
    .insert([{ ...insertObject, profile_id: profile.id }])
    .select()
    .single();

  if (error) {
    return console.log(error);
  }
  return data;
};

// 수정된 유저 스택 post API
const postUpdateUserStacks = async (insertObject, position) => {
  const joinedInsertArray = insertObject.stacks.join('/');

  const { data, error } = await supabase //
    .from('user_list_stacks')
    .insert([{ stacks: joinedInsertArray, position_id: position.id }])
    .select()
    .single();

  if (error) {
    return console.log(error);
  }
  return data;
};

// 마이페이지 유저 정보 수정 put API ////////////////////////////////////////////////////////////
//
//
//
// 모든 유저 온보드 get API - 모든 유저 데이터를 불러옵니다.
export const getAllUserInfo = async () => {
  const { data: lists, error } = await supabase.from('user_list').select('*');

  const listsArr = lists.map((list) => {
    return { ...list, link: list.link.split('*') };
  });

  const result = [];
  listsArr.map(async (list) => {
    const { data: positions, error } = await supabase
      .from('user_list_positions')
      .select()
      .eq('profile_id', list.id);

    const positionsArr = [];
    positions.map(async (position) => {
      const { data: stacks, err } = await supabase //
        .from('user_list_stacks')
        .select()
        .eq('position_id', position.id)
        .single();
      positionsArr.push({
        id: position.id,
        position: position.position,
        stacks: stacks.stacks.split('/'),
      });
    });
    result.push({ ...list, positions: positionsArr });
  });
  return result;
};
