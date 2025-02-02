<script setup>
import AppButton from '@/components/AppButton.vue';
import EditBasicInfo from './components/FristInfo/EditBasicInfo.vue';
import EditPostImageInfo from './components/SecondInfo/EditPostImageInfo.vue';
import EditDetailInfo from './components/thirdInfo/EditDetailInfo.vue';
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { getUserLoggedIn } from '@/api/supabase/auth';
import {
  baseUserInfo,
  editPositionAndSkills,
  resetBaseUserInfo,
  sendData,
} from '@/pages/EditRecruitPostPage/index';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import { getPostDetails } from '@/api/supabase/post';
import { useBaseModalStore } from '../../stores/baseModal';

// 베이스 모달 스토어
const baseModalStore = useBaseModalStore();

const route = useRoute();
const router = useRouter();
const postId = ref(route.params.postId);

// 스크롤 ref 3인방
const selectScrollRef = ref(null);
const editScrollRef = ref(null);

const scrollRefs = [];
onMounted(() => {
  if (selectScrollRef.value && editScrollRef.value) {
    scrollRefs.push(selectScrollRef.value.offsetTop);
    scrollRefs.push(editScrollRef.value.offsetTop);
  }
});

const handleCancelModalConfilm = () => {
  router.push('/');
};
// showModal에 담을 파라미터
const cancelPostModalObj = {
  title: '작성을 취소하시겠습니까?',
  confirmText: '취소하기',
  cancelText: '계속하기',
  onConfirm: handleCancelModalConfilm,
};

// 해당 포스트 게시글로 바로 이동시키기(sendData에서 데이터 받아줘야함)
const handleAfterPostModalConfilm = (post_id) => {
  router.push(`/RecruitPostDetail/${post_id}`);
};
const handleAfterModifyModalConfilm = () => {
  router.push(`/RecruitPostDetail/${route.params.postId}`);
};
// 메인화면으로 이동하기
const handleAfterPostModalCancel = () => {
  router.push('/');
};
const afterPostModalObj = {
  edit: {
    title: '작성한 글을 보러갈까요?',
    confirmText: '보러가기',
    cancelText: '메인화면', // 메인화면 클릭할때 메인화면으로 이동하는 로직 추가하고싶은데 베이스모달 커스텀 하게 해줘잉
    onConfirm: handleAfterPostModalConfilm,
    onCancel: handleAfterPostModalCancel,
  },
  modify: {
    title: '수정한 글을 보러갈까요?',
    confirmText: '보러가기',
    cancelText: '메인화면', // 메인화면 클릭할때 메인화면으로 이동하는 로직 추가하고싶은데 베이스모달 커스텀 하게 해줘잉
    onConfirm: handleAfterModifyModalConfilm,
    onCancel: handleAfterPostModalCancel,
  },
};

// 최종 유저 정보
const userInfo = reactive(baseUserInfo);
const positionAndSkills = reactive(editPositionAndSkills);

onMounted(async () => {
  const getAuthor = await getUserLoggedIn();
  if (getAuthor) {
    userInfo.author = getAuthor.id;
  } else {
    console.log('유저정보가 담기지 않았습니다.');
    return;
  }
  // 수정시 기존의 post 정보 업데이트
  if (postId.value) {
    const postData = await getPostDetails(postId.value);
    for (let key in userInfo) {
      userInfo[key] = postData[key];
    }
    // 포지션, 스택 업데이트
    const parsedSavePositions = await JSON.parse(userInfo.saved_position_and_stacks);
    for (let key in positionAndSkills) {
      positionAndSkills[key] = parsedSavePositions[key];
    }
  }
});

// positionAndSkills reactive 모든값 초기화
onBeforeUnmount(() => {
  for (let i = 0; i < positionAndSkills.length; i++) {
    positionAndSkills[i].positionSelected = false;
    positionAndSkills[i].selectedSkills = [];
  }
  for (let key in resetBaseUserInfo) {
    userInfo[key] = resetBaseUserInfo[key];
  }
});

// 컴포넌트 가드

onBeforeRouteLeave((to, from, next) => {
  if (from.name === 'ModifyRecruitPostPage' && to.name === 'EditRecruitPostPage') {
    alert('글 수정 페이지에서 글 작성페이지로의 이동은 불가합니다.');
    return next(false);
  }
  next();
});
watch(
  () => route.params.postId,
  () => {
    postId.value = route.params.postId;
  },
);
</script>

<template>
  <section class="w-full pt-[50px] pb-20 flex flex-col">
    <article ref="selectScrollRef">
      <EditBasicInfo v-model:userInfo="userInfo" v-model:positionAndSkills="positionAndSkills" />
    </article>
    <article>
      <EditPostImageInfo v-model:userInfo="userInfo" />
    </article>
    <article ref="editScrollRef">
      <EditDetailInfo v-model:userInfo="userInfo" />
    </article>

    <article class="flex justify-end gap-2">
      <AppButton
        type="default"
        text="취소"
        class="px-3 py-1.5 border border-primary-1 bg-white rounded-lg body-m"
        @click="baseModalStore.showModal(cancelPostModalObj)"
      />
      <AppButton
        v-if="postId"
        type="default"
        text="글 수정"
        class="px-3 py-1.5 bg-primary-1 text-white rounded-lg body-m"
        @click="sendData(userInfo, positionAndSkills, postId, scrollRefs, afterPostModalObj)"
      />
      <AppButton
        v-else
        type="default"
        text="글 등록"
        class="px-3 py-1.5 bg-primary-1 text-white rounded-lg body-m"
        @click="sendData(userInfo, positionAndSkills, postId, scrollRefs, afterPostModalObj)"
      />
    </article>
  </section>
</template>
