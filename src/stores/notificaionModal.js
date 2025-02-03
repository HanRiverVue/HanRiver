import { AllMarkAsChecked, getNotifications, markAsChecked } from '@/api/supabase/notifications';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationModalStore = defineStore('notificationModal', () => {
  const isNotificationModalOpen = ref(false);
  const openNotificationModal = () => {
    isNotificationModalOpen.value = true;
  };
  const closeNotificationModal = () => {
    isNotificationModalOpen.value = false;
  };

  // 알림 목록
  const notifications = ref([]);

  // 새 알림이 왔는지 여부(추후 헤더 레이아웃 이동)
  const hasNewNotification = ref(false);

  // 새 알림 상태 true/false로 전환
  const setHasNewNotificationTrue = () => {
    hasNewNotification.value = true;
  };
  const setHasNewNotificationFalse = () => {
    hasNewNotification.value = false;
  };

  // 읽음처리(checked) 함수
  const updateChecked = async (id) => {
    await markAsChecked(id);
  };

  // 읽음처리(checked) UI 업데이트 함수
  const updateCheckedUI = (target) => {
    const updatedNoti = notifications.value.map((noti) =>
      noti.id === target.id ? { ...noti, checked: true } : noti,
    );
    notifications.value = updatedNoti;
  };

  // 모두 읽음처리(checked) 함수
  const updateCheckAll = () => {
    AllMarkAsChecked(notifications.value);
    const allChecked = notifications.value.map((notification) =>
      !notification.checked ? { ...notification, checked: true } : notification,
    );
    notifications.value = allChecked;
  };

  // 실시간 알림 추가
  const addNotifications = (updatedData) => {
    notifications.value.unshift(updatedData);
  };

  // 로그인한 사용자의 알림 목록 가져오기
  const fetchNotifications = async () => {
    notifications.value = await getNotifications();
    // 알림 테이블 구독
    // subscribeToNotifications(notifications.value, hasNewNotification.value);
  };

  return {
    isNotificationModalOpen,
    openNotificationModal,
    closeNotificationModal,
    notifications,
    hasNewNotification,
    fetchNotifications,
    setHasNewNotificationTrue,
    setHasNewNotificationFalse,
    addNotifications,
    updateChecked,
    updateCheckedUI,
    updateCheckAll,
  };
});
