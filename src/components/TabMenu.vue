<script setup>
const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div
    class="w-full flex flex-col justify-center items-center gap-[10px] h-[50px] py-[18px] bg-secondary-1"
  >
    <nav>
      <ul class="body-large-m inline-flex items-center gap-[30px] text-gray-80">
        <li v-for="(item, index) in props.menuItems" :key="index">
          {{ item }}
        </li>
      </ul>
    </nav>
  </div>
</template>
<style scoped></style>
