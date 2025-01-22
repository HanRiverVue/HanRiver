<script setup>
import { SearchIcon } from '@/assets/icons';
import BaseInput from '@/components/BaseInput.vue';
</script>

<template>
  <form class="relative w-[258px]">
    <BaseInput placeholder="제목 또는 내용을 검색하세요" className="py-2 body-r">
      <template #rightIcon="{ isFocused }">
        <button type="submit">
          <SearchIcon :className="isFocused ? 'text-primary-3 w-5 h-5' : 'text-gray-30 w-5 h-5'" />
        </button>
      </template>
    </BaseInput>
  </form>
</template>
