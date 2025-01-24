<script setup>
import TabMenu from '@/components/TabMenu.vue';
import { onMounted, ref } from 'vue';
import MyInfo from './components/MyInfo.vue';
import PositionSmallBadge from '@/components/PositionSmallBadge.vue';
import MyRecruitmentList from './components/MyRecruitmentList.vue';
import MyRequestList from './components/MyRequestList.vue';
import ProfileEdit_icon from '@/assets/icons/profileEdit_icon.svg';
import MyBookmark from './components/MyBookmark.vue';
import { getUserInfo } from '@/api/supabase/user';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const items = ref(['내 정보', '작성한 모집글', '신청 목록', '찜 목록']);
const activeIndex = ref(0);
const loading = ref(true);
const route = useRoute();
const router = useRouter();

const userInfo = ref(null);

const handleEditProfile = () => {
  router.push('/EditProfile');
};

onMounted(async () => {
  userInfo.value = await getUserInfo();
  console.log(userInfo);

  loading.value = false;

  // 탭의 갯수보다 큰 index 임의 조작시 0으로 강제 전환
  if (route.query.tabIndex > items.value.length || !route.query.tabIndex) {
    activeIndex.value = 0;
    router.push({ query: { tabIndex: activeIndex.value } });
    return;
  }
  activeIndex.value = parseInt(route.query.tabIndex);
});

const handleUpdateIndex = (index = 0) => {
  activeIndex.value = index;
  router.push({ query: { tabIndex: index } });
};
</script>

<template>
  <!-- 로딩중일때  -->
  <div v-if="loading" class="flex justify-center items-center h-[600px]">
    <p class="text-center text-primary-4 h3-b">로딩 중...</p>
  </div>

  <div v-if="!loading" class="pb-20 pt-12">
    <!-- 프로필 카드 -->
    <div
      class="px-[58px] py-[48px] flex items-center gap-[44px] rounded-[8px] bg-white max-w-[928px] m-auto card-shadow"
    >
      <!-- 프로필 이미지 -->
      <div class="w-[124px] h-[124px]">
        <img
          class="w-full h-full rounded-full"
          :src="userInfo.profile_img_path"
          alt="프로필 이미지"
        />
      </div>
      <!-- 프로필 정보 -->
      <div class="flex flex-col items-start gap-[16px] flex-1">
        <div class="flex flex-col items-start flex-1 w-full gap-1">
          <p class="h2-b text-black">{{ userInfo.name }}</p>

          <div class="flex justify-between items-center w-full">
            <p class="body-large-r text-gray-40">{{ userInfo.short_introduce }}</p>

            <div
              class="flex py-1.5 px-3 justify-center items-center gap-1.5 rounded-[4px] bg-primary-1 hover:bg-primary-hover cursor-pointer"
              @click="router.push('/EditProfile')"
            >
              <img :src="ProfileEdit_icon" alt="프로필 편집 아이콘(톱니바퀴)" class="w-4 h-4" />
              <button class="text-white caption-r" @click="handleEditProfile">프로필 수정</button>
            </div>
          </div>
        </div>

        <div>
          <ul class="flex items-center gap-[15px]">
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
      <TabMenu :menu-items="items" :activeIndex="activeIndex" @update-Index="handleUpdateIndex" />
      <!-- 탭 내용 -->
      <div>
        <div v-if="activeIndex === 0"><MyInfo :user-info="userInfo" /></div>
        <div v-else-if="activeIndex === 1"><MyRecruitmentList /></div>
        <div v-else-if="activeIndex === 2"><MyRequestList /></div>
        <div v-else-if="activeIndex === 3"><MyBookmark /></div>
      </div>
    </div>
  </div>
</template>
