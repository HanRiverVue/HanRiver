<script setup></script>
<template>
  <span class="w-fit flex items-center gap-1.5 p-1.5 pr-2.5 rounded-full border bg-white">
    <slot name="icon" :className="'w-6 h-6'"></slot>
    <slot class="text-gray-80 caption-r"></slot>
  </span>
</template>
<style scoped></style>
