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
    items: [
      '서울특별시',
      '인천광역시',
      '대전광역시',
      '광주광역시',
      '대구광역시',
      '울산광역시',
      '제주특별시',
    ],
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
