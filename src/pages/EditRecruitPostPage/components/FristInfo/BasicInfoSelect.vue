<script setup>
import FilterDropdown from '@/components/FilterDropdown.vue';
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    default: [''],
  },
  defaultText: {
    type: String,
    default: '',
  },
  userInfo: {
    type: Object,
  },
});

const handleFilterDropdownClick = (item) => {
  switch (props.title) {
    case '모집 구분':
      props.userInfo.recruit_type = item;
      break;
    case '모집 지역':
      props.userInfo.recruit_area = item;
      break;
    case '진행 방식':
      props.userInfo.on_offline = item;
      break;
    case '연락 방법':
      props.userInfo.call_method = item;
      break;
    default:
      break;
  }
};

// 수정시 selected 데이터 불러오기
// 비동기로 받아와서 동기로만 데이터를 받는 filterdropdown에서 계속 빈값만 받아졌음
// 그래서 filterdropdown에 속성을 하나 더 만들어 비동기로 데이터를 받은 시점에 ui가 업데이트 되도록 일단 조치힘
const selected = ref(null);
watch(
  () => props.userInfo,
  (newUserInfo) => {
    switch (props.title) {
      case '모집 구분':
        selected.value = newUserInfo.recruit_type;
        break;
      case '모집 지역':
        selected.value = newUserInfo.recruit_area;
        break;
      case '진행 방식':
        selected.value = newUserInfo.on_offline;
        break;
      case '연락 방법':
        selected.value = newUserInfo.call_method;
        break;
      default:
        break;
    }
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <article class="flex flex-col gap-[10px]">
    <article class="body-large-m flex gap-1">
      <span>{{ title }}</span>
      <span class="text-red-500">*</span>
    </article>
    <FilterDropdown
      @click:select="handleFilterDropdownClick"
      :items="items"
      :default-text="defaultText"
      :useToPost="true"
      :selected="selected"
    />
  </article>
</template>

<style lang="scss" scoped></style>
