import { supabase } from '@/config/supabase';

// 신청하기 함수
const postApplication = async (postId, postTitle, hostId) => {
  try {
    // 현재 로그인한 사용자 정보 가져오기
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error('사용자 정보 가져오기 실패:', userError.message);
      return;
    }

    // 이미 신청했는지 확인
    const { data: existingApplication } = await supabase
      .from('post_apply_list')
      .select()
      .eq('proposer_id', user.id)
      .eq('post_id', postId)
      .single();

    if (existingApplication) {
      console.error('이미 신청한 게시물입니다.');
      return;
    }

    // 사용자 프로필에서 이름 가져오기
    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('name')
      .eq('user_id', user.id)
      .single();

    const proposerName = userProfile?.name || '이름 없음';

    // 신청 데이터 생성
    const { data, error } = await supabase
      .from('post_apply_list')
      .insert([
        {
          host_id: hostId,
          proposer_id: user.id,
          post_id: postId,
          proposer_name: proposerName,
          post_title: postTitle,
          accepted: false,
          finished: false,
        },
      ])
      .select();

    if (error) {
      console.error('신청 생성 실패:', error.message);
      return;
    }

    console.log('신청이 완료되었습니다:', data);
    return data;
  } catch (error) {
    console.error('신청 처리 중 오류 발생:', error);
  }
};

// 신청 취소 함수
const deleteApplication = async (postId) => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error('사용자 정보 가져오기 실패:', userError.message);
      return;
    }

    // 신청 데이터 삭제
    const { data, error } = await supabase
      .from('post_apply_list')
      .delete()
      .eq('proposer_id', user.id)
      .eq('post_id', postId);

    if (error) {
      console.error('신청 취소 실패:', error.message);
      return;
    }

    console.log('신청이 취소되었습니다:', data);
    return data;
  } catch (error) {
    console.error('신청 취소 처리 중 오류 발생:', error);
  }
};

// 내가 신청한 목록
const getMyApplicationsList = async () => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error('사용자 정보 가져오기 실패:', userError.message);
      return;
    }

    const { data, error } = await supabase
      .from('post_apply_list')
      .select('post_id, post_title, accepted, finished')
      .eq('proposer_id', user.id);

    if (error) {
      console.error('내가 신청한 목록 가져오기 실패:', error.message);
      return;
    }

    console.log('내가 신청한 목록:', data);
    return data;
  } catch (error) {
    console.error('내가 신청한 목록 처리 중 오류 발생:', error);
  }
};

// 내가 작성한 글에 대한 신청 목록
const getApplicationsForMyPosts = async () => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error('사용자 정보 가져오기 실패:', userError.message);
      return;
    }

    const { data, error } = await supabase
      .from('post_apply_list')
      .select('proposer_name, proposer_id, post_id, post_title, accepted, finished')
      .eq('host_id', user.id);

    if (error) {
      console.error('내가 작성한 글에 대한 신청 목록 가져오기 실패:', error.message);
      return;
    }

    console.log('내가 작성한 글에 대한 신청 목록:', data);
    return data;
  } catch (error) {
    console.error('내가 작성한 글에 대한 신청 목록 처리 중 오류 발생:', error);
  }
};

// 신청하기 핸들러
export const postApplicationHandle = async (postId, postTitle, hostId) => {
  return await postApplication(postId, postTitle, hostId);
};

// 신청 취소 핸들러
export const deleteApplicationHandle = async (postId) => {
  return await deleteApplication(postId);
};

// 내가 신청한 목록 핸들러
export const getMyApplicationsListHandle = async () => {
  return await getMyApplicationsList();
};

// 내가 작성한 글에 대한 신청 목록 핸들러
export const getApplicationsForMyPostsHandle = async () => {
  return await getApplicationsForMyPosts();
};
