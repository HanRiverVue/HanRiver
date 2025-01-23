import { supabase } from '@/config/supabase';

// 깃허브 로그인 API
export const signInWithGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });
  console.log(data);

  if (error) {
    console.log(error);
  }
};

// 카카오 로그인 API
export const signInWithKakao = async () => {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
  });
  if (error) {
    console.log(error);
  }
};

// 구글 로그인 API
export const signInWithGoogle = async () => {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  console.log(data);
  if (error) {
    console.log(error);
  }
};

// 로그아웃 API
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  }
};

// 유저 로그인 정보 get api(로그인 페이지 로그인 확인여부 + 유저 id값 추출용으로 사용)
export const getUserLoggedIn = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
