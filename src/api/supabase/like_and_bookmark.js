import { supabase } from '@/config/supabase';

// 포스트글 좋아요 누르기
export const toggleLike = async (post_id) => {
  const { data, error } = await supabase.rpc('toggle_post_like', {
    input_post_id: post_id,
  });
  if (error) console.error('Error:', error);
  else {
    return data;
  }
};
// 사용자 게시글 좋아요 정보 가져오기
export const getUserPostLikes = async () => {
  const { data, error } = await supabase.rpc('get_user_post_likes');
  if (error) console.error('Error:', error);
  else {
    return data;
  }
};

// 새로만든 포스트글 좋아요 모두 가져오기
export const getPostLikes = async (post_id) => {
  const { data, error } = await supabase.rpc('get_post_like', {
    input_post_id: post_id,
  });
  if (error) console.error('Error:', error);
  else {
    return data;
  }
};

// 북마크 담기
export const toggleBookmark = async (post_id) => {
  const { data, error } = await supabase.rpc('toggle_bookmark', {
    post_id,
  });
  if (error) {
    console.error('Error:', error);
    return null;
  } else {
    return data;
  }
};

// 사용자 북마크 정보 가져오기
export const getUserBookmarks = async () => {
  const { data, error } = await supabase.rpc('get_user_bookmarks');
  if (error) {
    console.error('Error:', error);
    return null;
  } else {
    return data;
  }
};

// 사용자가 북마크한 모든 게시글 상세정보 가져오기
export const getUserBookmarksWithDetails = async () => {
  const { data, error } = await supabase.rpc('get_user_bookmarks_with_posts');
  if (error) {
    console.error('Error:', error);
    return null;
  } else {
    return data;
  }
};
