import { ref, onMounted, watch } from 'vue';
import { getUserLoggedIn } from '@/api/supabase/auth';

// 인증 관련 로직을 관리
export function useAuthAction() {
  // 사용자 인증 상태
  const isAuthenticated = ref(false);
  const showLoginModal = ref(false);

  // 사용자의 인증 상태를 확인하
  const checkAuth = async () => {
    const user = await getUserLoggedIn();
    isAuthenticated.value = !!user;
    // console.log('useAuthAction - checkAuth:', isAuthenticated.value);
  };

  onMounted(async () => {
    await checkAuth();
  });

  // watch(isAuthenticated, (newValue) => {
  //   console.log('Auth state changed:', newValue);
  // });

  // 모달 관련 함수
  const openLoginModal = () => {
    showLoginModal.value = true;
  };

  const closeLoginModal = () => {
    showLoginModal.value = false;
  };

  // 인증이 필요한 작업을 처리하는 함수
  // authenticatedAction: 인증 후 실행할 콜백 함수
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
