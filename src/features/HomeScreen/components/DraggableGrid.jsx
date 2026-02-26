import { useState, useRef } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

// SortableGrid Component
export function SortableGrid({ items, renderItem, gridClassName, gridStyle }) {
  return (
    <SortableContext
      items={items.map((item) => item.id)}
      strategy={rectSortingStrategy}
    >
      <div className={gridClassName} style={gridStyle}>
        {items.map((item) => renderItem(item))}
      </div>
    </SortableContext>
  );
}

// Main DraggableGrid Component
export default function DraggableGrid({
  onItemsChange,
  isEditMode,
  currentPage,
  onPageChange,
  totalPages,
  renderOverlay,
  containerRef,
  children,
}) {
  const [activeId, setActiveId] = useState(null);
  const lastOverIdRef = useRef(null);
  const dragSourcePageRef = useRef(null);
  const edgeCheckInterval = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: isEditMode ? 5 : 999999,
      },
    }),
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    lastOverIdRef.current = null;
    dragSourcePageRef.current = currentPage;
  };

  const handleDragMove = (event) => {
    if (!isEditMode || !activeId || !containerRef?.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const pointerX = event.activatorEvent.clientX + event.delta.x;

    const EDGE_THRESHOLD = 40;
    const leftEdge = containerRect.left + EDGE_THRESHOLD;
    const rightEdge = containerRect.right - EDGE_THRESHOLD;

    if (pointerX < leftEdge && currentPage > 0) {
      if (!edgeCheckInterval.current) {
        onPageChange(currentPage - 1, -1);
        edgeCheckInterval.current = true;
        setTimeout(() => {
          edgeCheckInterval.current = null;
        }, 500);
      }
    } else if (pointerX > rightEdge && currentPage < totalPages - 1) {
      if (!edgeCheckInterval.current) {
        onPageChange(currentPage + 1, 1);
        edgeCheckInterval.current = true;
        setTimeout(() => {
          edgeCheckInterval.current = null;
        }, 500);
      }
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    lastOverIdRef.current = over.id;
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onItemsChange((prevPages) => {
        const newPages = [...prevPages];

        let activePageIndex = -1;
        let activeItemIndex = -1;

        for (let i = 0; i < newPages.length; i++) {
          const idx = newPages[i].findIndex((app) => app.id === active.id);
          if (idx !== -1) {
            activePageIndex = i;
            activeItemIndex = idx;
            break;
          }
        }

        let overPageIndex = -1;
        let overItemIndex = -1;

        for (let i = 0; i < newPages.length; i++) {
          const idx = newPages[i].findIndex((app) => app.id === over.id);
          if (idx !== -1) {
            overPageIndex = i;
            overItemIndex = idx;
            break;
          }
        }

        if (activePageIndex === -1 || overPageIndex === -1) {
          return prevPages;
        }

        if (activePageIndex === overPageIndex) {
          const currentApps = [...newPages[activePageIndex]];
          const reorderedApps = arrayMove(
            currentApps,
            activeItemIndex,
            overItemIndex,
          );

          newPages[activePageIndex] = reorderedApps.map((app, index) => ({
            ...app,
            order: activePageIndex * 100 + index + 1,
          }));
        } else {
          const sourceApps = [...newPages[activePageIndex]];
          const targetApps = [...newPages[overPageIndex]];

          const [draggedApp] = sourceApps.splice(activeItemIndex, 1);
          targetApps.splice(overItemIndex, 0, draggedApp);

          newPages[activePageIndex] = sourceApps.map((app, index) => ({
            ...app,
            order: activePageIndex * 100 + index + 1,
          }));

          newPages[overPageIndex] = targetApps.map((app, index) => ({
            ...app,
            order: overPageIndex * 100 + index + 1,
          }));
        }

        return newPages;
      });
    }

    setActiveId(null);
    lastOverIdRef.current = null;
    dragSourcePageRef.current = null;
    edgeCheckInterval.current = null;
  };

  const handleDragCancel = () => {
    setActiveId(null);
    lastOverIdRef.current = null;
    dragSourcePageRef.current = null;
    edgeCheckInterval.current = null;
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {children}

      <DragOverlay dropAnimation={null}>
        {activeId ? renderOverlay(activeId) : null}
      </DragOverlay>
    </DndContext>
  );
}
