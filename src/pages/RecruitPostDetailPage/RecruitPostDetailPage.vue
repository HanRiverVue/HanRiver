<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getPostDetails } from '@/api/supabase/post';
import { getUserLoggedIn } from '@/api/supabase/auth';
import PostApplyList from './components/PostApplyList.vue';
import PostSideBar from './components/PostSideBar.vue';
import { deleteApplication, postApplication } from '@/api/supabase/apply';
import PostComment from './components/PostComment.vue';

const route = useRoute();
const postId = ref(route.params.postId);
const postDetails = ref(null);
const loading = ref(true);
const error = ref(null);
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

const handleApplyOrCancel = async (postId) => {
  try {
    if (isApplied.value) {
      // 이미 신청한 상태일 경우 신청 취소
      await deleteApplication(postId);
      isApplied.value = false; // 신청 상태를 취소로 변경
      console.log('신청이 취소되었습니다.');
    } else {
      // 신청하지 않은 상태일 경우 신청하기
      await postApplication(postId);
      isApplied.value = true; // 신청 상태로 변경
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

onMounted(async () => {
  try {
    const user = await getUserLoggedIn();
    if (user) {
      currentUserId.value = user.id;
    }
    const postData = await getPostDetails(postId.value);

    if (postData && postData.id) {
      postDetails.value = postData;
      console.log(postDetails.value);
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
    const user = await getUserLoggedIn();
    if (user) {
      currentUserId.value = user.id;
    }

    // 게시물 상세 정보 가져오기
    const postData = await getPostDetails(postId.value);
    if (postData && postData.id) {
      postDetails.value = postData;
      console.log(postDetails.value);
      isAuthor.value = postData.author === currentUserId.value;
      console.log(currentUserId.value);

      // 신청 여부 체크
      const { data: existingApplication } = await supabase
        .from('post_apply_list')
        .select()
        .eq('proposer_id', currentUserId.value) // 현재 로그인한 사용자의 ID와 비교
        .eq('post_id', postId.value)
        .single();

      // 신청한 경우 isApplied를 true로 설정
      isApplied.value = !!existingApplication;
    } else {
      throw new Error('게시글을 불러오는 데 실패했습니다.');
    }
  } catch (err) {
    error.value = err.message || '데이터를 불러오는 데 실패했습니다.';
  } finally {
    loading.value = false;
  }
  console.log(isApplied.value);
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
