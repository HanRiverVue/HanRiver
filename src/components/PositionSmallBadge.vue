<script setup>
defineProps({
  position: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <span class="py-[3px] px-2.5 bg-gray-5 text-primary-2 rounded-md caption-b">
    {{ position }}
  </span>
</template>
<style scoped></style>
