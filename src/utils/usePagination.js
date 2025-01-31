import { useQuery } from '@tanstack/vue-query';
import { computed, ref, watch } from 'vue';

export const usePagination = (fetchData, queryKey, filters = {}, enableCache = true) => {
  // 현재 페이지, 전체 페이지
  const currentPage = ref(1);
  const totalPage = computed(() => data?.value?.total_page || 1);

  // 필터링된 게시물
  const filteredPosts = computed(() => data?.value?.posts || []);

  // 필터링
  const selectedFilter = ref(filters);

  const queryKeys = computed(() => [queryKey, selectedFilter.value, currentPage.value]);

  const { isLoading, data, refetch } = useQuery({
    queryKey: queryKeys,
    queryFn: fetchData,
    staleTime: enableCache ? 1000 * 60 * 5 : 0, // 유통기한
    gcTime: enableCache ? 1000 * 60 * 5 : 0,
    structuralSharing: true, // 변경되지않은 데이터 재사용
    placeholderData: (prev) => prev, // 대기 상태때 표시해줄 데이터
  });

  // 필터링 적용시
  watch(selectedFilter, () => {
    currentPage.value = 1;
    refetch();
  });

  // 페이지 전환시
  const handleChangePage = (page) => {
    currentPage.value = page;
  };

  //  필터링 업데이트 함수
  const handleUpdateFilter = (newFilter) => {
    selectedFilter.value = { ...selectedFilter.value, ...newFilter };
  };

  return {
    isLoading,
    filteredPosts,
    currentPage,
    totalPage,
    selectedFilter,
    refetch,
    handleChangePage,
    handleUpdateFilter,
  };
};
