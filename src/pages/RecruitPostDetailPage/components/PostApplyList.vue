<script setup>
import AppButton from '@/components/AppButton.vue';
import { ref, onMounted } from 'vue';
import { getApplicationsForMyPosts } from '@/api/supabase/apply';

const postId = 92;
const applications = ref([]);
const loading = ref(true);
const error = ref(null);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

// API 호출 및 데이터 로드
const loadApplications = async () => {
  try {
    loading.value = true;
    const data = await getApplicationsForMyPosts();
    if (data) {
      applications.value = data;
    }
  } catch (err) {
    error.value = '신청 목록을 불러오는 데 실패했습니다.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadApplications();
});

const tabs = ['전체', '수락된 참여자'];
const activeTab = ref(tabs[0]);

const handleTabChange = (tab) => {
  activeTab.value = tab;
};

// 신청 수락
const handleAccept = async (proposerId) => {
  try {
    const { error } = await supabase
      .from('post_apply_list')
      .update({ accepted: true })
      .eq('proposer_id', proposerId)
      .eq('post_id', postId);

    if (error) {
      console.error('수락 처리 실패:', error.message);
      return;
    }
    console.log(`${proposerId}번 신청자를 수락했습니다.`);
    await loadApplications(); // 새로고침
  } catch (err) {
    console.error('수락 처리 중 오류 발생:', err);
  }
};

// 신청 거절
const handleReject = async (proposerId) => {
  try {
    const { error } = await supabase
      .from('post_apply_list')
      .update({ finished: true })
      .eq('proposer_id', proposerId)
      .eq('post_id', postId);

    if (error) {
      console.error('거절 처리 실패:', error.message);
      return;
    }
    console.log(`${proposerId}번 신청자를 거절했습니다.`);
    await loadApplications(); // 새로고침
  } catch (err) {
    console.error('거절 처리 중 오류 발생:', err);
  }
};
</script>

<template>
  <div>
    <!-- 왼쪽 콘텐츠 영역 -->
    <div>
      <!-- 탭 메뉴 -->
      <div class="flex gap-4 mb-4">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="handleTabChange(tab)"
          class="px-4 py-2 rounded"
        >
          {{ tab }}
        </button>
      </div>
      <!-- 참여자 카드 -->
      <div class="grid gap-4">
        <div
          v-for="application in applications"
          :key="application.id"
          class="p-4 border rounded-lg flex items-center justify-between bg-white shadow"
        >
          <div class="flex items-center gap-4">
            <img
              src="@/assets/images/default_user_img.png"
              alt="Profile Image"
              class="w-12 h-12 rounded-full"
            />
            <div>
              <p class="font-semibold flex items-center gap-2 text-base">
                {{ application.proposer_name }}
                <span class="bg-gray-5 font-normal text-primary-2 text-sm px-2 py-1 rounded-md">
                  {{ application.post_title }}
                </span>
              </p>
              <p class="text-xs text-gray-50">신청일 | {{ application.created_at }}</p>
            </div>
          </div>
          <div class="flex gap-2">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
