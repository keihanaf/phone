import { useState, useLayoutEffect, useEffect, lazy, Suspense } from 'react';
// eslint-disable-next-line
import { motion, AnimatePresence } from 'framer-motion';
import { useAppLauncher } from '@/shared/context/AppLauncherContext.jsx';
import { getAppRoute } from '@/shared/constants/appRoutes.js';

/* ───────────── Lazy-loaded App Pages ───────────── */
const appComponents = {
  '/call': lazy(() => import('@/features/Call/pages/CallPage.jsx')),
  '/message': lazy(() => import('@/features/Message/pages/MessagePage.jsx')),
  '/paymate': lazy(() => import('@/features/PayMate/pages/PayMatePage.jsx')),
  '/yellowjack': lazy(
    () => import('@/features/YellowJack/pages/YellowJackPage.jsx')
  ),
  '/bleeter': lazy(() => import('@/features/Bleeter/pages/BleeterPage.jsx')),
  '/fruitmarket': lazy(
    () => import('@/features/FruitMarket/pages/FruitMarketPage.jsx')
  ),
  '/mail': lazy(() => import('@/features/Mail/pages/MailPage.jsx')),
  '/dinasty': lazy(() => import('@/features/Dinasty8/pages/DinastyPage.jsx')),
};

/* ───────────── Default Content ───────────── */
function DefaultAppContent({ app, scale, onClose, isReady }) {
  const headerH = 40 * scale;
  const fontSize = 11 * scale;
  const titleSize = 14 * scale;
  const padding = 12 * scale;

  return (
    <div className="flex flex-col w-full h-full bg-black text-white overflow-hidden">
      <motion.div
        className="flex items-center justify-between shrink-0 border-b border-white/10"
        style={{ height: `${headerH}px`, padding: `0 ${padding}px` }}
        initial={{ opacity: 0, y: -8 * scale }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 * scale }}
        transition={{ duration: 0.12, delay: isReady ? 0.02 : 0 }}
      >
        <button
          onClick={onClose}
          className="flex items-center gap-0.5 text-[#007AFF] active:opacity-50 transition-opacity"
          style={{ fontSize: `${fontSize}px` }}
        >
          <svg
            width={14 * scale}
            height={14 * scale}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
        <span className="font-semibold" style={{ fontSize: `${titleSize}px` }}>
          {app.name}
        </span>
        <div style={{ width: `${36 * scale}px` }} />
      </motion.div>

      <motion.div
        className="flex-1 flex flex-col items-center justify-center"
        style={{ padding: `${padding}px` }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={
          isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }
        }
        transition={{ duration: 0.15, delay: isReady ? 0.04 : 0 }}
      >
        {app.image && (
          <img
            src={app.image}
            alt={app.name}
            style={{
              width: `${50 * scale}px`,
              height: `${50 * scale}px`,
              borderRadius: `${12 * scale}px`,
              marginBottom: `${10 * scale}px`,
            }}
          />
        )}
        <span className="text-white/50" style={{ fontSize: `${fontSize}px` }}>
          {app.name}
        </span>
      </motion.div>
    </div>
  );
}

/* ───────────── App Page Wrapper ───────────── */
function AppPageWrapper({ app, scale, onClose, isReady }) {
  const route = getAppRoute(app.id);
  const AppComponent = route ? appComponents[route] : null;

  if (!AppComponent) {
    return (
      <DefaultAppContent
        app={app}
        scale={scale}
        onClose={onClose}
        isReady={isReady}
      />
    );
  }

  return (
    <motion.div
      className="flex flex-col w-full h-full overflow-hidden"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.15, delay: isReady ? 0.04 : 0 }}
    >
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center bg-black">
            <div
              className="animate-spin rounded-full border-2 border-white/20 border-t-white"
              style={{ width: `${20 * scale}px`, height: `${20 * scale}px` }}
            />
          </div>
        }
      >
        <AppComponent scale={scale} onClose={onClose} />
      </Suspense>
    </motion.div>
  );
}

