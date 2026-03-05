import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/lib/api/user";
import { toast } from "@/common/toast";
import { UpdateProfilePayload, UserProfile } from "@/types/user";

export function useProfile() {
  return useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: () => userService.getProfile(),
    staleTime: 1000 * 60 * 5, 
  });
}

export function useUpdateBio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBio: string) => userService.updateBio({ bio: newBio }),
    onSuccess: () => {
      toast.success("تم تحديث السيرة الذاتية بنجاح");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("فشل في تحديث السيرة الذاتية");
    },
  });
}

export function useUpdateProfile(onSuccessCb?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => userService.updateProfile(data),
    onSuccess: () => {
      toast.success("تم تحديث الملف الشخصي بنجاح");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      onSuccessCb?.();
    },
    onError: () => {
     
      toast.error("فشل في تحديث الملف الشخصي");
    },
  });
}

export function useCoverImage(id?: string) {
  return useQuery({
    queryKey: ["cover-image", id],
    queryFn: () => userService.getCoverImage(id!),
    enabled: !!id,
  });
}

export function useUploadCoverImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => userService.uploadCoverImage(file),
    onSuccess: () => {
      toast.success("تم تحديث صورة الغلاف بنجاح");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["cover-image"] });
    },
    onError: () => {
      toast.error("فشل في تحميل صورة الغلاف");
    },
  });
}
export function useUploadProfilePicture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => userService.uploadProfilePicture(file),
    onSuccess: () => {
      toast.success("تم تحديث الصورة الشخصية بنجاح");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("فشل في تحميل الصورة الشخصية");
    },
  });
}
