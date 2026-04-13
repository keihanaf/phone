import { useEffect, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/shared/utils/cn.js';
import Application from '@/features/HomeScreen/components/Application';
import { useAppLauncher } from '@/shared/context/AppLauncherContext.jsx';

export default function SortableAppItem({
  app,
  isEditMode,
  scale = 1,
  onAppClick,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: app.id,
    disabled: !isEditMode,
  });

  const { registerIconRef } = useAppLauncher();
  const itemRef = useRef(null);

  const setRefs = (node) => {
    setNodeRef(node);
    itemRef.current = node;
  };

  useEffect(() => {
    if (itemRef.current && app.id) {
      registerIconRef(app.id, itemRef.current);
    }
  }, [app.id, registerIconRef]);

  const baseWidth = app.isWidget
    ? parseFloat(app.widgetSize?.width) || 115
    : 50;
  const baseHeight = app.isWidget
    ? parseFloat(app.widgetSize?.height) || 115
    : 50;

  const totalHeight = baseHeight + 13;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: `${baseWidth * scale}px`,
    height: `${totalHeight * scale}px`,
    gridColumn: app.colSpan ? `span ${app.colSpan}` : 'span 1',
    gridRow: app.rowSpan ? `span ${app.rowSpan}` : 'span 1',
    opacity: isDragging ? 0 : 1,
  };

  const handleClick = (e) => {
    if (!isEditMode && onAppClick) {
      e.stopPropagation();
      onAppClick(app);
    }
  };

  return (
    <div
      ref={setRefs}
      style={style}
      {...attributes}
      {...listeners}
      data-app-item="true"
      onClick={handleClick}
      className={cn(
        'touch-none',
        isEditMode && 'cursor-grab active:cursor-grabbing',
        isEditMode && !isDragging && 'animate-wiggle',
        !isEditMode && 'cursor-pointer'
      )}
    >
      <Application app={app} scale={scale} />
    </div>
  );
}
