<script setup>
import DatePicker from 'primevue/datepicker';
import { computed, onMounted, ref, watch } from 'vue';

const props = defineProps({
  pickerType: {
    type: String,
    default: 'date',
    validate: (value) => ['date', 'range'].includes(value),
  },
  userInfo: Object,
});

const minDate = new Date();
const date = ref();
const dates = ref();
let isInitialLoad = true;
watch(
  () => dates.value,
  () => {
    props.userInfo.start_date = dates.value[0];
    props.userInfo.end_date = dates.value[1];
    isInitialLoad = false;
  },
);
watch(
  () => date.value,
  () => {
    props.userInfo.recruit_deadline = date.value;
    isInitialLoad = false;
  },
);
// 수정시 post 날짜들 불러오기
watch(
  () => props.userInfo,
  () => {
    const start = new Date(props.userInfo.start_date);
    const end = new Date(props.userInfo.end_date);
    const deadLine = new Date(props.userInfo.recruit_deadline);
    if (
      props.userInfo.start_date &&
      props.userInfo.end_date &&
      props.userInfo.recruit_deadline &&
      isInitialLoad
    ) {
      date.value = deadLine;
      dates.value = [start, end];
    }
  },
  { immediate: true, deep: true },
);
</script>

<template>
  <div>
    <DatePicker
      v-if="pickerType === 'date'"
      v-model="date"
      :minDate="minDate"
      :inputClass="'custom-class'"
      placeholder="마감일을 입력해주세요"
      :class="{ 'has-value': date }"
    />
    <DatePicker
      v-else-if="pickerType === 'range'"
      v-model="dates"
      :minDate="minDate"
      selectionMode="range"
      :manualInput="false"
      :inputClass="'custom-class'"
      placeholder="진행 기간을 입력해주세요"
      :class="{ 'has-value': dates }"
    />
  </div>
</template>

<style scoped>
::v-deep(.custom-class) {
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  color: #3b3b3b;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.11);
  width: 100%; /* w-full */
  border-radius: 0.5rem; /* rounded-lg */
  border: 1px solid transparent; /*border border-transparent*/
  display: flex; /* flex */
  gap: 0.375rem; /* gap-1.5 (1.5 * 0.25rem) */
  align-items: center; /* items-center */
  padding-left: 1rem; /* px-4 */
  padding-right: 1rem; /* px-4 */
  padding-top: 0.75rem; /* py-3 */
  padding-bottom: 0.75rem; /* py-3 */
  background-color: #ffffff; /* bg-white */
}
::v-deep(.custom-class::placeholder) {
  color: rgb(133, 133, 133);
}
/* 직접적인 컴포넌트 속성을 건드렸습니다. */
::v-deep(.p-component) {
  width: 100%;
}
::v-deep(.has-value .p-inputtext) {
  border: solid 1px rgb(75, 175, 255);
  color: rgb(75, 175, 255);
}
/* DatePicker 활성화된 날짜의 배경색 변경 */
::v-deep(.p-datepicker .p-datepicker-calendar .p-highlight) {
  background-color: rgb(75, 175, 255) !important;
}

/* Input focus 색상 변경 */
::v-deep(.p-inputtext:focus) {
  border-color: rgb(75, 175, 255) !important;
}
::v-deep(.p-inputtext:hover) {
  border-color: rgb(75, 175, 255) !important;
}
::v-deep(.p-datepicker-day-view .p-datepicker-day-cell.p-highlight) {
  background-color: rgb(75, 175, 255) !important; /* 선택된 날짜 색상 (적용 안됨)*/
}
::v-deep(.p-datepicker-day-view .p-datepicker-day-cell.p-highlight-range) {
  background-color: rgb(145, 205, 255) !important; /* 선택 범위 색상 (적용 안됨)*/
}
</style>
