"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { skillsService } from "@/lib/api/skills";
import { SkillCategory } from "@/types/skills";

export function useSkills() {
  const router = useRouter();
  const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>([]);
  const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // React Query Fetching
  const { data, isLoading, error } = useQuery({
    queryKey: ["skills"],
    queryFn: skillsService.getSkills,
  });

  // Saving Mutation
  const saveSkillsMutation = useMutation({
    mutationFn: (ids: number[]) => skillsService.addMultipleSkills(ids),
    onSuccess: () => {
      router.push("/onboarding/bio");
    },
    onError: (err: any) => {
      console.error("Error saving skills:", err);
      alert(err.message || "فشل حفظ المهارات، يرجى المحاولة مرة أخرى");
    }
  });

  // Extract and filter categories
  const categories = data?.categories || [];
  
  const filteredCategories = categories.map(category => {
    const matchesCategory = 
      category.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.nameEn.toLowerCase().includes(searchQuery.toLowerCase());

    const filteredSkills = category.skills.filter(skill => 
      skill.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (matchesCategory || filteredSkills.length > 0) {
      return {
        ...category,
        skills: matchesCategory ? category.skills : filteredSkills,
        isMatch: true
      };
    }
    return null;
  }).filter(Boolean) as (SkillCategory & { isMatch: boolean })[];

  const toggleSkill = (id: number) => {
    setSelectedSkillIds((prev) =>
      prev.includes(id)
        ? prev.filter((skillId) => skillId !== id)
        : [...prev, id]
    );
  };

  const toggleCategory = (id: number) => {
    setExpandedCategoryId(expandedCategoryId === id ? null : id);
  };

  const handleNext = () => {
    if (selectedSkillIds.length === 0) {
      alert("يرجى اختيار مهارة واحدة على الأقل");
      return;
    }
    
    saveSkillsMutation.mutate(selectedSkillIds);
  };

  return {
    categories: filteredCategories,
    selectedSkillIds,
    expandedCategoryId,
    searchQuery,
    setSearchQuery,
    isLoading,
    isSubmitting: saveSkillsMutation.isPending,
    error,
    toggleSkill,
    toggleCategory,
    handleNext
  };
}
