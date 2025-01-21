<script setup>
import default_user_img from '@/assets/images/default_user_img.png';
import PostEditSvg from '@/assets/icons/PostEditSvg.vue';
import NotificationSvg from '@/assets/icons/NotificationSvg.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import HeaderDropdown from '@/layout/header/components/HeaderDropdown.vue';

const isDropdownOpen = ref(false);
const targetElement = ref(null);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleOutsideClick = (event) => {
  if (isDropdownOpen.value && targetElement.value && !targetElement.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
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
      <button @click="toggleDropdown">
        <img
          :src="default_user_img"
          ref="closeTargetElement"
          alt="유저 기본 이미지 아이콘"
          class="w-10 rounded-full"
        />
      </button>
      <HeaderDropdown v-model="isDropdownOpen" />
    </li>
  </ul>
</template>
