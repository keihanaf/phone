import { cva } from "class-variance-authority";
import { cn } from "@/shared/utils/cn.js";

// Application Icon Variants
const applicationIconVariants = cva(
  "flex justify-center items-center bg-[#14151A] border border-white/10 transition-all",
  {
    variants: {
      size: {
        normal:
          "w-[50px] h-[50px] rounded-[15px] shadow-[0px_7px_20px_0px_#FFFFFF1A_inset,0px_-9px_20px_0px_#0000004D_inset]",
        dock: "w-[50px] h-[50px] rounded-[15px]",
      },
      variant: {
        default: "",
        widget:
          "w-full h-full bg-blue-400 rounded-[15px] border border-white/10",
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
  icon: Icon, // eslint-disable-line no-unused-vars
  size = "normal",
  variant = "default",
  className,
  iconClassName,
}) {
  return (
    <div className={cn(applicationIconVariants({ size, variant }), className)}>
      <Icon
        className={cn("text-white", iconClassName)}
        style={{ width: "27.5px", height: "35.3px" }}
        strokeWidth={1}
      />
    </div>
  );
}

// Application Name Component
export function ApplicationName({ name, className }) {
  return (
    <div
      className={cn("text-white text-center font-normal mt-[3px]", className)}
      style={{
        width: "50px",
        fontSize: "8px",
        lineHeight: "10px",
        overflow: "visible",
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </div>
  );
}

// Application Widget Component
export function ApplicationWidget({ app, className }) {
  const AppIcon = app.icon;

  return (
    <div
      className={cn(
        "w-full h-full bg-blue-400 rounded-[15px] border border-white/10 flex justify-center items-center",
        className,
      )}
    >
      <AppIcon
        className="text-white"
        style={{ width: "27.5px", height: "35.3px" }}
        strokeWidth={1}
      />
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
  iconClassName,
}) {
  const isWidget = app.isWidget;

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
        width: isWidget ? app.widgetSize?.width || "115px" : "50px",
        height: isWidget
          ? app.widgetSize?.height || "115px"
          : showName
            ? "63px"
            : "50px",
      }}
    >
      {isWidget ? (
        <ApplicationWidget app={app} />
      ) : (
        <>
          <ApplicationIcon
            icon={app.icon}
            size={size}
            className={iconClassName}
          />
          {showName && <ApplicationName name={app.name} />}
        </>
      )}
    </div>
  );
}

// Dock Application Component (specialized for dock)
export function DockApplication({ app, onClick, className }) {
  const AppIcon = app.icon;

  return (
    <div
      onClick={onClick}
      className={cn(
        applicationIconVariants({ size: "dock" }),
        onClick && "cursor-pointer",
        className,
      )}
    >
      <AppIcon
        className="text-green-400"
        style={{ width: "32px", height: "32px" }}
        strokeWidth={1.5}
      />
    </div>
  );
}
