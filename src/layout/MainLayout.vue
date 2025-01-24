<script setup>
import BaseModal from '@/components/BaseModal.vue';
import LoginModal from '@/components/LoginModal.vue';
import UpScroll from '@/components/UpScroll.vue';
import FooterLayout from '@/layout/FooterLayout.vue';
import HeaderLayout from '@/layout/header/HeaderLayout.vue';
import { useBaseModalStore } from '@/stores/baseModal';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';

const isScrollTopShow = ref(false);
const handlePageScroll = () => {
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

const baseModal = useBaseModalStore();
</script>

<template>
  <LoginModal />
  <!-- 공통 모달창 -->
  <BaseModal v-if="baseModal.isVisible" />
  <main :class="`${$route.meta.bg_color} min-h-[calc(100vh-72px)]`">
    <section class="max-w-[1200px] px-10 mx-auto mt-[72px]">
      <HeaderLayout />
      <RouterView></RouterView>
      <UpScroll v-if="isScrollTopShow" />
    </section>
    <FooterLayout v-if="$route.meta.showScrollTop && $route.meta.showFooter" />
  </main>
</template>
