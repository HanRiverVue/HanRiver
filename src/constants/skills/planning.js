import {
  aha_logo,
  asana_logo,
  figma_logo,
  miro_logo,
  productboard_logo,
  trello_logo,
  xd_logo,
} from '@/assets/images/skills';

export const PLANNING_SKILLS = [
  { name: 'Miro', image: miro_logo },
  { name: 'Asana', image: asana_logo },
  { name: 'Aha', image: aha_logo },
  { name: 'ProductBoard', image: productboard_logo },
  { name: 'Trello', image: trello_logo },
  { name: 'Figma', image: figma_logo },
  { name: 'Adobe XD', image: xd_logo },
];

/* 

PM => Miro, Asana, Aha, ProductBoard, Trello, Figma, Adobe XD
기획 => Miro, Asana, Aha, ProductBoard, Trello, Figma, Adobe XD
마케팅 => Google Analytics, Google Ads, Firebase
디자인 => Zeplin, Figma, Photoshop, Illustrator, Adobe XD
프론트엔드 => JavaScript, TypeScript, React, Vue, Svelte, Next.js, Git, Jest, GraphQL
AOS => Git, React Native, Flutter, Kotlin
iOS => Git, Swift, SwiftUI, React Native, Flutter
백엔드 => Go, Spring, Java, Node.js, Nest.js, Jest, Git, Firebase, GraphQL, PHP, Django, Python, MongoDB, MySQL, Express,  
데브옵스 => Docker, Kubernetes, AWS, Jest, Jenkins, GithubActions


export const getSkillsByJob = async (job) => {
  switch (job) {
    case 'developer':
      return import('@/constants/skills/skills-logo-developer.js').then(module => module.developerSkills);
    case 'designer':
      return import('@/constants/skills/skills-logo-designer.js').then(module => module.designerSkills);
    case 'marketer':
      return import('@/constants/skills/skills-logo-marketer.js').then(module => module.marketerSkills);
    // 다른 직무들...
    default:
      return [];
  }
};

*/
