import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ErrorPage from '@/pages/ErrorPage.vue';
import MainLayout from '@/layout/MainLayout.vue';

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
          component: MainPage,
          meta: { showFooter: true, showScrollTop: true },
        },
        {
          path: 'MyPage',
          name: 'MyPage',
          component: () => import('@/pages/Mypage/MyPage.vue'),
          meta: { bg_color: 'bg-secondary-2' },
        },
        {
          path: 'EditProfile',
          name: 'EditProfilePage',
          component: () => import('@/pages/EditProfilePage/EditProfilePage.vue'),
          meta: { showScrollTop: true, bg_color: 'bg-secondary-3' },
        },
        {
          path: 'UserPage',
          name: 'UserPage',
          component: () => import('@/pages/UserPage.vue'),
        },
        {
          path: 'EditRecruitPost',
          name: 'EditRecruitPostPage',
          component: () => import('@/pages/EditRecruitPostPage.vue'),
          meta: { showScrollTop: true },
        },
        {
          path: 'RecruitPostDetail',
          name: 'RecruitPostDetailPage',
          component: () => import('@/pages/RecruitPostDetailPage.vue'),
          meta: { showScrollTop: true },
        },
        {
          path: 'PostList/:type',
          name: 'PostListPage',
          component: () => import('@/pages/PostListPage.vue'),
          meta: { showFooter: true },
        },
        {
          path: 'service',
          name: 'servicePage',
          component: () => import('@/pages/ServicePage.vue'),
        },
      ],
    },
    {
      path: '/OnBoard',
      name: 'OnBoardPage',
      component: () => import('@/pages/OnboardPage.vue'),
    },
    {
      path: '/test',
      name: 'testage',
      component: () => import('@/pages/test_api_page_hw/LoginAndUserTest.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'ErrorPage',
      component: ErrorPage,
    },
  ],
});

export default router;
