import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage/MainPage.vue';
import ErrorPage from '@/pages/ErrorPage.vue';
import MainLayout from '@/layout/MainLayout.vue';
import { supabase } from '@/config/supabase';
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
    },
    {
      path: '/test',
      name: 'testage',
      component: () => import('@/pages/test_api_page_hw/LoginAndUserTest.vue'),
    },
    {
      path: '/testhw',
      name: 'testhw',
      component: () => import('@/pages/test_api_page_hw/Post.vue'),
    },
  ],
});

// 로그인 페이지 이동제어
router.beforeEach(async (to, from, next) => {
  // const isAuthenticated = await getSession();
  //console.log(isAuthenticated);
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
