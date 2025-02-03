<script setup>
import { SearchIcon } from '@/assets/icons';
import BaseInput from '@/components/BaseInput.vue';

defineProps({
  value: String,
});

const emit = defineEmits(['search']);

const handleChange = (input) => {
  emit('search', input);
};
</script>

<template>
  <form @submit.prevent class="relative w-[258px]">
    <BaseInput
      @input="handleChange"
      :value="value"
      placeholder="제목 또는 내용을 검색하세요"
      class="py-2 body-r"
    >
      <template #rightIcon="{ isFocused }">
        <button type="submit">
          <SearchIcon :class="isFocused ? 'text-primary-3 w-5 h-5' : 'text-gray-30 w-5 h-5'" />
        </button>
      </template>
    </BaseInput>
  </form>
</template>
