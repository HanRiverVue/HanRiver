<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { getPostDetails } from '@/api/supabase/post';
import { getPostComments } from '@/api/supabase/comment';
import { postCreateComment } from '@/api/supabase/comment_editor';
import { getUserLoggedIn } from '@/api/supabase/auth';
import { deleteApplication, postApplication, getMyApplicationsList } from '@/api/supabase/apply';
import AppButton from '@/components/AppButton.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import PostApplyList from './components/PostApplyList.vue';

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

// 버튼 클릭 이벤트 정의
const handleViewApplicants = () => {
  isApplicantsPage.value = true;
  console.log('참여 신청자 목록 조회 버튼 클릭');
  // 실제 참여자 목록을 조회하는 로직 추가
};

const handleBackToPost = () => {
  isApplicantsPage.value = false;
  console.log('게시물로 돌아가기');
};

const handleCloseRecruitment = () => {
  console.log('모집 마감하기 버튼 클릭');
  // 모집 마감 로직 추가
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
    const requestObj = {
      post_id: postId,
      content: newComment.value,
    };
    const result = await postCreateComment(requestObj);
    console.log('댓글 등록 성공:', result);
    newComment.value = '';
  } catch (error) {
    console.error('댓글 등록 실패:', error);
  }
};

// Props 정의
const props = defineProps({
  postId: String,
  postTitle: String,
  hostId: String,
});

// 신청 상태 확인
const checkIfApplied = async () => {
  try {
    const response = await getMyApplicationsList(props.postId, props.hostId);
    isApplied.value = response.isApplied;
  } catch (error) {
    console.error('신청 상태 확인 중 오류 발생:', error);
  }
};

// 신청/취소 처리 핸들러
const handleApplyOrCancel = async () => {
  if (isApplied.value) {
    // 신청 취소
    await deleteApplication(props.postId);
  } else {
    // 신청
    await postApplication(props.postId, props.postTitle, props.hostId);
  }
  // 신청 상태를 갱신
  isApplied.value = !isApplied.value;
};

// 컴포넌트가 로드될 때 신청 여부를 확인
onMounted(() => {
  checkIfApplied();
});

onMounted(async () => {
  try {
    // 현재 로그인된 사용자 정보 가져오기
    const user = await getUserLoggedIn();
    if (user) {
      currentUserId.value = user.id;
    }

    // 게시글 데이터 불러오기
    const postData = await getPostDetails(postId);

    // 게시글 데이터가 유효한지 확인
    if (postData && postData.id) {
      postDetails.value = postData;
      // 작성자 여부 확인
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
    const commentData = await getPostComments(postId);
    comments.value = commentData.map((comment) => ({
      ...comment,
      isDropdownOpen: false,
    }));
  } catch (err) {
    error.value = '댓글을 불러오는 데 실패했습니다.';
  } finally {
    loading.value = false;
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
  <div class="container mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
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
            <div class="w-10 h-10 rounded-full flex items-center justify-center">
              <img
                src="@/assets/images/default_user_img.png"
                alt="Default User"
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
          <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ postDetails.body }}</p>
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
              <!-- 댓글 내용 -->
              <div class="col-start-1 col-span-3 row-start-2">
                <p class="text-gray-700">{{ comment.content }}</p>
              </div>
              <hr
                v-if="index < comments.length - 1"
                class="border-t border-gray-300 w-full col-span-3"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 구분선 -->
      <hr v-if="index < comments.length - 1" class="border-t border-gray-300 w-full col-span-3" />
    </div>

    <!-- 오른쪽 고정 박스 -->
    <div
      :class="{
        'h-[368px]': isAuthor,
        'h-[312px]': !isAuthor,
      }"
      class="w-full md:w-[350px] bg-secondary-3 rounded-lg shadow-lg p-4 sticky top-[80px] md:shrink-0"
    >
      <div v-if="loading">
        <p>로딩 중...</p>
      </div>
      <div v-else-if="postDetails" class="flex-1">
        <div class="p-4 relative">
          <ul class="space-y-2 text-gray-80 text-xs">
            <li class="grid grid-cols-[120px_1fr]">
              <strong class="font-semibold">모집 인원</strong>
              <span> {{ postDetails.recruit_count }}명 </span>
            </li>
            <li class="grid grid-cols-[120px_1fr]">
              <strong class="font-semibold">진행 기간</strong>
              <span> {{ postDetails.start_date }} ~ {{ postDetails.end_date }} </span>
            </li>
            <li class="grid grid-cols-[120px_1fr]">
              <strong class="font-semibold">모집 마감일</strong>
              <span>
                {{ postDetails.recruit_deadline }}
              </span>
            </li>
            <li class="grid grid-cols-[120px_1fr]">
              <strong class="font-semibold">포지션</strong>
              <span v-if="postDetails && postDetails.techStack">
                {{ postDetails.position.join(', ') }}
              </span>
            </li>
            <li class="grid grid-cols-[120px_1fr]">
              <strong class="font-semibold">스킬</strong>
              <span v-if="postDetails && postDetails.techStack">
                {{ postDetails.techStack.join(', ') }}
              </span>
            </li>
            <li class="grid grid-cols-[120px_1fr]">
              <strong class="font-semibold">모집 지역</strong>
              <span> {{ postDetails.recruit_area }}</span>
            </li>
            <li class="grid grid-cols-[120px_1fr]">
              <strong class="font-semibold">진행 방식</strong>
              <span> {{ postDetails.on_offline }}</span>
            </li>
            <li class="grid grid-cols-[120px_1fr]">
              <strong class="font-semibold">연락 방법</strong>
              <span>{{ postDetails.call_method }} | {{ postDetails.call_link }}</span>
            </li>
          </ul>
          <div>
            <template v-if="isAuthor">
              <div class="flex flex-col">
                <AppButton
                  v-if="!isApplicantsPage"
                  text="참여 신청자 목록 조회"
                  type="primary"
                  class="w-[294px] h-11 mt-6"
                  @click="handleViewApplicants"
                />
                <AppButton
                  v-else
                  text="게시물로 돌아가기"
                  type="primary"
                  class="w-[294px] h-11 mt-6"
                  @click="handleBackToPost"
                />
                <AppButton
                  text="모집 마감하기"
                  type="secondary"
                  class="w-[294px] h-11 mt-3"
                  @click="handleCloseRecruitment"
                />
              </div>
            </template>
            <template v-else>
              <AppButton
                :text="isApplied ? '신청 취소' : '참여 신청'"
                :type="isApplied ? 'secondary' : 'primary'"
                class="w-[294px] h-11 mt-6"
                @click="handleApplyOrCancel"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
