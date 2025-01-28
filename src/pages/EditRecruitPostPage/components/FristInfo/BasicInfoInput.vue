<script setup>
import BaseInput from '@/components/BaseInput.vue';
import { computed } from 'vue';
const props = defineProps({
  userInfo: {
    type: Object,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  maxLength: {
    type: Number,
    default: null,
  },
});

const handleBaseInputInput = (value) => {
  switch (props.title) {
    case '모집 인원':
      if (value < 1) {
        props.userInfo.recruit_count = 1;
      } else if (value > 10) {
        props.userInfo.recruit_count = 10;
      } else {
        props.userInfo.recruit_count = value;
      }
      break;
    case '연락처':
      props.userInfo.call_link = value;
      break;
    default:
      break;
  }
};

const selectedValues = computed(() => {
  switch (props.title) {
    case '모집 인원':
      return String(props.userInfo.recruit_count);
    case '연락처':
      return props.userInfo.call_link;
    default:
      return '';
  }
});
</script>

<template>
  <article class="flex flex-col gap-[10px]">
    <article class="body-large-m flex gap-1">
      <span>{{ title }}</span>
      <span class="text-red-500">*</span>
    </article>
    <BaseInput
      :placeholder="props.placeholder"
      :type="props.type"
      :max-length="props.maxLength"
      :value="selectedValues"
      @input="handleBaseInputInput"
      className="body-r"
    />
  </article>
</template>

<style lang="scss" scoped></style>
