<script setup>
import { getAllPostsWithPagination } from '@/api/post';
import { getAllPosts, getPostDetails, getPostsByType, getPostsByUser } from '@/api/post';
import { onMounted, ref } from 'vue';

const allPosts = ref(null);

const filterdPosts = ref(null);
const curPage = ref(1);
const pageSize = ref(12);
const totalCount = ref(0);

const postDetails = ref(null);
const postsByType = ref(null);
const postsByUser = ref(null);

onMounted(async () => {
  // fetchAllPosts();
  fetchFilteredPosts();
  // fetchPostDetails();
  // fetchPostsByUser();
});

const fetchAllPosts = async () => {
  allPosts.value = await getAllPosts();
};

const fetchPostDetails = async () => {
  postDetails.value = await getPostDetails(77);
};

const fetchPostsByUser = async () => {
  postsByUser.value = await getPostsByUser('현우');
};

const fetchFilteredPosts = async () => {
  filterdPosts.value = await getAllPostsWithPagination({
    // position: ['프론트앤드', '백엔드'],
    // techStack: ['React', 'Vue', 'Spring'],
    // recruitArea: '강원도',
    // recruitType: '프로젝트',
    // onOffline: 'offline',
  });
};
</script>
<template>
  <!-- <div class="text-3xl">
    <h1>전체 게시물</h1>
    <div>{{ allPosts }}</div>
  </div> -->
  <!-- 
  <div class="text-3xl">
    <div>특정 페이지 게시물{{ filtredPosts }}</div>
    <div>totalCount: {{ totalCount }}</div>
  </div> -->

  <!-- <div class="text-3xl">
    <div>postDetails: {{ postDetails }}</div>
  </div> -->
  <!-- 
  <div class="text-3xl">
    <div>postsByType: {{ postsByType }}</div>
  </div> -->

  <!-- <div class="text-3xl">
    <div>postsByUser: {{ postsByUser }}</div>
  </div> -->

  <div>
    <h1 class="text-3xl">필터링에 따른 게시물 가져오기</h1>
    <div>{{ filterdPosts }}</div>
  </div>
</template>
<style scoped></style>
