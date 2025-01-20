<script setup>
import UpScroll from '@/components/UpScroll.vue';
import FooterLayout from '@/layout/FooterLayout.vue';
import HeaderLayout from '@/layout/HeaderLayout.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';

const isScrollTopShow = ref(false);
const handlePageScroll = () => {
  console.log(window.scrollY, window.innerHeight);
  if (window.scrollY + window.innerHeight > window.innerHeight) {
    isScrollTopShow.value = true;
  } else {
    isScrollTopShow.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handlePageScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handlePageScroll);
});
</script>

<template>
  <main :class="$route.meta.bg_color">
    <section class="max-w-[1200px] px-10 mx-auto mt-20">
      <article class="h-[3000px]">
        <HeaderLayout />
        <RouterView></RouterView>
        <UpScroll v-if="isScrollTopShow" />
        <FooterLayout v-if="$route.meta.showFooter" />
      </article>
    </section>
  </main>
</template>
