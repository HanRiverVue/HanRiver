<script setup>
import { computed } from 'vue';
import PositionSmallBadge from '@/components/PositionSmallBadge.vue';
import like from '@/assets/icons/like.svg';
import likeFill from '@/assets/icons/like_fill.svg';
import bookmark from '@/assets/icons/bookmark.svg';
import bookmarkFill from '@/assets/icons/bookmark_fill.svg';
import { SKILLS } from '@/constants/skill';
import { useLoginModalStore } from '@/stores/loginModal';

const props = defineProps({
  id: Number,
  userImage: String,
  userName: String,
  projectTitle: String,
  skills: Array,
  position: Array,
  applicationDeadline: String,
  isLiked: Boolean,
  isBookmarked: Boolean,
  isAuthenticated: Boolean,
});

const emit = defineEmits([
  'toggleLike',
  'toggleBookmark',
  'clickUserProfileImage',
  'openLoginModal',
]);

const loginModalStore = useLoginModalStore();

const visibleSkills = computed(() => props.skills.slice(0, 5));
const remainingSkillsCount = computed(() =>
  Math.max(props.skills.length - visibleSkills.value.length, 0),
);

const visiblePosition = computed(() => props.position.slice(0, 3));
const remainingPositionCount = computed(() =>
  Math.max(props.position.length - visiblePosition.value.length, 0),
);

const handleToggleLike = (event) => {
  event.preventDefault();
  if (props.isAuthenticated) {
    emit('toggleLike', props.id);
  } else {
    loginModalStore.setLoginModal(true);
  }
};

const handleToggleBookmark = (event) => {
  event.preventDefault();
  if (props.isAuthenticated) {
    emit('toggleBookmark', props.id);
  } else {
    loginModalStore.setLoginModal(true);
  }
};

const handleUserProfileImageClick = (event) => {
  event.preventDefault();
  emit('clickUserProfileImage', props.id, props.userName);
};
</script>

<template>
  <RouterLink :to="`/RecruitPostDetail/${id}`">
    <div
      class="flex flex-col justify-between w-[258px] h-[295px] py-6 px-6 rounded-lg text-gray-80 bg-white input-shadow hover:card-shadow"
    >
      <div class="mb-auto">
        <div class="flex justify-between mb-5">
          <div class="flex items-center gap-2.5">
            <div @click="handleUserProfileImageClick" class="w-[33px] h-[33px] bg-cover">
              <img class="w-full h-full object-cover rounded-full" :src="userImage" alt="" />
            </div>
            <span class="body-large-b">{{ userName }}</span>
          </div>
          <div class="flex gap-[6px]">
            <button @click="handleToggleLike" class="w-6 h-6">
              <img :src="props.isLiked ? likeFill : like" alt="" />
            </button>
            <button @click="handleToggleBookmark" class="w-6 h-6">
              <img :src="props.isBookmarked ? bookmarkFill : bookmark" alt="" />
            </button>
          </div>
        </div>
        <p class="body-large-r line-clamp-3">
          {{ projectTitle }}
        </p>
      </div>
      <div>
        <ul class="flex gap-1 mb-[13px]">
          <template v-if="skills.length <= 5">
            <li v-for="(skill, index) in skills" :key="index" class="w-7 h-7 rounded-full">
              <img v-if="SKILLS[skill]" :src="SKILLS[skill]" :alt="skill" />
            </li>
          </template>
          <template v-else>
            <li v-for="(skill, index) in visibleSkills" :key="index" class="w-7 h-7 rounded-full">
              <img v-if="SKILLS[skill]" :src="SKILLS[skill]" :alt="skill" />
            </li>
            <li
              class="w-7 h-7 rounded-full flex items-center justify-center border border-solid border-primary-3 caption-b text-primary-3 bg-white"
            >
              +{{ remainingSkillsCount }}
            </li>
          </template>
        </ul>
        <ul class="mb-4 flex gap-[5px]">
          <template v-if="position.length <= 3">
            <li v-for="(pos, index) in position" :key="index">
              <PositionSmallBadge :position="pos" />
            </li>
          </template>
          <template v-else>
            <li v-for="(pos, index) in visiblePosition" :key="index">
              <PositionSmallBadge :position="pos" />
            </li>
            <li class="py-[3px] px-2.5 bg-gray-5 text-primary-2 rounded-md caption-b">
              +{{ remainingPositionCount }}
            </li>
          </template>
        </ul>
        <p class="caption-r text-gray-50">마감일 | {{ applicationDeadline }}</p>
      </div>
    </div>
  </RouterLink>
</template>
