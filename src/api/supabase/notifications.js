import { supabase } from '@/config/supabase';
import { getUserInfo } from './user';
import { storeToRefs } from 'pinia';

// 알림을 삽입하는 함수
const insertNotification = async (receiverId, senderId, postId, type, message) => {
  const notification = {
    receiver_id: receiverId, // 수신자 ID
    sender_id: senderId, // 발신자 ID
    post_id: postId, // 관련 게시글 ID
    type: type, // 알림 유형
    message: message, // 알림 메시지
  };

  const { error } = await supabase.from('notifications').insert([notification]);

  if (error) {
    console.error('알림 생성 중 오류 발생:', error);
  }
};

// 댓글 작성 후 알림 생성 함수
const createComment = async (postId, commentMessage, receiverId, user) => {
  const senderId = user.id;
  await insertNotification(receiverId, senderId, postId, commentMessage);
};

// 좋아요 또는 신청을 했을 때 알림을 생성하는 함수
const createLikeOrApplyNotification = async (userId, postId, notificationType) => {
  const message =
    notificationType === 'like' ? '게시글에 좋아요를 눌렀습니다.' : '게시글에 신청을 했습니다.';
  await insertNotification(userId, userId, postId, notificationType, message);
};

// 알림 생성 핸들러
export const insertNotificationHandle = async (receiverId, senderId, postId, type, message) => {
  return await insertNotification(receiverId, senderId, postId, type, message);
};

// 댓글 작성 후 알림 생성 핸들러
export const createCommentHandle = async (postId, commentMessage, receiverId, user) => {
  return await createComment(postId, commentMessage, receiverId, user);
};

// 좋아요 또는 신청을 했을 때 알림 생성 핸들러
export const createLikeOrApplyNotificationHandle = async (userId, postId, notificationType) => {
  return await createLikeOrApplyNotification(userId, postId, notificationType);
};

// 알림 목록을 가져오는 핸들러
export const getNotificationsHandle = async (userId) => {
  return await getNotifications(userId);
};

export const getNotifications = async () => {
  const user = await getUserInfo();

  const { data, error } = await supabase
    .from('notifications')
    .select()
    .eq('user_id', user.user_id)
    .order('created_at', { ascending: false });
  if (error) {
    console.error(error);
  }

  return data;
};

// 새로운 알림 구독 (실시간 반영)
export const subscribeToNotifications = (addNotifications, setHasNewNotificationTrue) => {
  return supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'notifications' },
      async (payload) => {
        const { useUserStore } = await import('@/stores/user');
        const userStore = useUserStore();
        const { user } = storeToRefs(userStore);
        if (payload.new.user_id === user.value.user_id) {
          addNotifications(payload.new);
          setHasNewNotificationTrue();
        }
      },
    )
    .subscribe();
};

export const markAsChecked = async (id) => {
  try {
    await supabase.from('notifications').update({ checked: true }).eq('id', id);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const AllMarkAsSeen = async (notifications) => {
  notifications.forEach(async (notification) => {
    if (notification.seen === false) {
      await supabase.from('notifications').update({ seen: true }).eq('id', notification.id);
    }
  });
};

export const AllMarkAsChecked = async (notifications) => {
  notifications.forEach(async (notification) => {
    if (notification.checked === false) {
      await supabase.from('notifications').update({ checked: true }).eq('id', notification.id);
    }
  });
};
