<script setup>
import TabMenu from '@/components/TabMenu.vue';
import { ref } from 'vue';

const activeIndex = ref(0);
</script>

<template>
  <div>마이 페이지</div>
  <TabMenu
    :menu-items="['내정보', '작성한 글', '찜 목록']"
    :activeIndex="activeIndex"
    @update:activeIndex="activeIndex = $event"
  />
</template>
