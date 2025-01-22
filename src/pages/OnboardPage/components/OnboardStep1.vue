<script setup>
import IntroduceInput from '@/components/IntroduceInput.vue';
import NicknameInput from '@/components/NicknameInput.vue';
</script>
<template>
  <div class="min-w-[574px] h-full bg-white/85 z-10">
    <div class="w-full text-center h-9">바가 들어갈 자리</div>
    <section>
      <div class="h4-b text-gray-80">닉네임을 입력해주세요.</div>
      <NicknameInput />
    </section>
    <div class="h4-b text-gray-80">닉네임을 입력해주세요.</div>
    <BaseInput
      :value="shortIntroduce"
      placeholder="한 줄 소개"
      :maxLength="MAX_SHORT_INTRODUCE_LENGTH"
      @input="handleShortIntroduceInput"
    />
  </div>
</template>
<style scoped></style>
