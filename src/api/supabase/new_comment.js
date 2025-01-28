import { supabase } from '@/config/supabase';

// 게시글 댓글 달기
export const addPostComment = async (post_id, comment) => {
  const { data, error } = await supabase.rpc('add_post_comment', {
    p_post_id: post_id,
    p_content: comment,
  });
  if (error) console.error(error);
  else {
    console.log(data);
    return data;
  }
};

// 특정 게시글 댓글 전부 가져오기
export const getCommentsByPost = async (post_id) => {
  const { data, error } = await supabase.rpc('get_comments_by_post', {
    p_post_id: post_id,
  });
  if (error) console.error(error);
  else {
    console.log(data);
    return data;
  }
};

// 게시글 댓글 삭제하기
export const deletePostComment = async (post_id, comment_id) => {
  const { data, error } = await supabase.rpc('delete_post_comment', {
    p_comment_id: comment_id,
    p_post_id: post_id,
  });
  if (error) console.error(error);
  else console.log(data);
};

// 게시글 댓글 수정하기
export const updatePostComment = async (post_id, comment_id, comment) => {
  let { data, error } = await supabase.rpc('update_post_comment', {
    p_comment_id: comment_id,
    p_content: comment,
    p_post_id: post_id,
  });
  if (error) console.error(error);
  else console.log(data);
};
