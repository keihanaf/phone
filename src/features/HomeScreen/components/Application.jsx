import { cva } from "class-variance-authority";
import { cn } from "@/shared/utils/cn.js";

// Application Icon Variants
const applicationIconVariants = cva(
  "flex justify-center items-center border border-white/10 transition-all",
  {
    variants: {
      size: {
        normal: "",
        dock: "",
      },
      variant: {
        default: "bg-[#14151A]",
        full: "bg-transparent border-0",
        widget: "w-full h-full bg-blue-400 border border-white/10",
      },
    },
    defaultVariants: {
      size: "normal",
      variant: "default",
    },
  },
);

// Application Icon Component
export function ApplicationIcon({
  image,
  imageSize,
  size = "normal",
  variant = "default",
  className,
  scale = 1,
}) {
  const isFull = variant === "full";
  const baseSize = size === "dock" ? 50 : 50;
  const borderRadius = 15 * scale;
  const actualSize = baseSize * scale;

  return (
    <div
      className={cn(applicationIconVariants({ size, variant }), className)}
      style={{
        width: `${actualSize}px`,
        height: `${actualSize}px`,
        borderRadius: `${borderRadius}px`,
        boxShadow:
          size === "normal" && variant === "default"
            ? `0px ${7 * scale}px ${20 * scale}px 0px #FFFFFF1A inset, 0px ${-9 * scale}px ${20 * scale}px 0px #0000004D inset`
            : undefined,
      }}
    >
      <img
        src={image}
        alt=""
        className={cn(isFull ? "w-full h-full object-cover" : "object-contain")}
        style={
          !isFull && imageSize
            ? {
                width: `${parseFloat(imageSize.width) * scale}px`,
                height: `${parseFloat(imageSize.height) * scale}px`,
                marginTop: `${(parseFloat(imageSize.marginTop) || 0) * scale}px`,
                borderRadius: isFull ? `${borderRadius}px` : undefined,
              }
            : !isFull
              ? { width: `${35 * scale}px`, height: `${35 * scale}px` }
              : { borderRadius: `${borderRadius}px` }
        }
      />
    </div>
  );
}

// Application Name Component
export function ApplicationName({ name, className, scale = 1 }) {
  return (
    <div
      className={cn("text-white text-center font-normal", className)}
      style={{
        width: `${50 * scale}px`,
        fontSize: `${8 * scale}px`,
        lineHeight: `${10 * scale}px`,
        marginTop: `${3 * scale}px`,
        overflow: "visible",
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </div>
  );
}

// Application Widget Component
export function ApplicationWidget({ app, className, scale = 1 }) {
  const borderRadius = 15 * scale;

  return (
    <div
      className={cn(
        "w-full h-full border border-white/10 flex justify-center items-center",
        className,
      )}
      style={{
        borderRadius: `${borderRadius}px`,
        background: app.widgetBg || "#3b82f6",
      }}
    >
      {app.image && (
        <img
          src={app.image}
          alt=""
          className="object-contain"
          style={{ width: `${50 * scale}px`, height: `${50 * scale}px` }}
        />
      )}
    </div>
  );
}

// Main Application Component
export default function Application({
  app,
  size = "normal",
  showName = true,
  onClick,
  className,
  scale = 1,
}) {
  const isWidget = app.isWidget;
  const baseWidth = isWidget ? parseFloat(app.widgetSize?.width) || 115 : 50;
  const baseHeight = isWidget
    ? parseFloat(app.widgetSize?.height) || 115
    : showName
      ? 63
      : 50;

  const handleClick = (e) => {
    if (onClick) {
      onClick(app, e);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center",
        onClick && "cursor-pointer",
        className,
      )}
      style={{
        width: `${baseWidth * scale}px`,
        height: `${baseHeight * scale}px`,
      }}
    >
      {isWidget ? (
        <ApplicationWidget app={app} scale={scale} />
      ) : (
        <>
          <ApplicationIcon
            image={app.image}
            imageSize={app.imageSize}
            size={size}
            variant={app.iconVariant || "default"}
            scale={scale}
          />
          {showName && <ApplicationName name={app.name} scale={scale} />}
        </>
      )}
    </div>
  );
}

// Dock Application Component (specialized for dock)
export function DockApplication({ app, onClick, className, scale = 1 }) {
  const baseSize = 50;
  const borderRadius = 15 * scale;
  const actualSize = baseSize * scale;

  return (
    <div
      onClick={onClick}
      className={cn(
        applicationIconVariants({ size: "dock" }),
        onClick && "cursor-pointer",
        className,
      )}
      style={{
        width: `${actualSize}px`,
        height: `${actualSize}px`,
        borderRadius: `${borderRadius}px`,
        backgroundColor: app.bgColor,
      }}
    >
      <img
        src={app.image}
        alt=""
        className="object-contain"
        style={
          app.imageSize
            ? {
                width: `${parseFloat(app.imageSize.width) * scale}px`,
                height: `${parseFloat(app.imageSize.height) * scale}px`,
                marginTop: `${(parseFloat(app.imageSize.marginTop) || 0) * scale}px`,
              }
            : { width: `${35 * scale}px`, height: `${35 * scale}px` }
        }
      />
    </div>
  );
}
