<script setup>
import { ref } from 'vue';
import PositionSmallBadge from '@/components/PositionSmallBadge.vue';
import like from '@/assets/icons/like.svg';
import likeFill from '@/assets/icons/like_fill.svg';
import bookmark from '@/assets/icons/bookmark.svg';
import bookmarkFill from '@/assets/icons/bookmark_fill.svg';

const isBookmarkFilled = ref(false);
const isLikeFilled = ref(false);

const handleToggleBookmarkClick = () => {
  isBookmarkFilled.value = !isBookmarkFilled.value;
};

const handleToggleLikeClick = () => {
  isLikeFilled.value = !isLikeFilled.value;
};

const props = defineProps({
  userImage: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  projectTitle: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    default: () => [],
  },
  position: {
    type: String,
    required: true,
  },
  applicationDeadline: {
    type: String,
    required: true,
  },
});

const getSkillsLogoImageUrl = (name) => {
  return new URL(`../assets/images/skills/${name}`, import.meta.url).href;
};
</script>

<template>
  <div class="w-[258px] py-6 px-6 rounded-lg text-gray-80 input-shadow bg-white">
    <div>
      <div class="flex justify-between mb-[15px]">
        <div class="flex items-center gap-[10px]">
          <div class="w-8 h-8 bg-cover rounded-full overflow-hidden shrink-0">
            <img :src="userImage" alt="" />
          </div>
          <span class="body-b">{{ userName }}</span>
        </div>
        <div class="flex gap-[6px]">
          <button @click="handleToggleLikeClick" class="w-6 h-6">
            <img :src="isLikeFilled ? likeFill : like" alt="" />
          </button>
          <button @click="handleToggleBookmarkClick" class="w-6 h-6">
            <img :src="isBookmarkFilled ? bookmarkFill : bookmark" alt="" />
          </button>
        </div>
      </div>
      <p class="mb-4 body-r line-clamp-3">
        {{ projectTitle }}
      </p>
    </div>
    <div>
      <ul class="flex gap-1 mb-[13px]">
        <li v-for="(skill, index) in skills" :key="index" class="w-7 h-7">
          <img :src="getSkillsLogoImageUrl(skill)" alt="Skill logo" />
        </li>
      </ul>
      <div class="mb-[10px]">
        <PositionSmallBadge :position="position" />
      </div>
      <p class="caption-r text-gray-50">마감일 | {{ applicationDeadline }}</p>
    </div>
  </div>
</template>
