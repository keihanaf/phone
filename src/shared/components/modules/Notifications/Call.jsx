import PropTypes from 'prop-types';
import { cn } from '@/shared/utils/cn.js';

// ─── Shared UI Elements for Full Call ─────────────────────────────────────────

function UnknownAvatar({ scale = 1 }) {
  const size = 31 * scale;
  return (
    <div
      className="relative shrink-0 rounded-full overflow-hidden flex items-center justify-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: 'linear-gradient(135deg, #C5D2FF 0%, #697ECA 100%)',
      }}
    >
      <i
        className="fi fi-ss-user flex items-center justify-center text-white"
        style={{ fontSize: `${14 * scale}px` }}
      />
    </div>
  );
}

function KnownAvatar({ initials, scale = 1 }) {
  const size = 31 * scale;
  return (
    <div
      className="relative shrink-0 rounded-full bg-item-hover flex items-center justify-center"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <span
        className="text-white select-none"
        style={{
          fontSize: `${11 * scale}px`,
          fontWeight: 600,
          letterSpacing: '-0.3px',
        }}
      >
        {initials}
      </span>
    </div>
  );
}

function DeclineButton({ onClick, scale = 1 }) {
  const size = 31 * scale;
  return (
    <button
      onClick={onClick}
      aria-label="Decline"
      className="shrink-0 rounded-full bg-[#FF383C] flex items-center justify-center cursor-pointer hover:bg-[#e0282c] active:scale-95 transition-all"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <i
        className="fi fi-ss-phone-slash flex items-center justify-center text-white"
        style={{ fontSize: `${12 * scale}px` }}
      />
    </button>
  );
}

function AcceptButton({ onClick, scale = 1 }) {
  const size = 31 * scale;
  return (
    <button
      onClick={onClick}
      aria-label="Accept"
      className="shrink-0 rounded-full bg-[#34C759] flex items-center justify-center cursor-pointer hover:bg-[#2aad4a] active:scale-95 transition-all"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <i
        className="fi fi-ss-phone-call flex items-center justify-center text-white"
        style={{ fontSize: `${12 * scale}px` }}
      />
    </button>
  );
}

