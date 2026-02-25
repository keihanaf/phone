import { useState, useRef, useMemo } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
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
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  CloudSun,
  Image as ImageIcon,
  Calendar,
  Clock,
  MessageSquare,
  Store,
  Wallet,
  Settings,
  Music,
  Calculator,
  Newspaper,
  Phone,
  Camera as CameraIcon,
  MessageCircle,
  Mail,
  Map,
  Video,
  Compass,
} from "lucide-react";
import backgroundImage from "../../../assets/background1.jpeg";
import statusImage from "../../../assets/status 2.png";

// --- Utils ---
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- CVA Variants ---
const appIconVariants = cva(
  "flex justify-center items-center bg-[#14151A] border border-white/10 transition-all",
  {
    variants: {
      size: {
        normal:
          "w-[50px] h-[50px] rounded-[15px] shadow-[0px_7px_20px_0px_#FFFFFF1A_inset,0px_-9px_20px_0px_#0000004D_inset]",
        dock: "w-[50px] h-[50px] rounded-[15px]",
      },
    },
    defaultVariants: {
      size: "normal",
    },
  },
);

// --- Mock Data ---
const INITIAL_PAGES = [
  // صفحه اول
  [
    {
      id: "weather-1",
      order: 1,
      name: "Weather",
      icon: CloudSun,
      colSpan: 2,
      rowSpan: 2,
      isWidget: true,
      widgetSize: { width: "115px", height: "122px" },
    },
    { id: "photos-2", order: 2, name: "Photos", icon: ImageIcon },
    { id: "calendar-3", order: 3, name: "Calendar", icon: Calendar },
    { id: "notes-4", order: 4, name: "Notes", icon: MessageSquare },
    { id: "clock-5", order: 5, name: "Clock", icon: Clock },
    { id: "bleeter-6", order: 6, name: "Bleeter", icon: MessageSquare },
    { id: "fruit-7", order: 7, name: "FruitMarket", icon: Store },
    { id: "paymate-8", order: 8, name: "PayMate", icon: Wallet },
    { id: "settings-9", order: 9, name: "Settings", icon: Settings },
    { id: "yellow-10", order: 10, name: "YellowJack", icon: Store },
    { id: "garages-11", order: 11, name: "Garages", icon: Store },
    { id: "dynasty-12", order: 12, name: "Dynasty8", icon: Store },
    { id: "music-13", order: 13, name: "iFruit Music", icon: Music },
    { id: "calc-14", order: 14, name: "Calculator", icon: Calculator },
    { id: "news-15", order: 15, name: "News", icon: Newspaper },
  ],
  // صفحه دوم
  [
    { id: "maps-16", order: 16, name: "Maps", icon: Map },
    { id: "videos-17", order: 17, name: "Videos", icon: Video },
    { id: "compass-18", order: 18, name: "Compass", icon: Compass },
    { id: "mail-19", order: 19, name: "Mail", icon: Mail },
    { id: "camera-20", order: 20, name: "Camera", icon: CameraIcon },
    { id: "messages-21", order: 21, name: "Messages", icon: MessageCircle },
  ],
];

const DOCK_APPS = [
  { icon: Phone },
  { icon: CameraIcon },
  { icon: MessageCircle },
  { icon: Mail },
];

// --- Sortable App Item Component ---
function SortableAppItem({ app, isEditMode }) {
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
        "flex flex-col items-center touch-none",
        isEditMode && "cursor-grab active:cursor-grabbing",
        isEditMode && !isDragging && "animate-wiggle",
      )}
    >
      {/* App Icon / Widget */}
      <div
        className={cn(
          appIconVariants({ size: "normal" }),
          app.isWidget &&
            "w-full h-full bg-blue-400 rounded-[15px] border border-white/10",
        )}
      >
        <app.icon
          className="text-white"
          style={{ width: "27.5px", height: "35.3px" }}
          strokeWidth={1}
        />
      </div>
      {/* App Name */}
      {!app.isWidget && (
        <div
          className="text-white text-center font-normal mt-[3px]"
          style={{
            width: "50px",
            fontSize: "8px",
            lineHeight: "10px",
            overflow: "visible",
            whiteSpace: "nowrap",
          }}
        >
          {app.name}
        </div>
      )}
    </div>
  );
}

