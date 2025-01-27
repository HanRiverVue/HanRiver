<script setup>
const props = defineProps({
  class: {
    type: String,
    default() {
      return `w-52 h-52`;
    },
  },
});
</script>

<template>
  <div class="flex items-center justify-center h-[calc(100vh-72px)]">
    <img class="rotate" :class="class" src="/logo.svg" alt="로고 아이콘" />
  </div>
</template>

<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-30deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(30deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.rotate {
  animation: rotate 1000ms linear infinite;
}
</style>
