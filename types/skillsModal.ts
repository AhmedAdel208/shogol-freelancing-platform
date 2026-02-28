import { Skill } from "./skills";

export interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableSkills: Skill[];
  selectedSkillIds: number[];
  onToggleSkill: (skill: Skill) => void;
  onConfirm: () => void;
}
