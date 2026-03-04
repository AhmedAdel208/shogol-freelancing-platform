export interface ImageCropModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (croppedImage: Blob) => void;
  aspect?: number;
  cropShape?: "rect" | "round";
  title?: string;
}
