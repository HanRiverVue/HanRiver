import { createRouter, createWebHistory } from 'vue-router';
import ErrorPage from '@/pages/ErrorPage.vue';
import MainLayout from '@/layout/MainLayout.vue';
import { supabase } from '@/config/supabase';
import { isUserPostAuthor } from '@/api/supabase/post_editor';
import { signOut } from '@/api/supabase/auth';
import { storeToRefs } from 'pinia';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'MainPage',
          component: () => import('@/pages/MainPage/MainPage.vue'),
          meta: { showFooter: true, showScrollTop: true },
        },
        {
          path: 'MyPage',
          name: 'MyPage',
          component: () => import('@/pages/Mypage/MyPage.vue'),
          meta: { bg_color: 'bg-secondary-2', requiredAuth: true },
        },
        {
          path: 'EditProfile',
          name: 'EditProfilePage',
          component: () => import('@/pages/EditProfilePage/EditProfilePage.vue'),
          meta: { showScrollTop: true, bg_color: 'bg-secondary-3', requiredAuth: true },
        },
        {
          path: 'UserPage/:userId',
          name: 'UserPage',
          component: () => import('@/pages/UserPage/UserPage.vue'),
        },
        {
          path: 'EditRecruitPost',
          name: 'EditRecruitPostPage',
          component: () => import('@/pages/EditRecruitPostPage/EditRecruitPostPage.vue'),
          meta: { showScrollTop: true, bg_color: 'bg-secondary-3', requiredAuth: true },
        },
        {
          path: 'ModifyRecruitPost/:postId',
          name: 'ModifyRecruitPostPage',
          component: () => import('@/pages/EditRecruitPostPage/EditRecruitPostPage.vue'),
          meta: { showScrollTop: true, bg_color: 'bg-secondary-3', requiredAuth: true },
          beforeEnter: async (to, from, next) => {
            const author = await isUserPostAuthor(to.params.postId);
            if (author) {
              next();
            } else {
              console.log(author);
              alert('글 작성자가 아닙니다.');
              next(from.path);
            }
          },
        },
        {
          path: 'RecruitPostDetail/:postId',
          name: 'RecruitPostDetailPage',
          component: () => import('@/pages/RecruitPostDetailPage/RecruitPostDetailPage.vue'),
          meta: { showScrollTop: true },
        },
        {
          path: 'PostList/:type',
          name: 'PostListPage',
          component: () => import('@/pages/PostListPage/PostListPage.vue'),
          meta: { showFooter: true, bg_color: 'bg-secondary-2' },
        },
        {
          path: 'service',
          name: 'servicePage',
          component: () => import('@/pages/ServicePage.vue'),
        },

        {
          path: '/:pathMatch(.*)*',
          name: 'ErrorPage',
          component: ErrorPage,
        },
      ],
    },
    {
      path: '/OnBoard',
      name: 'OnBoardPage',
      component: () => import('@/pages/OnboardPage/OnboardPage.vue'),
      meta: { requiredAuth: true },
    },
  ],
});

// 로그인 페이지 이동제어
router.beforeEach(async (to, from, next) => {
  // 온보딩이 완료된 사용자는 접근 차단
  const { useUserStore } = await import('@/stores/user');
  const userStore = useUserStore();
  const { user, isLoggedIn } = storeToRefs(userStore);
  await userStore.checkLoginStatus(); // 로그인 상태 확인
  if (isLoggedIn.value) {
    await userStore.fetchUserInfo();
  }
  console.log('index', isLoggedIn.value, user.value);
  if (to.path === '/Onboard' && isLoggedIn.value && user.value) {
    alert('이미 온보딩을 완료한 사용자입니다.');
    next('/');
    return;
  }
  console.log(to.path);

  // 온보딩 이탈
  if (sessionStorage.getItem('to') === '/Onboard') {
    console.log('onboard out');
    await signOut();
    const userStore = useUserStore();
    userStore.isLoggedIn = null;
    sessionStorage.removeItem('to');
    next();
    return;
  }

  if (to.meta?.requiredAuth) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert('로그인이 필요합니다.');
      next(from.path);
      return;
    }
  }
  next();
});

export default router;
