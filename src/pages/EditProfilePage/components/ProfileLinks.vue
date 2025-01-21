<script setup>
import { CancelIcon, LinkIcon, PlusIcon } from '@/assets/icons';
import BaseInput from '@/components/BaseInput.vue';

const props = defineProps({
  links: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['addLink', 'removeLink', 'updateLink']);

const handleLinkInput = (id, value) => {
  emit('updateLink', id, value);
};
</script>
<template>
  <section>
    <div class="flex items-center justify-between gap-10 mb-3">
      <h2 class="text-gray-80 h2-b">링크</h2>
      <button
        type="button"
        class="primary-button flex items-center gap-1.5 body-r px-3 py-1.5 h-fit"
        @click="emit('addLink')"
      >
        <PlusIcon class="w-[18px] h-[18px] text-white" />
        링크 추가
      </button>
    </div>
    <div class="flex flex-col gap-3">
      <BaseInput
        v-for="(link, index) in props.links"
        :key="index"
        :value="link.value"
        placeholder="포트폴리오, 구글 드라이브 파일 등 업무 성과를 보여줄 수 있는 링크가 있다면 추가해 주세요"
        @input="handleLinkInput(index, $event)"
      >
        <template #leftIcon="{ isFocused }">
          <LinkIcon :className="isFocused ? 'w-5 h-5 text-primary-3' : 'w-5 h-5 text-gray-50'" />
        </template>
        <template #rightIcon>
          <button type="button" @click="emit('removeLink', index)">
            <CancelIcon className="text-gray-50 w-5 h-5" />
          </button>
        </template>
      </BaseInput>
    </div>
  </section>
</template>
<style scoped></style>
