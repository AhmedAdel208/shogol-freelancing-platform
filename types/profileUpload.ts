export interface ProfileUploadProps {
  onImageSelect?: (file: File) => void;
  onImageRemove?: () => void;
  defaultImage?: string;
  maxSizeMB?: number;
}
