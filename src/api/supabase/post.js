import { supabase } from '@/config/supabase';
import { getPostComments } from '@/api/supabase/comment';

export const getAllPosts = async (filters, size = 10) => {
  try {
    let { data, error } = await supabase.rpc('get_all_posts', {
      filters,
      size,
    });
    if (error) console.error(error);
    else return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllPostsWithPagination = async (filters, page = 1, page_size = 12) => {
  try {
    let { data, error } = await supabase.rpc('get_filtered_posts_with_pagination', {
      filters,
      page,
      page_size,
    });
    if (error) console.error(error);
    else return data;
  } catch (error) {
    console.error(error);
    return { posts: [], total_post: 0, page, total_page: 0 };
  }
};

export const getMyApplyPosts = async (filters, page = 1, page_size = 4) => {
  try {
    let { data, error } = await supabase.rpc('get_my_apply_posts', {
      filters,
      page,
      page_size,
    });
    if (error) console.error(error);
    else return data;
  } catch (error) {
    console.error('내가 신청한 목록 처리 중 오류 발생:', error);
  }
};

// 내가 북마크한 게시물 목록 API
export const getBookmarkPostsByUser = async (filters, page, page_size) => {
  let { data, error } = await supabase.rpc('get_user_bookmarks_with_pagination', {
    filters,
    page,
    page_size,
  });
  if (error) console.error(error);
  else return data;
};

// 사용자(나 포함)가 작성한 게시물 목록 API
export const getPostsByUser = async (user_id, filters, page, page_size) => {
  let { data, error } = await supabase.rpc('get_post_by_user_with_pagination', {
    filters,
    page,
    page_size,
    user_id,
  });
  if (error) console.error(error);

  return data;
};

// 게시물 상세보기 API
export const getPostDetails = async (postId) => {
  try {
    const { data, error } = await supabase.from('post').select().eq('id', postId).single();

    if (error) {
      throw new Error(error);
    }
    const [position, techStack, comments] = await Promise.all([
      getPostPositions(postId),
      getPostTechStacks(postId),
      getPostComments(postId),
    ]);

    const userId = data.author;

    const { data: user, error: userError } = await supabase
      .from('user_list')
      .select()
      .eq('user_id', userId)
      .single();

    if (userError) {
      throw new Error(userError);
    }

    const totalData = { ...data, position, techStack, comments, user };
    return totalData;
  } catch (error) {
    console.error(error);
  }
};

//  특정 게시물의 포지션 정보 불러오기
export const getPostPositions = async (postId) => {
  const { data, error } = await supabase
    .from('post_positions')
    .select('position')
    .eq('post_id', postId)
    .single();

  if (error) {
    console.error(error);
  }
  return data.position.split('/');
};

//  특정 게시물의 기술스택 정보 불러오기
export const getPostTechStacks = async (postId) => {
  const { data, error } = await supabase
    .from('post_stacks')
    .select('stack')
    .eq('post_id', postId)
    .single();

  if (error) {
    console.error(error);
  }
  return data.stack.split('/');
};
