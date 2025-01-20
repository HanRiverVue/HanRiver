import { supabase } from '@/config/supabase';

// 알림을 삽입하는 함수
const insertNotification = async (receiverId, senderId, postId, type, message) => {
  const notification = {
    receiver_id: receiverId, // 수신자 ID
    sender_id: senderId, // 발신자 ID
    post_id: postId, // 관련 게시글 ID
    type: type, // 알림 유형
    message: message, // 알림 메시지
  };

  const { data, error } = await supabase.from('notifications').insert([notification]);

  if (error) {
    console.error('알림 생성 중 오류 발생:', error);
  } else {
    console.log('알림 생성 완료:', data);
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

// 알림 목록을 가져오는 함수
const getNotifications = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('receiver_id', userId) // 사용자의 알림만 가져오기
      .order('created_at', { ascending: false }); // 생성일 기준으로 내림차순 정렬

    if (error) {
      throw error;
    }

    console.log('알림 목록:', data);
    return data;
  } catch (error) {
    console.error('알림을 가져오는 중 오류 발생:', error);
    return [];
  }
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
