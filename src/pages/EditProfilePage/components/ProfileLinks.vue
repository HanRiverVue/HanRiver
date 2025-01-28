<script setup>
import { CancelIcon, LinkIcon, PlusIcon } from '@/assets/icons';
import BaseInput from '@/components/BaseInput.vue';
import { useProfileStore } from '@/stores/profile';

const profileStore = useProfileStore();

const handleLinkInput = (index, value) => {
  profileStore.updateLink(index, value);
};
</script>
<template>
  <section>
    <div class="flex items-center justify-between gap-10 mb-3">
      <h2 class="text-gray-80 h2-b">링크</h2>
      <button
        type="button"
        class="primary-button flex items-center gap-1.5 body-r px-3 py-1.5 h-fit"
        @click="profileStore.addLink"
      >
        <PlusIcon class="w-[18px] h-[18px] text-white" />
        링크 추가
      </button>
    </div>
    <div class="flex flex-col gap-3">
      <BaseInput
        v-for="(link, index) in profileStore.links"
        :key="index"
        :value="link"
        placeholder="포트폴리오, 구글 드라이브 파일 등 업무 성과를 보여줄 수 있는 링크가 있다면 추가해 주세요"
        @input="handleLinkInput(index, $event)"
      >
        <template #leftIcon="{ isFocused }">
          <LinkIcon :class="isFocused ? 'w-5 h-5 text-primary-3' : 'w-5 h-5 text-gray-50'" />
        </template>
        <template #rightIcon>
          <button type="button" @click="profileStore.deleteLink(index)">
            <CancelIcon class="text-gray-50 w-5 h-5" />
          </button>
        </template>
      </BaseInput>
    </div>
  </section>
</template>
<style scoped></style>
