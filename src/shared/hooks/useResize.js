import { useState, useRef, useEffect } from "react";

export function useResize({ baseWidth, baseHeight, maxScale = 1.2 }) {
  const [size, setSize] = useState({ width: baseWidth, height: baseHeight });
  const [isResizing, setIsResizing] = useState(false);
  const startPosRef = useRef({
    x: 0,
    y: 0,
    width: baseWidth,
    height: baseHeight,
  });

  const maxWidth = baseWidth * maxScale;
  const maxHeight = baseHeight * maxScale;

  const handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    startPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    };
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e) => {
      const deltaY = startPosRef.current.y - e.clientY;

      const newWidth = Math.max(
        baseWidth,
        Math.min(maxWidth, startPosRef.current.width + deltaY),
      );
      const newHeight = Math.max(
        baseHeight,
        Math.min(
          maxHeight,
          startPosRef.current.height + deltaY * (baseHeight / baseWidth),
        ),
      );

      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, baseWidth, baseHeight, maxWidth, maxHeight]);

  const scale = size.width / baseWidth;

  return {
    size,
    scale,
    isResizing,
    handleResizeStart,
  };
}
