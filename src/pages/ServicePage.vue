<script setup>
import { useHeaderNavStore } from '@/stores/headerNavStore';
import { onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const headerNavStore = useHeaderNavStore();

const changeNavigate = (target) => {
  headerNavStore.setNavigate(target);
};
watch(route, changeNavigate('service'), { immediate: true });

onBeforeUnmount(() => {
  changeNavigate('');
});
</script>

<template>
  <div>준비중입니다...</div>
</template>
