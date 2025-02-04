<script setup>
import BaseInput from '@/components/BaseInput.vue';
import EditTitle from '@/pages/EditRecruitPostPage/components/EditTitle.vue';
import Editor from 'primevue/editor';
import { ref } from 'vue';

const props = defineProps({
  userInfo: Object,
});

const handleBaseInputInput = (value) => {
  props.userInfo.title = value;
};

const editorRef = ref(null);
const handleEditorFocusKeydown = (event) => {
  if (event.key === 'Tab') {
    event.preventDefault();
    editorRef.value.quill.focus();
  }
};
</script>

<template>
  <article
    class="flex flex-col w-full px-6 mb-4 bg-white rounded-md gap-7 py-9 drop-shadow-post-editor-shadow"
  >
    <EditTitle
      :index="3"
      :title="`${props.userInfo.recruit_type || '프로젝트'}의 세부 내용을 작성해주세요`"
    />
    <article class="flex flex-col gap-3">
      <BaseInput
        :value="props.userInfo.title"
        placeholder="제목을 작성해주세요"
        class="'border h3-b'"
        @input="handleBaseInputInput"
        @keydown="handleEditorFocusKeydown"
      />
      <Editor v-model="props.userInfo.body" editorStyle="height: 600px" ref="editorRef" />
    </article>
  </article>
</template>

<style lang="scss" scoped></style>
