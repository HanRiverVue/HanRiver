<script setup>
import { onBeforeUnmount, reactive } from 'vue';
import { selects, editPositionAndSkills } from '@/pages/EditRecruitPostPage/index';
import EditTitle from '@/pages/EditRecruitPostPage/components/EditTitle.vue';
import BasicInfoSelect from '@/pages/EditRecruitPostPage/components/FristInfo/BasicInfoSelect.vue';
import PositionSelectButton from '@/components/PositionSelectButton.vue';
import SkillSelectButton from '@/components/SkillSelectButton.vue';
import BasicInfoInput from './BasicInfoInput.vue';
import DatePicker from './DatePicker.vue';
import { SKILLS } from '@/constants/skill';
import BasicDatePicker from './BasicDatePicker.vue';

const props = defineProps({
  userInfo: Object,
  positionAndSkills: Array,
});
const emit = defineEmits(['update:data']);

const selectedPositions = reactive([]);

const handlePositionButtonClick = (PIndex) => {
  if (!props.positionAndSkills[PIndex].positionSelected) {
    if (selectedPositions.length >= 3) return;
    props.positionAndSkills[PIndex].positionSelected = true;
    selectedPositions.push(props.positionAndSkills[PIndex]);
  } else {
    props.positionAndSkills[PIndex].positionSelected = false;
    const posIndex = selectedPositions.findIndex(
      (pos) => pos.position === editPositionAndSkills[PIndex].position,
    );
    if (posIndex !== -1) {
      selectedPositions[posIndex].selectedSkills = [];
      selectedPositions.splice(posIndex, 1);
    }
  }
};

const handleSkillButtonClick = (pIndex, skill) => {
  if (!selectedPositions[pIndex].selectedSkills.includes(skill)) {
    selectedPositions[pIndex].selectedSkills.push(skill);
  } else {
    const posIndex = selectedPositions[pIndex].selectedSkills.findIndex((pos) => pos === skill);
    if (posIndex !== -1) {
      selectedPositions[pIndex].selectedSkills.splice(posIndex, 1);
    }
  }
};
</script>

<template>
  <article
    class="flex flex-col gap-7 w-full rounded-md px-6 py-9 mb-10 bg-white drop-shadow-post-editor-shadow"
  >
    <EditTitle :index="1" title="프로젝트 시작을 위해 기본 정보를 입력해주세요" />
    <!-- 기본 정보 -->
    <article class="mt-4 flex gap-10">
      <article class="flex flex-col gap-7 w-[calc(50%-20px)] justify-between">
        <template v-for="select of selects">
          <BasicInfoSelect
            :title="select.title"
            :items="select.items"
            :default-text="select.defaultText"
            v-model:userInfo="props.userInfo"
          />
        </template>
      </article>
      <article class="flex flex-col gap-7 w-[calc(50%-20px)] justify-between">
        <BasicInfoInput
          title="모집 인원"
          placeholder="모집 인원을 입력해주세요(최대 10명)"
          type="number"
          :max-length="2"
          v-model:userInfo="props.userInfo"
        />
        <!-- datePicker -->
        <BasicDatePicker title="모집 마감일" picker-type="date" v-model:userInfo="props.userInfo" />
        <BasicDatePicker title="진행 기간" picker-type="range" v-model:userInfo="props.userInfo" />
        <!-- datePicker -->
        <BasicInfoInput
          title="연락처"
          placeholder="연락처를 입력해주세요(전화번호, 메신저 링크 등)"
          type="string"
          v-model:userInfo="props.userInfo"
        />
      </article>
    </article>
    <!-- 모집 포지션 -->
    <article class="flex flex-col gap-[10px]">
      <article class="body-large-m flex gap-1">
        <span>모집 포지션</span>
        <span class="text-red-500">*</span>
      </article>
      <article class="w-full p-7 rounded-md flex items-center justify-between input-shadow">
        <template v-for="(position, index) of props.positionAndSkills">
          <PositionSelectButton
            size="small"
            v-bind:is-selected="position.positionSelected"
            @click="handlePositionButtonClick(index)"
            >{{ position.position }}</PositionSelectButton
          >
        </template>
      </article>
    </article>
    <!-- 사용 예정 스킬 -->
    <article class="flex flex-col gap-[10px]">
      <template v-for="(position, pIndex) of selectedPositions">
        <article class="body-large-m flex gap-1">
          <span>{{ position.position }}</span>
          <span class="text-red-500">*</span>
        </article>
        <article class="w-full p-7 rounded-md flex flex-wrap items-center gap-4 input-shadow">
          <SkillSelectButton
            v-for="skill of position.skills"
            @click="handleSkillButtonClick(pIndex, skill)"
            :is-selected="position.selectedSkills.includes(skill)"
          >
            <template #icon="{ className }"
              ><img :src="SKILLS[skill]" :class="className" alt="기술스택 이미지"
            /></template>
            <slot>{{ skill }}</slot>
          </SkillSelectButton>
        </article>
      </template>
    </article>
  </article>
</template>

<style lang="scss" scoped></style>
