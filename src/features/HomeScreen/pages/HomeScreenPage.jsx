import { useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";
import {
  Battery,
  Wifi,
  Signal,
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

// --- Utils ---
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- CVA Variants ---
// ساختار CVA برای باکس آیکون برنامه‌ها که بتوانیم در صورت نیاز استایل‌های مختلف به آن بدهیم
const appIconVariants = cva(
  "flex justify-center items-center bg-[#14151A] border border-white/10",
  {
    variants: {
      size: {
        normal:
          "w-[50px] h-[50px] rounded-[15px] shadow-[0px_7px_20px_0px_#FFFFFF1A_inset,0px_-9px_20px_0px_#0000004D_inset]",
        dock: "w-[50px] h-[50px] rounded-[15px]", // داک شدو داخلی ندارد طبق توضیحات
      },
    },
    defaultVariants: {
      size: "normal",
    },
  },
);

// --- Mock Data ---
const PAGES = [
  // صفحه اول - با ویجت آب و هوا
  [
    {
      name: "Weather",
      icon: CloudSun,
      colSpan: 2,
      rowSpan: 2,
      isWidget: true,
      widgetSize: { width: "115px", height: "122px" },
    },
    { name: "Photos", icon: ImageIcon },
    { name: "Calendar", icon: Calendar },
    { name: "Notes", icon: MessageSquare },
    { name: "Clock", icon: Clock },
    { name: "Bleeter", icon: MessageSquare },
    { name: "FruitMarket", icon: Store },
    { name: "PayMate", icon: Wallet },
    { name: "Settings", icon: Settings },
    { name: "YellowJack", icon: Store },
    { name: "Garages", icon: Store },
    { name: "Dynasty8", icon: Store },
    { name: "iFruit Music", icon: Music },
    { name: "Calculator", icon: Calculator },
    { name: "News", icon: Newspaper },
  ],
  // صفحه دوم - 6 تا برنامه بدون ویجت
  [
    { name: "Maps", icon: Map },
    { name: "Videos", icon: Video },
    { name: "Compass", icon: Compass },
    { name: "Mail", icon: Mail },
    { name: "Camera", icon: CameraIcon },
    { name: "Messages", icon: MessageCircle },
  ],
];

const DOCK_APPS = [
  { icon: Phone },
  { icon: CameraIcon },
  { icon: MessageCircle },
  { icon: Mail },
];

// --- Component ---
export default function HomeScreenPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleDragEnd = (_event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 50 || velocity > 500) {
      // سوایپ به راست - صفحه قبل
      if (currentPage > 0) {
        setDirection(-1);
        setCurrentPage(currentPage - 1);
      }
    } else if (offset < -50 || velocity < -500) {
      // سوایپ به چپ - صفحه بعد
      if (currentPage < PAGES.length - 1) {
        setDirection(1);
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 265 : -265,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -265 : 265,
      opacity: 0,
    }),
  };

  return (
    /* کانتینر اصلی موبایل */
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
    >
      {/* بک گراند موبایل */}
      <div className="absolute inset-0 bg-linear-to-br from-zinc-800 to-black z-0" />

      {/* کانتینر داخلی */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{ width: "265px", height: "580px", gap: "15px" }}
      >
        {/* === Header === */}
        <div
          className="flex justify-between items-center px-[20px] shrink-0"
          style={{ width: "265px", height: "20px" }}
        >
          {/* Clock */}
          <div
            className="flex items-center justify-center text-white text-[10px] font-bold tracking-[1px]"
            style={{ width: "54px", height: "13px", lineHeight: "100%" }}
          >
            9:41
          </div>

          {/* Notch */}
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
            {/* Camera dot */}
            <div
              className="bg-zinc-800 rounded-full mr-2"
              style={{ width: "12px", height: "12px" }}
            />
          </div>

          {/* Status Bar */}
          <div
            className="flex justify-end items-center gap-1 text-white"
            style={{ width: "54px", height: "15px" }}
          >
            <Signal size={10} />
            <Wifi size={10} />
            <Battery size={12} />
          </div>
        </div>

        {/* === Main Content (Apps + Navigation) === */}
        <div
          className="flex flex-col justify-between items-center shrink-0 overflow-hidden"
          style={{ width: "265px", height: "460px" }}
        >
          {/* Apps Grid Container with AnimatePresence */}
          <div
            className="relative"
            style={{
              width: "245px",
              height: "428px",
            }}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 400, damping: 35 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 grid"
                style={{
                  gridTemplateColumns: "repeat(4, 50px)",
                  gridTemplateRows: "repeat(6, 56px)",
                  rowGap: "10px",
                  columnGap: "15px",
                }}
              >
                {PAGES[currentPage].map((app, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center"
                    style={{
                      width: app.isWidget
                        ? app.widgetSize?.width || "115px"
                        : "50px",
                      height: app.isWidget
                        ? app.widgetSize?.height || "115px"
                        : "63px",
                      gridColumn: app.colSpan
                        ? `span ${app.colSpan}`
                        : "span 1",
                      gridRow: app.rowSpan ? `span ${app.rowSpan}` : "span 1",
                    }}
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
                        className="text-white text-center font-normal mt-[3px] truncate"
                        style={{
                          width: "45px",
                          height: "10px",
                          fontSize: "8px",
                          lineHeight: "100%",
                        }}
                      >
                        {app.name}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation (Pagination) */}
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
            {PAGES.map((_, index) => (
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

        {/* === Dock (Bottom section) === */}
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
