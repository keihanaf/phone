import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { cn } from "@/shared/utils/cn.js";
import "@flaticon/flaticon-uicons/css/all/all.css";

// Notification variants
const notificationVariants = cva(
  "bg-black border border-white/10 rounded-[25px] relative shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-white/20",
  {
    variants: {
      variant: {
        default: "w-full max-w-[280px]",
        compact: "w-[265px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function PingNotification({
  senderName,
  onAccept,
  onDeny,
  icon = "fi-rs-map-marker-plus",
  iconColor = "#315DFF",
  title = "Incoming Ping",
  value,
  acceptText = "Accept",
  denyText = "Deny",
  variant = "default",
  scale = 1,
}) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    if (onAccept) {
      onAccept();
    }
  };

  const handleDeny = () => {
    if (onDeny) {
      onDeny();
    }
  };

  // Convert hex color to rgba with 30% opacity
  const hexToRgba = (hex, opacity = 0.3) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const acceptBgColor = hexToRgba(iconColor, 0.3);
  const acceptBgHoverColor = hexToRgba(iconColor, 0.5);

  return (
    <motion.div
      initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
      animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
      exit={{ scaleX: 0, scaleY: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(notificationVariants({ variant }))}
      style={{
        transformOrigin: "top center",
      }}
    >
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center relative"
          style={{
            paddingTop: `${26 * scale}px`,
            paddingBottom: `${10 * scale}px`,
            paddingLeft: `${1 * scale}px`,
            paddingRight: `${1 * scale}px`,
          }}
        >
          {/* Content */}
          <div
            className="flex flex-col items-start relative shrink-0 w-full"
            style={{ gap: `${10 * scale}px` }}
          >
            {/* Header with Icon and Text */}
            <div className="relative shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div
                  className="flex items-center relative w-full"
                  style={{
                    gap: `${10 * scale}px`,
                    paddingLeft: `${20 * scale}px`,
                    paddingRight: `${20 * scale}px`,
                  }}
                >
                  {/* Location Pin Icon */}
                  <div
                    className="relative shrink-0 flex items-center justify-center"
                    style={{
                      width: `${20 * scale}px`,
                      height: `${20 * scale}px`,
                    }}
                  >
                    <i
                      className={`fi ${icon} flex justify-center items-center transition-transform duration-300 hover:scale-110`}
                      style={{
                        fontSize: `${20 * scale}px`,
                        color: iconColor,
                        lineHeight: 1,
                      }}
                    />
                  </div>

                  {/* Text Container */}
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    {/* Title */}
                    <div className="flex items-center justify-between relative shrink-0 w-full">
                      <p
                        className="text-white font-bold relative shrink-0"
                        style={{
                          fontSize: `${10 * scale}px`,
                          lineHeight: `${10 * scale}px`,
                        }}
                      >
                        {title}
                      </p>
                      {value && (
                        <p
                          className="text-white font-bold relative shrink-0"
                          style={{
                            fontSize: `${10 * scale}px`,
                            lineHeight: `${10 * scale}px`,
                          }}
                        >
                          {value}
                        </p>
                      )}
                    </div>

                    {/* Sender Name */}
                    <div className="flex items-center justify-between relative shrink-0 w-full">
                      <p
                        className="flex-1 min-w-0 text-white/50 truncate"
                        style={{
                          fontSize: `${6 * scale}px`,
                          lineHeight: `${6 * scale}px`,
                          marginTop: `${2 * scale}px`,
                        }}
                      >
                        {senderName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div
                  className="flex items-center relative w-full"
                  style={{
                    gap: `${5 * scale}px`,
                    paddingLeft: `${10 * scale}px`,
                    paddingRight: `${10 * scale}px`,
                  }}
                >
                  {/* Deny Button */}
                  <button
                    onClick={handleDeny}
                    className="cursor-pointer flex flex-1 items-center justify-center rounded-[20px] transition-all duration-200 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
                    style={{
                      height: `${25 * scale}px`,
                      paddingTop: `${5 * scale}px`,
                      paddingBottom: `${5 * scale}px`,
                      backgroundColor: "rgba(112, 115, 140, 0.5)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(112, 115, 140, 0.7)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(112, 115, 140, 0.5)";
                    }}
                    aria-label="Deny ping"
                  >
                    <p
                      className="text-white relative shrink-0"
                      style={{
                        fontSize: `${10 * scale}px`,
                        lineHeight: `${10 * scale}px`,
                      }}
                    >
                      {denyText}
                    </p>
                  </button>

                  {/* Accept Button */}
                  <button
                    onClick={handleAccept}
                    className="cursor-pointer flex flex-1 items-center justify-center rounded-[20px] transition-all duration-200 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
                    style={{
                      height: `${25 * scale}px`,
                      paddingTop: `${5 * scale}px`,
                      paddingBottom: `${5 * scale}px`,
                      backgroundColor: acceptBgColor,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        acceptBgHoverColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = acceptBgColor;
                    }}
                    aria-label="Accept ping"
                  >
                    <p
                      className="relative shrink-0"
                      style={{
                        fontSize: `${10 * scale}px`,
                        lineHeight: `${10 * scale}px`,
                        color: iconColor,
                      }}
                    >
                      {acceptText}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

PingNotification.propTypes = {
  senderName: PropTypes.string.isRequired,
  onAccept: PropTypes.func,
  onDeny: PropTypes.func,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  acceptText: PropTypes.string,
  denyText: PropTypes.string,
  variant: PropTypes.oneOf(["default", "compact"]),
  scale: PropTypes.number,
};

PingNotification.defaultProps = {
  icon: "fi-rs-map-marker-plus",
  iconColor: "#315DFF",
  title: "Incoming Ping",
  acceptText: "Accept",
  denyText: "Deny",
  variant: "default",
  scale: 1,
};
