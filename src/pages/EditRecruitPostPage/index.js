import { postCreatePost, postUploadPostImage, putUpdatePost } from '@/api/supabase/post_editor';
import { REGION } from '@/constants/filter';
import { POSITION_SKILLS } from '@/constants/position';
import { useBaseModalStore } from '@/stores/baseModal';
import { errorToast, successToast } from '@/utils/toast';

const baseModalStore = useBaseModalStore();

// 모집 설정
export const selects = [
  {
    title: '모집 구분',
    items: ['프로젝트', '스터디'],
    defaultText: '모집 구문을 선택해주세요',
  },
  {
    title: '모집 지역',
    items: REGION,
    defaultText: '모집 지역을 선택해주세요',
  },
  {
    title: '진행 방식',
    items: ['온라인', '오프라인', '온/오프라인'],
    defaultText: '진행 방식을 선택해주세요',
  },
  {
    title: '연락 방법',
    items: ['이메일', '전화', '카카오 오픈채팅'],
    defaultText: '연락 방법을 선택해주세요',
  },
];

// 기본정보
export const baseUserInfo = {
  author: '',
  recruit_type: '',
  title: '',
  body: '',
  recruit_count: '',
  recruit_area: '',
  start_date: null,
  end_date: null,
  on_offline: '',
  recruit_deadline: null,
  call_method: '',
  call_link: '',
  post_img_path: '',
  finished: false,
  saved_position_and_stacks: null,
};

export const resetBaseUserInfo = {
  author: '',
  recruit_type: '',
  title: '',
  body: '',
  recruit_count: '',
  recruit_area: '',
  start_date: null,
  end_date: null,
  on_offline: '',
  recruit_deadline: null,
  call_method: '',
  call_link: '',
  post_img_path: '',
  finished: false,
  saved_position_and_stacks: null,
};

// 포지션
export const editPositionAndSkills = [
  {
    position: 'PM',
    positionSelected: false,
    skills: POSITION_SKILLS['PM'],
    selectedSkills: [],
  },
  {
    position: '기획',
    positionSelected: false,
    skills: POSITION_SKILLS['기획'],
    selectedSkills: [],
  },
  {
    position: '마케팅',
    positionSelected: false,
    skills: POSITION_SKILLS['마케팅'],
    selectedSkills: [],
  },
  {
    position: '디자인',
    positionSelected: false,
    skills: POSITION_SKILLS['디자인'],
    selectedSkills: [],
  },
  {
    position: '프론트엔드',
    positionSelected: false,
    skills: POSITION_SKILLS['프론트엔드'],
    selectedSkills: [],
  },
  {
    position: 'iOS',
    positionSelected: false,
    skills: POSITION_SKILLS['iOS'],
    selectedSkills: [],
  },
  {
    position: 'AOS',
    positionSelected: false,
    skills: POSITION_SKILLS['AOS'],
    selectedSkills: [],
  },
  {
    position: '백엔드',
    positionSelected: false,
    skills: POSITION_SKILLS['백엔드'],
    selectedSkills: [],
  },
  {
    position: '데브옵스',
    positionSelected: false,
    skills: POSITION_SKILLS['데브옵스'],
    selectedSkills: [],
  },
];
// 데이터 검사 + 전송 로직
export const sendData = async (
  userInfo,
  positionAndSkills,
  postId,
  scrollRefs,
  afterPostModalObj,
) => {
  let filePath;

  if (typeof userInfo.post_img_path === 'object') {
    filePath = await postUploadPostImage(userInfo.post_img_path);
  } else {
    filePath = userInfo.post_img_path;
  }

  // 최종 전송할 데이터
  const positions = [];
  let techStacks = [];

  let stackNotSelected = false;

  const selected = positionAndSkills.filter((data) => {
    return data.positionSelected;
  });
  for (let i = 0; i < selected.length; i++) {
    positions.push(selected[i].position);
    if (selected[i].selectedSkills.length > 0) {
      techStacks = [...techStacks, ...selected[i].selectedSkills];
    } else {
      techStacks = [];
      stackNotSelected = true;
    }
  }

  let goto = null;
  switch (true) {
    case userInfo.author === '': {
      errorToast('오류 : 유저 로그인 정보가 없습니다.');
      goto = scrollRefs[0];
      break;
    }
    case userInfo.recruit_type === '': {
      errorToast('모집 구분 선택을 완료해주세요');
      goto = scrollRefs[0];
      break;
    }
    case userInfo.recruit_count === '': {
      errorToast('모집 인원 선택을 완료해주세요');
      goto = scrollRefs[0];
      break;
    }
    case userInfo.recruit_deadline === null: {
      errorToast('모집 마감일 선택을 완료해주세요');
      goto = scrollRefs[0];
      break;
    }
    case userInfo.on_offline === '': {
      errorToast('진행 방식 선택을 완료해주세요');
      goto = scrollRefs[0];
      break;
    }
    case userInfo.start_date === null: {
      errorToast('진행 기간 선택을 완료해주세요');
      goto = scrollRefs[0];
      break;
    }
    case userInfo.end_date === null: {
      errorToast('진행 기간 선택을 완료해주세요(종료 날짜가 선택되지 않았습니다)');
      goto = scrollRefs[0];
      break;
    }
    case userInfo.call_method === '': {
      errorToast('연락 방법 선택을 완료해주세요');
      goto = scrollRefs[0];
      break;
    }
    case userInfo.call_link === '': {
      errorToast('연락처 선택을 완료해주세요');
      goto = scrollRefs[0];
      break;
    }
    case selected.length === 0: {
      errorToast('포지션 선택을 완료해주세요.');
      goto = scrollRefs[0];
      break;
    }
    case stackNotSelected: {
      errorToast('기술스택 선택을 완료해주세요.');
      goto = scrollRefs[0];
      break;
    }
    case userInfo.title === '': {
      errorToast('글 제목 작성을 완료해주세요');
      goto = scrollRefs[1];
      break;
    }
    case userInfo.body === '': {
      errorToast('글 내용 작성을 완료해주세요');
      goto = scrollRefs[1];
      break;
    }
    default:
      break;
  }
  if (goto) {
    return window.scrollTo(0, goto);
  }

  const setTechStacks = new Set(techStacks);
  techStacks = [...setTechStacks];

  const resultUserInfo = {
    ...userInfo,
    saved_position_and_stacks: JSON.stringify(positionAndSkills),
    post_img_path: filePath,
  };

  if (postId) {
    await putUpdatePost(resultUserInfo, positions, techStacks, postId);
    successToast('게시글 수정이 완료되었습니다.');
    return baseModalStore.showModal(afterPostModalObj.modify);
  } else {
    const res = await postCreatePost(resultUserInfo, positions, techStacks);
    successToast('게시글에 등록되었습니다.');

    // 작성글 보러가기 버튼 함수에 게시글 id값 담기
    const handleAfterPostModalConfirm = afterPostModalObj.edit.onConfirm;
    afterPostModalObj.edit.onConfirm = () => {
      handleAfterPostModalConfirm(res.data.id);
    };
    return baseModalStore.showModal(afterPostModalObj.edit);
  }
};
