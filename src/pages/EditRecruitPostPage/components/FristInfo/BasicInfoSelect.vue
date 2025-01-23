<script setup>
import FilterDropdown from '@/components/FilterDropdown.vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    default: [{ id: '', name: '' }],
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
    />
  </article>
</template>

<style lang="scss" scoped></style>
