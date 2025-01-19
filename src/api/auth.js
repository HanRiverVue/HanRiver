import { supabase } from '@/config/supabase';

//  깃허브 로그인 API
export const postSignInWithGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });
  if (error) {
    console.error(error);
  }
  return data;
};