function ControlButton({
  label,
  onClick,
  active = false,
  scale = 1,
  children,
}) {
  const size = 31 * scale;
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        'rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 active:scale-95 transition-all',
        active ? 'bg-white' : 'bg-item-hover'
      )}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {children}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Call({
  variant,
  scale,
  callerLocation,
  callerPhone,
  callerName,
  callerInitials,
  onAccept,
  onDeny,
  onEndCall,
  displayDuration,
  onSpeaker,
  isSpeakerOn,
  onCamera,
  isCameraOn,
  onMute,
  isMuted,
  onInfo,
}) {
  if (variant === 'call-incoming-unknown') {
    return (
      <div
        className="flex items-center w-full h-full"
        style={{
          paddingLeft: `${10 * scale}px`,
          paddingRight: `${10 * scale}px`,
          gap: `${5 * scale}px`,
        }}
      >
        <UnknownAvatar scale={scale} />
        <div className="flex flex-col flex-1 min-w-0">
          <span
            className="text-muted leading-none truncate"
            style={{ fontSize: `${6 * scale}px` }}
          >
            {callerLocation}
          </span>
          <span
            className="text-white whitespace-nowrap leading-none"
            style={{
              fontSize: `${10 * scale}px`,
              fontWeight: 700,
              marginTop: `${2 * scale}px`,
            }}
          >
            {callerPhone}
          </span>
        </div>
        <DeclineButton onClick={onDeny} scale={scale} />
        <AcceptButton onClick={onAccept} scale={scale} />
      </div>
    );
  }

  if (variant === 'call-incoming-known') {
    return (
      <div
        className="flex items-center w-full h-full"
        style={{
          paddingLeft: `${10 * scale}px`,
          paddingRight: `${10 * scale}px`,
          gap: `${5 * scale}px`,
        }}
      >
        <KnownAvatar initials={callerInitials} scale={scale} />
        <div className="flex flex-col flex-1 min-w-0">
          <span
            className="text-white whitespace-nowrap leading-none"
            style={{ fontSize: `${10 * scale}px`, fontWeight: 700 }}
          >
            {callerName}
          </span>
        </div>
        <DeclineButton onClick={onDeny} scale={scale} />
        <AcceptButton onClick={onAccept} scale={scale} />
      </div>
    );
  }

  if (variant === 'call-active') {
    return (
      <div
        className="flex flex-col items-center w-full h-full"
        style={{ gap: `${5 * scale}px` }}
      >
        <div
          className="flex items-center"
          style={{
            width: `${235 * scale}px`,
            height: `${31 * scale}px`,
            gap: `${6 * scale}px`,
            marginTop: `${26 * scale}px`,
          }}
        >
          <KnownAvatar initials={callerInitials} scale={scale} />
          <div className="flex flex-col flex-1 min-w-0">
            <span
              className="text-white whitespace-nowrap leading-none"
              style={{ fontSize: `${10 * scale}px`, fontWeight: 700 }}
            >
              {callerName}
            </span>
            <span
              className="text-muted leading-none"
              style={{
                fontSize: `${7 * scale}px`,
                marginTop: `${2 * scale}px`,
              }}
            >
              {displayDuration}
            </span>
          </div>
        </div>
        <div
          className="flex items-center justify-between"
          style={{ width: `${235 * scale}px`, height: `${31 * scale}px` }}
        >
          <ControlButton
            label="Speaker"
            onClick={onSpeaker}
            active={isSpeakerOn}
            scale={scale}
          >
            <i
              className="fi fi-ss-volume flex items-center justify-center"
              style={{
                fontSize: `${12 * scale}px`,
                color: isSpeakerOn ? '#000' : 'white',
              }}
            />
          </ControlButton>
          <ControlButton
            label="Camera"
            onClick={onCamera}
            active={isCameraOn}
            scale={scale}
          >
            <i
              className="fi fi-ss-video-camera flex items-center justify-center"
              style={{
                fontSize: `${10 * scale}px`,
                color: isCameraOn ? '#000' : 'white',
              }}
            />
          </ControlButton>
          <ControlButton
            label="Mute"
            onClick={onMute}
            active={isMuted}
            scale={scale}
          >
            <i
              className={cn(
                'fi flex items-center justify-center',
                isMuted ? 'fi-ss-microphone-slash' : 'fi-ss-microphone'
              )}
              style={{
                fontSize: `${12 * scale}px`,
                color: isMuted ? '#000' : 'white',
              }}
            />
          </ControlButton>
          <ControlButton label="Info" onClick={onInfo} scale={scale}>
            <i
              className="fi fi-ss-info flex items-center justify-center text-white"
              style={{ fontSize: `${12 * scale}px` }}
            />
          </ControlButton>
          <DeclineButton onClick={onEndCall} scale={scale} />
        </div>
      </div>
    );
  }

  return null;
}

Call.propTypes = {
  variant: PropTypes.oneOf([
    'call-incoming-unknown',
    'call-incoming-known',
    'call-active',
  ]).isRequired,

  scale: PropTypes.number,
  callerLocation: PropTypes.string,
  callerPhone: PropTypes.string,
  callerName: PropTypes.string,
  callerInitials: PropTypes.string,
  displayDuration: PropTypes.string,

  // ── Functions ──
  onAccept: PropTypes.func,
  onDeny: PropTypes.func,
  onEndCall: PropTypes.func,
  onSpeaker: PropTypes.func,
  onCamera: PropTypes.func,
  onMute: PropTypes.func,
  onInfo: PropTypes.func,

  // ── States ──
  isSpeakerOn: PropTypes.bool,
  isCameraOn: PropTypes.bool,
  isMuted: PropTypes.bool,
};

UnknownAvatar.propTypes = {
  scale: PropTypes.number,
};

KnownAvatar.propTypes = {
  initials: PropTypes.string,
  scale: PropTypes.number,
};

DeclineButton.propTypes = {
  onClick: PropTypes.func,
  scale: PropTypes.number,
};

AcceptButton.propTypes = {
  onClick: PropTypes.func,
  scale: PropTypes.number,
};

ControlButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  scale: PropTypes.number,
  children: PropTypes.node,
};
