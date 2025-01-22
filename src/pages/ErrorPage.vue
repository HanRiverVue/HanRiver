<script setup></script>

<template>
  <div class="flex flex-col gap-12 items-center justify-center h-[calc(100vh-80px)]">
    <div class="text-center">
      <h2 class="text-primary-3 font-jalnan mb-3 text-[40px]">404 Not Found</h2>
      <p class="text-primary-2 body-large-m">요청하신 페이지를 찾을 수 없어요.</p>
    </div>
    <router-link to="/">
      <button type="button" class="px-10 py-3.5 bg-primary-3 text-white rounded-lg body-large-m">
        홈으로 돌아가기
      </button>
    </router-link>
  </div>
</template>
