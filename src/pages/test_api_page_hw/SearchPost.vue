<script setup>
import { getSearchPost } from '@/api/search';
import { ref } from 'vue';

const searchResults = ref([]);
const data = ref('');

const handleChange = (e) => {
  data.value = e.target.value;
};
const handleSearch = async () => {
  searchResults.value = await getSearchPost(data.value);
  console.log(searchResults.value);
};
</script>
<template>
  <input
    type="text"
    placeholder="게시물 제목,내용 검색"
    :value="data"
    @input="(e) => handleChange(e)"
  />
  <button type="button" @click="handleSearch">검색</button>

  <div>
    <h1>검색 결과</h1>
    <ul>
      <li v-for="result in searchResults" :key="result.id">
        <h1>{{ result.title }}</h1>
        <p>{{ result.positions }}</p>
        <p>{{ result.techStacks }}</p>
      </li>
    </ul>
  </div>
</template>
<style scoped></style>
