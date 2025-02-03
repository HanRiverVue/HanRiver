<script setup>
import { computed, ref, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ArrowRight from '@/assets/icons/arrow_right.svg';
import ArrowLeft from '@/assets/icons/arrow_left.svg';
import PostCard from '@/components/PostCard.vue';
import StatusBadge from '@/components/StatusBadge.vue';

const props = defineProps({
  title: String,
  badgeText: String,
  badgeStatus: String,
  posts: { type: Array, default: () => [] },
  isLoading: Boolean,
});

const swiperId = computed(() => `swiper-${props.title.replace(/\s+/g, '-')}`);
const swiperInstance = ref(null);

const handleSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const updateSwiper = () => {
  if (swiperInstance.value) {
    swiperInstance.value.update();
    swiperInstance.value.loopDestroy();
    swiperInstance.value.loopCreate();
  }
};

watch(() => props.posts, updateSwiper, { deep: true });
</script>

<template>
  <article class="relative">
    <div class="swiper-wrap relative mb-[60px]">
      <div class="mb-6 flex justify-between items-center">
        <div class="flex flex-wrap items-center gap-2.5">
          <h2 class="h1-b text-gray-90">{{ title }}</h2>
          <StatusBadge :status="badgeStatus" class="px-2.5 py-[3px]">
            {{ badgeText }}
          </StatusBadge>
        </div>

        <div :id="swiperId" class="flex justify-end space-x-2">
          <button class="scroll-arrow left-arrow">
            <img :src="ArrowLeft" alt="left" />
          </button>
          <button class="scroll-arrow right-arrow">
            <img :src="ArrowRight" alt="right" />
          </button>
        </div>
      </div>
      <swiper
        :modules="[Navigation]"
        :slides-per-view="4"
        :space-between="32"
        :loop="true"
        :loop-additional-slides="4"
        @swiper="handleSwiper"
        :navigation="{
          nextEl: `#${swiperId} .right-arrow`,
          prevEl: `#${swiperId} .left-arrow`,
        }"
        :breakpoints="{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }"
      >
        <swiper-slide v-for="post in posts" :key="post.id">
          <PostCard
            :id="post.id"
            :user_id="post.author"
            :user-image="post.profile_img_path"
            :user-name="post.name"
            :project-title="post.title"
            :skills="post.tech_stacks"
            :position="post.positions"
            :application-deadline="post.recruit_deadline"
          />
        </swiper-slide>
      </swiper>
    </div>
  </article>
</template>
