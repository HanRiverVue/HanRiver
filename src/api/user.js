import { supabase } from '@/config/supabase';

//  사용자가 인증돼었는지, 현재 로그인된 사용자 확인 API
export const getAuthUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
  }
  return user;
};
