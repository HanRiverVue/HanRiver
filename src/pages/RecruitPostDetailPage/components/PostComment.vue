<script setup>
import { addPostComment, getCommentsByPost } from '@/api/supabase/new_comment';
import AppButton from '@/components/AppButton.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  error: String,
  loading: Boolean,
});
const emit = defineEmits(['update:error', 'update:loading']);

const localError = computed({
  get() {
    return props.error;
  },
  set(value) {
    emit('update:error', value);
  },
});

const localLoading = computed({
  get() {
    return props.loading;
  },
  set(value) {
    emit('update:loading', value);
  },
});

const route = useRoute();
const postId = ref(route.params.postId);
const newComment = ref('');
const comments = reactive([]);

// 댓글 드롭다운 항목 정의
const dropdownItems = [
  { label: '댓글 수정하기', action: () => console.log('댓글 수정하기') },
  { label: '댓글 삭제하기', action: () => console.log('댓글 삭제하기') },
];

// 댓글 드롭다운 상태 토글 함수
const toggleDropdown = (comment) => {
  comment.isDropdownOpen = !comment.isDropdownOpen;
  // comments.value.forEach((comment) => {
  //   if (comment.comment_id !== commentId) {
  //     comment.isDropdownOpen = false;
  //   }
  // });
  // const commentIdx = comments.value.findIndex((c) => c.comment_id === commentId);
  // if (commentIdx !== -1) {
  //   comments.value[commentIdx].isDropdownOpen = !comments.value[commentIdx].isDropdownOpen;
  // }
  // console.log(comments.value);
};
watch(
  () => comments,
  (newVal) => {
    console.log('comments updated:', newVal);
  },
  { deep: true },
);

// 댓글 드롭다운 외부 클릭 감지 함수
const handleClickOutside = (event) => {
  const dropdownElements = document.querySelectorAll('.dropdown');
  const isClickInside = Array.from(dropdownElements).some((el) => el.contains(event.target));

  if (!isClickInside) {
    comments.map((comment) => ({
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

    // 댓글 추가정보 갱신 로직
    comments.unshift({ ...result[0], isDropdownOpen: false });
  } catch (error) {
    console.error('댓글 등록 실패:', error);
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

onMounted(async () => {
  try {
    // postId 유효성 검사
    if (!postId.value) {
      throw new Error('유효하지 않은 postId입니다.');
    }

    // 댓글 데이터 가져오기
    const commentData = await getCommentsByPost(postId.value);

    //comments 배열 초기화
    comments.length = 0;
    // 댓글 데이터 가공
    commentData.forEach((comment) => {
      comments.push({ ...comment, isDropdownOpen: false });
    });
  } catch (err) {
    console.error(err);
    localError.value = '댓글을 불러오는 데 실패했습니다.';
  } finally {
    localLoading.value = false;
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
      <div v-for="(comment, index) in comments" :key="comment.id" class="flex flex-col gap-4">
        <!-- 유저 프로필 및 닉네임 -->
        <div class="flex items-center justify-between">
          <div class="flex">
            <img
              :src="comment.commenter_image_path"
              alt="프로필 이미지"
              class="w-10 h-10 rounded-full object-cover mr-4 card-shadow"
            />
            <div>
              <p class="font-semibold text-gray-800">{{ comment.commenter_name }}</p>
              <p class="text-sm text-gray-500">{{ formatDate(comment.created_at) }}</p>
            </div>
          </div>

          <button @click="toggleDropdown(comment)">...</button>
          {{ comment.isDropdownOpen }}
          <DropdownMenu :is-open="comment.isDropdownOpen" :dropdown-list="dropdownItems" />
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
</template>
