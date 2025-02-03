import { supabase } from '@/config/supabase';
import { getUserLoggedIn } from '@/api/supabase/auth';

// 온보드 데이터 전송 API(본체) - 해당 요청의 return값으로 온보딩 값이 온전하게 담겨있습니다. 필요시 유저 온보딩 정보를 업데이트 하는 용도로 사용할 수 있습니다.
export const postUserInfoOnboard = async (userProfile, userPositions) => {
  const userList = await postUserProfile(userProfile);
  if (userList === 'user_id_error' || userList === 'name_error') {
    return console.error(
      `중복된 닉네임 혹은 이미 생성된 온보드임을 확인해 전송을 중단합니다. 에러명 : ${userList}`,
    );
  } else if (userList === 'other_error') {
    return console.error(
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
        console.error('이미 생성된 온보드 정보가 있습니다. 마이페이지에서 정보를 수정해주세요.');
        return 'user_id_error';
      } else if (error.message.includes('name')) {
        console.error('중복된 닉네임이 있습니다.');
        return 'name_error';
      }
    } else {
      console.error('오류 발생', error);
      return 'other_error';
    }
  }
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
    return console.error(error);
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
    return console.error(error);
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
  return { ...realProfile, positions: positions };
};

// 다른 사용자 유저 정보 getAPI(API 조합 키트) - 파라미터에 찾으려는 유저의 user_id값을 넣으면 됩니다.
export const getUserInfoToUserId = async (user_id) => {
  const getProfile = await getUserProfile(user_id);

  if (!getProfile) {
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
  }
};

// 유저 정보 get API ///////////////////////////////////////////////////////////////////////////
//
//
//
// 마이페이지 유저 정보 수정 put API ////////////////////////////////////////////////////////////

// 마이페이지 온보딩 수정 API(본체) - 해당 요청의 return값으로 온보딩 값이 온전하게 담겨있습니다. 필요시 유저 온보딩 정보를 업데이트 하는 용도로 사용할 수 있습니다.
export const putUserInfo = async (updatingUserProfile, updatingUserPositions) => {
  const user = await getUserLoggedIn();

  const realLink = updatingUserProfile.link.join('*');
  const realUpdatingUserProfile = { ...updatingUserProfile, link: realLink };

  const userList = await putUserProfile(realUpdatingUserProfile, user.id);

  if (userList === 'name_error') {
    return console.error(`중복된 닉네임이 존재해 수정 요청을 종료합니다. 에러명 ${userList}`);
  } else if (userList === 'other_error') {
    return console.error(
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
      console.error('닉네임 중복 오류');
      return 'name_error';
    } else {
      console.error('오류발생', error);
      return 'other_error';
    }
  }
  return data;
};

// 이전 유저 포지션 delete API
const deleteUserPositions = async (profile) => {
  await supabase.from('user_list_positions').delete().eq('profile_id', profile.id);
};

// 수정된 유저 포지션 post API
const postUpdateUserPositions = async (insertObject, profile) => {
  const { data, error } = await supabase //
    .from('user_list_positions')
    .insert([{ ...insertObject, profile_id: profile.id }])
    .select()
    .single();

  if (error) {
    return console.error(error);
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
    return console.error(error);
  }
  return data;
};

// 닉네임 중복 여부 확인 API
export const checkDuplicateNickname = async (nickname) => {
  const { data, error } = await supabase.rpc('check_username_duplicate', {
    user_name: nickname,
  });

  if (error) {
    console.error(error);
  }

  return data; // 중복이면 true, 중복이 아니면 false
};
