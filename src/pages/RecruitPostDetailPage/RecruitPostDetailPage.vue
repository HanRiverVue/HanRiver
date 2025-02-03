<script setup>
import { ref, computed, onMounted, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPostDetails } from '@/api/supabase/post';
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
import { getLikeCount, toggleBookmark, toggleLike } from '@/api/supabase/like_and_bookmark';
import { getUserInfoToUserId } from '@/api/supabase/user';
import { deletePost } from '@/api/supabase/post_editor';
import { useBaseModalStore } from '@/stores/baseModal';
import { errorToast, warningToast } from '@/utils/toast';
import { useLoginModalStore } from '@/stores/loginModal';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const postId = ref(Number(route.params.postId));
const postDetails = ref(null);
const loading = ref(true);
const error = ref(null);
const currentUserId = ref(null);
const isAuthor = ref(false);
const isApplicantsPage = ref(false);
const isApplied = ref(false);
const userStore = useUserStore();
const likeCount = ref(0);
const baseModal = useBaseModalStore();

const { user, isLoggedIn, userPostLikes } = storeToRefs(userStore);

const loginModalStore = useLoginModalStore();

const authorInfo = ref(null);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

const formatList = (arr) => {
  if (!arr || arr.length === 0) return '없음';
  return arr.length > 2 ? `${arr.slice(0, 2).join(', ')} 외 ${arr.length - 2}개` : arr.join(', ');
};

// 좋아요 및 북마크 상태 결정
const isLiked = computed(() => {
  // userPostLikes가 변화할 때마다 상태를 재계산하도록 하기
  return userPostLikes.value?.includes(postId.value) ?? false;
});
const isBookmarked = computed(() => {
  // user의 bookmarks가 변화할 때마다 상태를 재계산하도록 하기
  return user.value?.bookmarks?.includes(postId.value) ?? false;
});

// 좋아요 토글
const handleToggleLike = async (event) => {
  event.preventDefault();
  if (!isLoggedIn.value) {
    loginModalStore.setLoginModal(true);
    return;
  }
  try {
    const result = await toggleLike(postId.value);

    if (result !== null) {
      // 상태 갱신 후 userStore 업데이트
      userStore.updateLikes(postId.value);
    }
    if (isLiked.value) likeCount.value++;
    else likeCount.value--;
  } catch (error) {
    console.error('Error toggling like:', error);
  }
};

// 북마크 토글
const handleToggleBookmark = async (event) => {
  event.preventDefault();
  if (!isLoggedIn.value) {
    loginModalStore.setLoginModal(true);
    return;
  }
  try {
    const result = await toggleBookmark(postId.value);
    if (result !== null) {
      // 상태 갱신 후 userStore 업데이트
      userStore.updateBookmarks(postId.value);
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
  }
};

const fetchPostData = async () => {
  try {
    loading.value = true;
    const postData = await getPostDetails(postId.value);
    if (postData && postData.id) {
      postDetails.value = postData;
      const userInfo = await getUserInfoToUserId(postData.author);
      if (userInfo) {
        authorInfo.value = userInfo;
      }
    } else {
      throw new Error('게시글을 불러오는 데 실패했습니다.');
    }
  } catch (err) {
    console.error('Error fetching post data:', err);
    error.value = err.message || '데이터를 불러오는 데 실패했습니다.';
  } finally {
    loading.value = false;
  }
};
onMounted(async () => {
  userStore.setUserPostLikes();
  fetchPostData();
  likeCount.value = await getLikeCount(postId.value);
});

// postId가 변경될 때 실행
watch(
  () => route.params.postId,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      postId.value = Number(newVal);
      fetchPostData();
    }
  },
  { immediate: true },
);

watchEffect(() => {
  if (postDetails.value && user.value) {
    isAuthor.value = postDetails.value.author === user.value.user_id;
  }
});

// 신청 상태 확인
watch(
  [postId, currentUserId],
  async ([newPostId, newUserId]) => {
    if (!newPostId || !newUserId) return;

    try {
      const { data, error } = await supabase
        .from('post_apply_list')
        .select('id')
        .eq('proposer_id', newUserId)
        .eq('post_id', newPostId)
        .maybeSingle();

      if (error) throw error;

      isApplied.value = !!data;
    } catch (err) {
      console.error('신청 상태 확인 오류:', err);
    }
  },
  { immediate: true },
);

