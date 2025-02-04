<script setup>
import { twMerge } from 'tailwind-merge';
import { computed, onBeforeMount, ref } from 'vue';
import { notiTypes } from '.';
import { useNotificationModalStore } from '@/stores/notificaionModal';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const notificationModalStore = useNotificationModalStore();
const { notifications } = storeToRefs(notificationModalStore);
const filteredNotifications = ref([]);
// checked 변환 + 상세페이지 라우트 함수
const router = useRouter();
const handleCheckNoti = (notification) => {
  notificationModalStore.updateChecked(notification.id);
  router.push(`/RecruitPostDetail/${notification.post_id}`);
  notificationModalStore.closeNotificationModal();
  notificationModalStore.updateCheckedUI(notification);
};
const notiLatest = computed(() => {
  return (idx) => {
    const nowDate = new Date();
    const targetDate = new Date(filteredNotifications.value[idx].created_at);
    const minuite = Math.floor((nowDate.getTime() - targetDate.getTime()) / (60 * 1000));
    const hourse = Math.floor((nowDate.getTime() - targetDate.getTime()) / (60 * 1000) / 60);
    const day = Math.floor((nowDate.getTime() - targetDate.getTime()) / (60 * 1000) / 60 / 24);
    if (day > 0) {
      return `${day}일전`;
    } else if (hourse > 0) {
      return `${hourse}시간전`;
    } else {
      return `${minuite}분전`;
    }
  };
});
onBeforeMount(() => {
  const res = notifications.value.filter((noti) => !noti.checked);
  filteredNotifications.value = res;
});
</script>
<template>
  <ul
    v-if="filteredNotifications.length > 0"
    class="w-full h-[424px] flex flex-col gap-2 overflow-y-scroll"
  >
    <li v-for="(notification, idx) in filteredNotifications" :key="notification.id">
      <button
        class="w-full flex justify-between px-4 py-2 bg-white rounded-lg input-shadow body-m hover:bg-secondary-1"
        @click="handleCheckNoti(notification)"
      >
        <div class="flex">
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
        </div>
        <div>
          <span
            :class="`${twMerge(
              'max-w-[75px] truncate text-primary-3',
              notification.checked && 'text-gray-40',
            )}`"
            >{{ notiLatest(idx) }}</span
          >
        </div>
      </button>
    </li>
  </ul>
  <div v-else class="h-[424px] flex justify-center items-center">
    <h1 class="text-primary-3">미확인 알림 목록이 없습니다.</h1>
  </div>
</template>
<style lang="scss" scoped></style>
