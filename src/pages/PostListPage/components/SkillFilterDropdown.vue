<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { twMerge } from 'tailwind-merge';
import { dropdown_arrow_icon } from '@/assets/icons';
import { POSITION_FILTER_GROUPS } from '@/constants/filter';
import SkillSelectButton from '@/components/SkillSelectButton.vue';

const props = defineProps({
  selected: {
    type: Array,
    default: null,
  },
  class: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['selectSkill']);

const isDropdownOpen = ref(false); // 드롭다운 상태
const selectedTab = ref('전체');
const dropdownRef = ref(null);
//const filterList = ref(['전체', ...POSITION]);

const handleDropdownClick = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectContainerStyle = computed(() =>
  twMerge('w-full relative min-w-[126px] body-r', props.class),
);

const selectBoxButtonStyle = computed(() =>
  twMerge(
    'flex items-center justify-between w-full py-1 pl-3 pr-1.5 rounded-lg bg-white input-shadow text-gray-50 border border-transparent',
    props.selected.length > 0 && 'border-primary-3 text-primary-3',
  ),
);

const getSelectTabClass = (tabName) =>
  twMerge(
    'border-b-2 border-transparent cursor-pointer',
    selectedTab.value === tabName && 'border-primary-3 text-primary-3',
  );

const handleSelectTab = (newTab) => {
  selectedTab.value = newTab;
};

const handleOutsideClick = (e) => {
  if (!dropdownRef.value || !dropdownRef.value.contains(e.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>
<template>
  <div ref="dropdownRef" :class="selectContainerStyle">
    <!-- 셀렉트 박스 버튼 -->
    <button :class="selectBoxButtonStyle" @click="handleDropdownClick">
      <span class="whitespace-nowrap overflow-hidden text-ellipsis">
        {{ props.selected.join(', ') || '스킬' }}
      </span>
      <img :src="dropdown_arrow_icon" alt="드롭다운 화살표" class="w-6 h-6" />
    </button>

    <!-- 드롭다운 메뉴 -->
    <div
      v-if="isDropdownOpen"
      class="absolute w-[800px] my-2 px-4 pt-2 pb-3 bg-white rounded-lg card-shadow text-gray-50 border border-gray-5"
    >
      <ul class="flex gap-4 body-m mb-4">
        <li
          v-for="(position, index) in Object.keys(POSITION_FILTER_GROUPS)"
          :key="index"
          :class="getSelectTabClass(position)"
          @click="handleSelectTab(position)"
        >
          {{ position }}
        </li>
      </ul>
      <ul
        class="flex flex-wrap gap-3 min-h-[88px] max-h-[140px] h-full overflow-auto dropdown-scrollbar"
      >
        <li v-for="(skill, index) in POSITION_FILTER_GROUPS[selectedTab]" :key="index">
          <SkillSelectButton
            :isSelected="props.selected.includes(skill.name)"
            @click="emit('selectSkill', skill.name)"
          >
            <template #icon="{ className }">
              <img :src="skill.image" :alt="skill.name" :class="className" />
            </template>
            <span>{{ skill.name }}</span>
          </SkillSelectButton>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped></style>
