<script setup>
import PostCard from '@/components/PostCard.vue';
import StatusBadge from '@/components/StatusBadge.vue';
import PostcardUserImage from '@/assets/images/postcard_user_image.png';
import mainBanner from '@/assets/images/main_banner.png';
import mainProjectBanner from '@/assets/images/main_project_banner.png';
import mainStudyBanner from '@/assets/images/main_study_banner.png';
import mainServiceBanner from '@/assets/images/main_service_banner.png';
import pencil from '@/assets/images/pencil.png';
import search from '@/assets/images/search.png';
import talk from '@/assets/images/talk.png';

const postCardData = {
  userImage: PostcardUserImage,
  userName: '파파고',
  projectTitle:
    '멋진프로젝트를 만들어봅시다 주제는 파파고 api를 이용한 어쩌고입니다 모집합니다모집합니다모집합니다모집... 모집...',
  skills: ['go.png', 'go.png', 'go.png', 'go.png', 'go.png', 'go.png'],
  position: '프론트엔드',
  applicationDeadline: '2025.01.29',
};
const listItems = [
  { ...postCardData },
  { ...postCardData },
  { ...postCardData },
  { ...postCardData },
];
</script>
<template>
  <section class="mb-20">
    <div class="mb-5"><img :src="mainBanner" alt="" /></div>
    <div class="flex gap-5">
      <RouterLink to="/PostList/study">
        <div class="flex-col w-[360px] px-[30px] py-[30px] rounded-md bg-secondary-2">
          <h3 class="h3-b text-primary-1">
            <p class="flex gap-1 items-center mb-[7px] caption-r text-gray-50">
              모집 중인 스터디를 찾아보세요 <img class="mb-1" :src="pencil" alt="" />
            </p>
            스터디 보러가기
          </h3>
          <div class="justify-self-end">
            <img :src="mainStudyBanner" alt="" />
          </div>
        </div>
      </RouterLink>
      <RouterLink to="/PostList/project">
        <div class="flex-col w-[360px] px-[30px] py-[30px] rounded-md bg-secondary-1">
          <h3 class="h3-b text-primary-1">
            <p class="flex gap-1 items-center mb-[7px] caption-r text-gray-50">
              모집 중인 프로젝트를 찾아보세요<img class="mb-1" :src="search" alt="" />
            </p>
            프로젝트 보러가기
          </h3>
          <div class="justify-self-end">
            <img :src="mainProjectBanner" alt="" />
          </div>
        </div>
      </RouterLink>
      <RouterLink to="/service">
        <div class="flex-col w-[360px] px-[30px] py-[30px] rounded-md bg-primary-5">
          <h3 class="h3-b text-primary-1">
            <p class="flex gap-1 items-center mb-[7px] caption-r text-gray-50">
              홍보 중인 서비스를 구경해 보세요<img class="mb-1" :src="talk" alt="" />
            </p>
            서비스 보러가기
          </h3>
          <div class="justify-self-end">
            <img :src="mainServiceBanner" alt="" />
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
  <section>
    <article class="mb-[60px]">
      <div class="flex items-center gap-2.5 mb-6">
        <h2 class="h1-b text-gray-90">Hot 인기있는 프로젝트</h2>
        <StatusBadge status="success" class="px-2.5 py-[3px]">인기있는</StatusBadge>
      </div>
      <div class="flex gap-6">
        <PostCard v-for="(item, index) in listItems" :key="index" v-bind="item" />
      </div>
    </article>
    <article class="mb-[60px]">
      <div class="flex items-center gap-2.5 mb-6">
        <h2 class="h1-b text-gray-90">Now 곧 마감되는 프로젝트</h2>
        <StatusBadge status="danger" class="px-2.5 py-[3px]">마감직전</StatusBadge>
      </div>
      <div class="flex gap-6">
        <PostCard v-for="(item, index) in listItems" :key="index" v-bind="item" />
      </div>
    </article>
    <article class="mb-[60px]">
      <div class="flex items-center gap-2.5 mb-6">
        <h2 class="h1-b text-gray-90">New 새로운 프로젝트</h2>
        <StatusBadge status="warning" class="px-2.5 py-[3px]">새로운</StatusBadge>
      </div>
      <div class="flex gap-6">
        <PostCard v-for="(item, index) in listItems" :key="index" v-bind="item" />
      </div>
    </article>
  </section>
</template>
<style scoped></style>
