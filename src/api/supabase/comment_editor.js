import { supabase } from '@/config/supabase';
import { getUserLoggedIn } from '@/api/supabase/auth';

// 게시물 댓글 작성 API(🔒)  - POST
export const postCreateComment = async (requestObj) => {
  try {
    const user = await getUserLoggedIn();
    if (!user) {
      throw new Error('로그인이 필요합니다!');
    }
    //추후  user.id로 사용자 정보를 가져오는 API 적용 예정
    const { data, error } = await supabase
      .from('user_list')
      .select()
      .eq('user_id', user.id)
      .single();

    if (error) {
      throw new Error(error);
    }
    const username = data.name;
    const profile_path = data.profile_img_path;

    const { data: data2, error: error2 } = await supabase
      .from('post_comments')
      .insert({
        ...requestObj,
        user_id: user.id,
        commenter_name: username,
        commenter_image_path: profile_path,
      })
      .select()
      .single();

    if (error2) {
      throw new Error(error2);
    }
    // console.log(data2);

    return data2;
  } catch (error) {
    console.error(error);
  }
};

// 게시물 댓글 수정 API(🔒)  - PUT
export const putUpdateComment = async (requestObj, commentId) => {
  try {
    const user = await getUserLoggedIn();

    if (!user) {
      throw new Error('로그인이 필요합니다!');
    }
    const { data, error } = await supabase
      .from('user_list')
      .select()
      .eq('user_id', user.id)
      .single();

    if (error) {
      throw new Error(error);
    }
    const { data: data2, error: error2 } = await supabase
      .from('post_comments')
      .update(requestObj)
      .eq('id', commentId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error2) {
      throw new Error(error2);
    }
    return data2;
  } catch (error) {
    console.error(error);
  }
};

// 게시물 댓글 삭제 API(🔒)  - DELETE
export const deleteComment = async (commentId) => {
  try {
    const user = await getUserLoggedIn();

    if (!user) {
      throw new Error('로그인이 필요합니다!');
    }
    const { data, error } = await supabase
      .from('post_comments')
      .delete()
      .eq('id', commentId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      throw new Error(error);
    }
  } catch (error) {
    console.error(error);
  }
};
