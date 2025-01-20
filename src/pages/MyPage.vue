<script setup>
import basicProfoile from '@/assets/icons/basic_profile.svg';
import profileEdit from '@/assets/icons/profile_edit.svg';
</script>

<template>
  <div>
    <!-- 프로필 카드 -->
    <div class="px-[58px] py-[48px] flex items-center gap-[44px] rounded-[8px] bg-white">
      <!-- 프로필 이미지 -->
      <div>
        <img :src="basicProfoile" alt="프로필 이미지" />
      </div>
      <!-- 프로필 정보 -->
      <div class="flex flex-col items-start gap-[16px] flex-1">
        <div class="flex flex-col items-start flex-1 w-full">
          <p class="h2-b text-black">병알이</p>

          <div class="flex justify-between items-center w-full">
            <p class="body-large-r text-gray-40 self-stretch">
              안녕하세요. 2년차 프론트 개발자입니다!
            </p>

            <button>프로필 수정</button>
          </div>
        </div>

        <div>
          <ul class="flex items-center gap-[15px]">
            <li>프론트엔드</li>
            <li>프론트엔드</li>
            <li>프론트엔드</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
