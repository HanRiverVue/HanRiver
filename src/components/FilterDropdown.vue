<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { twMerge } from 'tailwind-merge';
import { dropdown_arrow_icon } from '@/assets/icons';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  defaultText: {
    type: String,
    default: '옵션 선택',
  },
  selected: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['click:select']);

const isDropdownOpen = ref(false); // 드롭다운 상태
const selectedItem = ref(null); // 선택한 아이템
const dropdownRef = ref(null);

const handleDropdownClick = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleSelectClick = (itemName) => {
  selectedItem.value = itemName;
  emit('click:select', itemName); // 부모로 선택된 값 전달
  isDropdownOpen.value = false;
};

const selectContainerStyle = computed(() =>
  twMerge('w-full relative min-w-[126px] body-r', props.class),
);

const selectBoxButtonStyle = computed(() =>
  twMerge(
    'flex items-center justify-between w-full py-1 pl-3 pr-1.5 rounded-lg bg-white input-shadow text-gray-50 border border-transparent',
    selectedItem.value && 'border-primary-3 text-primary-3',
  ),
);

const getSelectItemClass = (itemName) =>
  twMerge(
    'px-4 py-1 hover:bg-secondary-1 cursor-pointer',
    selectedItem.value === itemName && 'text-primary-3 body-b',
  );

const handleOutsideClick = (e) => {
  if (!dropdownRef.value || !dropdownRef.value.contains(e.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  if (props.selected) selectedItem.value = props.selected;
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
      <span>{{ selectedItem || defaultText }}</span>
      <img :src="dropdown_arrow_icon" alt="드롭다운 화살표" class="w-6 h-6" />
    </button>

    <!-- 드롭다운 메뉴 -->
    <div
      v-if="isDropdownOpen"
      class="absolute w-full my-2 py-1 bg-white rounded-lg card-shadow text-gray-50 overflow-hidden"
    >
      <ul class="flex flex-col max-h-[182px] overflow-auto dropdown-scrollbar">
        <li
          v-for="(item, index) in items"
          :key="index"
          :class="getSelectItemClass(item)"
          @click="handleSelectClick(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped></style>
