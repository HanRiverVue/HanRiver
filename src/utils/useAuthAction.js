import { ref } from 'vue';
import { getUserLoggedIn } from '@/api/supabase/auth';

export function useAuthAction() {
  const isAuthenticated = ref(false);
  const showLoginModal = ref(false);

  //유저 인증상태 확인
  const checkAuth = async () => {
    const user = await getUserLoggedIn();
    isAuthenticated.value = !!user;
    return isAuthenticated.value;
  };

  const openLoginModal = () => {
    showLoginModal.value = true;
  };

  const closeLoginModal = () => {
    showLoginModal.value = false;
  };

  const handleAuthAction = async (authenticatedAction) => {
    if (await checkAuth()) {
      await authenticatedAction();
    } else {
      openLoginModal();
    }
  };

  return {
    isAuthenticated,
    showLoginModal,
    checkAuth,
    handleAuthAction,
    openLoginModal,
    closeLoginModal,
  };
}
