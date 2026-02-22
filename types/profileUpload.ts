export interface ProfileUploadProps {
  onImageSelect?: (file: File) => void;
  onImageRemove?: () => void;
  defaultImage?: string;
  maxSizeMB?: number;
}
export interface UseProfileUploadProps {
  onImageSelect?: (file: File) => void;
  onImageRemove?: () => void;
  maxSizeMB?: number;
}
