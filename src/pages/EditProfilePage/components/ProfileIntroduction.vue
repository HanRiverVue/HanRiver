<script setup>
import { MAX_INTRODUCE_LENGTH } from '@/constants';

const props = defineProps({
  introduction: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['updateIntroduction']);

const handleIntroductionInput = ($event) => {
  emit('updateIntroduction', $event.target.value);
};
</script>
<template>
  <section>
    <h2 class="text-gray-80 h2-b mb-2">자기소개</h2>
    <textarea
      :value="props.introduction"
      placeholder="본인에 대해 더 자세하게 소개해주세요. (ex. 프로젝트 이력, 관심있는 분야 등)"
      class="input-shadow w-full px-4 py-3 rounded-lg resize-none placeholder:text-gray-40 gray-80 border border-transparent focus:border-primary-3"
      rows="8"
      @input="handleIntroductionInput"
    />
    <p class="text-gray-50 body-r justify-self-end">
      {{ props.introduction.length }}/{{ MAX_INTRODUCE_LENGTH }}
    </p>
  </section>
</template>
<style scoped></style>
