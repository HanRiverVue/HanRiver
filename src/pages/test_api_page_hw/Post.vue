<script setup>
import { getAllPostsWithPagination } from '@/api/supabase/post';
import { getAllPosts, getPostDetails, getPostsByUser } from '@/api/supabase/post';
import { onMounted, ref } from 'vue';

const allPosts = ref([]);

const filterdPosts = ref([]);

const postDetails = ref(null);
const postsByUser = ref(null);

onMounted(async () => {
  // fetchAllPosts();
  // fetchFilteredPosts();
  // fetchPostDetails();
  // fetchPostsByUser();
});

const fetchAllPosts = async () => {
  allPosts.value = await getAllPosts();
  console.log(allPosts.value);
};

const fetchPostDetails = async () => {
  postDetails.value = await getPostDetails(86);
  console.log(postDetails.value);
};

const fetchPostsByUser = async () => {
  postsByUser.value = await getPostsByUser('5cc3999c-3150-4072-a824-5d5ddeb3e381');
};

const fetchFilteredPosts = async () => {
  filterdPosts.value = await getAllPostsWithPagination({
    position: null,
    techStack: ['React'],
    recruitArea: null,
    recruitType: null,
    onOffline: null,
  });
  console.log(filterdPosts.value);
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

  <!-- <div class="text-3xl">
    <div>postsByUser: {{ postsByUser }}</div>
  </div> -->

  <div>
    <h1 class="text-3xl">필터링에 따른 게시물 가져오기</h1>
    <div>{{ filterdPosts }}</div>
  </div>
</template>
<style scoped></style>
