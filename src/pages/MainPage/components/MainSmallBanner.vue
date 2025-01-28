<script setup>
defineProps({
  to: String,
  bgColor: String,
  bannerCaption: String,
  icon: String,
  iconAlt: String,
  title: String,
  bannerImage: String,
  bannerAlt: String,
  imagePosition: String,
});
</script>
<template>
  <RouterLink :to="to">
    <div class="relative w-[360px] h-[205px] px-[30px] py-[30px] rounded-md" :class="bgColor">
      <h3 class="h3-b text-primary-1">
        <p class="flex gap-1 items-center mb-[7px] caption-r text-gray-50">
          {{ bannerCaption }} <img class="mb-1" :src="icon" :alt="iconAlt" />
        </p>
        {{ title }}
      </h3>
      <div class="absolute" :class="imagePosition">
        <img :src="bannerImage" :alt="bannerAlt" />
      </div>
    </div>
  </RouterLink>
</template>
<style scoped></style>
