import { supabase } from '../config/supabase'; // 경로는 실제 파일 위치에 맞게 수정

let user_id = ''; // user_id 변수 초기화

// 사용자 정보 가져오기
const getUserInfo = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  user_id = user.id;
};

// 북마크 추가/삭제
const toggleBookmark = async (postId) => {
  try {
    if (!user_id) await getUserInfo();
    const { data: existingBookmark, error } = await supabase
      .from('post_bookmark')
      .select('*')
      .eq('user_id', user_id)
      .eq('post_id', postId);
    if (error) {
      console.error('북마크 확인 오류:', error);
      return;
    }

    // 북마크 삭제
    if (existingBookmark && existingBookmark.length > 0) {
      const { error: deleteError } = await supabase
        .from('post_bookmark')
        .delete()
        .eq('user_id', user_id)
        .eq('post_id', postId);
      if (deleteError) {
        console.error('북마크 삭제 오류:', deleteError);
      } else {
        console.log(`북마크 삭제 완료: ${postId}`);
      }
    } else {
      // 북마크 추가
      const { error: insertError } = await supabase
        .from('post_bookmark')
        .insert({ user_id: user_id, post_id: postId });

      if (insertError) {
        console.error('북마크 추가 오류:', insertError);
      } else {
        console.log(`북마크 추가 완료: ${postId}`);
      }
    }
  } catch (e) {
    console.error('북마크 처리 중 오류 발생:', e);
  }
};

// 자신이 북마크한 목록 가져오기
const getBookmarkedPosts = async () => {
  try {
    if (!user_id) await getUserInfo();
    const { data: bookmarks, error } = await supabase
      .from('post_bookmark')
      .select('post_id')
      .eq('user_id', user_id);
    if (error) {
      console.error('북마크 목록 가져오기 오류:', error);
      return [];
    }

    console.log('북마크 목록:', bookmarks);
    return bookmarks.map((bookmark) => bookmark.post_id);
  } catch (e) {
    console.error('북마크 목록 처리 중 오류 발생:', e);
    return [];
  }
};

// 래핑한 함수
// 북마크 추가/삭제 핸들러
export const toggleBookmarkHandle = async (postId) => {
  if (!postId) {
    console.error('postId를 전달해야 합니다.');
    return;
  }
  console.log(`북마크 처리 중... (postId: ${postId})`);
  await toggleBookmark(postId);
};

// 북마크 목록 가져오기 핸들러
export const getBookmarkedPostsHandle = async () => {
  console.log('북마크 목록 가져오는 중...');
  const bookmarks = await getBookmarkedPosts();
  if (bookmarks.length === 0) {
    console.log('북마크한 게시물이 없습니다.');
  } else {
    console.log('북마크한 게시물 ID 목록:', bookmarks);
  }
  return bookmarks;
};
