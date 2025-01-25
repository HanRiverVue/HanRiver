<script setup>
import AppButton from '@/components/AppButton.vue';
import EditBasicInfo from './components/FristInfo/EditBasicInfo.vue';
import EditPostImageInfo from './components/SecondInfo/EditPostImageInfo.vue';
import EditDetailInfo from './components/thirdInfo/EditDetailInfo.vue';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { getUserLoggedIn } from '@/api/supabase/auth';
import { editPositionAndSkills, sendData } from '@/pages/EditRecruitPostPage/index';
import { useBaseModalStore } from '@/stores/baseModal';
import router from '@/router';

// 최종 유저 정보
const userInfo = ref({
  author: '',
  recruit_type: '',
  title: '',
  body: '',
  recruit_count: '',
  recruit_area: '',
  start_date: null,
  end_date: null,
  on_offline: '',
  recruit_deadline: null,
  call_method: '',
  call_link: '',
  post_img_path: '',
  finished: false,
});
const positionAndSkills = reactive(editPositionAndSkills);

onMounted(async () => {
  const getAuthor = await getUserLoggedIn();
  if (getAuthor) {
    userInfo.value.author = getAuthor.id;
  } else {
    console.log('유저정보가 담기지 않았습니다.');
    return;
  }
});
// positionAndSkills reactive 모든값 초기화
onBeforeUnmount(() => {
  for (let i = 0; i < positionAndSkills.length; i++) {
    positionAndSkills[i].positionSelected = false;
    positionAndSkills[i].selectedSkills = [];
  }
});
// // 페이지 나갈때 컴포넌트 가드
// onBeforeRouteLeave((to, from, next) => {
//   if (confirm('정말 나가시겠습니까? 작업 내용이 초기화됩니다.')) {
//     next();
//   } else {
//     next(false);
//   }
// });
const handleSendDataClick = (userInfo, positionAndSkills) => {
  const res = sendData(userInfo, positionAndSkills);
};

// 베이스 모달 스토어
const baseModalStore = useBaseModalStore();
// showModal에 담을 파라미터
const cancelModalObj = {
  title: '작성을 취소하시겠습니까?',
  confirmText: '계속하기',
  confilm: () => handleCancelModalConfilm,
};
const handleCancelModalConfilm = () => {
  router.push('/');
};
</script>

<template>
  <section class="w-full pt-[50px] pb-20 flex flex-col">
    <EditBasicInfo v-model:userInfo="userInfo" v-model:positionAndSkills="positionAndSkills" />
    <EditPostImageInfo v-model:userInfo="userInfo" />
    <EditDetailInfo v-model:userInfo="userInfo" />
    <article class="flex gap-2 justify-end">
      <AppButton
        type="default"
        text="취소"
        class="px-3 py-1.5 border border-primary-1 bg-white rounded-lg body-m"
        @click="baseModalStore.showModal(cancelModalObj)"
      />
      <AppButton
        type="default"
        text="글 등록"
        class="px-3 py-1.5 bg-primary-1 text-white rounded-lg body-m"
        @click="handleSendDataClick(userInfo, positionAndSkills)"
      />
    </article>
  </section>
</template>
