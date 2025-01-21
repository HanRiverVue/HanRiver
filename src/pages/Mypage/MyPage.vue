<script setup>
import basicProfoile from '@/assets/icons/basic_profile.svg';
import TabMenu from '@/components/TabMenu.vue';
import { ref } from 'vue';
import MyInfo from './components/MyInfo.vue';
import PositionSmallBadge from '@/components/PositionSmallBadge.vue';
import MyRecruitmentList from './components/MyRecruitmentList.vue';
import MyRequestList from './components/MyRequestList.vue';
import ProfileEdit_icon from '@/assets/icons/profileEdit_icon.svg';
import MyBookmark from './components/MyBookmark.vue';

const items = ref(['내 정보', '작성한 모집글', '신청 목록', '찜 목록']);
const activeIndex = ref(0);
</script>

<template>
  <div class="pb-20 pt-12">
    <!-- 프로필 카드 -->
    <div
      class="px-[58px] py-[48px] flex items-center gap-[44px] rounded-[8px] bg-white max-w-[928px] m-auto"
    >
      <!-- 프로필 이미지 -->
      <div>
        <img :src="basicProfoile" alt="프로필 이미지" />
      </div>
      <!-- 프로필 정보 -->
      <div class="flex flex-col items-start gap-[16px] flex-1">
        <div class="flex flex-col items-start flex-1 w-full gap-1">
          <p class="h2-b text-black">병알이</p>

          <div class="flex justify-between items-center w-full">
            <p class="body-large-r text-gray-40">안녕하세요. 2년차 프론트 개발자입니다!</p>

            <div
              class="flex py-1.5 px-3 justify-center items-center gap-1.5 rounded-[4px] bg-primary-1 hover:bg-primary-hover cursor-pointer"
            >
              <img :src="ProfileEdit_icon" alt="프로필 편집 아이콘(톱니바퀴)" class="w-4 h-4" />
              <button class="text-white caption-r">프로필 수정</button>
            </div>
          </div>
        </div>

        <div>
          <ul class="flex items-center gap-[15px]">
            <PositionSmallBadge position="프론트엔드" />
            <PositionSmallBadge position="백엔드" />
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
        <div v-if="activeIndex === 0"><MyInfo /></div>
        <div v-else-if="activeIndex === 1"><MyRecruitmentList /></div>
        <div v-else-if="activeIndex === 2"><MyRequestList /></div>
        <div v-else-if="activeIndex === 3"><MyBookmark /></div>
      </div>
    </div>
  </div>
</template>
