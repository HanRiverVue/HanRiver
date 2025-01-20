// 이미지파일 upload API
// 이미지파일 file형태로 매개변수에 넣으면 수파베이스의 이미지링크로 변환됩니다.

import { supabase } from '@/config/supabase';

// 중요) event.target.files[0]의 값을 아래 매개변수에 넣은 반환값을  게시물 생성 API의 post_img_path에 넣어줘야함!
export const postUploadUserImage = async (file) => {
  const encodedFileName = encodeURIComponent(file.name).replace(/%/g, '');

  const exist_files = await supabase.storage.from('user_images').list('');
  let addData = true;
  exist_files.data.map((e) => {
    if (e.name === encodedFileName) {
      addData = false;
    }
  });

  if (addData) {
    const { data, error } = await supabase.storage
      .from('user_images')
      .upload(encodedFileName, file, {
        cacheControl: '3600',
        upsert: false,
      });
    if (error) {
      console.error(error);
    }
  }

  const { data: publicURL, error: urlError } = supabase.storage
    .from('user_images')
    .getPublicUrl(encodedFileName);
  if (urlError) {
    console.error(urlError);
  }
  return publicURL.publicUrl;
};
