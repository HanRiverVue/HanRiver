<script setup>
import { postUploadUserImage } from '@/api/imageUpload';
import { ref } from 'vue';

// 이미지파일 upload API 활용예시
const image_url = ref('');
const fileChangeHandler = async (event) => {
  const file = event.target.files[0];
  const getUrl = await postUploadUserImage(file);
  image_url.value = getUrl;
};
</script>

<template>
  <div>
    <input type="file" accept="image/*" @change="(event) => fileChangeHandler(event)" />
    <img :src="image_url" alt="" />
  </div>
</template>

<style lang="scss" scoped></style>
