<script setup>
import { computed } from 'vue';
import PositionSmallBadge from '@/components/PositionSmallBadge.vue';
import like from '@/assets/icons/like.svg';
import likeFill from '@/assets/icons/like_fill.svg';
import bookmark from '@/assets/icons/bookmark.svg';
import bookmarkFill from '@/assets/icons/bookmark_fill.svg';
import { SKILLS } from '@/constants/skill';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { toggleBookmark, toggleLike } from '@/api/supabase/like_and_bookmark';
import { useLoginModalStore } from '@/stores/loginModal';
import { useUserProfileModalStore } from '@/stores/userProfileModal';
import { usePagination } from '@/utils/usePagination';

// const queryClient = useQueryClient();
// const postMutation = useMutation(fetchData, {
//   onSuccess: () => {
//     queryClient.invalidateQueries([queryKey]);
//   },
// });

// 로그인 확인 여부
const userStore = useUserStore();
const { user, isLoggedIn, userPostLikes } = storeToRefs(userStore);

// 로그인모달
const loginModalStore = useLoginModalStore();

// 유저프로필 모달
const userProfileModalStore = useUserProfileModalStore();

const props = defineProps({
  user_id: String,
  id: Number,
  userImage: String,
  userName: String,
  projectTitle: String,
  skills: Array,
  position: Array,
  applicationDeadline: String,
});

// 포스트
const MAX_VISIBLE_SKILLS = 5;
const MAX_VISIBLE_POSITIONS = 2;

const visibleSkills = computed(() => props.skills.slice(0, MAX_VISIBLE_SKILLS));
const remainingSkillsCount = computed(() => Math.max(props.skills.length - MAX_VISIBLE_SKILLS, 0));

const visiblePosition = computed(() => props.position.slice(0, MAX_VISIBLE_POSITIONS));
const remainingPositionCount = computed(() =>
  Math.max(props.position.length - MAX_VISIBLE_POSITIONS, 0),
);

// 좋아요 및 북마크 상태 결정
const isLiked = computed(() => userPostLikes.value?.includes(props.id) ?? false);
const isBookmarked = computed(() => user.value?.bookmarks?.includes(props.id) ?? false);

// 좋아요 토글
const handleToggleLike = async (event) => {
  event.preventDefault();
  if (!isLoggedIn.value) {
    loginModalStore.setLoginModal(true);
    return;
  }
  try {
    const result = await toggleLike(props.id);
    if (result !== null) {
      userStore.updateLikes(props.id);
    }
  } catch (error) {
    console.error('Error toggling like:', error);
  }
};

// 북마크 토글
const handleToggleBookmark = async (event) => {
  event.preventDefault();
  if (!isLoggedIn.value) {
    loginModalStore.setLoginModal(true);
    return;
  }
  try {
    const result = await toggleBookmark(props.id);
    if (result !== null) {
      userStore.updateBookmarks(props.id);
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
  }
};

// 유저프로필 모달 클릭 핸들러
const handleUserProfileImageClick = (event) => {
  event.preventDefault();

  if (props.user_id) {
    userProfileModalStore.fetchModalUserProfile(props.user_id);
    userProfileModalStore.setUserProfileModal(true);
  } else {
    console.error('User ID is undefined');
  }
};
</script>

<template>
  <RouterLink :to="`/RecruitPostDetail/${id}`">
    <div
      class="flex flex-col justify-between w-[258px] h-[295px] py-6 px-6 rounded-lg text-gray-80 bg-white input-shadow hover:card-shadow"
    >
      <div class="mb-auto">
        <div class="flex justify-between mb-5">
          <div @click="handleUserProfileImageClick" class="flex items-center gap-2.5">
            <div class="w-[33px] h-[33px] rounded-full overflow-hidden user-Profile-img-shadow">
              <img class="w-full h-full object-cover rounded-full" :src="userImage" alt="" />
            </div>
            <span class="body-large-b">{{ userName }}</span>
          </div>
          <div class="flex gap-[6px]">
            <button @click="handleToggleLike" class="w-6 h-6">
              <img :src="isLiked ? likeFill : like" alt="" />
            </button>
            <button @click="handleToggleBookmark" class="w-6 h-6">
              <img :src="isBookmarked ? bookmarkFill : bookmark" alt="" />
            </button>
          </div>
        </div>
        <p class="body-large-r line-clamp-3">
          {{ projectTitle }}
        </p>
      </div>
      <div>
        <ul class="flex gap-1 mb-[13px]">
          <template v-if="skills.length <= MAX_VISIBLE_SKILLS">
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
          <template v-if="position.length <= MAX_VISIBLE_POSITIONS">
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
