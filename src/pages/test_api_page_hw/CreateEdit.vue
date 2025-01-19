<script setup>
import { deletePost, postCreatePost, postUploadPostImage } from '@/api/post_editor';
import { onMounted, ref } from 'vue';

//  예시
const recruit_type = ref('프로젝트');
const count = ref(5);
const area = ref('강원도');
const startDate = ref(new Date('2025-01-20').toISOString().split('T')[0]); // '2025-01-20'
const endDate = ref(new Date('2025-06-11').toISOString().split('T')[0]); // '2025-06-11'
const method = ref('offline');
const deadline = ref(new Date('2025-01-20').toISOString().split('T')[0]); // '2025-01-20'
const callMethod = ref('오픈채팅');
const callLink = ref('https://kakao/openChat/...');
const stack = ref(['React', 'Vue', 'Adobe']);
const position = ref(['프론트앤드', '기획자']);
const title = ref('프론트엔드 개발자, 기획자 모집합니다.');
const body = ref('주제는 개발자 커뮤니티입니다!');
const imgPath = ref('');

// --------------

const post = ref(null);
let file = null;

onMounted(async () => {});

const handleChange = async (e) => {
  file = e.target.files[0];
  imgPath.value = await postUploadPostImage(file); // 이미지 업로드가 완료될 때까지 기다립니다.
};

const handleSubmit = async () => {
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
};

const handleDelete = async () => {
  await deletePost(82);
};
</script>
<template>
  <div>
    <h1 class="text-3xl">로그인</h1>
    <button @click="postSignInWithGithub">깃허브 로그인</button>
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
    <h1>게시글 삭제</h1>
    <button @click="handleDelete">글 삭제</button>
  </div>
</template>

<style scoped></style>
