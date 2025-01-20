import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ErrorPage from '@/pages/ErrorPage.vue';
import MainLayout from '@/layout/MainLayout.vue';
import Test from '@/pages/test_api_page_hw/Test.vue';

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
          meta: { showFooter: true },
        },
        {
          path: 'MyPage',
          name: 'MyPage',
          component: () => import('@/pages/MyPage.vue'),
        },
        {
          path: 'EditProfile',
          name: 'EditProfilePage',
          component: () => import('@/pages/EditProfilePage.vue'),
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
        },
        {
          path: 'RecruitPostDetail',
          name: 'RecruitPostDetailPage',
          component: () => import('@/pages/RecruitPostDetailPage.vue'),
        },
        {
          path: 'PostList',
          name: 'PostListPage',
          component: () => import('@/pages/PostListPage.vue'),
          meta: { showFooter: true },
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
