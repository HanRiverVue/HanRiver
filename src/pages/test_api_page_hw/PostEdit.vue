<script setup>
import { signInWithGithub } from '@/api/supabase/auth';
import {
  deletePost,
  postCreatePost,
  postUploadPostImage,
  putUpdatePost,
} from '@/api/supabase/post_editor';
import { ref } from 'vue';

//  예시
const recruit_type = ref('프로젝트');
const count = ref(5);
const area = ref('부산 광역시');
const startDate = ref(new Date('2025-01-20').toISOString().split('T')[0]); // '2025-01-20'
const endDate = ref(new Date('2025-06-11').toISOString().split('T')[0]); // '2025-06-11'
const method = ref('online');
const deadline = ref(new Date('2025-01-20').toISOString().split('T')[0]); // '2025-01-20'
const callMethod = ref('이메일');
const callLink = ref('https://kakao/openChat/...');
const stack = ref(['React Native', 'Kotlin', 'React']);
const position = ref(['AOS', '프론트엔드']);
const title = ref('AOS 개발자, 프론트엔드 개발자 모집합니다.');
const body = ref('주제는 주제를 추천해주는 커뮤니티입니다!');
const imgPath = ref('');

// --------------

const post = ref(null);

const updatedPost = ref(null);

const preview = ref(null);

const handleChange = async (e) => {
  preview.value = e.target.files[0];
};

const handleSubmit = async () => {
  imgPath.value = await postUploadPostImage(preview.value); // 이미지 업로드가 완료될 때까지 기다립니다.

  if (!imgPath.value) return;
  post.value = await postCreatePost(
    {
      recruit_type: recruit_type.value,
      title: title.value,
      body: body.value,
      recruit_count: count.value,
      recruit_area: area.value,
      start_date: startDate.value,
      end_date: endDate.value,
      on_offline: method.value,
      recruit_deadline: deadline.value,
      call_method: callMethod.value,
      call_link: callLink.value,
      post_img_path: imgPath.value,
    },
    position.value,
    stack.value,
  );
  console.log(post.value);
};

const handleUpdate = async () => {
  updatedPost.value = await putUpdatePost(
    {
      recruit_type: recruit_type.value,
      title: title.value,
      body: body.value,
      recruit_count: count.value,
      recruit_area: area.value,
      start_date: startDate.value,
      end_date: endDate.value,
      on_offline: method.value,
      recruit_deadline: deadline.value,
      call_method: callMethod.value,
      call_link: callLink.value,
      post_img_path: imgPath.value,
    },
    position.value,
    stack.value,
    86,
  );
  console.log(updatedPost.value);
};

const handleDelete = async () => {
  await deletePost(82);
};
</script>
<template>
  <div>
    <h1 class="text-3xl">로그인</h1>
    <button @click="signInWithGithub">깃허브 로그인</button>
  </div>

  <div>
    <h1 class="text-3xl">이미지 저장</h1>
    <input type="file" @change="handleChange" />
  </div>
  <div>
    <h1 class="text-3xl">게시글 저장</h1>
    <button @click="handleSubmit">글 저장</button>
  </div>

  <div class="text-3xl" v-if="post">
    <h1>포스트 작성시 return 값</h1>
    <div>정보: {{ post.data }}</div>
    <div>포지션: {{ post.positions }}</div>
    <div>기술스택: {{ post.techStacks }}</div>
  </div>

  <div class="text-3xl">
    <h1>게시글 수정</h1>
    <button @click="handleUpdate">글 수정</button>
  </div>

  <div class="text-3xl">
    <h1>게시글 삭제</h1>
    <button @click="handleDelete">글 삭제</button>
  </div>
</template>

<style scoped></style>
