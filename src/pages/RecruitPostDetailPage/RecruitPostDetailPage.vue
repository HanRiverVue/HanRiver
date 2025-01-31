<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { getPostDetails } from '@/api/supabase/post';
import { getUserLoggedIn } from '@/api/supabase/auth';
import PostApplyList from './components/PostApplyList.vue';
import PostSideBar from './components/PostSideBar.vue';
import { deleteApplication, postApplication } from '@/api/supabase/apply';
import { supabase } from '@/config/supabase';
import PostComment from './components/PostComment.vue';
import like from '@/assets/icons/like.svg';
import likeFill from '@/assets/icons/like_fill.svg';
import bookmark from '@/assets/icons/bookmark.svg';
import bookmarkFill from '@/assets/icons/bookmark_fill.svg';
import { useUserStore } from '@/stores/user';
import {
  getPostLikes,
  getUserBookmarks,
  toggleBookmark,
  toggleLike,
} from '@/api/supabase/like_and_bookmark';

const route = useRoute();
const postId = ref(route.params.postId);
const postDetails = ref(null);
const loading = ref(true);
const error = ref(null);
const currentUserId = ref(null);
const isAuthor = ref(false);
const isApplicantsPage = ref(false);
const isApplied = ref(false);
const userStore = useUserStore();

const userPostLikes = computed(() => userStore.userPostLikes);
const userBookmarks = computed(() => userStore.user?.bookmarks || []);

const isLiked = computed(() => userPostLikes.value.includes(postId.value));
const isBookmarked = computed(() => userBookmarks.value.includes(postId.value));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

// 좋아요 및 북마크 토글
const handleToggleLike = async () => {
  await toggleLike(postId.value);
  userStore.updateLikes(postId.value);
};

const handleToggleBookmark = async () => {
  await toggleBookmark(postId.value);
  userStore.updateBookmarks(postId.value);
};

// 사용자 정보 및 좋아요/북마크 상태 가져오기
onMounted(async () => {
  try {
    const user = await getUserLoggedIn();
    if (user) {
      currentUserId.value = user.id;
    }
    const postData = await getPostDetails(postId.value);

    if (postData && postData.id) {
      postDetails.value = postData;
      isAuthor.value = postData.author === currentUserId.value;
    } else {
      throw new Error('게시글을 불러오는 데 실패했습니다.');
    }

    await Promise.all([userStore.fetchUserInfo(), userStore.setUserPostLikes()]);

    const postLikes = await getPostLikes(postId.value);
    if (postLikes) {
      userStore.updateLikes(postId.value);
    }

    const userBookmarks = await getUserBookmarks();
    if (userBookmarks) {
      userStore.updateBookmarks(postId.value);
    }
  } catch (err) {
    error.value = err.message || '데이터를 불러오는 데 실패했습니다.';
  } finally {
    loading.value = false;
  }
});

// 신청 상태 확인
watchEffect(async () => {
  if (!postId.value || !currentUserId.value) return;

  try {
    const { data, error } = await supabase
      .from('post_apply_list')
      .select('id')
      .eq('proposer_id', currentUserId.value)
      .eq('post_id', postId.value)
      .maybeSingle();

    if (error) throw error;

    isApplied.value = !!data;
  } catch (err) {
    console.error('신청 상태 확인 오류:', err);
  }
});

// 참여 신청/취소 처리
const handleApplyOrCancel = async (postId, selectedPositions) => {
  try {
    if (isApplied.value) {
      await deleteApplication(postId);
      isApplied.value = false;
      console.log('신청이 취소되었습니다.');
    } else {
      await postApplication(postId, selectedPositions);
      isApplied.value = true;
      console.log('신청이 완료되었습니다.');
    }
  } catch (error) {
    console.error('신청 처리 중 오류 발생:', error);
  }
};

// 버튼 클릭 이벤트 정의
const handleViewApplicants = () => {
  isApplicantsPage.value = true;
  console.log('참여 신청자 목록 조회 버튼 클릭');
};

const handleBackToPost = () => {
  isApplicantsPage.value = false;
  console.log('게시물로 돌아가기');
};

const handleCloseRecruitment = async (postId) => {
  try {
    const { data, error } = await supabase
      .from('post') // 테이블 이름을 'post'로 수정
      .update({ finished: true })
      .eq('id', postId)
      .select(); // 업데이트 후 데이터를 반환받기 위해 .select() 추가

    if (error) {
      throw error;
    }

    console.log('Updated Post:', data); // 업데이트된 데이터 출력
  } catch (error) {
    console.error('Error updating post:', error);
  }
};
</script>

<template>
  <div class="container mx-auto p-4 md:p-8 flex flex-col items-start md:flex-row gap-8">
    <!-- 왼쪽 콘텐츠 영역 -->
    <div class="flex-none w-[738px]" v-if="!loading && postDetails">
      <!-- 게시물 헤더 -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-bold">{{ postDetails.title }}</h1>
          <div class="flex items-center gap-4">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-5"
            >
              <button @click="handleToggleLike">
                <img :src="isLiked ? likeFill : like" alt="Like" />
              </button>
            </div>
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-5"
            >
              <button @click="handleToggleBookmark">
                <img :src="isBookmarked ? bookmarkFill : bookmark" alt="Bookmark" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <div
            v-if="postDetails && postDetails.user"
            class="w-10 h-10 rounded-full flex items-center justify-center"
          >
            <img
              v-if="postDetails.user.profile_img_path"
              :src="postDetails.user.profile_img_path"
              alt="User Profile Image"
              class="w-[33px] h-[33px] rounded-full"
            />
          </div>
          <div>
            <p class="font-semibold">
              {{ postDetails.user.name }}<span class="m-2">&middot;</span>
              <span class="text-sm font-normal text-gray-50">{{
                formatDate(postDetails.created_at)
              }}</span>
            </p>
          </div>
        </div>
      </div>

      <hr class="my-5 text-gray-10" />
      <!-- 참여 신청자 목록 조회 -->
      <PostApplyList v-if="isApplicantsPage" />

      <!-- 게시물물 -->
      <div v-if="!isApplicantsPage">
        <!-- 게시물 이미지 -->
        <div class="mb-7 flex justify-center items-center">
          <img :src="postDetails.post_img_path" alt="게시물 이미지" class="w-121 rounded-lg" />
        </div>

        <!-- 게시물 내용 -->
        <div class="mb-8">
          <p
            v-html="postDetails.body"
            class="text-gray-700 leading-relaxed whitespace-pre-wrap"
          ></p>
        </div>
        <hr class="my-10 text-gray-10" />

        <!-- 댓글 작성 및 목록 -->
        <PostComment v-model:error="error" v-model:loading="loading" />
      </div>
    </div>
    <!-- 오른쪽 고정 박스 -->
    <PostSideBar
      :postDetails="postDetails"
      :loading="loading"
      :isAuthor="isAuthor"
      :isApplicantsPage="isApplicantsPage"
      :handleViewApplicants="handleViewApplicants"
      :handleBackToPost="handleBackToPost"
      :handleCloseRecruitment="handleCloseRecruitment"
      :handleApplyOrCancel="handleApplyOrCancel"
      :isApplied="isApplied"
    />
  </div>
</template>
