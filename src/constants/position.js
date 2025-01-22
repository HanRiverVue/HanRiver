import { POSITION } from '.';

const PLANNING_SKILLS = ['Miro', 'Asana', 'Aha', 'ProductBoard', 'Trello', 'Figma', 'Adobe XD'];
const MARKETING_SKILLS = ['Google Analytics', 'Google Ads', 'Firebase'];
const DESIGN_SKILLS = ['Zeplin', 'Figma', 'Photoshop', 'Illustrator', 'Adobe XD'];
const FRONTEND_SKILLS = [];
const AOS_SKILLS = ['React Native', 'Kotlin', 'Flutter', 'Git'];
const IOS_SKILLS = ['Swift', 'SwiftUI', 'React Native', 'Flutter', 'Git'];
const BACKEND_SKILLS = [
  'Git',
  'Java',
  'Python',
  'Go',
  'Spring',
  'Express',
  'Django',
  'Node.js',
  'Nest.js',
  'Jest',
  'Firebase',
  'GraphQL',
  'PHP',
  'MongoDB',
  'MySQL',
];
const DEVOPS_SKILLS = ['Docker', 'Kubernetes', 'AWS', 'Jest', 'Jenkins', 'Github Actions'];

export const POSITION_SKILLS = {
  [POSITION[0]]: PLANNING_SKILLS,
  [POSITION[1]]: PLANNING_SKILLS,
  [POSITION[2]]: MARKETING_SKILLS,
  [POSITION[3]]: DESIGN_SKILLS,
  [POSITION[4]]: FRONTEND_SKILLS,
  [POSITION[5]]: AOS_SKILLS,
  [POSITION[6]]: IOS_SKILLS,
  [POSITION[7]]: BACKEND_SKILLS,
  [POSITION[8]]: DEVOPS_SKILLS,
};
