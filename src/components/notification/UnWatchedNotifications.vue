<script setup>
import { twMerge } from 'tailwind-merge';
import { computed } from 'vue';
import { notiTypes } from '.';

const dummyNotifications = [
  {
    id: 1,
    user_id: '유저 uuid',
    post_id: '포스트 id',
    post_title: '멘토링 관련 프로젝트 팀원 모집합니다.',
    seen: false,
    type: 'apply',
    sender_id: '보내는 사람 user_list id',
    sender_name: '병알이다요요요',
  },
  {
    id: 2,
    user_id: '유저 uuid',
    post_id: '포스트 id',
    post_title: '함께할 노ㅇ.. 아니 팀원 모집합니다!',
    seen: false,
    type: 'comment',
    sender_id: '보내는 사람 user_list id',
    sender_name: '노예1',
  },
  {
    id: 3,
    user_id: '유저 uuid',
    post_id: '포스트 id',
    post_title: '멘토링 관련 프로젝트 팀원 모집합니다.',
    seen: false,
    type: 'like',
    sender_id: '보내는 사람 user_list id',
    sender_name: '따봉도치',
  },
  {
    id: 5,
    user_id: '유저 uuid',
    post_id: '포스트 id',
    post_title: '안녕하세요 오늘도 좋은하루입니다.',
    seen: false,
    type: 'comment',
    sender_id: '보내는 사람 user_list id',
    sender_name: '인사를 좋아하는 사람',
  },
  {
    id: 7,
    user_id: '유저 uuid',
    post_id: '포스트 id',
    post_title: '모의투자 서비스 프로젝트 팀원 모집합니다.',
    seen: false,
    type: 'like',
    sender_id: '보내는 사람 user_list id',
    sender_name: '젠슨황',
  },
];
</script>

<template>
  <ul class="w-full h-[424px] flex flex-col gap-2 overflow-y-scroll">
    <li v-for="notification in dummyNotifications" :key="notification.id">
      <button
        class="w-full flex px-4 py-2 bg-white rounded-lg input-shadow body-m hover:bg-secondary-1"
      >
        <p
          :class="`${twMerge(
            'max-w-[75px] truncate text-primary-3',
            notification.seen && 'text-gray-40',
          )}`"
        >
          {{ notification.sender_name }}
        </p>
        <span :class="`mr-1 ${notification.seen && 'text-gray-40'}`">님이</span>
        <p
          :class="` ${twMerge(
            'max-w-[130px] truncate text-primary-3',
            notification.seen && 'text-gray-40',
          )}`"
        >
          {{ notification.post_title }}
        </p>
        <span :class="`mr-1 ${notification.seen && 'text-gray-40'}`">에</span>
        <span :class="` ${notification.seen && 'text-gray-40'}`">{{
          notiTypes[notification.type]
        }}</span>
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
