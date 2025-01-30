<script setup>
import { ref } from 'vue';

const dropDown = ref(false);
const dropDownShow = () => {
  dropDown.value = true;
};
const dropDownHide = () => {
  dropDown.value = false;
};
</script>

<template>
  <article class="flex flex-col justify-center items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="36"
      viewBox="0 0 26 28"
      fill="none"
      stroke="currentColor"
      class="text-[#545454] hover:text-primary-4 duration-100 p-1"
      @mouseover="dropDownShow()"
      @mouseleave="dropDownHide()"
    >
      <path
        d="M12.9492 21.9818H22.0292C22.3828 22.0016 22.7355 21.9305 23.0539 21.7753C23.3722 21.6201 23.6454 21.3859 23.8476 21.0952C24.0497 20.8044 24.174 20.4667 24.2086 20.1142C24.2432 19.7618 24.1869 19.4063 24.0452 19.0818C23.5652 17.6311 21.6518 15.8911 21.6518 14.1791C21.6518 10.3791 21.6518 9.37912 19.7798 7.14445C19.1741 6.42516 18.4229 5.84218 17.5758 5.43379L16.5318 4.92712C16.3567 4.82138 16.2056 4.68016 16.0882 4.51253C15.9709 4.3449 15.8899 4.15458 15.8505 3.95379C15.7462 3.277 15.3883 2.66523 14.8495 2.24257C14.3107 1.81991 13.6314 1.618 12.9492 1.67779C12.2793 1.63756 11.6185 1.84848 11.0959 2.26933C10.5732 2.69019 10.2261 3.29078 10.1225 3.95379C10.0755 4.16151 9.98344 4.35636 9.8528 4.52456C9.72216 4.69275 9.55615 4.83018 9.36651 4.92712L8.32251 5.43379C7.4759 5.84234 6.72525 6.42531 6.11985 7.14445C4.24918 9.37912 4.24918 10.3791 4.24918 14.1791C4.24918 15.8911 2.42251 17.4565 1.94251 18.9938C1.65318 19.9231 1.49318 21.9818 3.91585 21.9818H12.9492Z"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.2999 21.9819C17.3114 22.5564 17.2066 23.1273 16.992 23.6603C16.7774 24.1933 16.4574 24.6775 16.0511 25.0838C15.6448 25.4901 15.1606 25.8101 14.6276 26.0247C14.0946 26.2393 13.5237 26.344 12.9493 26.3326C12.3746 26.3448 11.8035 26.2406 11.2702 26.0262C10.7369 25.8119 10.2525 25.4918 9.8462 25.0854C9.43986 24.6789 9.11997 24.1944 8.90578 23.6611C8.6916 23.1277 8.58756 22.5565 8.59992 21.9819"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <article
      v-if="dropDown"
      class="absolute bottom-[-27px] rounded-md bg-primary-4 w-[50px] h-4.5 flex items-center justify-center"
    >
      <span class="caption-r text-white">알림</span>
    </article>
  </article>
</template>

<style lang="scss" scoped></style>