// 게시물 삭제
const handleDeletePost = async () => {
  try {
    await deletePost(postId.value);
    warningToast('게시물을 삭제했습니다.');
    router.push(`/`);
  } catch (error) {
    errorToast('게시글 삭제에 실패했습니다.');
    console.error('게시글 삭제 오류:', error);
  }
};

const openDeleteModal = () => {
  baseModal.showModal({
    title: '게시글 삭제 확인',
    message: '정말 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.',
    confirmText: '삭제',
    cancelText: '취소',
    onConfirm: async () => {
      await handleDeletePost();
    },
  });
};

// 참여 신청/취소 처리
const handleApplyOrCancel = async (postId, selectedPositions) => {
  try {
    if (isApplied.value) {
      await deleteApplication(postId);
      isApplied.value = false;
    } else {
      await postApplication(postId, selectedPositions);
      isApplied.value = true;
    }
  } catch (error) {
    console.error('신청 처리 중 오류 발생:', error);
  }
};

// 버튼 클릭 이벤트 정의
const handleViewApplicants = () => {
  isApplicantsPage.value = true;
};

const handleBackToPost = () => {
  isApplicantsPage.value = false;
};

const handleCloseRecruitment = async (postId) => {
  try {
    const { error } = await supabase
      .from('post')
      .update({ finished: true })
      .eq('id', postId)
      .select();
    if (error) {
      throw error;
    }
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
          <div class="flex items-center gap-4" v-if="isAuthor">
            <!-- 수정 버튼 -->
            <button @click="router.push(`/ModifyRecruitPost/${postId}`)" class="">수정</button>
            <!-- 삭제 버튼 -->
            <button @click="openDeleteModal" class="">삭제</button>
          </div>
        </div>

        <div class="flex items-center justify-between gap-2">
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
              <p class="body-b">
                {{ postDetails.user.name }}<span class="m-2">&middot;</span>
                <span class="caption-r">{{ formatDate(postDetails.created_at) }}</span>
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center border hover:bg-gray-5"
            >
              <button @click="handleToggleLike">
                <img :src="isLiked ? likeFill : like" alt="Like" />
              </button>
            </div>
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center border hover:bg-gray-5"
            >
              <button @click="handleToggleBookmark">
                <img :src="isBookmarked ? bookmarkFill : bookmark" alt="Bookmark" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex gap-4 caption-r">
          <p>
            <span class="text-gray-50">포지션 | </span>
            <span class="text-gray-80">
              {{
                authorInfo?.positions?.length
                  ? formatList(authorInfo.positions.map((p) => p.position))
                  : '없음'
              }}
            </span>
          </p>
          <p>
            <span class="text-gray-50">스킬 | </span>
            <span class="text-gray-80">
              {{
                authorInfo.positions
                  ? formatList(authorInfo.positions.flatMap((p) => p.stacks))
                  : '없음'
              }}
            </span>
          </p>
          <p class="text-gray-500">
            <span class="text-gray-50">응원해요! : </span>
            <span class="text-gray-80">{{ likeCount }}</span>
          </p>
        </div>
      </div>

      <hr class="my-5 text-gray-10" />
      <!-- 참여 신청자 목록 조회 -->
      <PostApplyList :postDetails="postDetails" v-if="isApplicantsPage" />

      <!-- 게시물물 -->
      <div v-if="!isApplicantsPage">
        <!-- 게시물 이미지 -->
        <div class="mb-7 flex justify-center items-center">
          <img
            v-if="postDetails.post_img_path"
            :src="postDetails.post_img_path.replace(/%/g, '')"
            alt="게시물 이미지"
            class="w-121 rounded-lg"
          />
        </div>

        <!-- 게시물 내용 -->
        <div class="mb-8">
          <p
            v-html="postDetails.body"
            class="leading-relaxed text-gray-700 whitespace-pre-wrap"
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
