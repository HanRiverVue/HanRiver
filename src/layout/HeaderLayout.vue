<script setup>
import logo from '@/assets/icons/logo.svg';
import post_edit from '@/assets/icons/post_edit.svg';
import notification from '@/assets/icons/notification.svg';
import default_user_img from '@/assets/images/default_user_img.png';
</script>

<template>
  <header>
    <nav class="w-full fixed top-0 left-0 bg-white">
      <article class="w-full max-w-[1200px] flex items-center justify-between mx-auto px-10 py-5">
        <article class="w-full max-w-[610px] flex items-center justify-between">
          <RouterLink to="/" class="px-[22px]">
            <img :src="logo" alt="mergi 로고 아이콘" class="min-w-[96px]" />
          </RouterLink>
          <ul class="w-full max-w-[370px] flex items-center justify-between h3-b">
            <li>
              <RouterLink to="/PostList/study"> 스터디 </RouterLink>
            </li>
            <li>
              <RouterLink to="/PostList/project"> 프로젝트 </RouterLink>
            </li>
            <li>
              <RouterLink to="/"> 서비스 </RouterLink>
            </li>
          </ul>
        </article>
        <ul class="w-full max-w-[148px] flex items-center justify-between">
          <li>
            <RouterLink to="/EditRecruitPost">
              <img :src="post_edit" alt="글 작성 아이콘" class="w-6" />
            </RouterLink>
          </li>
          <li class="flex items-center">
            <button>
              <img :src="notification" alt="알림 아이콘" class="w-8 p-1" />
            </button>
          </li>
          <li class="flex items-center">
            <button>
              <img
                :src="default_user_img"
                alt="유저 기본 이미지 아이콘"
                class="w-10 rounded-full"
              />
            </button>
          </li>
        </ul>
      </article>
    </nav>
  </header>
</template>
