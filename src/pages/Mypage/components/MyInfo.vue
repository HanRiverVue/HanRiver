<script setup>
import toggleBtn from '@/assets/icons/toggle_img.svg';
import linkIcon from '@/assets/icons/link_icon.svg';
import SkillBadge from '@/components/SkillBadge.vue';
import vueLogo from '@/assets/images/skills-logo-vue.png';
</script>
<template>
  <div class="flex flex-col gap-11 px-10">
    <!-- 자기 소개 -->
    <div class="text-gray-80">
      <div class="flex items-center gap-2.5 mb-2.5">
        <span class="h3-b">자기소개</span>
        <button><img :src="toggleBtn" alt="토글 버튼" /></button>
      </div>
      <p class="p-6 bg-secondary-3 rounded-lg input-shadow body-r">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem iure sit nobis eaque ipsa!
        Reprehenderit nobis totam pariatur earum assumenda culpa est officia, quo ducimus odio
        labore ullam consectetur autem laboriosam maxime, rem corrupti! Consequuntur nobis,
        reiciendis officiis veritatis repellat illo minima voluptatum voluptas molestiae quo soluta
        alias aspernatur eaque cum culpa! Nisi nulla voluptatem impedit minus nobis esse sequi qui
        ex fugit quidem repellendus aliquam quod perferendis eaque et quo cumque reprehenderit
        laborum quam, sapiente, commodi non! Inventore, a! Illo delectus fuga obcaecati nobis fugiat
        enim natus quam rem, dolores ratione ab consequuntur doloremque quos id blanditiis labore
        iste.
      </p>
    </div>

    <!-- 링크 -->
    <div class="flex flex-col gap-2.5">
      <span class="h3-b text-gray-80">링크</span>
      <ul class="flex flex-col gap-2.5">
        <li class="flex items-center gap-5 bg-secondary-3 rounded-lg input-shadow py-[5.5px]">
          <img :src="linkIcon" alt="링크 아이콘" class="pl-4" />
          <span class="text-black body-r">https://naver.com</span>
        </li>
      </ul>
    </div>

    <!-- 포지션 & 스킬 -->
    <div class="flex flex-col gap-2.5">
      <span class="h3-b text-gray-80">포지션 & 스킬</span>
      <div class="bg-secondary-3 rounded-lg input-shadow">
        <!-- 포지션별 기술스택 -->
        <div class="p-7 flex flex-col gap-2.5">
          <span class="body-large-m text-black">백엔드</span>
          <div class="flex items-center gap-4">
            <SkillBadge>
              <template #icon="{ className }">
                <img :src="vueLogo" alt="기술 스택 로고" :class="className" />
                <span class="text-gray-80">Vue</span>
              </template>
            </SkillBadge>
            <SkillBadge>
              <template #icon="{ className }">
                <img :src="vueLogo" alt="기술 스택 로고" :class="className" />
                <span class="text-gray-80">Vue</span>
              </template>
            </SkillBadge>
            <SkillBadge>
              <template #icon="{ className }">
                <img :src="vueLogo" alt="기술 스택 로고" :class="className" />
                <span class="text-gray-80">Vue</span>
              </template>
            </SkillBadge>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