// --- Main Component ---
export default function HomeScreenPage() {
  const [pages, setPages] = useState(INITIAL_PAGES);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const containerRef = useRef(null);
  const edgeCheckInterval = useRef(null);
  const lastOverIdRef = useRef(null);
  const dragSourcePageRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: isEditMode ? 5 : 999999,
      },
    }),
  );

  // Long press handler
  const handlePointerDown = (e) => {
    if (isEditMode) return;

    const timer = setTimeout(() => {
      setIsEditMode(true);
    }, 500);

    setLongPressTimer(timer);
  };

  const handlePointerUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  // Exit edit mode
  const handleBackgroundClick = (e) => {
    if (isEditMode) {
      // Check if click is not on an app item
      const target = e.target;
      const isAppClick = target.closest("[data-app-item]");

      if (!isAppClick) {
        setIsEditMode(false);
      }
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    lastOverIdRef.current = null;
    dragSourcePageRef.current = currentPage;
  };

  const handleDragMove = (event) => {
    if (!isEditMode || !activeId || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const pointerX = event.activatorEvent.clientX + event.delta.x;

    const EDGE_THRESHOLD = 40;
    const leftEdge = containerRect.left + EDGE_THRESHOLD;
    const rightEdge = containerRect.right - EDGE_THRESHOLD;

    // Check left edge - go to previous page
    if (pointerX < leftEdge && currentPage > 0) {
      if (!edgeCheckInterval.current) {
        setDirection(-1);
        setCurrentPage((prev) => Math.max(0, prev - 1));
        edgeCheckInterval.current = true;
        setTimeout(() => {
          edgeCheckInterval.current = null;
        }, 500);
      }
    }
    // Check right edge - go to next page
    else if (pointerX > rightEdge && currentPage < pages.length - 1) {
      if (!edgeCheckInterval.current) {
        setDirection(1);
        setCurrentPage((prev) => Math.min(pages.length - 1, prev + 1));
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

    // Just track the last over ID, don't update state here
    lastOverIdRef.current = over.id;
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const sourcePage = dragSourcePageRef.current ?? currentPage;

      setPages((prevPages) => {
        const newPages = [...prevPages];

        // Find active item
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

        // Find over item
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

        // Same page
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
        }
        // Cross-page
        else {
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

  const handlePageSwipe = (_event, info) => {
    if (isEditMode) return;

    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 50 || velocity > 500) {
      if (currentPage > 0) {
        setDirection(-1);
        setCurrentPage(currentPage - 1);
      }
    } else if (offset < -50 || velocity < -500) {
      if (currentPage < pages.length - 1) {
        setDirection(1);
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 265 : -265,
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -265 : 265,
      opacity: 1,
    }),
  };

  const activeApp = activeId
    ? pages.flat().find((app) => app.id === activeId)
    : null;

  return (
    <div
      className="relative flex justify-center items-center overflow-hidden bg-zinc-900"
      style={{
        width: "280px",
        height: "600px",
        borderRadius: "35px",
        borderWidth: "5px",
        borderColor: "#000000",
        borderStyle: "solid",
        boxShadow: "0px 0px 0px 2px #848484",
      }}
      onClick={handleBackgroundClick}
      ref={containerRef}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center"
        style={{ width: "265px", height: "580px", gap: "15px" }}
      >
        {/* === Header === */}
        <div
          className="flex justify-between items-center px-[20px] shrink-0"
          style={{ width: "265px", height: "20px" }}
        >
          <div
            className="flex items-center justify-center text-white text-[10px] font-bold tracking-[1px]"
            style={{ width: "54px", height: "13px", lineHeight: "100%" }}
          >
            9:41
          </div>

          <div
            className="absolute left-1/2 -translate-x-1/2 bg-black flex items-center justify-end"
            style={{
              width: "70px",
              height: "20px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <div
              className="bg-zinc-800 rounded-full mr-2"
              style={{ width: "12px", height: "12px" }}
            />
          </div>

          <div
            className="flex justify-end items-center"
            style={{ width: "54px", height: "15px" }}
          >
            <img
              src={statusImage}
              alt="status"
              style={{ width: "54px", height: "15px", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* === Main Content === */}
        <div
          className="flex flex-col justify-between items-center shrink-0 overflow-hidden"
          style={{ width: "265px", height: "460px" }}
        >
          <div
            className="relative"
            style={{
              width: "245px",
              height: "428px",
            }}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragMove={handleDragMove}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <AnimatePresence initial={false} custom={direction} mode="sync">
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.15,
                    ease: "easeOut",
                  }}
                  drag={!isEditMode ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={handlePageSwipe}
                  className="absolute inset-0"
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  onClick={handleBackgroundClick}
                >
                  <SortableContext
                    items={pages[currentPage].map((app) => app.id)}
                    strategy={rectSortingStrategy}
                  >
                    <div
                      className="grid"
                      style={{
                        gridTemplateColumns: "repeat(4, 50px)",
                        gridTemplateRows: "repeat(6, 56px)",
                        rowGap: "10px",
                        columnGap: "15px",
                      }}
                    >
                      {pages[currentPage].map((app) => (
                        <SortableAppItem
                          key={app.id}
                          app={app}
                          isEditMode={isEditMode}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </motion.div>
              </AnimatePresence>

              <DragOverlay dropAnimation={null}>
                {activeApp ? (
                  <div
                    className="flex flex-col items-center pointer-events-none"
                    style={{
                      width: activeApp.isWidget
                        ? activeApp.widgetSize?.width || "115px"
                        : "50px",
                      height: activeApp.isWidget
                        ? activeApp.widgetSize?.height || "115px"
                        : "63px",
                    }}
                  >
                    <div
                      className={cn(
                        appIconVariants({ size: "normal" }),
                        activeApp.isWidget &&
                          "w-full h-full bg-blue-400 rounded-[15px] border border-white/10",
                        "scale-110 shadow-2xl",
                      )}
                    >
                      <activeApp.icon
                        className="text-white"
                        style={{ width: "27.5px", height: "35.3px" }}
                        strokeWidth={1}
                      />
                    </div>
                    {!activeApp.isWidget && (
                      <div
                        className="text-white text-center font-normal mt-[3px]"
                        style={{
                          width: "50px",
                          fontSize: "8px",
                          lineHeight: "10px",
                          overflow: "visible",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {activeApp.name}
                      </div>
                    )}
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>

          {/* Navigation */}
          <div
            className="flex items-center justify-center bg-black/20"
            style={{
              width: "25px",
              height: "9px",
              gap: "2px",
              borderRadius: "9px",
              padding: "3px 5px",
            }}
          >
            {pages.map((_, index) => (
              <div
                key={index}
                className={currentPage === index ? "bg-white" : "bg-white/50"}
                style={{
                  width: currentPage === index ? "10px" : "3px",
                  height: "3px",
                  borderRadius: "3px",
                }}
              />
            ))}
          </div>
        </div>

        {/* === Dock === */}
        <div
          className="flex justify-center items-center bg-white/5 backdrop-blur-md shrink-0"
          style={{
            width: "265px",
            height: "70px",
            gap: "15px",
            borderRadius: "25px",
            border: "1px solid #FFFFFF1A",
            padding: "10px",
          }}
        >
          {DOCK_APPS.map((app, index) => (
            <div
              key={`dock-${index}`}
              className={cn(appIconVariants({ size: "dock" }))}
            >
              <app.icon
                className="text-green-400"
                style={{ width: "32px", height: "32px" }}
                strokeWidth={1.5}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
