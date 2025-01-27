<script setup>
import { signInWithGithub, signInWithGoogle, signInWithKakao } from '@/api/supabase/auth';
import googleIcon from '@/assets/icons/google_icon.svg';
import githubIcon from '@/assets/icons/github_icon.svg';
import kakaoIcon from '@/assets/icons/kakao_icon.svg';
import logo from '@/assets/icons/logo.svg';
import { CancelIcon } from '@/assets/icons';
import { useLoginModalStore } from '@/stores/loginModal';

const loginModalStore = useLoginModalStore();
const closeLoginModal = () => {
  loginModalStore.setLoginModal(false);
};

const signInProviders = [
  {
    id: 'google',
    name: '구글 로그인',
    icon: googleIcon,
    onClick: signInWithGoogle,
  },
  {
    id: 'github',
    name: '깃허브 로그인',
    icon: githubIcon,
    onClick: signInWithGithub,
  },
  {
    id: 'kakao',
    name: '카카오 로그인',
    icon: kakaoIcon,
    onClick: signInWithKakao,
  },
];
</script>
<template>
  <div
    v-if="loginModalStore.loginModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    @click="closeLoginModal"
  >
    <div
      class="relative flex flex-col justify-center items-center bg-secondary-2 rounded-[20px] w-[500px] h-[540px]"
      @click.stop
    >
      <CancelIcon class="absolute top-7 right-7 w-6 h-6" @click="closeLoginModal" />
      <div class="px-[22px]">
        <img :src="logo" alt="mergi 로고 아이콘" class="min-w-[96px]" />
      </div>
      <div class="mt-5 mb-[22px] text-gray-80 text-center">
        <h2 class="h2-b mb-[17px]">머지에서 머하지?</h2>
        <h4 class="h4-b">
          지금 바로 프로젝트를 함께할<br />
          팀원을 찾아보세요!
        </h4>
      </div>
      <div class="flex flex-col gap-[11px]">
        <button
          v-for="signInProvider in signInProviders"
          class="flex items-center gap-[10px] w-[300px] rounded-full px-5 h-12 bg-white modal-button-shadow"
          :key="signInProvider.id"
          @click="signInProvider.onClick"
        >
          <img :src="signInProvider.icon" :alt="signInProvider.name" />
          {{ signInProvider.name }}
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
