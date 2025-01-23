<script setup>
const props = defineProps({
  index: {
    type: Number,
  },
  title: {
    type: String,
  },
});
</script>

<template>
  <article class="flex gap-3 items-center jc">
    <article class="w-6 h-6 rounded-full bg-primary-2 flex items-center justify-center">
      <span class="text-white h4-b">{{ props.index }}</span>
    </article>
    <span class="h2-b">{{ props.title }}</span>
  </article>
</template>

<style lang="scss" scoped></style>
