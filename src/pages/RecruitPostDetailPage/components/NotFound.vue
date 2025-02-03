<script setup>
import { useRouter } from 'vue-router';
import AppButton from '@/components/AppButton.vue';

const props = defineProps({
  message: {
    type: String,
    default: '존재하지 않거나 삭제된 글입니다.',
  },
});

const router = useRouter();

const handleBackToPost = () => {
  router.go(-1);
};
</script>

<template>
  <div class="flex items-center justify-center h-screen absolute top-0 left-0 right-0 bottom-0">
    <div class="flex flex-col items-center justify-center">
      <p class="text-xl text-primary-3">{{ message }}</p>
      <AppButton
        text="이전 페이지로 돌아가기"
        type="primary"
        class="h-11 mt-6 bg-primary-3 hover:bg-primary-2 w-[184px]"
        @click="handleBackToPost"
      />
    </div>
  </div>
</template>
