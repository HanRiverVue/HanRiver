import { supabase } from '@/config/supabase';
import { getUserInfo } from './user';
import { storeToRefs } from 'pinia';

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
