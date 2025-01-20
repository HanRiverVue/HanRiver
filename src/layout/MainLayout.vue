<script setup>
import FooterLayout from '@/layout/FooterLayout.vue';
import HeaderLayout from '@/layout/HeaderLayout.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <HeaderLayout />
  <main class="max-w-[1200px] px-10 mx-auto mt-20">
    <RouterView></RouterView>
  </main>
  <FooterLayout v-if="$route.meta.showFooter" />
</template>
