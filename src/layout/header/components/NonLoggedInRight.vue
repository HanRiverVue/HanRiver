<script setup>
import { useLoginModalStore } from '@/stores/loginModal';
const loginModalStore = useLoginModalStore();
</script>

<template>
  <article class="flex items-center justify-center h-10">
    <button
      class="border-[1.5px] border-primary-4 px-3 py-[3px] rounded-full h4-b text-primary-3"
      @click="loginModalStore.setLoginModal(true)"
    >
      로그인
    </button>
  </article>
</template>
