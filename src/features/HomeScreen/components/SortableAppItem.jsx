import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/shared/utils/cn.js";
import Application from "@/features/HomeScreen/components/Application";

export default function SortableAppItem({ app, isEditMode }) {
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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: app.isWidget ? app.widgetSize?.width || "115px" : "50px",
    height: app.isWidget ? app.widgetSize?.height || "115px" : "63px",
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
      <Application app={app} />
    </div>
  );
}
