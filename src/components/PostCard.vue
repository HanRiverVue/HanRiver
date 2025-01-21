<script setup>
import { bookmark_icon, cheering_icon } from '@/assets/icons';
import PositionSmallBadge from '@/components/PositionSmallBadge.vue';

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
  return new URL(`../assets/images/${name}`, import.meta.url).href;
};
</script>

<template>
  <div class="w-[258px] py-6 px-6 rounded-lg text-gray-80 input-shadow">
    <div>
      <div class="flex justify-between mb-[15px]">
        <div class="flex items-center gap-[10px]">
          <div class="w-[33px] h-[33px] bg-cover">
            <img :src="userImage" alt="" />
          </div>
          <span class="body-b">{{ userName }}</span>
        </div>
        <div class="flex gap-[6px]">
          <button class="w-6 h-6">
            <img :src="cheering_icon" alt="" />
          </button>
          <button class="w-6 h-6">
            <img :src="bookmark_icon" alt="" />
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
