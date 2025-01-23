<script setup>
import go_to_top from '@/assets/icons/go_to_top.svg';

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};
</script>

<template>
  <article class="w-full flex justify-end animate-fade-in-500" @click="scrollToTop()">
    <button class="fixed bottom-10 right-10 rounded-full shadow-md">
      <article
        class="w-10 h-10 p-2 rounded-full bg-primary-3 opacity-70 duration-300 hover:opacity-100 flex items-center justify-center"
      >
        <img :src="go_to_top" alt="위로 올라가기 아이콘" />
      </article>
    </button>
  </article>
</template>
