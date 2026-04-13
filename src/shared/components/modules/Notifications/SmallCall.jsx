import PropTypes from 'prop-types';

// ─── Shared UI Elements for Small Call ────────────────────────────────────────

function HeartIcon({ scale = 1 }) {
  return (
    <i
      className="fi fi-ss-heart flex items-center justify-center shrink-0"
      style={{ fontSize: `${11 * scale}px`, color: '#FF2D55' }}
    />
  );
}

function SmallDeclineBtn({ onClick, scale = 1 }) {
  return (
    <button
      onClick={onClick}
      aria-label="Decline"
      className="shrink-0 rounded-[10px] bg-[#FF383C] flex items-center justify-center hover:opacity-80 active:scale-95 transition-all cursor-pointer"
      style={{ width: `${16 * scale}px`, height: `${16 * scale}px` }}
    >
      <i
        className="fi fi-rs-cross-small flex items-center justify-center text-white/50"
        style={{ fontSize: `${8 * scale}px` }}
      />
    </button>
  );
}

function SmallAcceptBtn({ onClick, scale = 1 }) {
  return (
    <button
      onClick={onClick}
      aria-label="Accept"
      className="shrink-0 rounded-[10px] bg-[#315dff] flex items-center justify-center hover:opacity-80 active:scale-95 transition-all cursor-pointer"
      style={{ width: `${16 * scale}px`, height: `${16 * scale}px` }}
    >
      <i
        className="fi fi-rs-check flex items-center justify-center text-white/50"
        style={{ fontSize: `${8 * scale}px` }}
      />
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SmallCall({
  variant,
  scale,
  title,
  callerName,
  displayDuration,
  onAccept,
  onDeny,
}) {
  if (variant === 'small-call-minimized') {
    return (
      <button
        onClick={onAccept}
        className="flex items-center justify-between w-full h-full hover:opacity-80 active:scale-[0.97] transition-all cursor-pointer"
        style={{
          paddingLeft: `${10 * scale}px`,
          paddingRight: `${10 * scale}px`,
        }}
      >
        <HeartIcon scale={scale} />
        <span
          className="text-[#ff2d55] whitespace-nowrap"
          style={{ fontSize: `${8 * scale}px` }}
        >
          {displayDuration}
        </span>
      </button>
    );
  }

  if (variant === 'small-call-incoming') {
    return (
      <div
        className="flex items-center w-full h-full"
        style={{
          paddingLeft: `${10 * scale}px`,
          paddingRight: `${4 * scale}px`,
          gap: `${5 * scale}px`,
        }}
      >
        <HeartIcon scale={scale} />
        <div className="flex-1 min-w-0">
          <p
            className="text-white whitespace-nowrap truncate"
            style={{ fontSize: `${10 * scale}px`, fontWeight: 700 }}
          >
            {title || callerName}
          </p>
        </div>
        <div
          className="flex items-center shrink-0"
          style={{ gap: `${2 * scale}px` }}
        >
          <SmallDeclineBtn onClick={onDeny} scale={scale} />
          <SmallAcceptBtn onClick={onAccept} scale={scale} />
        </div>
      </div>
    );
  }

  if (variant === 'small-call-active') {
    return (
      <button
        onClick={onAccept}
        className="flex items-center justify-between w-full h-full hover:opacity-80 active:scale-[0.97] transition-all cursor-pointer"
        style={{
          paddingLeft: `${10 * scale}px`,
          paddingRight: `${10 * scale}px`,
        }}
      >
        <div className="flex items-center" style={{ gap: `${5 * scale}px` }}>
          <HeartIcon scale={scale} />
          <p
            className="text-white whitespace-nowrap"
            style={{ fontSize: `${10 * scale}px`, fontWeight: 700 }}
          >
            {title || callerName}
          </p>
        </div>
        <span
          className="text-[#ff2d55] whitespace-nowrap"
          style={{ fontSize: `${8 * scale}px` }}
        >
          {displayDuration}
        </span>
      </button>
    );
  }

  return null;
}

SmallCall.propTypes = {
  variant: PropTypes.oneOf([
    'small-call-minimized',
    'small-call-incoming',
    'small-call-active',
  ]).isRequired,

  scale: PropTypes.number,
  title: PropTypes.string,
  callerName: PropTypes.string,
  displayDuration: PropTypes.string,
  onAccept: PropTypes.func,
  onDeny: PropTypes.func,
};
