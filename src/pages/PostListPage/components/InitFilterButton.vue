<script setup>
import reset from '@/assets/icons/reset.svg';
import { ref } from 'vue';

const emit = defineEmits(['click']);
// 회전 여부
const rotate = ref(false);

const rotateImage = () => {
  emit('click');
  rotate.value = true;
  setTimeout(() => {
    rotate.value = false;
  }, 500);
};
</script>
<template>
  <div>
    <div
      @click="rotateImage"
      class="cursor-pointer p-1 w-8 h-8 min-w-8 bg-primary-4 rounded-full input-shadow flex justify-center items-center gap-[10px]"
    >
      <img
        ref="svgImage"
        :class="`w-5 h-5 flex-shrink-0 ${rotate ? 'rotate-spin' : rotate}`"
        :src="reset"
        alt="초기화 아이콘"
      />
    </div>
  </div>
</template>
<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.rotate-spin {
  animation: spin 500ms linear;
}
</style>
