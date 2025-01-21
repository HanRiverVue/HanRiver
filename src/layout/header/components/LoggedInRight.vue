<script setup>
import default_user_img from '@/assets/images/default_user_img.png';
import PostEditSvg from '@/assets/icons/PostEditSvg.vue';
import NotificationSvg from '@/assets/icons/NotificationSvg.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Dropdown from '@/components/Dropdown.vue';

const dropDownMenuShow = ref(false);
// 엘리먼트 ref객체
const targetElement = ref(null);
const closeTargetElement = ref(null);

const handleDropDownMenuClick = (event) => {
  if (dropDownMenuShow.value && closeTargetElement.value === event.target) {
    return (dropDownMenuShow.value = false);
  }

  if (targetElement.value.contains(event.target)) {
    dropDownMenuShow.value = true;
  } else {
    dropDownMenuShow.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleDropDownMenuClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDropDownMenuClick);
});
</script>

<template>
  <ul class="w-full max-w-[148px] flex items-center justify-between">
    <li>
      <RouterLink to="/EditRecruitPost">
        <PostEditSvg />
      </RouterLink>
    </li>
    <li class="flex items-center">
      <button>
        <NotificationSvg />
      </button>
    </li>
    <li class="flex flex-col justify-center items-end" ref="targetElement">
      <button>
        <img
          :src="default_user_img"
          ref="closeTargetElement"
          alt="유저 기본 이미지 아이콘"
          class="w-10 rounded-full"
        />
      </button>
      <article v-if="dropDownMenuShow" class="absolute bottom-[-30px] p-3 bg-white border">
        메뉴드롭다운 나오는 곳
      </article>
    </li>
  </ul>
</template>
