<script setup>
import { deleteComment, postCreateComment, putUpdateComment } from '@/api/comment_editor';

const handleSubmit = async () => {
  await postCreateComment({
    content: '반갑다고 임마 ㅋㅋ!',
    post_id: 84,
  });
};

const handleUpdate = async () => {
  await putUpdateComment(
    {
      content: '아니 안반갑고ㅋㅋ!',
      post_id: 81,
    },
    12,
  );
};

const handleDelete = async () => {
  await deleteComment(12);
};
</script>
<template>
  <button @click="handleSubmit">댓글 작성</button>

  <button @click="handleUpdate">댓글 수정</button>

  <button @click="handleDelete">댓글 삭제</button>
</template>
<style scoped></style>
