<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import logo from '@/assets/icons/logo.svg';
import NonLoggedInRight from '@/layout/header/components/NonLoggedInRight.vue';
import LoggedInRight from '@/layout/header/components/LoggedInRight.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const focusClass =
  'text-primary-3 before:content-[""] before:w-1 before:h-1 before:rounded-full before:bg-primary-3 before:absolute before:top-[-4px] before:left-[50%] before:translate-x-[-50%]';

const route = useRoute();

const currentPath = ref('');
const setPath = () => {
  currentPath.value = window.location.pathname;
};

watch(route, setPath, { immediate: true });
</script>

<template>
  <header>
    <nav class="fixed top-0 left-0 z-40 w-full bg-white">
      <article class="w-full max-w-[1200px] flex items-center justify-between mx-auto px-10 py-3">
        <article class="w-full max-w-[610px] flex items-center justify-between">
          <RouterLink to="/" class="px-[22px]">
            <img :src="logo" alt="mergi 로고 아이콘" class="min-w-[96px]" />
          </RouterLink>
          <ul class="w-full max-w-[370px] flex items-center justify-between h3-b">
            <li :class="`relative ${currentPath === '/PostList/study' && focusClass}`">
              <RouterLink to="/PostList/study"> 스터디 </RouterLink>
            </li>
            <li :class="`relative ${currentPath === '/PostList/project' && focusClass}`">
              <RouterLink to="/PostList/project"> 프로젝트 </RouterLink>
            </li>
            <li :class="`relative ${currentPath === '/service' && focusClass}`">
              <RouterLink to="/service"> 서비스 </RouterLink>
            </li>
          </ul>
        </article>
        <LoggedInRight v-if="userStore.isLoggedIn" />
        <NonLoggedInRight v-else />
      </article>
    </nav>
  </header>
</template>
