import { useRef, useEffect } from "react";
import { X, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import Image from "next/image";
import { useImageCrop } from "@/hooks/useImageCrop";
import type { ImageCropModalProps } from "@/types/imageCropModal";

export default function ImageCropModal({
  imageUrl,
  isOpen,
  onClose,
  onConfirm,
}: ImageCropModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const {
    zoom,
    setZoom,
    rotation,
    position,
    naturalSize,
    containerRef,
    imageRef,
    handleImageLoad,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    rotate,
    reset,
    getCroppedImage,
  } = useImageCrop(1);

  const CONTAINER_HEIGHT = 420;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    const blob = await getCroppedImage(500);
    if (blob) onConfirm(blob);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={handleClose}
      className="
        backdrop:bg-black/60 backdrop:backdrop-blur-[2px]
        bg-transparent p-0 m-auto
        open:animate-in open:fade-in open:zoom-in-95 duration-300
      "
    >
      <div className="bg-white rounded-2xl w-[95vw] max-w-lg overflow-hidden shadow-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-dark">
            قص الصورة الشخصية
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Crop Area */}
        <div
          ref={containerRef}
          className="relative w-full bg-black overflow-hidden cursor-move"
          style={{ height: `${CONTAINER_HEIGHT}px` }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Dark overlay outside the circle */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <mask id="circleMask">
                  <rect width="100%" height="100%" fill="white" />
                  <circle cx="50%" cy="50%" r="46%" fill="black" />
                </mask>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="rgba(0,0,0,0.55)"
                mask="url(#circleMask)"
              />
            </svg>

            {/* Circle border + rule-of-thirds grid */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="rounded-full border-2 border-white/60 relative"
                style={{ width: "92%", aspectRatio: "1" }}
              >
                <div className="absolute top-1/3 left-0 right-0 h-px bg-white/30" />
                <div className="absolute top-2/3 left-0 right-0 h-px bg-white/30" />
                <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/30" />
                <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/30" />
              </div>
            </div>
          </div>

          {/* Image — natural size, transformed via zoom/position/rotation */}
          <div className="absolute top-1/2 left-1/2 max-w-none select-none">
            {imageUrl ? (
              <Image
                ref={imageRef}
                src={imageUrl}
                alt="Crop preview"
                width={naturalSize.w || 800}
                height={naturalSize.h || 800}
                onLoad={() => handleImageLoad(CONTAINER_HEIGHT)}
                style={{
                  width: naturalSize.w ? `${naturalSize.w}px` : "auto",
                  height: naturalSize.h ? `${naturalSize.h}px` : "auto",
                  maxWidth: "none",
                  transform: `
                    translate(-50%, -50%)
                    translate(${position.x}px, ${position.y}px)
                    scale(${zoom})
                    rotate(${rotation}deg)
                  `,
                  transformOrigin: "center center",
                }}
                draggable={false}
                unoptimized
              />
            ) : null}
          </div>
        </div>

        {/* Controls */}
        <div className="px-6 pt-5 pb-6 space-y-4">
          {/* Zoom Slider */}
          <div className="flex items-center gap-4">
            <ZoomOut className="w-5 h-5 text-primary shrink-0" />
            <input
              type="range"
              min={zoom > 0 ? Math.min(zoom * 0.5, 0.1) : 0.1}
              max="5"
              step="0.01"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="zoom-slider flex-1 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer"
            />
            <ZoomIn className="w-5 h-5 text-primary shrink-0" />
          </div>

          {/* Rotate Button */}
          <button
            type="button"
            onClick={rotate}
            className="w-full flex items-center justify-center gap-2 py-2 text-base text-gray-600 hover:text-primary transition-colors cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
            تدوير 90°
          </button>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-1">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-4 border-2 border-primary text-primary rounded-xl text-lg font-semibold hover:bg-primary/5 transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 py-3 px-4 bg-primary text-white rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              تأكيد
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
