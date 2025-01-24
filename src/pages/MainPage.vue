<script setup>
import PostcardUserImage from '@/assets/images/postcard_user_image.png';
import mainBanner from '@/assets/images/main_banner.png';
import mainProjectBanner from '@/assets/images/main_project_banner.png';
import mainStudyBanner from '@/assets/images/main_study_banner.png';
import mainServiceBanner from '@/assets/images/main_service_banner.png';
import pencil from '@/assets/images/pencil.png';
import search from '@/assets/images/search.png';
import talk from '@/assets/images/talk.png';
import MainSmallBanner from '@/components/MainSmallBanner.vue';
import { ref, onMounted, computed } from 'vue';
import { getAllPosts } from '@/api/supabase/post';
import { getLikedPostsHandle, toggleLikeHandle } from '@/api/supabase/like';
import { getBookmarkedPostsHandle, toggleBookmarkHandle } from '@/api/supabase/bookmark';
import PostSection from '@/components/PostSection.vue';
import { useAuthAction } from '@/utils/useAuthAction';
import { useLoginModalStore } from '@/stores/loginModal';
import LoginModal from '@/components/LoginModal.vue';
import { storeToRefs } from 'pinia';

// 반응형 상태 변수
const hotPosts = ref([]);
const deadlinePosts = ref([]);
const newPosts = ref([]);
const isLoading = ref(true);
const likedPosts = ref(new Set());
const bookmarkedPosts = ref(new Set());

// 로그인 모달
const loginModalStore = useLoginModalStore();
const { loginModal } = storeToRefs(loginModalStore);
const { setLoginModal } = loginModalStore;

// 인증 관련 액션 및 상태 가져오기
const { showLoginModal, closeLoginModal, handleAuthAction, isAuthenticated } = useAuthAction();

// isAuthenticated를 computed 속성으로 변경
const isUserAuthenticated = computed(() => isAuthenticated.value);

console.log('MainPage - isUserAuthenticated:', isUserAuthenticated.value);

// API에서 받아온 데이터 매핑
const mapPostData = (post) => ({
  id: post.id,
  userImage: post.user_image || PostcardUserImage,
  userName: post.name,
  projectTitle: post.title,
  skills: post.techStacks || [],
  position: post.positions,
  applicationDeadline: post.recruit_deadline,
});

// 정렬 함수
const sortPosts = {
  hot: (posts) => posts.sort((a, b) => b.likes - a.likes),
  deadline: (posts) =>
    posts.sort((a, b) => new Date(a.applicationDeadline) - new Date(b.applicationDeadline)),
  new: (posts) => posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
};

// 포스트카드 불러오는 API 함수
const fetchPosts = async () => {
  isLoading.value = true;
  try {
    const data = await getAllPosts();
    console.log('데이터', data);
    if (Array.isArray(data)) {
      const mappedData = data.map(mapPostData);
      hotPosts.value = sortPosts.hot(mappedData).slice(0, 4);
      deadlinePosts.value = sortPosts.deadline(mappedData).slice(0, 4);
      newPosts.value = sortPosts.new(mappedData).slice(0, 4);
    } else {
      console.error('게시글을 불러오는데 실패했습니다', data);
    }
  } catch (error) {
    console.error('게시글 로딩 중 오류 발생:', error);
  } finally {
    isLoading.value = false;
  }
};

// 사용자가 좋아요하거나 북마크한 게시물 목록을 가져오는 함수
const fetchLikedAndBookmarkedPosts = async () => {
  const likedPostsData = await getLikedPostsHandle();
  const bookmarkedPostsData = await getBookmarkedPostsHandle();
  likedPosts.value = new Set(likedPostsData);
  bookmarkedPosts.value = new Set(bookmarkedPostsData);
};

const handleToggleLike = async (postId) => {
  if (isUserAuthenticated.value) {
    await toggleLikeHandle(postId);
    await fetchLikedAndBookmarkedPosts();
    // 여기서 해당 포스트의 좋아요 상태를 직접 업데이트
    const hotPostIndex = hotPosts.value.findIndex((post) => post.id === postId);
    if (hotPostIndex !== -1) {
      hotPosts.value[hotPostIndex].isLiked = !hotPosts.value[hotPostIndex].isLiked;
    }
    const nowPostIndex = hotPosts.value.findIndex((post) => post.id === postId);
    if (nowPostIndex !== -1) {
      hotPosts.value[nowPostIndex].isLiked = !hotPosts.value[nowPostIndex].isLiked;
    }
    const newPostIndex = hotPosts.value.findIndex((post) => post.id === postId);
    if (newPostIndex !== -1) {
      hotPosts.value[newPostIndex].isLiked = !hotPosts.value[newPostIndex].isLiked;
    }
  } else {
    setLoginModal(true);
  }
};

const handleToggleBookmark = async (postId) => {
  if (isUserAuthenticated.value) {
    await toggleBookmarkHandle(postId);
    await fetchLikedAndBookmarkedPosts();
    // 여기서 해당 포스트의 북마크 상태를 직접 업데이트
    const hotPostIndex = hotPosts.value.findIndex((post) => post.id === postId);
    if (hotPostIndex !== -1) {
      hotPosts.value[hotPostIndex].isBookmarked = !hotPosts.value[hotPostIndex].isBookmarked;
    }
    const nowPostIndex = newPosts.value.findIndex((post) => post.id === postId);
    if (nowPostIndex !== -1) {
      newPosts.value[nowPostIndex].isBookmarked = !newPosts.value[nowPostIndex].isBookmarked;
    }
    const newPostIndex = newPosts.value.findIndex((post) => post.id === postId);
    if (newPostIndex !== -1) {
      newPosts.value[newPostIndex].isBookmarked = !newPosts.value[newPostIndex].isBookmarked;
    }
  } else {
    setLoginModal(true);
  }
};

const handleOpenLoginModal = () => {
  showLoginModal.value = true;
};

onMounted(async () => {
  await fetchPosts();
  await fetchLikedAndBookmarkedPosts();
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
  <section>
    <PostSection
      title="Hot 인기있는 프로젝트"
      badgeText="인기있는"
      badgeStatus="success"
      :posts="hotPosts"
      :likedPosts="likedPosts"
      :bookmarkedPosts="bookmarkedPosts"
      :isAuthenticated="isUserAuthenticated"
      @toggleLike="handleToggleLike"
      @toggleBookmark="handleToggleBookmark"
      @openLoginModal="handleOpenLoginModal"
    />
    <PostSection
      title="Now 곧 마감되는 프로젝트"
      badgeText="마감직전"
      badgeStatus="danger"
      :posts="deadlinePosts"
      :likedPosts="likedPosts"
      :bookmarkedPosts="bookmarkedPosts"
      :isAuthenticated="isUserAuthenticated"
      @toggleLike="handleToggleLike"
      @toggleBookmark="handleToggleBookmark"
      @openLoginModal="handleOpenLoginModal"
    />
    <PostSection
      title="New 새로운 프로젝트"
      badgeText="새로운"
      badgeStatus="warning"
      :posts="newPosts"
      :likedPosts="likedPosts"
      :bookmarkedPosts="bookmarkedPosts"
      :isAuthenticated="isUserAuthenticated"
      @toggleLike="handleToggleLike"
      @toggleBookmark="handleToggleBookmark"
      @openLoginModal="handleOpenLoginModal"
    />
  </section>
  <LoginModal v-if="loginModal" @close="setLoginModal(false)" />
</template>
