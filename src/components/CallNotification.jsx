import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { cn } from "@/shared/utils/cn.js";

// Notification variants
const notificationVariants = cva(
  "bg-black border border-white/10 rounded-[25px] relative overflow-hidden transition-all duration-300 hover:border-white/20 shadow-lg hover:shadow-xl",
  {
    variants: {
      variant: {
        default: "w-full max-w-[280px] h-[28px] md:h-[32px]",
        compact: "w-[223px] h-[26px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function CallNotification({
  callerName,
  onEnd,
  onAccept,
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

  const handleEndCall = () => {
    if (onEnd) {
      onEnd();
    }
  };

  const handleAcceptCall = () => {
    if (onAccept) {
      onAccept();
    }
  };

  const notificationHeight = variant === "compact" ? 26 : 28;
  const notificationWidth = variant === "compact" ? 223 : 265;

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      exit={{ scaleX: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(notificationVariants({ variant }))}
      style={{
        width: `${notificationWidth * scale}px`,
        height: `${notificationHeight * scale}px`,
        transformOrigin: "center",
      }}
    >
      {/* Call Information Container */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-full"
          style={{
            height: `${16 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${5 * scale}px`,
          }}
        >
          <div
            className="flex items-center justify-between h-full"
            style={{ gap: `${5 * scale}px` }}
          >
            {/* Phone Icon */}
            <div
              className="shrink-0 flex items-center justify-center"
              style={{
                width: `${10 * scale}px`,
                height: `${10 * scale}px`,
              }}
            >
              <i
                className="fi fi-ss-phone-call flex justify-center items-center"
                style={{
                  fontSize: `${10 * scale}px`,
                  color: "#315DFF",
                  lineHeight: 1,
                }}
              />
            </div>

            {/* Caller Name */}
            <div className="flex-1 flex items-center min-w-0">
              <p
                className="text-white truncate"
                style={{
                  fontSize: `${8 * scale}px`,
                  lineHeight: `${8 * scale}px`,
                }}
              >
                {callerName}
              </p>
            </div>

            {/* End Call Button */}
            <button
              onClick={handleEndCall}
              className="bg-[#ff383c] cursor-pointer rounded-[10px] flex items-center justify-center shrink-0 transition-all duration-200 hover:bg-[#ff4a4e] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ff383c] focus:ring-offset-2 focus:ring-offset-black"
              style={{
                width: `${16 * scale}px`,
                height: `${16 * scale}px`,
              }}
              aria-label="End call"
            >
              <i
                className="fi fi-rs-cross flex justify-center items-center"
                style={{
                  fontSize: `${8 * scale}px`,
                  color: "rgba(255, 255, 255, 0.9)",
                  lineHeight: 1,
                }}
              />
            </button>

            {/* Accept Call Button */}
            <button
              onClick={handleAcceptCall}
              className="bg-[#315DFF] rounded-[10px] cursor-pointer flex items-center justify-center shrink-0 transition-all duration-200 hover:bg-[#4169FF] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#315DFF] focus:ring-offset-2 focus:ring-offset-black"
              style={{
                width: `${16 * scale}px`,
                height: `${16 * scale}px`,
              }}
              aria-label="Accept call"
            >
              <i
                className="fi fi-rs-check flex justify-center items-center"
                style={{
                  fontSize: `${8 * scale}px`,
                  color: "rgba(255, 255, 255, 0.9)",
                  lineHeight: 1,
                }}
              />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

CallNotification.propTypes = {
  callerName: PropTypes.string.isRequired,
  onEnd: PropTypes.func,
  onAccept: PropTypes.func,
  variant: PropTypes.oneOf(["default", "compact"]),
  scale: PropTypes.number,
};

CallNotification.defaultProps = {
  variant: "default",
  scale: 1,
};
