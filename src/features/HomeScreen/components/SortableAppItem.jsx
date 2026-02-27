import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/shared/utils/cn.js";
import Application from "@/features/HomeScreen/components/Application";

export default function SortableAppItem({ app, isEditMode, scale = 1 }) {
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

  const baseWidth = app.isWidget
    ? parseFloat(app.widgetSize?.width) || 115
    : 50;
  const baseHeight = app.isWidget
    ? parseFloat(app.widgetSize?.height) || 115
    : 50;

  // Add extra height for name (13px = 3px margin + 10px line height)
  const totalHeight = baseHeight + 13;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: `${baseWidth * scale}px`,
    height: `${totalHeight * scale}px`,
    gridColumn: app.colSpan ? `span ${app.colSpan}` : "span 1",
    gridRow: app.rowSpan ? `span ${app.rowSpan}` : "span 1",
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      data-app-item="true"
      className={cn(
        "touch-none",
        isEditMode && "cursor-grab active:cursor-grabbing",
        isEditMode && !isDragging && "animate-wiggle",
      )}
    >
      <Application app={app} scale={scale} />
    </div>
  );
}
