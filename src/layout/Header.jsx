import { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { AnimatePresence, motion } from 'framer-motion';
import statusImage from '@/assets/images/statusbar.png';
import frontCameraImage from '@/assets/images/frontcamera.png';
import { Notification } from '@/shared/components/templates/Notification.jsx';

export default function Header({ scale = 1 }) {
  // --- State Management ---
  const [activeNotification, setActiveNotification] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  // --- Handlers ---
  const handleClose = () => setActiveNotification(false);
  const handleAcceptSmallIncoming = () =>
    setActiveNotification('small-call-active');
  const handleAcceptCallIncoming = () => setActiveNotification('call-active');

  // --- Derived State ---
  const showNotification = activeNotification !== false;
  const isSmallCallNotification =
    activeNotification && activeNotification.startsWith('small-call');
  const isMinimizedCall = activeNotification === 'small-call-minimized';

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main Status Bar Container */}
      <div
        className="relative flex justify-between items-center px-5 shrink-0"
        style={{ width: `${265 * scale}px`, height: `${20 * scale}px` }}
      >
        {/* --- Default Status Bar Elements (Time & Icons) --- */}
        <AnimatePresence>
          {(!showNotification || isSmallCallNotification) && (
            <>
              {/* Time Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center text-white font-bold tracking-[1px] leading-none"
                style={{
                  width: `${54 * scale}px`,
                  height: `${13 * scale}px`,
                  fontSize: `${10 * scale}px`,
                }}
              >
                9:41
              </motion.div>

              {/* Status Icons (Battery, Signal, Wifi) */}
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
                  alt="System Status"
                  className="object-contain"
                  style={{
                    width: isMinimizedCall ? `${39 * scale}px` : undefined,
                    height: isMinimizedCall
                      ? `${10.91 * scale}px`
                      : `${15 * scale}px`,
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* --- Dynamic Island / Hardware Camera Cutout --- */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-black flex items-center justify-end z-20"
          style={{
            width: `${70 * scale}px`,
            height: `${20 * scale}px`,
            borderRadius: `${10 * scale}px`,
          }}
        >
          <img
            src={frontCameraImage}
            alt="Front Facing Camera"
            className="object-contain"
            style={{ height: `${20 * scale}px` }}
          />
        </div>

        {/* --- Dynamic Island Notifications Overlay --- */}

        {/* 1. Small Call Minimized */}
        <AnimatePresence>
          {activeNotification === 'small-call-minimized' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-1/2 -translate-x-1/2 z-15"
            >
              <Notification
                variant="small-call-minimized"
                callerName="Eddie Marshall"
                autoTimer
                onAccept={() => setActiveNotification('small-call-active')}
                scale={scale}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Small Call Incoming */}
        <AnimatePresence>
          {activeNotification === 'small-call-incoming' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-1/2 -translate-x-1/2 z-20"
            >
              <Notification
                variant="small-call-incoming"
                title="Eddie Marshall"
                onDeny={handleClose}
                onAccept={handleAcceptSmallIncoming}
                scale={scale}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Small Call Active */}
        <AnimatePresence>
          {activeNotification === 'small-call-active' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-1/2 -translate-x-1/2 z-20"
            >
              <Notification
                variant="small-call-active"
                callerName="Eddie Marshall"
                autoTimer
                onAccept={() => setActiveNotification('call-active')}
                scale={scale}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4. Full Call Incoming (Unknown) */}
        <AnimatePresence>
          {activeNotification === 'call-incoming-unknown' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-1/2 -translate-x-1/2 z-5"
              style={{ top: `-${1 * scale}px` }}
            >
              <Notification
                variant="call-incoming-unknown"
                callerPhone="0912 125 9138"
                callerLocation="Los Santos"
                onDeny={handleClose}
                onAccept={handleAcceptCallIncoming}
                scale={scale}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. Full Call Incoming (Known) */}
        <AnimatePresence>
          {activeNotification === 'call-incoming-known' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-1/2 -translate-x-1/2 z-5"
              style={{ top: `-${1 * scale}px` }}
            >
              <Notification
                variant="call-incoming-known"
                callerName="Eddie Marshall"
                callerInitials="EM"
                onDeny={handleClose}
                onAccept={handleAcceptCallIncoming}
                scale={scale}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6. Full Call Active */}
        <AnimatePresence>
          {activeNotification === 'call-active' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-1/2 -translate-x-1/2 z-5"
              style={{ top: `-${2 * scale}px` }}
            >
              <Notification
                variant="call-active"
                callerName="Eddie Marshall"
                callerInitials="EM"
                autoTimer
                isMuted={isMuted}
                isCameraOn={isCameraOn}
                isSpeakerOn={isSpeakerOn}
                onMute={() => setIsMuted((v) => !v)}
                onCamera={() => setIsCameraOn((v) => !v)}
                onSpeaker={() => setIsSpeakerOn((v) => !v)}
                onInfo={() => console.log('Info clicked')}
                onEndCall={handleClose}
                scale={scale}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 7. Standard Notification */}
        <AnimatePresence>
          {activeNotification === 'notification' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-1/2 -translate-x-1/2 z-5"
              style={{ top: `-${2 * scale}px` }}
            >
              <Notification
                variant="notification"
                title="Incoming Ping"
                subtitle="Jane Smith wants to share location"
                value="$296"
                icon="fi-rs-map-marker-plus"
                iconColor="#34C759"
                onAccept={handleClose}
                onDeny={handleClose}
                scale={scale}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 8. Big Notification */}
        <AnimatePresence>
          {activeNotification === 'big-notification' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-1/2 -translate-x-1/2 z-5"
              style={{ top: `-${2 * scale}px` }}
            >
              <Notification
                variant="big-notification"
                title="New Message"
                subtitle="You have a new notification"
                icon="fi-rs-bell"
                iconColor="#007AFF"
                onAccept={handleClose}
                scale={scale}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

Header.propTypes = {
  scale: PropTypes.number,
};
