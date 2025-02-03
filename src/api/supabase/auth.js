import { supabase } from '@/config/supabase';

// 깃허브 로그인 API
export const signInWithGithub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });

  if (error) {
    console.error(error);
  }
};

// 카카오 로그인 API
export const signInWithKakao = async () => {
  let { error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
  });
  if (error) {
    console.error(error);
  }
};

// 구글 로그인 API
export const signInWithGoogle = async () => {
  let { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) {
    console.error(error);
  }
};

// 로그아웃 API
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
  }
};

// 유저 로그인 정보 get api(로그인 페이지 로그인 확인여부 + 유저 id값 추출용으로 사용)
export const getUserLoggedIn = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
