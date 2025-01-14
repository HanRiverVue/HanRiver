import { createClient } from '@supabase/supabase-js';

// 아직 연동시킬 수파베이스를 정하지 않아서 env파일에 키랑 주소가 없습니다.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 이걸로 수파베이스 api 요청을 할 수 있습니당
export const supabase = createClient(supabaseUrl, supabaseKey);
