<script setup>
import AppButton from '@/components/AppButton.vue';
import EditBasicInfo from './components/FristInfo/EditBasicInfo.vue';
import EditPostImageInfo from './components/SecondInfo/EditPostImageInfo.vue';
import EditDetailInfo from './components/thirdInfo/EditDetailInfo.vue';
import { onMounted, reactive, ref } from 'vue';
import { getUserLoggedIn } from '@/api/supabase/auth';
import { editPositionAndSkills } from '@/pages/EditRecruitPostPage/index';
import { postCreatePost, postUploadPostImage } from '@/api/supabase/post_editor';

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

const sendData = async (userInfo, positionAndSkills) => {
  console.log('userInfo :', userInfo);
  console.log('positionAndSkills', positionAndSkills);
  // 이미지 변환
  console.log(userInfo.post_img_path);
  let filePath;
  if (userInfo.post_img_path === '') {
    // 선택된 이미지 없으면 기본이미지 제공
    filePath =
      'https://hfrulsqohffbfxdsozkk.supabase.co/storage/v1/object/public/post_images/programmers.png';
  } else {
    filePath = await postUploadPostImage(userInfo.post_img_path);
  }
  console.log(filePath);

  // 최종 전송할 데이터
  const positions = [];
  let techStacks = [];

  switch (true) {
    case userInfo.author === '':
      return alert('오류 : 유저 로그인 정보가 없습니다.');
    case userInfo.recruit_type === '':
      return alert('모집 구분 선택을 완료해주세요');
    case userInfo.recruit_count === '':
      return alert('모집 인원 선택을 완료해주세요');
    case userInfo.recruit_deadline === null:
      return alert('모집 마감일 선택을 완료해주세요');
    case userInfo.on_offline === '':
      return alert('진행 방식 선택을 완료해주세요');
    case userInfo.start_date === '':
      return alert('진행 기간 선택을 완료해주세요');
    case userInfo.end_date === '':
      return alert('진행 기간 선택을 완료해주세요');
    case userInfo.call_method === '':
      return alert('연락 방법 선택을 완료해주세요');
    case userInfo.call_link === '':
      return alert('연락처 선택을 완료해주세요');
    case userInfo.title === '':
      return alert('글 제목 작성을 완료해주세요');
    case userInfo.body === '':
      return alert('글 내용 작성을 완료해주세요');
    default:
      break;
  }

  const selected = positionAndSkills.filter((data) => {
    return data.positionSelected;
  });
  if (selected.length === 0) return alert('전송 실패(포지션 선택을 완료해주세요.)');
  for (let i = 0; i < selected.length; i++) {
    positions.push(selected[i].position);
    if (selected[i].selectedSkills.length > 0) {
      techStacks = [...techStacks, ...selected[i].selectedSkills];
    } else {
      techStacks = [];
      return alert('전송 실패(기술스택 선택을 완료해주세요.)');
    }
  }
  const setTechStacks = new Set(techStacks);
  techStacks = [...setTechStacks];

  const resultUserInfo = { ...userInfo, post_img_path: filePath };
  console.log(resultUserInfo, positions, techStacks);

  await postCreatePost(resultUserInfo, positions, techStacks);
  alert('전송완료!');
  console.log(positions);
  console.log(techStacks);
};

onMounted(async () => {
  const getAuthor = await getUserLoggedIn();
  if (getAuthor) {
    userInfo.value.author = getAuthor.id;
  } else {
    console.log('유저정보가 담기지 않았습니다.');
    return;
  }
});
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
      />
      <AppButton
        type="default"
        text="글 등록"
        class="px-3 py-1.5 bg-primary-1 text-white rounded-lg body-m"
        @click="sendData(userInfo, positionAndSkills)"
      />
    </article>
  </section>
</template>
