<script setup>
import github_gray from '@/assets/icons/github_gray.svg';

const members = [
  { name: 'wldnjs990', href: 'https://github.com/wldnjs990' },
  { name: 'yoo-nji', href: 'https://github.com/yoo-nji' },
  { name: 'kodingzz', href: 'https://github.com/kodingzz' },
  { name: 'AAminha', href: 'https://github.com/AAminha' },
  { name: 'y-yeji', href: 'https://github.com/y-yeji' },
  { name: 'SeungHyeon-web', href: 'https://github.com/SeungHyeon-web' },
];
</script>

<template>
  <footer class="w-full h-32 bg-gray-5 flex items-center justify-center">
    <article class="w-full max-w-[486px] flex flex-col">
      <a
        href="https://github.com/HanRiverVue/HanRiver"
        target="_blank"
        rel="noopener noreferrer"
        class="flex gap-[10px] items-center justify-center mb-5"
      >
        <img :src="github_gray" alt="회색 깃허브 아이콘" />
        <span class="text-gray-50 body-b">team.han-river-vue</span>
      </a>
      <ul class="flex justify-between mb-2">
        <template v-for="(member, index) of members">
          <li class="caption-m text-gray-50">
            <a :href="member.href" target="_blank" rel="noopener noreferrer">{{ member.name }}</a>
          </li>
          <li v-if="index < members.length - 1" class="caption-m text-gray-50">|</li>
        </template>
      </ul>
      <article class="w-full flex justify-center">
        <span class="caption-r text-gray-40">
          Created with passion by the Mergi team | © 2025 Mergi
        </span>
      </article>
    </article>
  </footer>
</template>
