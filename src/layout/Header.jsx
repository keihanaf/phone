import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import statusImage from "@/assets/images/statusbar.png";
import frontCameraImage from "@/assets/images/frontcamera.png";
import { CallNotification } from "@/components/CallNotification";
import { PingNotification } from "@/components/PingNotification";

export default function Header({ scale = 1 }) {
  const [showCallNotification, setShowCallNotification] = useState(false);
  const [showPingNotification, setShowPingNotification] = useState(false);

  const handleEndCall = () => {
    setShowCallNotification(false);
  };

  const handleAcceptCall = () => {
    setShowCallNotification(false);
  };

  const handleAcceptPing = () => {
    setShowPingNotification(false);
  };

  const handleDenyPing = () => {
    setShowPingNotification(false);
  };

  const showNotification = showCallNotification || showPingNotification;

  return (
    <div
      className="relative flex justify-between items-center px-[20px] shrink-0"
      style={{ width: `${265 * scale}px`, height: `${20 * scale}px` }}
    >
      {/* Status Bar - Hidden when notification is shown */}
      <AnimatePresence>
        {!showNotification && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center text-white font-bold tracking-[1px]"
              style={{
                width: `${54 * scale}px`,
                height: `${13 * scale}px`,
                lineHeight: "100%",
                fontSize: `${10 * scale}px`,
              }}
            >
              9:41
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-end items-center"
              style={{ width: `${54 * scale}px`, height: `${15 * scale}px` }}
            >
              <img
                src={statusImage}
                alt="status"
                style={{
                  height: `${15 * scale}px`,
                  objectFit: "contain",
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Front Camera - Always visible */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-black flex items-center justify-end"
        style={{
          width: `${70 * scale}px`,
          height: `${20 * scale}px`,
          borderBottomLeftRadius: `${10 * scale}px`,
          borderBottomRightRadius: `${10 * scale}px`,
          borderTopLeftRadius: `${10 * scale}px`,
          borderTopRightRadius: `${10 * scale}px`,
          zIndex: 10,
        }}
      >
        <img
          src={frontCameraImage}
          alt="front camera"
          style={{
            height: `${20 * scale}px`,
            objectFit: "contain",
          }}
        />
      </div>

      {/* Call Notification - Overlays status bar */}
      <AnimatePresence>
        {showCallNotification && (
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ zIndex: 5 }}
          >
            <CallNotification
              callerName="John Doe"
              onEnd={handleEndCall}
              onAccept={handleAcceptCall}
              variant="compact"
              scale={scale}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Ping Notification - Overlays status bar */}
      <AnimatePresence>
        {showPingNotification && (
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              zIndex: 5,
              top: `-${1 * scale}px`,
            }}
          >
            <PingNotification
              senderName="Jane Smith"
              onAccept={handleAcceptPing}
              onDeny={handleDenyPing}
              icon="fi-rs-map-marker-plus"
              iconColor="#34C759"
              value="$296"
              variant="compact"
              scale={scale}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
