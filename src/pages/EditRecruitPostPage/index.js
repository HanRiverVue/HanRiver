import { postCreatePost, postUploadPostImage } from '@/api/supabase/post_editor';
import { REGION } from '@/constants/filter';
import { POSITION_SKILLS } from '@/constants/position';

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
export const sendData = async (userInfo, positionAndSkills) => {
  let filePath;
  if (userInfo.post_img_path === '') {
    // 선택된 이미지 없으면 기본이미지 제공
    filePath =
      'https://hfrulsqohffbfxdsozkk.supabase.co/storage/v1/object/public/post_images/programmers.png';
  } else {
    filePath = await postUploadPostImage(userInfo.post_img_path);
  }

  // 최종 전송할 데이터
  const positions = [];
  let techStacks = [];

  console.log(userInfo);
  switch (true) {
    case userInfo.author === '':
      return alert('오류 : 유저 로그인 정보가 없습니다.');
    case userInfo.recruit_type === '':
      return alert('모집 구분 선택을 완료해주세요');
    case userInfo.recruit_count === '':
      return alert('모집 인원 선택을 완료해주세요');
    case userInfo.recruit_deadline === null:
      return alert('모집 마감일 선택을 완료해주세요');
    case userInfo.on_offline === '':
      return alert('진행 방식 선택을 완료해주세요');
    case userInfo.start_date === null:
      return alert('진행 기간 선택을 완료해주세요');
    case userInfo.end_date === null:
      return alert('진행 기간 선택을 완료해주세요(종료 날짜가 선택되지 않았습니다)');
    case userInfo.call_method === '':
      return alert('연락 방법 선택을 완료해주세요');
    case userInfo.call_link === '':
      return alert('연락처 선택을 완료해주세요');
    case userInfo.title === '':
      return alert('글 제목 작성을 완료해주세요');
    case userInfo.body === '':
      return alert('글 내용 작성을 완료해주세요');
    default:
      break;
  }

  const selected = positionAndSkills.filter((data) => {
    return data.positionSelected;
  });
  if (selected.length === 0) return alert('포지션 선택을 완료해주세요.');
  for (let i = 0; i < selected.length; i++) {
    positions.push(selected[i].position);
    if (selected[i].selectedSkills.length > 0) {
      techStacks = [...techStacks, ...selected[i].selectedSkills];
    } else {
      techStacks = [];
      return alert('기술스택 선택을 완료해주세요.');
    }
  }
  const setTechStacks = new Set(techStacks);
  techStacks = [...setTechStacks];

  const resultUserInfo = { ...userInfo, post_img_path: filePath };
  console.log(resultUserInfo, positions, techStacks);

  await postCreatePost(resultUserInfo, positions, techStacks);
  alert('전송완료!');
};
