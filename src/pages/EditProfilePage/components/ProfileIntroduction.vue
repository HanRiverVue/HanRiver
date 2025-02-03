<script setup>
import { MAX_INTRODUCE_LENGTH } from '@/constants';
import { useProfileStore } from '@/stores/profile';

const profileStore = useProfileStore();

const handleIntroductionInput = (event) => {
  if (event.target.value.length > MAX_INTRODUCE_LENGTH) {
    event.target.value = event.target.value.slice(0, MAX_INTRODUCE_LENGTH);
  }
  profileStore.setLongIntroduction(event.target.value);
};
</script>
<template>
  <section>
    <h2 class="text-gray-80 h2-b mb-2">자기소개</h2>
    <textarea
      :value="profileStore.longIntroduction"
      placeholder="본인에 대해 더 자세하게 소개해주세요. (ex. 프로젝트 이력, 관심있는 분야 등)"
      class="input-shadow w-full px-4 py-3 rounded-lg resize-none placeholder:text-gray-40 gray-80 border border-transparent focus:border-primary-3"
      rows="8"
      @input="handleIntroductionInput"
    />
    <p class="text-gray-50 body-r justify-self-end">
      {{ profileStore.longIntroduction.length }}/{{ MAX_INTRODUCE_LENGTH }}
    </p>
  </section>
</template>
<style scoped></style>
