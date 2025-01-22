<script setup>
import { reactive, ref } from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import PositionSelectButton from '@/components/PositionSelectButton.vue';
import { MAX_SHORT_INTRODUCE_LENGTH, MAX_NICKNAME_LENGTH, POSITION } from '@/constants';

const nickname = ref(''); //닉네임
const shortIntroduce = ref(''); //한 줄 소개
const selectedPositions = reactive([]); // 포지션

const handleNickNameInput = (value) => {
  nickname.value = value;
};

const handleShortIntroduceInput = (value) => {
  shortIntroduce.value = value;
};
</script>

<template>
  <div class="flex flex-col w-full">
    <article class="flex flex-col w-full gap-7">
      <!-- 닉네임 입력 -->
      <section>
        <h3 class="h4-b text-gray-80 mb-[10px]">닉네임을 입력해주세요.</h3>
        <BaseInput
          :value="nickname"
          placeholder="닉네임"
          :maxLength="MAX_NICKNAME_LENGTH"
          className="pr-2 py-2"
          @input="handleNickNameInput"
        >
          <template #rightIcon>
            <button type="button" class="primary-button px-3 py-1.5 shrink-0 body-r">
              중복확인
            </button>
          </template>
        </BaseInput>
        <div class="flex justify-between gap-3 mt-1 caption-r text-gray-50">
          <p>중복된 이름ㆍ특수문자 사용불가</p>
          <p>{{ nickname.length }}/{{ MAX_NICKNAME_LENGTH }}</p>
        </div>
      </section>

      <!-- 한 줄 소개 -->
      <section>
        <h3 class="h4-b text-gray-80 mb-[10px]">간단하게 본인을 소개해주세요.</h3>
        <BaseInput
          :value="shortIntroduce"
          placeholder="한 줄 소개"
          :maxLength="MAX_SHORT_INTRODUCE_LENGTH"
          @input="handleShortIntroduceInput"
        />
        <p class="mt-1 body-r text-gray-50 justify-self-end">
          {{ shortIntroduce.length }}/{{ MAX_SHORT_INTRODUCE_LENGTH }}
        </p>
      </section>

      <!-- 포지션 -->
      <section>
        <div class="flex justify-between w-full">
          <h3 class="h4-b text-gray-80 mb-[10px]">희망하는 포지션을 선택해주세요.</h3>
          <div class="caption-r text-gray-50">최대 3개 선택</div>
        </div>
        <div class="flex flex-wrap gap-[18px]">
          <PositionSelectButton v-for="name in POSITION" :key="name" size="large">
            {{ name }}
          </PositionSelectButton>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped></style>
