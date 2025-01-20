import { supabase } from '@/config/supabase';

let likedPosts = [];
let user_id = null;

// 사용자 정보 가져오기
const getUserInfo = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error('사용자 정보가 없습니다.');
    return null;
  }

  return user.id;
};

// 사용자가 좋아요 누른 게시물 가져오기
const fetchLikedPosts = async () => {
  if (!user_id) {
    user_id = await getUserInfo();
    if (!user_id) {
      console.error('사용자 정보가 없으므로 좋아요 목록을 가져올 수 없습니다.');
      return;
    }
  }

  const { data, error } = await supabase.from('post_like').select('post_id').eq('user_id', user_id);

  if (error) {
    console.error('좋아요 목록 조회 오류:', error);
    return;
  }

  likedPosts = data.map((like) => like.post_id);
};

// 내가 좋아요 누른 목록
const getLikedPosts = async () => {
  if (likedPosts.length === 0) {
    await fetchLikedPosts();
  }
  return likedPosts;
};

// 좋아요 추가
const handleLike = async (postId) => {
  if (!user_id) await getUserInfo();

  const actualPostId = postId.value !== undefined ? postId.value : postId;

  if (typeof actualPostId !== 'number') {
    console.error('유효하지 않은 postId:', actualPostId);
    return;
  }

  const { error } = await supabase
    .from('post_like')
    .insert([{ user_id: user_id, post_id: actualPostId }]);

  if (error) {
    console.error('좋아요 추가 오류:', error);
    return;
  }

  likedPosts.push(actualPostId);
};

// 좋아요 취소
const handleUnlike = async (postId) => {
  if (!postId) {
    console.error('유효하지 않은 postId:', postId);
    return;
  }

  if (!user_id) await getUserInfo();

  const { error } = await supabase
    .from('post_like')
    .delete()
    .match({ user_id: user_id, post_id: postId });

  if (error) {
    console.error('좋아요 취소 오류:', error);
    return;
  }

  likedPosts = likedPosts.filter((id) => id !== postId);
};

// 좋아요 토글
const toggleLike = async (postId) => {
  if (!postId) {
    console.error('유효하지 않은 postId:', postId);
    return;
  }

  if (likedPosts.includes(postId)) {
    await handleUnlike(postId);
  } else {
    await handleLike(postId);
  }
};

// 래퍼 함수들

// 내가 좋아요 누른 목록 반환 핸들러
export const getLikedPostsHandle = async () => {
  return await getLikedPosts();
};

// 좋아요 추가 핸들러
export const handleLikeHandle = (postId) => handleLike(postId);

// 좋아요 취소 핸들러
export const handleUnlikeHandle = (postId) => handleUnlike(postId);

// 좋아요 토글 핸들러
export const toggleLikeHandle = (postId) => toggleLike(postId);
