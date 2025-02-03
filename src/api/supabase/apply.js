import { supabase } from '@/config/supabase';
import { getPostDetails } from './post';

// 신청하기 함수
export const postApplication = async (postId, selectedPositions) => {
  try {
    const postDetails = await getPostDetails(postId);
    if (!postDetails) {
      console.error('게시물 정보를 가져올 수 없습니다.');
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      console.error('사용자 정보 가져오기 실패:', userError.message);
      return;
    }

    const { data: existingApplication, error: fetchError } = await supabase
      .from('post_apply_list')
      .select()
      .eq('proposer_id', user.id)
      .eq('post_id', postId)
      .maybeSingle();

    if (fetchError) {
      console.error('신청 확인 중 오류 발생:', fetchError.message);
      return;
    }

    if (existingApplication) {
      console.error('이미 신청한 게시물입니다.');
      return;
    }

    const { data: userList } = await supabase
      .from('user_list')
      .select('name, profile_img_path')
      .eq('user_id', user.id)
      .single();

    const proposerName = userList?.name || '이름 없음';
    const proposerImgPath = userList?.profile_img_path || '기본 이미지 경로';

    // 신청 데이터 생성
    const { data, error } = await supabase
      .from('post_apply_list')
      .insert([
        {
          host_id: postDetails.author,
          proposer_id: user.id,
          post_id: postId,
          proposer_name: proposerName,
          proposer_img_path: proposerImgPath,
          post_title: postDetails.title,
          accepted: false,
          finished: false,
          proposer_positions: selectedPositions,
        },
      ])
      .select();

    if (error) {
      console.error('신청 생성 실패:', error.message);
      return;
    }
    return data;
  } catch (error) {
    console.error('신청 처리 중 오류 발생:', error);
  }
};

// 신청 취소 함수
export const deleteApplication = async (postId) => {
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
    return data;
  } catch (error) {
    console.error('신청 취소 처리 중 오류 발생:', error);
  }
};

// 내가 작성한 글에 대한 신청 목록
export const getApplicationsForMyPosts = async (postId) => {
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
      .select(
        'created_at, proposer_name, proposer_id, proposer_positions, proposer_img_path, post_id, post_title, accepted, finished',
      )
      .eq('host_id', user.id)
      .eq('post_id', postId);

    if (error) {
      console.error('내가 작성한 글에 대한 신청 목록 가져오기 실패:', error.message);
      return;
    }

    return data;
  } catch (error) {
    console.error('내가 작성한 글에 대한 신청 목록 처리 중 오류 발생:', error);
  }
};
