export interface Skill {
  id: number;
  nameAr: string;
  nameEn: string;
}

export interface SkillCategory {
  id: number;
  key: string;
  nameAr: string;
  nameEn: string;
  skills: Skill[];
}
