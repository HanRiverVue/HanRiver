import { POSITION } from '.';
import { POSITION_SKILLS } from './position';

export const REGION = [
  '서울특별시',
  '인천광역시',
  '대전광역시',
  '광주광역시',
  '대구광역시',
  '울산광역시',
  '부산광역시',
  '세종특별자치시',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도',
];

export const METHOD = ['온라인', '오프라인', '온/오프라인'];

export const RECRUITMENT_STATUS = ['모집중', '모집완료'];

export const POSITION_FILTER_GROUPS = {
  전체: [...new Set(Object.values(POSITION_SKILLS).flat())],
  [`${POSITION[0]}/${POSITION[1]}/${POSITION[2]}`]: [
    ...new Set([...POSITION_SKILLS[POSITION[1]], ...POSITION_SKILLS[POSITION[2]]]),
  ],
  [POSITION[3]]: POSITION_SKILLS[POSITION[3]],
  [POSITION[4]]: POSITION_SKILLS[POSITION[4]],
  모바일: [...new Set([...POSITION_SKILLS[POSITION[5]], ...POSITION_SKILLS[POSITION[6]]])],
  [POSITION[7]]: POSITION_SKILLS[POSITION[7]],
  [POSITION[8]]: POSITION_SKILLS[POSITION[8]],
};
