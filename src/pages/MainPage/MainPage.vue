<script setup>
import { ref, onMounted } from 'vue';
import mainBanner from '@/assets/images/main_banner.png';
import MainSmallBanner from '@/pages/MainPage/components/MainSmallBanner.vue';
import mainProjectBanner from '@/assets/images/main_project_banner.png';
import mainStudyBanner from '@/assets/images/main_study_banner.png';
import mainServiceBanner from '@/assets/images/main_service_banner.png';
import pencil from '@/assets/images/pencil.png';
import search from '@/assets/images/search.png';
import talk from '@/assets/images/talk.png';
import { getAllPosts } from '@/api/supabase/post';
import { useUserStore } from '@/stores/user';
import SwipeablePostSection from '@/pages/MainPage/components/SwipeablePostSection.vue';

const hotPosts = ref([]);
const deadlinePosts = ref([]);
const newPosts = ref([]);
const isLoading = ref(true);

// 포스트 카드 렌더링 상수
const VISIBLE_POSTS = 4;
const TOTAL_POSTS = 10;

// 포스트 정렬
const sortPosts = {
  hot: (posts) => posts.sort((a, b) => b.likes - a.likes),
  deadline: (posts) =>
    posts.sort((a, b) => new Date(a.applicationDeadline) - new Date(b.applicationDeadline)),
  new: (posts) => posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
};

// 포스트카드 API 호출
const fetchPosts = async () => {
  isLoading.value = true;
  try {
    const data = await getAllPosts();
    if (Array.isArray(data)) {
      // 포스트 데이터 매핑 함수
      const mapPost = (post) => ({
        id: post.id,
        user_id: post.author,
        userImage: post.profile_img_path,
        userName: post.name,
        projectTitle: post.title,
        skills: post.techStacks || [],
        position: post.positions || [],
        applicationDeadline: post.recruit_deadline,
      });

      hotPosts.value = sortPosts.hot(data).slice(0, TOTAL_POSTS).map(mapPost);
      deadlinePosts.value = sortPosts.deadline(data).slice(0, TOTAL_POSTS).map(mapPost);
      newPosts.value = sortPosts.new(data).slice(0, TOTAL_POSTS).map(mapPost);
    } else {
      console.error('게시글을 불러오는데 실패했습니다', data);
    }
  } catch (error) {
    console.error('게시글 로딩 중 오류 발생:', error);
  } finally {
    isLoading.value = false;
  }
};

// 사용자 좋아요 업데이트
const userStore = useUserStore();
onMounted(async () => {
  await userStore.setUserPostLikes();
  console.log('좋아요 업데이트', userStore.userPostLikes);
});

onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <section class="pt-10 mb-20">
    <div class="mb-5"><img :src="mainBanner" alt="mainBanner" /></div>
    <div class="flex flex-wrap gap-5">
      <MainSmallBanner
        to="/PostList/study"
        bgColor="bg-secondary-2"
        bannerCaption="모집 중인 스터디를 찾아보세요"
        :icon="pencil"
        iconAlt="pencilIcon"
        title="스터디 보러가기"
        :bannerImage="mainStudyBanner"
        bannerAlt="mainStudyBanner"
        imagePosition="top-[64px] right-5"
      />
      <MainSmallBanner
        to="/PostList/project"
        bgColor="bg-secondary-1"
        bannerCaption="모집 중인 프로젝트를 찾아보세요"
        :icon="search"
        iconAlt="searchIcon"
        title="프로젝트 보러가기"
        :bannerImage="mainProjectBanner"
        bannerAlt="mainProjectBanner"
        imagePosition="top-[68px] right-5"
      />
      <MainSmallBanner
        to="/service"
        bgColor="bg-primary-5"
        bannerCaption="홍보 중인 서비스를 구경해 보세요"
        :icon="talk"
        iconAlt="talkIcon"
        title="서비스 보러가기"
        :bannerImage="mainServiceBanner"
        bannerAlt="mainServiceBanner"
        imagePosition="top-[41px] right-[26px]"
      />
    </div>
  </section>
  <section class="space-y-8">
    <SwipeablePostSection
      title="Hot 인기있는 프로젝트"
      badgeText="인기있는"
      badgeStatus="success"
      :posts="hotPosts"
      :visiblePosts="VISIBLE_POSTS"
      :isLoading="isLoading"
    />
    <SwipeablePostSection
      title="Now 곧 마감되는 프로젝트"
      badgeText="마감직전"
      badgeStatus="danger"
      :posts="deadlinePosts"
      :visiblePosts="VISIBLE_POSTS"
      :isLoading="isLoading"
    />
    <SwipeablePostSection
      title="New 새로운 프로젝트"
      badgeText="새로운"
      badgeStatus="warning"
      :posts="newPosts"
      :visiblePosts="VISIBLE_POSTS"
      :isLoading="isLoading"
    />
  </section>
</template>
