import { supabase } from '@/config/supabase';

export const addPostComment = async (post_id, comment) => {
  const { data, error } = await supabase.rpc('add_post_comment', {
    p_post_id: post_id,
    p_content: comment,
  });
  if (error) console.error(error);
  else console.log(data);
  return data;
};

export const deletePostComment = async (comment_id) => {
  const { data, error } = await supabase.rpc('delete_post_comment', {
    p_comment_id: comment_id,
  });
  if (error) console.error(error);
  else console.log(data);
};

export const updatePostComment = async (post_id, comment) => {
  const { data, error } = await supabase.rpc('update_post_comment', {
    p_comment_id: post_id,
    p_content: comment,
  });
  if (error) console.error(error);
  else console.log(data);
};
