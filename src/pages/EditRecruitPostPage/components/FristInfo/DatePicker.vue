<script setup>
import DatePicker from 'primevue/datepicker';
import { ref, watch } from 'vue';

const props = defineProps({
  pickerType: {
    type: String,
    default: 'date',
    validate: (value) => ['date', 'range'].includes(value),
  },
  userInfo: Object,
});

const minDate = new Date();
const dates = ref();
watch(
  () => dates.value,
  () => {
    props.userInfo.start_date = dates.value[0];
    props.userInfo.end_date = dates.value[1];
  },
);
</script>

<template>
  <div>
    <DatePicker
      v-if="pickerType === 'date'"
      v-model="props.userInfo.recruit_deadline"
      :minDate="minDate"
      :inputClass="'custom-class'"
      placeholder="마감일을 입력해주세요"
    />
    <DatePicker
      v-else-if="pickerType === 'range'"
      v-model="dates"
      :minDate="minDate"
      selectionMode="range"
      :manualInput="false"
      :inputClass="'custom-class'"
      placeholder="진행 기간을 입력해주세요"
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
.p-component {
  width: 100%;
}
</style>
