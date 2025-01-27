<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { user, isLoggedIn } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.checkLoginStatus();
    if (isLoggedIn.value) {
      await userStore.fetchUserInfo();
    }
    console.log('로그인 상태:', isLoggedIn.value);
    console.log('User info:', user.value);
  } catch (error) {
    console.error('Error initializing user data:', error);
  }
});
</script>

<template>
  <RouterView />
</template>
