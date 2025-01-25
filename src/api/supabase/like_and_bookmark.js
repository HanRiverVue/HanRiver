import { supabase } from '@/config/supabase';

// 포스트글 좋아요 누르기
export const toggleLike = async (post_id) => {
  const { data, error } = await supabase.rpc('toggle_like', { post_id: post_id });

  if (error) {
    console.error('Error:', error);
    return null;
  } else {
    console.log('successfully:', data);
    return data;
  }
};
// 사용자 게시글 좋아요 정보 가져오기
export const getUserLikes = async () => {
  const { data, error } = await supabase.rpc('get_user_likes');
  if (error) {
    console.error('Error:', error);
    return null;
  } else {
    console.log('successfully:', data);
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
    console.log('successfully:', data);
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
    console.log('successfully:', data);
    return data;
  }
};

// 사용자가 북마크한 모든 게시글 상세정보 가져오기
export const getUserBookmarksWithDetails = async () => {
  const { data, error } = await supabase.rpc('get_user_bookmarks_with_details');
  if (error) {
    console.error('Error:', error);
    return null;
  } else {
    console.log('successfully:', data);
    return data;
  }
};
