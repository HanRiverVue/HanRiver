<script setup>
import PositionSmallBadge from './PositionSmallBadge.vue';
</script>
<template>
  <div class="w-[258px] h-[295px] py-6 px-6 rounded-lg text-gray-80 input-shadow">
    <div>
      <div class="flex justify-between mb-[15px]">
        <div class="flex items-center gap-[10px]">
          <div class="w-[33px] h-[33px] bg-cover">
            <img src="../assets/images/postcard-user-image.png" alt="" />
          </div>
          <span class="body-b">파파고</span>
        </div>
        <div class="flex gap-[6px]">
          <button class="w-6 h-6">
            <img src="../assets/icons/cheering-icon.svg" alt="" />
          </button>
          <button class="w-6 h-6">
            <img src="../assets/icons/bookmark.svg" alt="" />
          </button>
        </div>
      </div>
      <p class="mb-4 body-r text-ellipsis">
        멋진프로젝트를 만들어봅시다 주제는 파파고 api를 이용한 어쩌고입니다
        모집합니다모집합니다모집합니다모집... 모집...
      </p>
    </div>
    <div>
      <ul class="flex gap-1 mb-[13px]">
        <li class="w-7 h-7"><img src="../assets/icons/skills-logo-go.svg" alt="" /></li>
        <li class="w-7 h-7"><img src="../assets/icons/skills-logo-go.svg" alt="" /></li>
        <li class="w-7 h-7"><img src="../assets/icons/skills-logo-go.svg" alt="" /></li>
        <li class="w-7 h-7"><img src="../assets/icons/skills-logo-go.svg" alt="" /></li>
        <li class="w-7 h-7"><img src="../assets/icons/skills-logo-go.svg" alt="" /></li>
        <li class="w-7 h-7"><img src="../assets/icons/skills-logo-go.svg" alt="" /></li>
      </ul>
      <div class="mb-[10px]">
        <PositionSmallBadge position="프론트엔드" />
      </div>
      <p class="caption-r text-gray-50">
        <span>마감일 |</span>
        <span>2025.01.29</span>
      </p>
    </div>
  </div>
</template>
<style scoped></style>
