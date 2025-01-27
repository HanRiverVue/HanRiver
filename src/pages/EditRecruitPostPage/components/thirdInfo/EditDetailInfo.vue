<script setup>
import BaseInput from '@/components/BaseInput.vue';
import EditTitle from '@/pages/EditRecruitPostPage/components/EditTitle.vue';
import Editor from 'primevue/editor';
import { ref, watch } from 'vue';

const props = defineProps({
  userInfo: Object,
});
const emit = defineEmits(['update:data']);

const localBody = ref(props.userInfo.body);

watch(
  () => props.userInfo,
  (newValue) => {
    localBody.value = newValue;
  },
);

watch(
  () => localBody.value,
  (newValue) => {
    props.userInfo.body = newValue;
  },
);

const handleBaseInputInput = (value) => {
  props.userInfo.title = value;
};

const editerRef = ref(null);
const handleEditorFocusKeydown = (event) => {
  if (event.key === 'Tab') {
    event.preventDefault();
    editerRef.value.quill.focus();
  }
};
</script>

<template>
  <article
    class="flex flex-col gap-7 w-full rounded-md px-6 py-9 mb-4 bg-white drop-shadow-post-editor-shadow"
  >
    <EditTitle :index="3" title="프로젝트의 세부 내용을 작성해주세요" />
    <article class="flex flex-col gap-3">
      <BaseInput
        :value="props.userInfo.title"
        v-model:userInfo="props.userInfo"
        placeholder="제목을 작성해주세요"
        className="h3-b"
        @input="handleBaseInputInput"
        @keydown="handleEditorFocusKeydown"
      />
      <Editor v-model="localBody" editorStyle="height: 600px" ref="editerRef" />
    </article>
  </article>
</template>

<style lang="scss" scoped></style>
