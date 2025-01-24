import { supabase } from '@/config/supabase';
import { getPostComments } from '@/api/supabase/comment';
import { getUserInfoToUserId } from './user';

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
        const userInfo = await getUserInfoToUserId(item.author);

        return {
          ...item,
          name: userInfo.name,
          profile_img_path: userInfo.profile_img_path,
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

// 특정 페이지의 게시물을 보여주는 API
export const getAllPostsWithPagination = async (filters, page = 1, pageSize = 12) => {
  try {
    const from = (page - 1) * pageSize;
    const to = page * pageSize;

    // 기술 스택 요소를 포함하는 post_id를 담을 배열
    let matchingPostIds = [];
    if (filters.techStack && filters.techStack.length > 0) {
      const { data: stackData } = await supabase
        .from('post_stacks')
        .select('post_id')
        .or(filters.techStack.map((tech) => `stack.ilike.%${tech}%`).join(','));

      matchingPostIds = stackData?.map((item) => item.post_id) || [];

      if (matchingPostIds.length === 0) {
        return { data: [], totalPost: 0, page, totalPage: 0 };
      }
    }

    // 쿼리 체이닝 방식을 사용시 await을 마지막에 단 한번 실행
    // post_positions 테이블을 post 테이블과 inner join
    let query = supabase
      .from('post')
      .select(`*,post_positions!inner(position)`, { count: 'exact' })
      .order('created_at', { ascending: false });

    if (matchingPostIds.length > 0) {
      query = query.in('id', matchingPostIds);
    }
    if (filters.position) {
      query = query.ilike('post_positions.position', `%${filters.position}%`);
    }
    if (filters.recruitArea) {
      query = query.is('recruit_area', `%${filters.recruitArea}%`);
    }
    if (filters.recruitType) {
      query = query.is('recruit_type', filters.recruitType);
    }
    if (filters.onOffline) {
      query = query.is('on_offline', `%${filters.onOffline}%`);
    }
    query = query.range(from, to);

    const { data, error2, count } = await query;
    if (error2) {
      throw new Error(error2);
    }
    const totalPage = Math.ceil((count || 0) / pageSize);

    const totalData = await Promise.all(
      data.map(async (item) => {
        const userInfo = await getUserInfoToUserId(item.author);

        return {
          ...item,
          name: userInfo.name,
          profile_img_path: userInfo.profile_img_path,
          positions: await getPostPositions(item.id),
          techStacks: await getPostTechStacks(item.id),
        };
      }),
    );
    return { data: totalData, totalPost: count, page, totalPage };
  } catch (error) {
    console.error(error);
    return { data: [], totalPost: 0, page, totalPage: 0 };
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

// 사용자가 작성한 게시물 목록 API
export const getPostsByUser = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('post')
      .select()
      .eq('author', userId)
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
  }
};
