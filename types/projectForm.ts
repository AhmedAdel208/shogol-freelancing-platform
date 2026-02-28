import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateProjectFormData } from "@/lib/validation/projectSchema";
import { Skill } from "./skills";

export interface StepOneProps {
  register: UseFormRegister<CreateProjectFormData>;
  errors: FieldErrors<CreateProjectFormData>;
  selectedSkills: Skill[];
  toggleSkill: (skill: Skill) => void;
  setIsModalOpen: (open: boolean) => void;
}

export interface StepTwoProps {
  register: UseFormRegister<CreateProjectFormData>;
  errors: FieldErrors<CreateProjectFormData>;
  files: File[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  currentStep?: number;
  nextStep?: boolean;
}
