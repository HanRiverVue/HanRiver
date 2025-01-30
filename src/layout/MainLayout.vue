<script setup>
import BaseModal from '@/components/BaseModal.vue';
import LoginModal from '@/components/LoginModal.vue';
import UpScroll from '@/components/UpScroll.vue';
import FooterLayout from '@/layout/FooterLayout.vue';
import HeaderLayout from '@/layout/header/HeaderLayout.vue';
import { useBaseModalStore } from '@/stores/baseModal';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import UserProfileModal from '@/components/UserProfileModal.vue';
import { useUserProfileModalStore } from '@/stores/userProfileModal';
import NotificationModal from '@/components/notification/NotificationModal.vue';
import { useNotificationModalStore } from '@/stores/notificaionModal';

const isScrollTopShow = ref(false);
const handlePageScroll = () => {
  if (window.scrollY + window.innerHeight > window.innerHeight) {
    isScrollTopShow.value = true;
  } else {
    isScrollTopShow.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handlePageScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handlePageScroll);
});

const baseModal = useBaseModalStore();

const userProfileModalStore = useUserProfileModalStore();
const notificationModalStore = useNotificationModalStore();
</script>

<template>
  <UserProfileModal v-if="userProfileModalStore.userProfileModal" />
  <LoginModal />
  <!-- 공통 모달창 -->
  <BaseModal v-if="baseModal.isVisible" />
  <!-- 알림 모달창 -->
  <NotificationModal v-if="notificationModalStore.isNotificationModalOpen" />
  <main :class="`${$route.meta.bg_color} min-h-[calc(100vh-72px)]`">
    <section class="max-w-[1200px] px-10 mx-auto mt-[72px]">
      <HeaderLayout />
      <RouterView></RouterView>
      <UpScroll v-if="isScrollTopShow" />
    </section>
    <FooterLayout v-if="$route.meta.showScrollTop && $route.meta.showFooter" />
  </main>
</template>
