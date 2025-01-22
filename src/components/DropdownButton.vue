<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => (isOpen.value = !isOpen.value);
const closeDropdown = () => (isOpen.value = false);

const handleOutsideClick = (event) => {
  if (isOpen.value && dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown();
  }
};

onMounted(() => document.addEventListener('click', handleOutsideClick));
onBeforeUnmount(() => document.removeEventListener('click', handleOutsideClick));

defineExpose({ isOpen, closeDropdown });
</script>
<template>
  <div class="relative" ref="dropdownRef">
    <slot name="trigger" :toggleDropdown="toggleDropdown"></slot>
    <slot name="menu" :isOpen="isOpen" :closeDropdown="closeDropdown"></slot>
  </div>
</template>
<style scoped></style>
