import { supabase } from '@/config/supabase';
import { getPostPositions, getPostTechStacks } from './post';

// 게시물 검색 API  - GET
// ilike: 대소문자를 구분하지 않고 문자열을 검색
// %: 문자열의 앞뒤에 어떤 내용이 와도 검색 조건에 일치하도록
export const getSearchPost = async (searchInput, page = 1, pageSize = 12) => {
  try {
    const { data, error, count } = await supabase
      .from('post')
      .select('*', { count: 'exact' })
      .or(`title.ilike.%${searchInput}%`)
      .range((page - 1) * pageSize, page * pageSize);

    if (error) {
      throw new Error(error);
    }

    const totalPage = Math.ceil((count || 0) / pageSize);

    const result = await Promise.all(
      data.map(async (item) => {
        const positions = await getPostPositions(item.id);
        const techStacks = await getPostTechStacks(item.id);
        return {
          ...item,
          positions,
          techStacks,
          page,
          totalPage,
        };
      }),
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};
