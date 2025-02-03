<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute } from 'vue-router';
import AppButton from '@/components/AppButton.vue';
import { getApplicationsForMyPosts } from '@/api/supabase/apply';
import { supabase } from '@/config/supabase';
import { dropdown_arrow_icon, dropdown_arrow_up_icon } from '@/assets/icons';
import DropdownButton from '@/components/DropdownButton.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { useUserProfileModalStore } from '@/stores/userProfileModal';

const props = defineProps({
  postDetails: Object,
});

const route = useRoute();
const postId = ref(route.params.postId);
const applications = ref([]);
const loading = ref(true);
const error = ref(null);
const isOpen = ref(false);
// 유저프로필 모달
const userProfileModalStore = useUserProfileModalStore();

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month}.${day}`;
};

// API 호출 및 데이터 로드
const loadApplications = async () => {
  try {
    loading.value = true;
    const data = await getApplicationsForMyPosts(postId.value);
    if (data) {
      applications.value = data;
    }
  } catch (err) {
    error.value = '신청 목록을 불러오는 데 실패했습니다.';
    console.error('데이터 로드 오류:', err);
  } finally {
    loading.value = false;
  }
  console.log(applications);
};

onMounted(() => {
  loadApplications();
  // 화면 밖 클릭 시 드롭다운을 닫는 리스너 추가
  document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  // 화면 밖 클릭 이벤트 리스너 제거
  document.removeEventListener('click', handleOutsideClick);
});

const tabs = ['전체', '수락된 참여자'];
const activeTab = ref(tabs[0]);

const handleTabChange = (tab) => {
  activeTab.value = tab;
};

// 필터링된 신청자 목록
const filteredApplications = computed(() => {
  let filtered = applications.value;
  if (activeTab.value === '수락된 참여자') {
    filtered = filtered.filter((application) => application.accepted === true);
  }

  if (selectedItem.value && selectedItem.value !== '모집 포지션') {
    filtered = filtered.filter((application) =>
      application.proposer_positions.includes(selectedItem.value),
    );
  }

  return filtered;
});

const handleAccept = async (proposerId) => {
  try {
    const { error } = await supabase
      .from('post_apply_list')
      .update({ accepted: true })
      .eq('proposer_id', proposerId)
      .eq('post_id', postId.value);

    if (error) {
      console.error('수락 처리 실패:', error.message);
      return;
    }
    await loadApplications();
  } catch (err) {
    console.error('수락 처리 중 오류 발생:', err);
  }
};

const handleReject = async (proposerId) => {
  try {
    const { error } = await supabase
      .from('post_apply_list')
      .update({ finished: true })
      .eq('proposer_id', proposerId)
      .eq('post_id', postId.value);

    if (error) {
      console.error('거절 처리 실패:', error.message);
      return;
    }
    await loadApplications(); // 새로고침
  } catch (err) {
    console.error('거절 처리 중 오류 발생:', err);
  }
};

const items = computed(() => props.postDetails?.position || []);
const selectedItem = ref('');

const handleSelectClick = (item, closeDropdown) => {
  selectedItem.value = item;
  isOpen.value = false;
  closeDropdown();
};

const handleToggle = () => {
  console.log('드롭다운 상태 변경 전:', isOpen.value);
  isOpen.value = !isOpen.value;
  console.log('드롭다운 상태 변경 후:', isOpen.value);
};

const handleDropdownClose = () => {
  isOpen.value = false;
};

// 화면 밖 클릭 시 드롭다운을 닫는 함수
const handleOutsideClick = (event) => {
  if (isOpen.value && !event.target.closest('.relative')) {
    isOpen.value = false;
  }
};

const handleUserProfileImageClick = async (proposerId) => {
  if (!proposerId) {
    console.error('Proposer ID is undefined');
    return;
  }

  try {
    // 신청자 프로필 정보 불러오기
    await userProfileModalStore.fetchModalUserProfile(proposerId);
    userProfileModalStore.setUserProfileModal(true);
  } catch (err) {
    console.error('프로필 정보 로드 오류:', err);
  }
};
</script>

<template>
  <div>
    <!-- 왼쪽 콘텐츠 영역 -->
    <div>
      <!-- 탭 메뉴 -->
      <div class="flex gap-4 mb-4 justify-between">
        <div class="flex gap-4">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="handleTabChange(tab)"
            :class="[
              'relative inline-block body-b',
              activeTab === tab ? 'text-primary-3 border-b-1 border-primary-3' : 'text-gray-50',
            ]"
          >
            {{ tab }}
            <span
              v-if="activeTab === tab"
              class="absolute left-0 right-0 bottom-0 h-0.5 bg-primary-3 inline-block"
              style="width: 100%"
            ></span>
          </button>
        </div>

        <DropdownButton>
          <template #trigger="{ toggleDropdown }">
            <button
              class="w-[126px] h-[32px] flex items-center justify-between px-2 border border-gray-300 rounded-md"
              @click="
                () => {
                  handleToggle();
                  toggleDropdown();
                }
              "
            >
              <span class="truncate pl-3 text-[14px]">{{ selectedItem || '모집 포지션' }}</span>
              <img
                :src="isOpen ? dropdown_arrow_up_icon : dropdown_arrow_icon"
                alt="드롭다운 화살표"
                class="w-4 h-4 ml-2"
              />
            </button>
          </template>

          <template #menu="{ isOpen: dropdownOpen, closeDropdown }">
            <DropdownMenu
              :isOpen="dropdownOpen"
              :dropdownList="[
                {
                  label: '모집 포지션',
                  action: () => handleSelectClick('모집 포지션', closeDropdown),
                },
                ...items.map((item) => ({
                  label: item,
                  action: () => handleSelectClick(item, closeDropdown),
                })),
              ]"
              @onClose="handleDropdownClose"
              class="absolute right-0 my-2 py-1 bg-white rounded-lg card-shadow text-gray-50 overflow-hidden z-20 w-[126px]"
            />
          </template>
        </DropdownButton>
      </div>

      <!-- 참여자 카드 -->
      <div class="grid gap-4">
        <div v-if="loading" class="text-gray-50"></div>
        <div
          v-for="application in filteredApplications"
          :key="application.id"
          class="p-4 border rounded-lg flex items-center justify-between bg-white shadow-sm border-gray-5"
        >
          <div class="flex items-center gap-4">
            <img
              :src="application.proposer_img_path"
              alt="Profile Image"
              class="w-12 h-12 rounded-full user-Profile-img-shadow cursor-pointer hover:ring-2 hover:ring-primary-3 hover:ring-offset-2"
              @click="handleUserProfileImageClick(application.proposer_id)"
            />
            <div>
              <p class="font-semibold flex items-center gap-2 text-base">
                {{ application.proposer_name }}
                <span
                  v-for="(position, index) in application.proposer_positions"
                  :key="index"
                  class="bg-gray-5 caption-b text-primary-2 px-2 py-1 rounded-md"
                >
                  {{ position }}
                </span>
              </p>
              <p class="text-xs text-gray-50">신청일 | {{ formatDate(application.created_at) }}</p>
            </div>
          </div>

          <div class="flex gap-2">
            <template v-if="application.accepted">
              <span class="caption-r text-primary-3 mr-5">수락됨</span>
            </template>
            <template v-if="application.finished">
              <span class="caption-r mr-5">거절됨</span>
            </template>
            <template v-if="!application.accepted && !application.finished">
              <AppButton
                text="수락"
                type="primary"
                @click="handleAccept(application.proposer_id)"
                class="w-10 h-10"
              />
              <AppButton
                text="거절"
                type="secondary"
                @click="handleReject(application.proposer_id)"
                class="w-10 h-10"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
