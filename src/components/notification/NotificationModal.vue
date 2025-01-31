<script setup>
import noti_close_icon from '@/assets/icons/noti_close_icon.svg';
import { twMerge } from 'tailwind-merge';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import AllNotifications from './AllNotifications.vue';
import UnWatchedNotifications from './UnWatchedNotifications.vue';
import { useNotificationModalStore } from '@/stores/notificaionModal';
import { AllMarkAsSeen } from '@/api/supabase/notifications';
import { storeToRefs } from 'pinia';
//
const notificationModalStore = useNotificationModalStore();
const { notifications } = storeToRefs(notificationModalStore);

const toggleState = ref('All');
const toggleButton = computed(() => twMerge('text-primary-3 border-b-[2px] border-primary-3'));

onMounted(async () => {
  await AllMarkAsSeen(notifications.value);
  notificationModalStore.setHasNewNotificationFalse();
  document.body.style.overflow = 'hidden';
});
onUnmounted(() => {
  document.body.style.overflow = 'inherit';
});
</script>

<template>
  <div
    class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm"
  >
    <div
      class="relative w-[526px] max-w-[526px] p-10 bg-secondary-2 rounded-[20px] flex flex-col gap-5"
    >
      <button class="p-1 absolute top-6 right-6">
        <img
          :src="noti_close_icon"
          alt="알림 모달 닫기 아이콘"
          @click="notificationModalStore.closeNotificationModal()"
        />
      </button>
      <h2 class="h2-b">알림 목록</h2>
      <!-- 컨텐츠(전체) -->
      <div class="flex flex-col gap-2">
        <!-- 컨텐츠 상단(네비게이션) -->
        <div class="flex justify-between items-end text-gray-50">
          <ul class="flex gap-2">
            <li>
              <button
                @click="() => (toggleState = 'All')"
                :class="`body-b ${toggleState === 'All' && toggleButton}`"
              >
                전체
              </button>
            </li>
            <li>
              <button
                @click="() => (toggleState = 'UnWatched')"
                :class="`body-b ${toggleState === 'UnWatched' && toggleButton}`"
              >
                미확인
              </button>
            </li>
          </ul>
          <button class="caption-m" @click="notificationModalStore.updateCheckAll()">
            모두 확인
          </button>
        </div>
        <!-- 컨텐츠 하단(알림) -->
        <AllNotifications v-if="toggleState === 'All'" />
        <!-- 컨텐츠 하단(미확인 알림) -->
        <UnWatchedNotifications v-if="toggleState === 'UnWatched'" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
