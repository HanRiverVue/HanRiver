<script setup>
import { getPostComments } from '@/api/comment';
import { onMounted, ref } from 'vue';

const comments = ref([]);

onMounted(() => {
  fetchPostComments();
});

const fetchPostComments = async () => {
  comments.value = await getPostComments(81);
};
</script>
<template>
  <h1>특정 게시물의 댓글</h1>
  <h2>{{ comments }}</h2>
</template>
<style scoped></style>
