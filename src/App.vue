<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter();
const userStore = useUserStore();
const { user, isLoggedIn } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.checkLoginStatus();
    if (isLoggedIn.value) {
      await userStore.fetchUserInfo();
    }
    // console.log('로그인 상태:', isLoggedIn.value);
    // console.log('User info:', user.value);

    // 사용자 정보가 없고 로그인 상태일 때 온보딩으로 이동
    if (!user.value && isLoggedIn.value) {
      router.push('/Onboard');
    }
  } catch (error) {
    console.error('Error initializing user data:', error);
  }
});
</script>

<template>
  <RouterView />
</template>
