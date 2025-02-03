<script setup>
import EditTitle from '../EditTitle.vue';
import caution_notice_icon from '@/assets/icons/caution_notice_icon.svg';
import { ref, watch } from 'vue';

const props = defineProps({
  userInfo: Object,
});

const imgPreview = ref('');

const handleImageSelectClick = async (e) => {
  const file = e.target.files[0];
  props.userInfo.post_img_path = file;
  // 로컬주소 생성 로직
  const reader = new FileReader();
  reader.onload = (e) => {
    imgPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
  // 최종 전달 데이터엔 일단 정제안된 file 데이터만 보냄(보낼때 정제 필요)
};

const handleImgButtonClick = () => {
  inputRef.value.click();
};

const handleImageDeleteClick = () => {
  imgPreview.value = '';
  props.userInfo.post_img_path = '';
};

const inputRef = ref(null);

// 수정시 post 이미지 불러오기
let isWatched = false;
watch(
  () => props.userInfo,
  () => {
    if (typeof props.userInfo.post_img_path === 'object') return;
    if (props.userInfo.post_img_path && !isWatched) {
      // supabase 이미지 가져올때 왜 중간중간에 %가 끼는거지
      const fixedUrl = props.userInfo.post_img_path.replace(/%/g, '');
      imgPreview.value = fixedUrl;
      isWatched = true;
    }
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <article
    class="flex flex-col w-full rounded-md px-6 py-9 mb-10 bg-white drop-shadow-post-editor-shadow"
  >
    <EditTitle :index="2" title="프로젝트를 소개하는 이미지를 첨부해주세요" />
    <article
      class="w-full py-5 mt-10 min-h-[390px] bg-secondary-2 border-dashed border-primary-4 border-2 flex items-center justify-center cursor-pointer"
      @click="handleImgButtonClick"
    >
      <img v-if="imgPreview !== ''" :src="imgPreview" alt="이미지 프리뷰" class="h-[300px]" />
      <span v-else class="text-gray-50">이미지를 선택해주세요!</span>
    </article>
    <article>
      <article class="flex gap-2 items-center mt-4">
        <img :src="caution_notice_icon" alt="경고 아이콘" />
        <span class="body-m text-gray-50"
          >이미지 업로드를 하지 않을 경우 기본 이미지로 업로드 됩니다.</span
        >
      </article>
      <article class="flex gap-2 justify-end mt-2">
        <button
          @click="handleImageDeleteClick"
          class="px-3 py-1.5 border border-primary-1 bg-white rounded-lg body-m"
        >
          이미지 삭제
        </button>
        <button @click="handleImgButtonClick" class="px-3 py-1.5 primary-button rounded-lg body-m">
          이미지 선택
        </button>
        <input @change="handleImageSelectClick" type="file" ref="inputRef" class="hidden" />
      </article>
    </article>
  </article>
</template>

<style lang="scss" scoped></style>
