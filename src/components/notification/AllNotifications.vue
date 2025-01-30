<script setup>
import { twMerge } from 'tailwind-merge';
import { notiTypes } from '.';
import { useNotificationModalStore } from '@/stores/notificaionModal';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const notificationModalStore = useNotificationModalStore();
const { notifications } = storeToRefs(notificationModalStore);

// checked 변환 + 상세페이지 라우트 함수
const router = useRouter();
const handleCheckNoti = (notification) => {
  notificationModalStore.updateChecked(notification.id);
  router.push(`/RecruitPostDetail/${notification.post_id}`);
  notificationModalStore.closeNotificationModal();
  notificationModalStore.updateCheckedUI(notification);
};
</script>

<template>
  <ul class="w-full h-[424px] flex flex-col gap-2 overflow-y-scroll">
    <li v-for="notification in notifications" :key="notification.id">
      <button
        class="w-full flex px-4 py-2 bg-white rounded-lg input-shadow body-m hover:bg-secondary-1"
        @click="handleCheckNoti(notification)"
      >
        <p
          :class="`${twMerge(
            'max-w-[75px] truncate text-primary-3',
            notification.checked && 'text-gray-40',
          )}`"
        >
          {{ notification.sender_name }}
        </p>
        <span :class="`mr-1 ${notification.checked && 'text-gray-40'}`">님이</span>
        <p
          :class="` ${twMerge(
            'max-w-[130px] truncate text-primary-3',
            notification.checked && 'text-gray-40',
          )}`"
        >
          {{ notification.post_title }}
        </p>
        <span :class="`mr-1 ${notification.checked && 'text-gray-40'}`">에</span>
        <span :class="` ${notification.checked && 'text-gray-40'}`">{{
          notiTypes[notification.type]
        }}</span>
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
