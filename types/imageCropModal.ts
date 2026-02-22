export interface ImageCropModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (croppedImage: Blob) => void;
}