/* ───────────── Main AppScreen ───────────── */
export default function AppScreen({ scale = 1, phoneFrameRef }) {
  const {
    launchedApp,
    appOrigin,
    phase,
    closeApp,
    onAnimationComplete,
    isFullscreen,
    setHeaderOffset,
  } = useAppLauncher();

  const [frameBounds, setFrameBounds] = useState(null);
  const [contentReady, setContentReady] = useState(false);

  useLayoutEffect(() => {
    if (phase === 'idle' || !phoneFrameRef?.current) return;
    const el = phoneFrameRef.current;
    const updateBounds = () =>
      setFrameBounds({ width: el.clientWidth, height: el.clientHeight });

    updateBounds();
    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [phase, phoneFrameRef]);

  if ((phase === 'closing' || phase === 'idle') && contentReady) {
    setContentReady(false);
  }

  useEffect(() => {
    if (phase === 'open' && !contentReady) {
      const timer = setTimeout(() => setContentReady(true), 10);
      return () => clearTimeout(timer);
    }
  }, [phase, contentReady]);

  const contentHeight = 580 * scale;
  const headerH = 20 * scale;

  useEffect(() => {
    if (frameBounds) {
      const calculatedOffset =
        (frameBounds.height - contentHeight) / 2 + headerH;
      setHeaderOffset(calculatedOffset);
    }
  }, [frameBounds, contentHeight, headerH, setHeaderOffset]);

  const isVisible = phase !== 'idle';
  if (!launchedApp || !isVisible || !frameBounds) return null;

  const borderRadius = 12 * scale;
  const hasOrigin = appOrigin && appOrigin.width > 0;

  const headerBottom = (frameBounds.height - contentHeight) / 2 + headerH;
  const appTop = isFullscreen ? 0 : headerBottom;
  const appHeight = isFullscreen
    ? frameBounds.height
    : frameBounds.height - headerBottom;

  const originCenterX = hasOrigin
    ? appOrigin.x + appOrigin.width / 2
    : frameBounds.width / 2;
  const originCenterY = hasOrigin
    ? appOrigin.y + appOrigin.height / 2
    : frameBounds.height / 2;

  const initialState = {
    left: hasOrigin ? appOrigin.x : originCenterX - 25 * scale,
    top: hasOrigin ? appOrigin.y : originCenterY - 25 * scale,
    width: hasOrigin ? appOrigin.width : 50 * scale,
    height: hasOrigin ? appOrigin.height : 50 * scale,
    borderRadius: borderRadius,
    opacity: 0.6,
  };

  const expandedState = {
    left: 0,
    top: appTop,
    width: frameBounds.width,
    height: appHeight,
    borderRadius: 0,
    opacity: 1,
  };

  const isClosing = phase === 'closing';
  const isOpen = phase === 'open';

  const currentTransition = isClosing
    ? {
        type: 'spring',
        damping: 35,
        stiffness: 500,
        mass: 0.5,
        restDelta: 1,
        restSpeed: 1,
      }
    : {
        type: 'spring',
        damping: 30,
        stiffness: 400,
        mass: 0.6,
        restDelta: 1,
        restSpeed: 1,
      };

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (phase === 'idle' && contentReady) setContentReady(false);
      }}
    >
      {isVisible && (
        <>
          <motion.div
            key="app-backdrop"
            className="absolute z-40"
            style={{
              top: `${appTop}px`,
              left: 0,
              right: 0,
              bottom: 0,
              backdropFilter: `blur(${6 * scale}px)`,
              backgroundColor: 'rgba(0,0,0,0.25)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isClosing ? 0.15 : 0.18, ease: 'easeOut' }}
          />

          <motion.div
            key="app-window"
            className="absolute z-50 overflow-hidden"
            style={{
              willChange: 'left, top, width, height, border-radius, opacity',
              transformOrigin: `${originCenterX}px ${originCenterY}px`,
            }}
            initial={initialState}
            animate={isClosing ? initialState : expandedState}
            exit={initialState}
            transition={currentTransition}
            onAnimationComplete={onAnimationComplete}
          >
            <motion.div
              style={{
                width: frameBounds.width,
                height: appHeight,
                transformOrigin: `${originCenterX}px ${originCenterY}px`,
              }}
              initial={{ scale: 1.06, opacity: 0 }}
              animate={
                isClosing
                  ? { scale: 1.06, opacity: 0 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{
                scale: { ...currentTransition, delay: isClosing ? 0 : 0.02 },
                opacity: {
                  duration: isClosing ? 0.1 : 0.12,
                  ease: 'easeOut',
                  delay: isClosing ? 0 : 0.01,
                },
              }}
            >
              <AppPageWrapper
                app={launchedApp}
                scale={scale}
                onClose={closeApp}
                isReady={contentReady && (isOpen || isClosing)}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
