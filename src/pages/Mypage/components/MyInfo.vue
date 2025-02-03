<script setup>
import dropdown_arrow from '@/assets/icons/dropdown_arrow.svg';
import dropdown_arrow_up from '@/assets/icons/dropdown_arrow_up.svg';
import linkIcon from '@/assets/icons/link_icon.svg';
import SkillBadge from '@/components/SkillBadge.vue';
import { SKILLS } from '@/constants/skill';
import { ref } from 'vue';

defineProps({
  userInfo: Object,
});

const introduceToggle = ref(true);
</script>
<template>
  <div class="flex flex-col gap-11 px-10">
    <!-- 자기 소개 -->
    <div class="text-gray-80">
      <div class="flex items-center gap-2.5 mb-2.5">
        <span class="h3-b">자기소개</span>
        <button @click="introduceToggle = !introduceToggle">
          <Transition name="introduceToggle">
            <img v-if="introduceToggle" :src="dropdown_arrow" alt="토글 버튼" />
            <img v-else-if="!introduceToggle" :src="dropdown_arrow_up" alt="토글 버튼" />
          </Transition>
        </button>
      </div>
      <Transition>
        <p
          v-if="introduceToggle"
          class="p-6 bg-secondary-3 rounded-lg input-shadow body-r whitespace-pre-wrap break-all"
        >
          {{ userInfo.long_introduce }}
        </p>
      </Transition>
    </div>

    <!-- 링크 -->
    <div v-if="userInfo.link !== ''" class="flex flex-col gap-2.5">
      <span class="h3-b text-gray-80">링크</span>
      <ul class="flex flex-col gap-2.5">
        <a
          :href="link"
          rel="noopener noreferrer"
          target="_blank"
          v-for="(link, index) in userInfo.link"
          :key="index"
        >
          <li class="flex items-center gap-5 bg-secondary-3 rounded-lg input-shadow py-[5.5px]">
            <img :src="linkIcon" alt="링크 아이콘" class="pl-4" />
            <span class="text-black body-r">{{ link }}</span>
          </li>
        </a>
      </ul>
    </div>

    <!-- 포지션 & 스킬 -->
    <div class="flex flex-col gap-2.5">
      <span class="h3-b text-gray-80">포지션 & 스킬</span>
      <div class="bg-secondary-3 rounded-lg input-shadow flex flex-col gap-7 p-7">
        <!-- 포지션별 기술스택 -->
        <div
          class="flex flex-col gap-2.5"
          v-for="position in userInfo.positions"
          :key="position.id"
        >
          <span class="body-large-m text-black">{{ position.position }}</span>
          <div class="flex items-center gap-4">
            <div v-for="stack in position.stacks" :key="stack.id">
              <SkillBadge>
                <template #icon="{ className }">
                  <img alt="기술 스택 로고" :src="SKILLS[stack]" :class="className" />
                  <span class="text-gray-80">{{ stack }}</span>
                </template>
              </SkillBadge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.hidden {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
