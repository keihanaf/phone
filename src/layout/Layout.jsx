import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
// eslint-disable-next-line
import { AnimatePresence, motion } from 'framer-motion';
import backgroundImage from '@/assets/images/background.jpeg';
import Header from '@/layout/Header';
import { useResize } from '@/shared/hooks/useResize';
import {
  AppLauncherProvider,
  useAppLauncher,
} from '@/shared/context/AppLauncherContext.jsx';
import AppScreen from '@/features/HomeScreen/components/AppScreen';
import { Notification } from '@/shared/components/templates/Notification.jsx';
import email from '@/assets/icons/email.png';

// --- Mock Data ---
const MOCK_MESSAGES = [
  {
    id: 1,
    senderName: 'Eddie Marshall',
    message: 'Hey, are you free tonight?',
    timestamp: 'now',
    senderInitials: 'EM',
  },
  {
    id: 2,
    senderName: 'Sarah Johnson',
    message: "Don't forget about the meeting!",
    timestamp: '2m ago',
    avatarUrl: email,
  },
];

// --- Internal Component: PhoneContent ---
function PhoneContent({ scale, size, isResizing, handleResizeStart }) {
  const phoneFrameRef = useRef(null);
  const { registerPhoneFrameRef, phase, isFullscreen } = useAppLauncher();
  const [showNotification, setShowNotification] = useState(false);
  // eslint-disable-next-line
  const [showMessages, setShowMessages] = useState(false);
  // eslint-disable-next-line
  const [messageQueue, setMessageQueue] = useState([...MOCK_MESSAGES]);
  const [visibleMessages, setVisibleMessages] = useState([
    MOCK_MESSAGES[0],
    MOCK_MESSAGES[1],
  ]);

  useEffect(() => {
    if (phoneFrameRef.current) {
      registerPhoneFrameRef(phoneFrameRef.current);
    }
  }, [registerPhoneFrameRef]);

  const handleDismiss = (id) => {
    setVisibleMessages((prev) => prev.filter((msg) => msg.id !== id));

    setTimeout(() => {
      setMessageQueue((queue) => {
        const remaining = queue.filter((msg) => msg.id !== id);
        const nextMsg = remaining.find(
          (msg) =>
            !visibleMessages.some((v) => v.id === msg.id) || msg.id === id
        );
        if (nextMsg && nextMsg.id !== id) {
          setVisibleMessages((prev) => [...prev, nextMsg]);
        }
        return remaining;
      });
    }, 300);
  };

  // --- Header State Logic ---
  const isAppOpen =
    phase === 'opening' || phase === 'open' || phase === 'closing';
  const headerTransparent = isAppOpen && isFullscreen;

  // Dynamic dimension calculations based on scale
  const contentWidth = 265 * scale;
  const contentHeight = 580 * scale;
  const contentGap = 15 * scale;
  const borderRadius = 35 * scale;
  const borderWidth = 5 * scale;
  const boxShadowWidth = 2 * scale;

  return (
    <div
      className="relative"
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        transition: isResizing
          ? 'none'
          : 'width 0.1s ease-out, height 0.1s ease-out',
      }}
    >
      {/* Phone Frame Container */}
      <div
        ref={phoneFrameRef}
        className="relative flex justify-center items-center overflow-hidden bg-item-hover border-black border-solid w-full h-full"
        style={{
          borderRadius: `${borderRadius}px`,
          borderWidth: `${borderWidth}px`,
          boxShadow: `0px 0px 0px ${boxShadowWidth}px #848484`,
        }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        />

        {/* Messaging Notifications */}
        <AnimatePresence mode="popLayout">
          {showMessages &&
            visibleMessages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  opacity: { duration: 0.2 },
                }}
                layout
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  zIndex: 100 - index,
                  top: `${
                    (size.height - borderWidth * 2 - contentHeight) / 2 +
                    25 * scale +
                    index * 55 * scale
                  }px`,
                }}
              >
                <Notification
                  variant="message-notification"
                  senderName={msg.senderName}
                  message={msg.message}
                  timestamp={msg.timestamp}
                  senderInitials={msg.senderInitials}
                  avatarUrl={msg.avatarUrl}
                  onAccept={() => handleDismiss(msg.id)}
                  scale={scale}
                />
              </motion.div>
            ))}
        </AnimatePresence>

        {/* --- HEADER AREA --- */}
        <motion.div
          className="absolute z-60 flex justify-center w-full top-0 inset-x-0"
          style={{
            paddingTop: `${
              (size.height - borderWidth * 2 - contentHeight) / 2
            }px`,
          }}
          initial={false}
          animate={{
            backgroundColor: headerTransparent
              ? 'rgba(0,0,0,0)'
              : isAppOpen
                ? 'rgba(14,14,16,1)'
                : 'rgba(0,0,0,0)',
            backdropFilter: headerTransparent
              ? 'blur(0px)'
              : isAppOpen
                ? 'blur(12px)'
                : 'blur(0px)',
            WebkitBackdropFilter: headerTransparent
              ? 'blur(0px)'
              : isAppOpen
                ? 'blur(12px)'
                : 'blur(0px)',
          }}
          transition={{
            duration: headerTransparent ? 0.2 : isAppOpen ? 0.3 : 0.45,
            ease: 'easeInOut',
          }}
        >
          <Header
            scale={scale}
            onShowNotification={() => setShowNotification(true)}
          />
        </motion.div>
        {/* ------------------- */}

        {/* Main Content Router Outlet */}
        <div
          className="relative z-10 flex flex-col items-center"
          style={{
            width: `${contentWidth}px`,
            height: `${contentHeight}px`,
            gap: `${contentGap}px`,
          }}
        >
          {/* Spacer for dynamic status bar/header height */}
          <div className="shrink-0" style={{ height: `${20 * scale}px` }} />
          <Outlet context={{ scale }} />
        </div>

        {/* Launched Application Screen overlay */}
        <AppScreen scale={scale} phoneFrameRef={phoneFrameRef} />

        {/* System Warning Notification */}
        <AnimatePresence>
          {showNotification && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-100">
              <Notification
                variant="text-notification"
                title="Warning"
                subtitle="This action will expose your IP address to the admin of the proxy server."
                iconColor="#315DFF"
                scale={scale}
                onDeny={() => setShowNotification(false)}
                onAccept={() => setShowNotification(false)}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Resize Handle (Top-Left corner) */}
      <div
        onMouseDown={handleResizeStart}
        className="absolute top-0 left-0 hover:bg-blue-500/30 transition-colors z-10 cursor-nwse-resize"
        style={{
          width: `${40 * scale}px`,
          height: `${40 * scale}px`,
          borderTopLeftRadius: `${borderRadius}px`,
        }}
        title="Drag to resize"
      />
    </div>
  );
}

PhoneContent.propTypes = {
  scale: PropTypes.number.isRequired,
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  isResizing: PropTypes.bool.isRequired,
  handleResizeStart: PropTypes.func.isRequired,
};

// --- Main Layout Component ---
function Layout() {
  const { size, scale, isResizing, handleResizeStart } = useResize({
    baseWidth: 280,
    baseHeight: 600,
    maxScale: 1.2,
  });

  return (
    <main className="h-screen w-screen bg-black flex items-end justify-center pb-8">
      <div className="w-full max-w-7xl mx-auto flex items-end justify-center">
        <AppLauncherProvider>
          <PhoneContent
            scale={scale}
            size={size}
            isResizing={isResizing}
            handleResizeStart={handleResizeStart}
          />
        </AppLauncherProvider>
      </div>
    </main>
  );
}

export default Layout;
