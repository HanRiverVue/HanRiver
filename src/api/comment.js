import { supabase } from '@/config/supabase';

//  특정 게시물의 댓글을 가져오는 API -GET
export const getPostComments = async (postId) => {
  const { data, error } = await supabase
    .from('post_comments')
    .select()
    .eq('post_id', postId)
    .order('created_at', { ascending: true }); // 최신순 정렬;

  if (error) {
    console.error(error);
  }
  return data;
};
