<script setup>
import {
  getUserLoggedIn,
  signInWithGithub,
  signInWithGoogle,
  signInWithKakao,
  signOut,
} from '@/api/supabase/auth';
import {
  getPostLike,
  getPostLikes,
  getUserBookmarks,
  getUserBookmarksWithDetails,
  getUserPostLikes,
  toggleBookmark,
  toggleLike,
} from '@/api/supabase/like_and_bookmark';
import {
  addPostComment,
  deletePostComment,
  getCommentsByPost,
  updatePostComment,
} from '@/api/supabase/new_comment';
import {
  getAllUserInfo,
  getUserInfo,
  getUserInfoToUserId,
  postUserInfoOnboard,
  putUserInfo,
} from '@/api/supabase/user';
import { onMounted, ref } from 'vue';

const isLogin = ref(false);

// 유저 정보 불러오기 ///////////////////////////////
const userInfo = ref(null);
const userProfile = {
  name: '지원',
  short_introduce: '안녕하세요 저는 안지원입니다.',
};
const userPositions = [
  { position: '기획', stacks: ['adobe'] },
  { position: '백엔드', stacks: ['jango', 'php'] },
];
const getUserInfoHandler = async () => {
  const res = await getUserInfo();
  console.log('res', res);
  userInfo.value = res;
};
// 유저 정보 불러오기 ///////////////////////////////

// 특정 유저 정보 가져오기 ////////////////////////////
const otherInfo = ref(null);
const getUserInfoToUserIdHandler = async (user_id) => {
  const res = await getUserInfoToUserId(user_id);
  otherInfo.value = res;
};
// 특정 유저 정보 가져오기 ////////////////////////////

// 유저 정보 수정하기 ////////////////////////////////
const updatedUserInfo = ref(null);
const updatingUserProfile = {
  name: '지원2',
  short_introduce: '안녕하세요 테스트 하고 있어요dn.',
  long_introduce: '달디달고달디단밤양갱',
  profile_img_path: '22이미지 주소',
  link: ['https://github.com', 'https://naver.com'],
};
const updatingUserPositions = [
  { position: '프론트엔드', stacks: ['react', 'vue'] },
  { position: '디자이너', stacks: ['adobe', 'figma'] },
];
const putUserInfoHandler = async (updatingUserProfile, updatingUserPositions) => {
  const res = await putUserInfo(updatingUserProfile, updatingUserPositions);
  console.log(res);
  userInfo.value = res;
  updatedUserInfo.value = res;
};
// 유저 정보 수정하기 ////////////////////////////////

// 모든 유저 정보 가져오기 ///////////////////////////
const allUserInfo = ref(null);
const getAllUserInfoHandler = async () => {
  const res = await getAllUserInfo();
  console.log(res);
  allUserInfo.value = res;
};

const signOutHandler = async () => {
  await signOut();
  const user = await getUserLoggedIn();
  if (user) return (isLogin.value = true);
  else return (isLogin.value = false);
};

onMounted(async () => {
  const user = await getUserLoggedIn();
  if (user) return (isLogin.value = true);
});
</script>

<template>
  <h2 class="text-[30px] font-bold my-5">로그인 테스트</h2>
  <div>
    <button @click="() => signOutHandler()" v-if="isLogin">로그아웃</button>
    <div v-else>
      <button @click="() => signInWithGithub()">깃허브 로그인</button>
      <button @click="() => signInWithKakao()">카카오 로그인</button>
      <button @click="() => signInWithGoogle()">구글 로그인</button>
    </div>
  </div>

  <div>
    <button @click="getUserLoggedIn()">유저 로그인 정보 확인하기</button>
  </div>

  <h2 class="text-[30px] font-bold my-5">유저정보 테스트</h2>
  <div>
    <button @click="postUserInfoOnboard(userProfile, userPositions)">
      유저 정보 온보드 전송하기
    </button>
  </div>

  <div>
    <button @click="getUserInfoHandler()">유저 정보 가져오기</button>
    <p>{{ userInfo }}</p>
  </div>

  <div>
    <button @click="getUserInfoToUserIdHandler('5cc3999c-3150-4072-a824-5d5ddeb3e381')">
      특정 유저 정보 가져오기
    </button>
    <p>{{ otherInfo }}</p>
  </div>

  <div>
    <button @click="putUserInfoHandler(updatingUserProfile, updatingUserPositions)">
      마이페이지 유저 정보 수정하기
    </button>
    <p>{{ updatedUserInfo }}</p>
  </div>

  <div>
    <button @click="getAllUserInfoHandler()">모든 유저 온보드 가져오기</button>
    <p v-for="user of allUserInfo">{{ user }}</p>
  </div>

  <h2 class="text-[30px] font-bold my-5">좋아요 테스트</h2>

  <div>
    <button @click="toggleLike(93)">좋아요 보내기</button>
  </div>

  <div>
    <button @click="getUserPostLikes()">사용자 게시글 좋아요 정보 가져오기</button>
  </div>

  <div>
    <button @click="getPostLikes(100)">특정 포스트글 좋아요 모두 가져오기</button>
  </div>

  <h2 class="text-[30px] font-bold my-5">북마크 테스트</h2>

  <div>
    <button @click="toggleBookmark(93)">북마크 담기</button>
  </div>

  <div>
    <button @click="getUserBookmarks()">사용자 북마크 정보 가져오기</button>
  </div>

  <div>
    <button @click="getUserBookmarksWithDetails()">사용자가 북마크한 글 상세 가져오기</button>
  </div>

  <h2 class="text-[30px] font-bold my-5">댓글 테스트</h2>

  <div>
    <button @click="addPostComment(93, 'ai 진짜 코드 잘 짜네')">특정 게시글 댓글 달기</button>
  </div>

  <div>
    <button @click="getCommentsByPost(93)">특정 게시글 댓글 전부 가져오기</button>
  </div>

  <div>
    <button @click="updatePostComment(93, 30, '댓글을 한번더 수정해볼께')">댓글 수정하기</button>
  </div>

  <div>
    <button @click="deletePostComment(93, 23)">댓글 삭제하기</button>
  </div>
</template>

<style scoped>
button {
  border: solid 1px #000;
  margin-bottom: 10px;
}
</style>
