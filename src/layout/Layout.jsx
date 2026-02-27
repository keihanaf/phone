import { Outlet } from "react-router-dom";
import { useRef } from "react";
import backgroundImage from "@/assets/images/background.jpeg";
import Header from "@/layout/Header";
import { useResize } from "@/shared/hooks/useResize";

function Layout() {
  const wrapperRef = useRef(null);
  const { size, scale, isResizing, handleResizeStart } = useResize({
    baseWidth: 280,
    baseHeight: 600,
    maxScale: 1.2,
  });

  const contentWidth = 265 * scale;
  const contentHeight = 580 * scale;
  const contentGap = 15 * scale;
  const borderRadius = 35 * scale;
  const borderWidth = 5 * scale;
  const boxShadowWidth = 2 * scale;

  return (
    <main className="h-screen w-screen bg-gray-100 flex items-end justify-center pb-8">
      <div className="w-full max-w-7xl mx-auto flex items-end justify-center">
        <div
          ref={wrapperRef}
          className="relative"
          style={{
            width: `${size.width}px`,
            height: `${size.height}px`,
            transition: isResizing
              ? "none"
              : "width 0.1s ease-out, height 0.1s ease-out",
          }}
        >
          <div
            className="relative flex justify-center items-center overflow-hidden bg-zinc-900"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: `${borderRadius}px`,
              borderWidth: `${borderWidth}px`,
              borderColor: "#000000",
              borderStyle: "solid",
              boxShadow: `0px 0px 0px ${boxShadowWidth}px #848484`,
            }}
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
              style={{
                width: `${contentWidth}px`,
                height: `${contentHeight}px`,
                gap: `${contentGap}px`,
              }}
            >
              <Header scale={scale} />
              <Outlet context={{ scale }} />
            </div>
          </div>

          {/* Resize Handle - Top Left Corner */}
          <div
            onMouseDown={handleResizeStart}
            className="absolute hover:bg-blue-500/30 transition-colors"
            style={{
              top: "0",
              left: "0",
              width: `${40 * scale}px`,
              height: `${40 * scale}px`,
              cursor: "nwse-resize",
              zIndex: 1,
              borderTopLeftRadius: `${borderRadius}px`,
            }}
            title="Drag to resize"
          />
        </div>
      </div>
    </main>
  );
}

export default Layout;
