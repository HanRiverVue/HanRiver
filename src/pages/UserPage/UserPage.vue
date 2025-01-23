<script setup>
import TabMenu from '@/components/TabMenu.vue';
import { onMounted, ref } from 'vue';
import PositionSmallBadge from '@/components/PositionSmallBadge.vue';
import ProfileEdit_icon from '@/assets/icons/profileEdit_icon.svg';
import { useRouter } from 'vue-router';
import { getUserInfo, getUserInfoToUserId } from '@/api/supabase/user';
import MyInfo from '../Mypage/components/MyInfo.vue';
import { useRoute } from 'vue-router';
import Review from './components/UserReviewList.vue';
import UserRecruitmentList from './components/UserRecruitmentList.vue';

const items = ref(['유저 정보', '작성한 모집글', '후기/평가 목록']);
const activeIndex = ref(0);

const router = useRouter();
const userId = useRoute().params;

const loading = ref(true);
const userInfo = ref(null);

onMounted(() => {
  fetchUserinfo();
});

const fetchUserinfo = async () => {
  const myInfo = await getUserInfo();
  // 현재 로그인한 사용자가 자신의 상세정보에 들어왔을시 마이페이지로 리다이렉트
  if (myInfo.user_id === userId) {
    router.push('/myPage');
  }
  userInfo.value = await getUserInfoToUserId('5cc3999c-3150-4072-a824-5d5ddeb3e381');
  console.log(userInfo.value);
  loading.value = false;
};
</script>

<template>
  <!-- 로딩중일때  -->
  <div v-if="loading" class="flex justify-center items-center h-[600px]">
    <p class="text-center text-primary-4 h3-b">로딩 중...</p>
  </div>

  <div v-else="!loading" class="pb-20 pt-12">
    <!-- 프로필 카드 -->
    <div
      class="px-[58px] py-[48px] flex items-center gap-[44px] rounded-[8px] bg-white max-w-[928px] m-auto card-shadow"
    >
      <!-- 프로필 이미지 -->
      <div>
        <img
          :src="userInfo?.profile_img_path"
          alt="프로필 이미지"
          class="w-[165px] h-[165px] rounded-full"
        />
      </div>
      <!-- 프로필 정보 -->
      <div class="flex flex-col items-start gap-4 flex-1">
        <div class="flex flex-col items-start flex-1 w-full gap-1">
          <p class="h2-b text-black">{{ userInfo.name }}</p>

          <div class="flex justify-between items-center w-full">
            <p class="body-large-r text-gray-40">{{ userInfo.short_introduce }}</p>
          </div>
        </div>

        <div>
          <ul class="flex items-center gap-4">
            <li v-for="pos in userInfo.positions" :key="pos.id">
              <PositionSmallBadge :position="pos.position" />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 탭 -->
    <div
      class="rounded-lg bg-white card-shadow pb-10 overflow-hidden flex flex-col gap-11 mt-[52px]"
    >
      <!-- 탭 메뉴 -->
      <TabMenu
        :menu-items="items"
        :activeIndex="activeIndex"
        @update:activeIndex="activeIndex = $event"
      />
      <!-- 탭 내용 -->
      <div>
        <div v-if="activeIndex === 0"><MyInfo :userInfo="userInfo" /></div>
        <div v-else-if="activeIndex === 1"><UserRecruitmentList :userInfo="userInfo" /></div>
        <div v-else-if="activeIndex === 2"><Review /></div>
      </div>
    </div>
  </div>
</template>
