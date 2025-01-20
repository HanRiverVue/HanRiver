<script setup>
import FooterLayout from '@/layout/FooterLayout.vue';
import HeaderLayout from '@/layout/HeaderLayout.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <HeaderLayout />
  <RouterView></RouterView>
  <FooterLayout v-if="$route.meta.showFooter" />
</template>
