<script setup>
import router from '@/router';
import FooterLayout from './FooterLayout.vue';
import HeaderLayout from './HeaderLayout.vue';
</script>

<template>
  <HeaderLayout />
  <RouterView></RouterView>
  <FooterLayout v-if="$route.meta.showFooter" />
</template>
