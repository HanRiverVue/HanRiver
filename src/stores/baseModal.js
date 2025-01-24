import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBaseModalStore = defineStore('baseModal', () => {
  const isVisible = ref(false);
  const title = ref('');
  const confirmText = ref('완료하기');
  const cancelText = ref('취소하기');
  // 완료를 눌렀을때 발생시킬 함수
  const onConfirm = ref(null);

  // 각 페이지에서 AppButton 클릭했을때 모달창을 보여주는 함수
  const showModal = (obj) => {
    isVisible.value = true;
    title.value = obj.title;
    confirmText.value = obj.confirmText || '완료하기';
    cancelText.value = obj.cancelText || '취소하기';
    onConfirm.value = obj.onConfirm;
  };

  const hideModal = () => {
    isVisible.value = false;
    title.value = '제목을 지어주세요..';
    confirmText.value = '완료하기';
    cancelText.value = '취소하기';
    onConfirm.value = null;
  };

  return {
    isVisible,
    title,
    confirmText,
    cancelText,
    onConfirm,

    showModal,
    hideModal,
  };
});
