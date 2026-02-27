import { useState, useRef } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import DraggableGrid, {
  SortableGrid,
} from "@/features/HomeScreen/components/DraggableGrid";
import SortableAppItem from "@/features/HomeScreen/components/SortableAppItem";
import Application, {
  DockApplication,
} from "@/features/HomeScreen/components/Application";

const INITIAL_PAGES = [
  // صفحه اول
  [
    {
      id: "weather-1",
      order: 1,
      name: "Weather",
      colSpan: 2,
      rowSpan: 2,
      isWidget: true,
      widgetSize: { width: "115px", height: "122px" },
      widgetBg: "linear-gradient(0deg, #017BFF 0%, #5EC6F6 100%)",
    },
    {
      id: "photos-2",
      order: 2,
      name: "Photos",
      image: "/src/assets/icons/gallery.png",
      iconVariant: "full",
    },
    {
      id: "calendar-3",
      order: 3,
      name: "Calendar",
      image: "/src/assets/icons/calendar.png",
      iconVariant: "full",
    },
    {
      id: "notes-4",
      order: 4,
      name: "Notes",
      image: "/src/assets/icons/notes.png",
      iconVariant: "full",
    },
    {
      id: "clock-5",
      order: 5,
      name: "Clock",
      image: "/src/assets/icons/clock.png",
      iconVariant: "full",
    },
    {
      id: "bleeter-6",
      order: 6,
      name: "Bleeter",
      image: "/src/assets/icons/bleeter.png",
      iconVariant: "full",
    },
    {
      id: "fruit-7",
      order: 7,
      name: "FruitMarket",
      image: "/src/assets/icons/fruitmarket.png",
      iconVariant: "full",
    },
    {
      id: "paymate-8",
      order: 8,
      name: "PayMate",
      image: "/src/assets/icons/paymate.png",
      iconVariant: "full",
    },
    {
      id: "settings-9",
      order: 9,
      name: "Settings",
      image: "/src/assets/icons/settings.png",
      iconVariant: "full",
    },
    {
      id: "yellow-10",
      order: 10,
      name: "YellowJack",
      image: "/src/assets/icons/yellowjack.png",
      iconVariant: "full",
    },
    {
      id: "garages-11",
      order: 11,
      name: "Garages",
      image: "/src/assets/icons/garages.png",
      iconVariant: "full",
    },
    {
      id: "dynasty-12",
      order: 12,
      name: "Dynasty8",
      image: "/src/assets/icons/dynasty8.png",
      iconVariant: "full",
    },
    {
      id: "music-13",
      order: 13,
      name: "iFruit Music",
      image: "/src/assets/icons/ifruitmusic.png",
      iconVariant: "full",
    },
    {
      id: "calc-14",
      order: 14,
      name: "Calculator",
      image: "/src/assets/icons/calculator.png",
      iconVariant: "full",
    },
    {
      id: "news-15",
      order: 15,
      name: "News",
      image: "/src/assets/icons/news.png",
      iconVariant: "full",
    },
  ],
  // صفحه دوم
  [
    {
      id: "news-16",
      order: 16,
      name: "News",
      image: "/src/assets/icons/news.png",
      iconVariant: "full",
    },
    {
      id: "calc-17",
      order: 17,
      name: "Calculator",
      image: "/src/assets/icons/calculator.png",
      iconVariant: "full",
    },
    {
      id: "paymate-18",
      order: 18,
      name: "PayMate",
      image: "/src/assets/icons/paymate.png",
      iconVariant: "full",
    },
    {
      id: "clock-19",
      order: 19,
      name: "Clock",
      image: "/src/assets/icons/clock.png",
      iconVariant: "full",
    },
    {
      id: "music-20",
      order: 20,
      name: "iFruit Music",
      image: "/src/assets/icons/ifruitmusic.png",
      iconVariant: "full",
    },
    {
      id: "dynasty-21",
      order: 21,
      name: "Dynasty8",
      image: "/src/assets/icons/dynasty8.png",
      iconVariant: "full",
    },
  ],
];

const DOCK_APPS = [
  {
    image: "/src/assets/icons/phone.png",
    iconVariant: "full",
  },
  {
    image: "/src/assets/icons/camera.png",
    iconVariant: "full",
  },
  {
    image: "/src/assets/icons/message.png",
    iconVariant: "full",
  },
  {
    image: "/src/assets/icons/email.png",
    iconVariant: "full",
    imageSize: { width: "40px", height: "40px", marginTop: "7px" },
  },
];

// --- Main Component ---
export default function HomeScreenPage() {
  const { scale = 1 } = useOutletContext();
  const [pages, setPages] = useState(INITIAL_PAGES);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const containerRef = useRef(null);

  const contentWidth = 265 * scale;
  const contentHeight = 460 * scale;
  const containerWidth = 245 * scale;
  const containerHeight = 428 * scale;
  const dockWidth = 265 * scale;
  const dockHeight = 70 * scale;
  const dockGap = 15 * scale;
  const dockBorderRadius = 25 * scale;
  const dockPadding = 10 * scale;
  const navWidth = 25 * scale;
  const navHeight = 9 * scale;
  const navGap = 2 * scale;
  const navBorderRadius = 9 * scale;
  const navPaddingV = 3 * scale;
  const navPaddingH = 5 * scale;

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
      x: direction > 0 ? contentWidth : -contentWidth,
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -contentWidth : contentWidth,
      opacity: 1,
    }),
  };

  const renderAppItem = (app) => (
    <SortableAppItem
      key={app.id}
      app={app}
      isEditMode={isEditMode}
      scale={scale}
    />
  );

  const renderDragOverlay = (activeId) => {
    const activeApp = pages.flat().find((app) => app.id === activeId);
    if (!activeApp) return null;

    return (
      <div className="pointer-events-none scale-110 shadow-2xl">
        <Application app={activeApp} scale={scale} />
      </div>
    );
  };

  return (
    <>
      {/* === Main Content === */}
      <div
        className="flex flex-col justify-between items-center shrink-0 overflow-hidden"
        style={{ width: `${contentWidth}px`, height: `${contentHeight}px` }}
      >
        <div
          className="relative"
          style={{
            width: `${containerWidth}px`,
            height: `${containerHeight}px`,
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
                    gridTemplateColumns: `repeat(4, ${50 * scale}px)`,
                    gridTemplateRows: `repeat(6, ${63 * scale}px)`,
                    rowGap: `${10 * scale}px`,
                    columnGap: `${15 * scale}px`,
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
            width: `${navWidth}px`,
            height: `${navHeight}px`,
            gap: `${navGap}px`,
            borderRadius: `${navBorderRadius}px`,
            padding: `${navPaddingV}px ${navPaddingH}px`,
          }}
        >
          {pages.map((_, index) => (
            <div
              key={index}
              className={currentPage === index ? "bg-white" : "bg-white/50"}
              style={{
                width:
                  currentPage === index ? `${10 * scale}px` : `${3 * scale}px`,
                height: `${3 * scale}px`,
                borderRadius: `${3 * scale}px`,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* === Dock === */}
      <div
        className="flex justify-center items-center bg-white/5 backdrop-blur-md shrink-0"
        style={{
          width: `${dockWidth}px`,
          height: `${dockHeight}px`,
          gap: `${dockGap}px`,
          borderRadius: `${dockBorderRadius}px`,
          border: "1px solid #FFFFFF1A",
          padding: `${dockPadding}px`,
        }}
      >
        {DOCK_APPS.map((app, index) => (
          <DockApplication key={`dock-${index}`} app={app} scale={scale} />
        ))}
      </div>
    </>
  );
}
