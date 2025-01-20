<template>
  <!-- 흐린 배경 -->
  <div class="bg-gray-40 w-full h-full fixed top-0 left-0 flex justify-center items-center">
    <!-- 모달창 (opacity 적용 안됨) -->
    <div
      class="py-8 px-12 w-[330px] max-w-[330px] flex flex-col items-start gap-[10px] absolute top-[50%] left-[50%] rounded-[20px] transform: translate-x-[-50%] translate-y-[-50%] bg-secondary-2"
    >
      <div class="flex flex-col items-center gap-[16px] self-stretch">
        <p class="h4-b text-gray-70">
          <slot></slot>
        </p>
        <div class="flex gap-[16px] w-full mt-[16px]">
          <button class="body-r text-gray-70 modal-button-shadow p-2 rounded-[8px] flex-grow">
            돌아가기
          </button>
          <button
            class="body-r bg-[#364861] modal-button-shadow text-white p-2 rounded-[8px] flex-grow"
          >
            완료하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 흐린 배경에만 opacity 적용 */
.bg-gray-100 {
  background-color: rgba(169, 169, 169, 0.7); /* opacity 적용된 배경 */
}
</style>
