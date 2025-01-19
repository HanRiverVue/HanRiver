import { supabase } from '@/config/supabase';

// 전체 게시물을 보여주는 API ( 페이지네이션 x)
export const getAllPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('post')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });
    if (error) {
      throw new Error(error);
    }

    const totalData = await Promise.all(
      data.map(async (item) => {
        return {
          ...item,
          positions: await getPostPositions(item.id),
          techStacks: await getPostTechStacks(item.id),
        };
      }),
    );
    return totalData;
  } catch (error) {
    console.error(error);
    return { posts: [], totalCount: 0 };
  }
};

// 특정 페이지의 게시물을 보여주는 API
export const getAllPostsWithPagination = async (filters, page = 1, pageSize = 12) => {
  try {
    const from = (page - 1) * pageSize;
    const to = page * pageSize;

    // 쿼리 체이닝 방식을 사용시 await을 마지막에 단한번 실행
    let query = supabase
      .from('post')
      .select(`*, post_positions(position), post_stacks(stack)`, { count: 'exact' })
      .order('created_at', { ascending: false });

    if (filters.recruitArea) {
      query = query.ilike('recruit_area', `%${filters.recruitArea}%`);
    }
    if (filters.recruitType) {
      query = query.ilike('recruit_type', filters.recruitType);
      console.log('After recruitType filter:', query);
    }
    if (filters.onOffline) {
      query = query.ilike('on_offline', `%${filters.onOffline}%`);
    }
    query = query.range(from, to);

    const { data, error2, count } = await query;
    if (error2) {
      throw new Error(error2);
    }

    const totalPage = Math.ceil(count || 0 / pageSize);

    return { data, totalPost: count, page, totalPage };
  } catch (error) {
    console.error(error);
    return { posts: [], totalPost: 0 };
  }
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

    const totalData = await Promise.all(
      data.map(async (item) => {
        return {
          ...item,
          position,
          techStack,
          comments,
          user,
        };
      }),
    );
    return {
      data: totalData,
    };
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

// //  모집 유형별(프로젝트/스터디) 게시물 목록 API
// export const getPostsByType = async (typeName) => {
//   try {
//     const { data, error } = await supabase
//       .from('post')
//       .select()
//       .eq('recruit_type', typeName)
//       .order('created_at', { ascending: false });

//     if (error) {
//       console.error(error);
//     }

//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// 사용자가 작성한 게시물 목록 API
export const getPostsByUser = async (userName) => {
  try {
    const { data: user, error } = await supabase
      .from('user_list')
      .select('user_id')
      .eq('name', userName)
      .single();

    if (error) {
      throw new Error(error);
    }
    const userId = user.user_id;
    const { data, error: error2 } = await supabase
      .from('post')
      .select()
      .eq('author', userId)
      .order('created_at', { ascending: false });

    if (error2) {
      throw new Error(error2);
    }
    const totalData = await Promise.all(
      data.map(async (item) => {
        return {
          ...item,
          positions: await getPostPositions(item.id),
          techStacks: await getPostTechStacks(item.id),
        };
      }),
    );
    return totalData;
  } catch (error) {
    console.error(error);
  }
};
