<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { getPostDetails } from '@/api/supabase/post';
import { addPostComment, getCommentsByPost } from '@/api/supabase/new_comment';
import { getUserLoggedIn } from '@/api/supabase/auth';
import AppButton from '@/components/AppButton.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import PostApplyList from './components/PostApplyList.vue';
import PostSideBar from './components/PostSideBar.vue';
import { deleteApplication, postApplication } from '@/api/supabase/apply';
import { supabase } from '@/config/supabase';

const route = useRoute();
const postId = ref(route.params.postId);
const postDetails = ref(null);
const loading = ref(true);
const error = ref(null);
const comments = ref([]);
const newComment = ref('');
const currentUserId = ref(null);
const isAuthor = ref(false);
const isApplicantsPage = ref(false);
const isApplied = ref(false);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

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

const handleCloseRecruitment = () => {
  console.log('모집 마감하기 버튼 클릭');
};

// 드롭다운 항목 정의
const dropdownItems = [
  { label: '댓글 수정하기', action: () => console.log('댓글 수정하기') },
  { label: '댓글 삭제하기', action: () => console.log('댓글 삭제하기') },
];

// 드롭다운 상태 토글 함수
const toggleDropdown = (commentId) => {
  comments.value.forEach((comment) => {
    if (comment.id !== commentId) {
      comment.isDropdownOpen = false;
    }
  });

  const comment = comments.value.find((c) => c.id === commentId);
  if (comment) {
    comment.isDropdownOpen = !comment.isDropdownOpen;
  }
};

// 드롭다운 외부 클릭 감지 함수
const handleClickOutside = (event) => {
  const dropdownElements = document.querySelectorAll('.dropdown');
  const isClickInside = Array.from(dropdownElements).some((el) => el.contains(event.target));

  if (!isClickInside) {
    comments.value = comments.value.map((comment) => ({
      ...comment,
      isDropdownOpen: false,
    }));
  }
};

// 댓글 등록 처리
const handleSubmitComment = async () => {
  try {
    if (!newComment.value.trim()) {
      console.warn('댓글 내용이 비어있습니다.');
      return;
    }

    // 댓글 등록 요청
    const result = await addPostComment(postId.value, newComment.value);
    console.log('댓글 등록 성공:', result);

    // 댓글 입력란 초기화
    newComment.value = '';

    // 추가적으로 댓글 목록 갱신 로직 (필요시)
    const updatedComments = await getCommentsByPost(postId.value);
    comments.value = updatedComments.map((comment) => ({
      ...comment,
      isDropdownOpen: false,
    }));
  } catch (error) {
    console.error('댓글 등록 실패:', error);
  }
};

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
  } catch (err) {
    // 에러 메시지 처리
    error.value = err.message || '데이터를 불러오는 데 실패했습니다.';
  } finally {
    loading.value = false;
  }
});

onMounted(async () => {
  try {
    // postId 유효성 검사
    if (!postId.value) {
      throw new Error('유효하지 않은 postId입니다.');
    }

    // 댓글 데이터 가져오기
    const commentData = await getCommentsByPost(postId.value);

    // 댓글 데이터 가공
    comments.value = commentData.map((comment) => ({
      ...comment,
      isDropdownOpen: false,
    }));
  } catch (err) {
    console.error(err);
    error.value = '댓글을 불러오는 데 실패했습니다.';
  } finally {
    loading.value = false;
  }
});

watchEffect(async () => {
  if (!postId.value || !currentUserId.value) return; // postId 또는 currentUserId가 없으면 실행 X

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

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="container mx-auto p-4 md:p-8 flex flex-col items-start md:flex-row gap-8">
    <!-- 왼쪽 콘텐츠 영역 -->
    <div class="flex-none w-[738px]" v-if="!loading && postDetails">
      <!-- 게시물 헤더 -->
      <div>
        <!-- <button @click="toggleLike" :class="liked ? 'bg-blue-500' : 'bg-gray-300'">
          {{ liked ? '좋아요 취소' : '좋아요' }}
        </button> -->
      </div>
      <div class="mb-8">
        <h1 class="text-2xl font-bold mb-4">{{ postDetails.title }}</h1>
        <div class="flex justify-between items-center">
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
          <div class="flex gap-4">
            <!-- <CheeringSvg />
            <BookmarkSvg /> -->
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
        <div class="space-y-6">
          <!-- 댓글 작성 영역 -->
          <div class="flex flex-col items-start gap-2">
            <div class="flex-1 font-bold">
              <span class="text-base text-gray-80">{{ comments.length }}개의 댓글</span>
            </div>
            <div class="w-full">
              <textarea
                v-model="newComment"
                placeholder="댓글을 입력해주세요"
                class="text-sm w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-4"
                rows="3"
                maxlength="100"
              ></textarea>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500 mb-10">{{ newComment.length }}/100</span>
                <div class="flex justify-end mb-8">
                  <AppButton
                    text="댓글 등록"
                    type="primary"
                    class="w-[72px] h-[28px]"
                    @click="handleSubmitComment"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 댓글 목록 -->
          <div class="space-y-6">
            <div
              v-for="(comment, index) in comments"
              :key="comment.id"
              class="grid grid-cols-[auto,1fr,auto] gap-4"
            >
              <!-- 유저 프로필 및 닉네임 -->
              <div class="flex items-center col-start-1 col-span-3">
                <img
                  :src="comment.commenter_image_path"
                  alt="프로필 이미지"
                  class="w-10 h-10 rounded-full object-cover mr-4"
                />
                <div>
                  <p class="font-semibold text-gray-800">{{ comment.commenter_name }}</p>
                  <p class="text-sm text-gray-500">{{ formatDate(comment.created_at) }}</p>
                </div>
              </div>

              <!-- 댓글 내용 -->
              <div class="col-start-1 col-span-3">
                <p class="text-gray-700">{{ comment.content }}</p>
              </div>

              <!-- 구분선 -->
              <template v-if="index < comments.length - 1">
                <hr class="border-t border-gray-300 w-full col-span-3" />
              </template>
            </div>
          </div>
        </div>
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
