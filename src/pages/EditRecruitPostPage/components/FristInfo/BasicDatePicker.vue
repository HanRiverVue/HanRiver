<script setup>
import DatePicker from './DatePicker.vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  pickerType: {
    type: String,
    default: 'date',
    validate: (value) => ['date', 'range'].includes(value),
  },
  userInfo: Object,
});
</script>

<template>
  <article class="flex flex-col gap-[10px]">
    <article class="body-large-m flex gap-1">
      <span>{{ title }}</span>
      <span class="text-red-500">*</span>
    </article>
    <DatePicker :picker-type="props.pickerType" v-model:userInfo="props.userInfo" />
  </article>
</template>

<style lang="scss" scoped></style>
