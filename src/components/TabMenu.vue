<script setup>
const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
  activeIndex: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['updateIndex']);
</script>
<template>
  <div class="w-full flex flex-col justify-center items-center h-[50px] py-[18px] bg-secondary-1">
    <nav>
      <ul class="body-large-m inline-flex items-center gap-[30px] text-gray-80">
        <li
          v-for="(item, index) in props.menuItems"
          :key="index"
          class="cursor-pointer"
          @click="emit('updateIndex', index)"
          :class="props.activeIndex === index && 'text-primary-2'"
        >
          {{ item }}
        </li>
      </ul>
    </nav>
  </div>
</template>
<style scoped></style>
