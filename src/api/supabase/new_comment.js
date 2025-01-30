import { supabase } from '@/config/supabase';

export const addPostComment = async (post_id, comment) => {
  const { data, error } = await supabase.rpc('add_post_comment', {
    p_post_id: post_id,
    p_content: comment,
  });
  if (error) console.error(error);
  else return data;
};

export const getCommentsByPost = async (post_id) => {
  const { data, error } = await supabase.rpc('get_comments_by_post', {
    p_post_id: post_id,
  });
  if (error) console.error(error);
  else return data;
};

export const deletePostComment = async (comment_id, post_id) => {
  const { data, error } = await supabase.rpc('delete_post_comment', {
    p_comment_id: comment_id,
    p_post_id: post_id,
  });
  if (error) console.error(error);
  else return data;
};

export const updatePostComment = async (comment_id, comment, post_id) => {
  const { data, error } = await supabase.rpc('update_post_comment', {
    p_comment_id: comment_id,
    p_content: comment,
    p_post_id: post_id,
  });
  if (error) console.error(error);
  else return data;
};
