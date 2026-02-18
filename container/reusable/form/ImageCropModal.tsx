"use client";

import { useState, useRef, useCallback } from "react";
import { X, Check, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import Image from "next/image";
import type { ImageCropModalProps } from "@/types/imageCropModal";

export default function ImageCropModal({
  imageUrl,
  isOpen,
  onClose,
  onConfirm,
}: ImageCropModalProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  // Track natural image dimensions so we can compute initial cover scale
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const CONTAINER_HEIGHT = 420;

  // Once image loads, compute the "cover" scale so it fills the container with no black bars
  const handleImageLoad = () => {
    const img = imageRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    const cw = container.offsetWidth;
    const ch = CONTAINER_HEIGHT;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    setNaturalSize({ w: iw, h: ih });

    // Scale needed to cover the container (like object-fit: cover)
    const coverScale = Math.max(cw / iw, ch / ih);
    setZoom(coverScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    },
    [isDragging, dragStart],
  );

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart],
  );

  const handleTouchEnd = () => setIsDragging(false);

  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handleConfirm = async () => {
    if (!imageRef.current || !containerRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const outputSize = 500;
    canvas.width = outputSize;
    canvas.height = outputSize;

    // Circular clip
    ctx.beginPath();
    ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, 2 * Math.PI);
    ctx.clip();

    const img = imageRef.current;
    const container = containerRef.current;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Circle overlay is 92% of container width
    const cropCircleRadius = (containerWidth * 1) / 2;

    // img.naturalWidth / (img.naturalWidth * zoom) == 1/zoom = source pixels per display pixel
    // But rendered image has width=naturalWidth in CSS (width:auto), so offsetWidth = naturalWidth
    // Therefore scale = 1/zoom exactly
    const scale = 1 / zoom;

    const cropDiameterSrc = cropCircleRadius * 2 * scale;

    // Image center in container space
    const imgCenterX = containerWidth / 2 + position.x;
    const imgCenterY = containerHeight / 2 + position.y;

    // Offset from image center to container center
    const offsetX = containerWidth / 2 - imgCenterX;
    const offsetY = containerHeight / 2 - imgCenterY;

    // Convert to source coords
    const srcOffsetX = offsetX * scale;
    const srcOffsetY = offsetY * scale;

    // Source rect top-left (from the center of the natural image)
    const sourceX = img.naturalWidth / 2 + srcOffsetX - cropDiameterSrc / 2;
    const sourceY = img.naturalHeight / 2 + srcOffsetY - cropDiameterSrc / 2;

    ctx.save();
    ctx.translate(outputSize / 2, outputSize / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-outputSize / 2, -outputSize / 2);

    ctx.drawImage(
      img,
      sourceX,
      sourceY,
      cropDiameterSrc,
      cropDiameterSrc,
      0,
      0,
      outputSize,
      outputSize,
    );

    ctx.restore();

    canvas.toBlob(
      (blob) => {
        if (blob) onConfirm(blob);
      },
      "image/jpeg",
      0.95,
    );
  };

  const handleClose = () => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <h3 className="text-xl font-bold text-gray-dark">
            قص الصورة الشخصية
          </h3>
          <button
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
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
            <Image
              ref={imageRef}
              src={imageUrl}
              alt="Crop preview"
              width={naturalSize.w || 800}
              height={naturalSize.h || 800}
              onLoad={handleImageLoad}
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
            onClick={handleRotate}
            className="w-full flex items-center justify-center gap-2 py-2 text-base text-gray-600 hover:text-primary transition-colors"
          >
            <RotateCw className="w-4 h-4" />
            تدوير 90°
          </button>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={handleClose}
              className="flex-1 py-3.5 px-4 border-2 border-primary text-primary rounded-xl text-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              إلغاء
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-3.5 px-4 bg-primary text-white rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              تأكيد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
