import { useState, useRef, useCallback } from "react";
import { Position } from "@/types";

export function useImageCrop(initialZoom: number = 1) {
  const [zoom, setZoom] = useState(initialZoom);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = (containerHeight: number) => {
    const img = imageRef.current;
    const container = containerRef.current;
    if (!img || !container) return;

    const cw = container.offsetWidth;
    const ch = containerHeight;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    setNaturalSize({ w: iw, h: ih });

    // Scale needed to cover the container (like object-fit: cover)
    const coverScale = Math.max(cw / iw, ch / ih);
    setZoom(coverScale);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart]);

  const onMouseUp = () => setIsDragging(false);

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    });
  }, [isDragging, dragStart]);

  const onTouchEnd = () => setIsDragging(false);

  const rotate = () => setRotation((prev) => (prev + 90) % 360);

  const reset = () => {
    setZoom(initialZoom);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const getCroppedImage = async (outputSize: number = 500): Promise<Blob | null> => {
    if (!imageRef.current || !containerRef.current) return null;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

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

    const scale = 1 / zoom;
    const cropDiameterSrc = containerWidth * scale;

    const imgCenterX = containerWidth / 2 + position.x;
    const imgCenterY = containerHeight / 2 + position.y;

    const offsetX = containerWidth / 2 - imgCenterX;
    const offsetY = containerHeight / 2 - imgCenterY;

    const srcOffsetX = offsetX * scale;
    const srcOffsetY = offsetY * scale;

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

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.95);
    });
  };

  return {
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
  };
}
