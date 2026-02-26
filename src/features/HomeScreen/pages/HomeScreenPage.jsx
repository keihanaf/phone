import { useState, useRef } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import DraggableGrid, {
  SortableGrid,
} from "@/features/HomeScreen/components/DraggableGrid";
import SortableAppItem from "@/features/HomeScreen/components/SortableAppItem";
import Application, {
  DockApplication,
} from "@/features/HomeScreen/components/Application";
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

// --- Main Component ---
export default function HomeScreenPage() {
  const [pages, setPages] = useState(INITIAL_PAGES);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const containerRef = useRef(null);

  // Long press handler
  const handlePointerDown = () => {
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
      const target = e.target;
      const isAppClick = target.closest("[data-app-item]");

      if (!isAppClick) {
        setIsEditMode(false);
      }
    }
  };

  const handlePageChange = (newPage, newDirection) => {
    setDirection(newDirection);
    setCurrentPage(newPage);
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

  const renderAppItem = (app) => (
    <SortableAppItem key={app.id} app={app} isEditMode={isEditMode} />
  );

  const renderDragOverlay = (activeId) => {
    const activeApp = pages.flat().find((app) => app.id === activeId);
    if (!activeApp) return null;

    return (
      <div className="pointer-events-none scale-110 shadow-2xl">
        <Application app={activeApp} />
      </div>
    );
  };

  return (
    <>
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
          ref={containerRef}
        >
          <DraggableGrid
            onItemsChange={setPages}
            isEditMode={isEditMode}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={pages.length}
            renderOverlay={renderDragOverlay}
            containerRef={containerRef}
          >
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <Motion.div
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
                <SortableGrid
                  items={pages[currentPage]}
                  renderItem={renderAppItem}
                  gridClassName="grid"
                  gridStyle={{
                    gridTemplateColumns: "repeat(4, 50px)",
                    gridTemplateRows: "repeat(6, 56px)",
                    rowGap: "10px",
                    columnGap: "15px",
                  }}
                />
              </Motion.div>
            </AnimatePresence>
          </DraggableGrid>
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
          <DockApplication key={`dock-${index}`} app={app} />
        ))}
      </div>
    </>
  );
}
