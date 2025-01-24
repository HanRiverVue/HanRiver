<script setup>
import AppButton from '@/components/AppButton.vue';
import EditBasicInfo from './components/FristInfo/EditBasicInfo.vue';
import EditPostImageInfo from './components/SecondInfo/EditPostImageInfo.vue';
import EditDetailInfo from './components/thirdInfo/EditDetailInfo.vue';
import { onMounted, reactive, ref } from 'vue';
import { getUserLoggedIn } from '@/api/supabase/auth';
import { editPositionAndSkills } from '@/pages/EditRecruitPostPage/index';

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

const sendData = () => {
  console.log('userInfo :', userInfo.value);
  console.log('positionAndSkills', positionAndSkills);
  const positions = [];
  let techStacks = [];

  const selected = positionAndSkills.filter((data) => {
    return data.positionSelected;
  });
  for (let i = 0; i < selected.length; i++) {
    positions.push(selected[i].position);
    if (selected[i].selectedSkills.length > 0) {
      techStacks = [...techStacks, ...selected[i].selectedSkills];
    } else {
      techStacks = [];
      return;
    }
  }
  if (positions.length === 0) return alert('전송 실패(포지션 선택을 안했습니다.)');
  if (techStacks.length === 0) return alert('전송 실패(기술스택 선택을 안했습니다.)');
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
        @click="sendData"
      />
    </article>
  </section>
</template>
