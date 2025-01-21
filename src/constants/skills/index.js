import { POSITION } from '..';
import { AOS_SKILLS } from './aos';
import { BACKEND_SKILLS } from './backend';
import { DESIGN_SKILLS } from './design';
import { DEVOPS_SKILLS } from './devops';
import { FRONTEND_SKILLS } from './frontend';
import { IOS_SKILLS } from './ios';
import { MARKETING_SKILLS } from './marketing';
import { PLANNING_SKILLS } from './planning';

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
