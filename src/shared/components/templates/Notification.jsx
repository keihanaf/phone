import { cva } from 'class-variance-authority';
// eslint-disable-next-line
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/shared/utils/cn.js';

import SmallCall from '@/shared/components/modules/Notifications/SmallCall.jsx';
import Call from '@/shared/components/modules/Notifications/Call.jsx';
import BigNotification from '@/shared/components/modules/Notifications/BigNotification.jsx';
import TextNotification from '@/shared/components/modules/Notifications/TextNotification.jsx';
import MessageNotification from '@/shared/components/modules/Notifications/MessageNotification.jsx';

const hexToRgba = (hex, opacity = 0.3) => {
  if (!hex) return `rgba(49, 93, 255, ${opacity})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const formatTime = (secs) => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const notificationVariants = cva(
  'bg-app rounded-[25px] relative overflow-hidden shadow-lg transition-all duration-300',
  {
    variants: {
      variant: {
        notification:
          'border border-border hover:border-white/20 flex flex-col items-center',
        'big-notification': 'flex items-center',
        'text-notification': 'flex items-center',
        'message-notification': 'flex items-center',
        'small-call-incoming': 'flex items-center',
        'small-call-active': 'flex items-center',
        'small-call-minimized': 'flex items-center',
        'call-incoming-unknown': 'flex items-center',
        'call-incoming-known': 'flex items-center',
        'call-active': 'flex flex-col',
      },
    },
    defaultVariants: {
      variant: 'notification',
    },
  }
);

export function Notification({
  variant = 'notification',
  title,
  subtitle,
  onAccept,
  onDeny,
  scale = 1,
  value,
  icon = 'fi-rs-map-marker-plus',
  iconColor = '#315DFF',
  acceptText = 'Accept',
  denyText = 'Deny',
  callerName = 'Eddie Marshall',
  callerPhone = '0912 125 9138',
  callerLocation = 'Los Santos',
  callerInitials = 'Aa',
  callDuration = '0:00',
  autoTimer = false,
  onEndCall,
  onMute,
  onCamera,
  onSpeaker,
  onInfo,
  isMuted = false,
  isCameraOn = false,
  isSpeakerOn = false,
  senderName,
  message,
  timestamp = 'now',
  senderInitials,
  avatarUrl,
}) {
  const [showContent, setShowContent] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const isCallVariant = variant.startsWith('call');
  const isSmallCallVariant = variant.startsWith('small-call');
  const isBigNotification = variant === 'big-notification';
  const isTextNotification = variant === 'text-notification';
  const isMessageNotification = variant === 'message-notification';

  useEffect(() => {
    if (isTextNotification || isMessageNotification) {
      // eslint-disable-next-line
      setShowContent(true);
      return;
    }
    const timer = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(timer);
  }, [isTextNotification, isMessageNotification]);

  useEffect(() => {
    if (
      !autoTimer ||
      (variant !== 'call-active' &&
        variant !== 'small-call-active' &&
        variant !== 'small-call-minimized')
    )
      return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [autoTimer, variant]);

  const displayDuration = autoTimer ? formatTime(elapsed) : callDuration;

  const getDimensions = useCallback(() => {
    switch (variant) {
      case 'big-notification':
        return { width: 265 * scale, height: 50 * scale };
      case 'text-notification':
        return { width: 224 * scale, height: 108 * scale };
      case 'message-notification':
        return { width: 260 * scale, height: 50 * scale };
      case 'small-call-incoming':
      case 'small-call-active':
        return { width: 225 * scale, height: 27 * scale };
      case 'small-call-minimized':
        return { width: 138 * scale, height: 27 * scale };
      case 'call-incoming-unknown':
      case 'call-incoming-known':
        return { width: 265 * scale, height: 49 * scale };
      case 'call-active':
        return { width: 265 * scale, height: 102 * scale };
      default:
        return { width: 265 * scale, height: null };
    }
  }, [variant, scale]);

  const dimensions = getDimensions();

  const getBorderStyle = () => {
    if (isTextNotification || isMessageNotification)
      return { border: '1px solid var(--color-border)' };
    if (isBigNotification)
      return { border: `1px solid ${hexToRgba(iconColor, 0.3)}` };
    if (isSmallCallVariant)
      return { border: '1px solid rgba(255, 45, 85, 0.3)' };
    if (isCallVariant)
      return {
        border: '1px solid rgba(52, 199, 89, 0.3)',
        boxShadow: '0 0 12px rgba(52, 199, 89, 0.08)',
      };
    return {};
  };

  const getAnimation = () => {
    if (isSmallCallVariant) {
      return {
        initial: { scaleX: 0, opacity: 0 },
        animate: { scaleX: 1, opacity: 1 },
        exit: { scaleX: 0, opacity: 0 },
        style: { transformOrigin: 'center' },
      };
    }
    return {
      initial: { scaleX: 0, scaleY: 0, opacity: 0 },
      animate: { scaleX: 1, scaleY: 1, opacity: 1 },
      exit: { scaleX: 0, scaleY: 0, opacity: 0 },
      style: { transformOrigin: 'top center' },
    };
  };

  const anim = getAnimation();
  const acceptBgColor = hexToRgba(iconColor, 0.3);

  if (isTextNotification) {
    return (
      <TextNotification
        title={title}
        subtitle={subtitle}
        denyText={denyText}
        acceptText={acceptText}
        acceptColor={iconColor}
        onDeny={onDeny}
        onAccept={onAccept}
        scale={scale}
      />
    );
  }

  if (isMessageNotification) {
    return (
      <MessageNotification
        senderName={senderName}
        message={message}
        timestamp={timestamp}
        senderInitials={senderInitials}
        avatarUrl={avatarUrl}
        scale={scale}
        onClick={onAccept}
      />
    );
  }

  return (
    <motion.div
      initial={anim.initial}
      animate={anim.animate}
      exit={anim.exit}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(notificationVariants({ variant }))}
      style={{
        width: `${dimensions.width}px`,
        height: dimensions.height ? `${dimensions.height}px` : 'auto',
        ...anim.style,
        ...getBorderStyle(),
      }}
    >
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {isBigNotification && (
              <BigNotification
                title={title}
                subtitle={subtitle}
                icon={icon}
                iconColor={iconColor}
                scale={scale}
                onClick={onAccept}
              />
            )}

            {isSmallCallVariant && (
              <SmallCall
                variant={variant}
                scale={scale}
                title={title}
                callerName={callerName}
                displayDuration={displayDuration}
                onAccept={onAccept}
                onDeny={onDeny}
              />
            )}

            {isCallVariant && (
              <Call
                variant={variant}
                scale={scale}
                callerLocation={callerLocation}
                callerPhone={callerPhone}
                callerName={callerName}
                callerInitials={callerInitials}
                displayDuration={displayDuration}
                onAccept={onAccept}
                onDeny={onDeny}
                onEndCall={onEndCall}
                onSpeaker={onSpeaker}
                isSpeakerOn={isSpeakerOn}
                onCamera={onCamera}
                isCameraOn={isCameraOn}
                onMute={onMute}
                isMuted={isMuted}
                onInfo={onInfo}
              />
            )}

            {variant === 'notification' && (
              <div
                className="flex flex-col items-center w-full"
                style={{
                  paddingTop: `${26 * scale}px`,
                  paddingBottom: `${10 * scale}px`,
                  paddingLeft: `${1 * scale}px`,
                  paddingRight: `${1 * scale}px`,
                  gap: `${10 * scale}px`,
                }}
              >
                <div
                  className="flex items-center w-full"
                  style={{
                    paddingLeft: `${20 * scale}px`,
                    paddingRight: `${20 * scale}px`,
                    gap: `${10 * scale}px`,
                  }}
                >
                  <div
                    className="shrink-0 flex items-center justify-center"
                    style={{
                      width: `${20 * scale}px`,
                      height: `${20 * scale}px`,
                    }}
                  >
                    <i
                      className={`fi ${icon} flex items-center justify-center`}
                      style={{ fontSize: `${20 * scale}px`, color: iconColor }}
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-center w-full text-white font-bold">
                      <span
                        style={{
                          fontSize: `${10 * scale}px`,
                          lineHeight: `${10 * scale}px`,
                        }}
                      >
                        {title}
                      </span>
                      {value && (
                        <span
                          style={{
                            fontSize: `${10 * scale}px`,
                            lineHeight: `${10 * scale}px`,
                          }}
                        >
                          {value}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-muted truncate"
                      style={{
                        fontSize: `${6 * scale}px`,
                        lineHeight: `${6 * scale}px`,
                        marginTop: `${2 * scale}px`,
                      }}
                    >
                      {subtitle}
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center w-full"
                  style={{
                    paddingLeft: `${10 * scale}px`,
                    paddingRight: `${10 * scale}px`,
                    gap: `${5 * scale}px`,
                  }}
                >
                  <button
                    onClick={onDeny}
                    className="flex-1 cursor-pointer flex items-center justify-center rounded-[20px] transition-all hover:bg-white/10 active:scale-95 text-white bg-bar"
                    style={{
                      height: `${25 * scale}px`,
                      fontSize: `${10 * scale}px`,
                    }}
                  >
                    {denyText}
                  </button>
                  <button
                    onClick={onAccept}
                    className="flex-1 cursor-pointer flex items-center justify-center rounded-[20px] transition-all active:scale-95"
                    style={{
                      height: `${25 * scale}px`,
                      backgroundColor: acceptBgColor,
                      color: iconColor,
                      fontSize: `${10 * scale}px`,
                    }}
                  >
                    {acceptText}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

Notification.propTypes = {
  variant: PropTypes.oneOf([
    'notification',
    'big-notification',
    'text-notification',
    'message-notification',
    'small-call-incoming',
    'small-call-active',
    'small-call-minimized',
    'call-incoming-unknown',
    'call-incoming-known',
    'call-active',
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onAccept: PropTypes.func,
  onDeny: PropTypes.func,
  scale: PropTypes.number,
  value: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  acceptText: PropTypes.string,
  denyText: PropTypes.string,
  callerName: PropTypes.string,
  callerPhone: PropTypes.string,
  callerLocation: PropTypes.string,
  callerInitials: PropTypes.string,
  callDuration: PropTypes.string,
  autoTimer: PropTypes.bool,
  onEndCall: PropTypes.func,
  onMute: PropTypes.func,
  onCamera: PropTypes.func,
  onSpeaker: PropTypes.func,
  onInfo: PropTypes.func,
  isMuted: PropTypes.bool,
  isCameraOn: PropTypes.bool,
  isSpeakerOn: PropTypes.bool,
  senderName: PropTypes.string,
  message: PropTypes.string,
  timestamp: PropTypes.string,
  senderInitials: PropTypes.string,
  avatarUrl: PropTypes.string,
};
