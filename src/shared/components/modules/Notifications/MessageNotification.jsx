import PropTypes from 'prop-types';

export default function MessageNotification({
  senderName = 'Alfred Adler',
  message = "Hey! How you doin'?",
  timestamp = 'now',
  senderInitials = 'Aa',
  avatarUrl = null,
  scale = 1,
  onClick,
}) {
  return (
    <div
      className="rounded-[15px] flex items-center cursor-pointer active:scale-[0.98] transition-all overflow-hidden bg-six backdrop-blur-[10px] border border-border"
      onClick={onClick}
      style={{
        width: `${260 * scale}px`,
        height: `${50 * scale}px`,
        padding: `${10 * scale}px`,
      }}
    >
      <div
        className="flex items-start justify-between w-full"
        style={{
          width: `${240 * scale}px`,
          height: `${30 * scale}px`,
        }}
      >
        <div
          className="flex items-center"
          style={{
            height: `${30 * scale}px`,
            gap: `${7 * scale}px`,
            flex: 1,
            minWidth: 0,
          }}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={senderName}
              className="object-cover shrink-0"
              style={{
                width: `${30 * scale}px`,
                height: `${30 * scale}px`,
              }}
            />
          ) : (
            <div
              className="rounded-full flex items-center justify-center shrink-0 bg-white/20"
              style={{
                width: `${30 * scale}px`,
                height: `${30 * scale}px`,
              }}
            >
              <span
                className="text-white text-center leading-none"
                style={{
                  fontSize: `${14 * scale}px`,
                  fontWeight: 700,
                  width: `${30 * scale}px`,
                  height: `${28 * scale}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {senderInitials}
              </span>
            </div>
          )}

          <div className="flex flex-col justify-center overflow-hidden flex-1 min-w-0">
            <span
              className="text-white text-left leading-none truncate block"
              style={{
                fontSize: `${9 * scale}px`,
                fontWeight: 700,
              }}
            >
              {senderName}
            </span>
            <span
              className="text-white text-left leading-none truncate block"
              style={{
                fontSize: `${9 * scale}px`,
                fontWeight: 400,
                marginTop: `${2 * scale}px`,
              }}
            >
              {message}
            </span>
          </div>
        </div>

        <span
          className="text-muted text-right leading-none shrink-0 whitespace-nowrap"
          style={{
            fontSize: `${8 * scale}px`,
            fontWeight: 400,
            marginLeft: `${4 * scale}px`,
          }}
        >
          {timestamp}
        </span>
      </div>
    </div>
  );
}

MessageNotification.propTypes = {
  senderName: PropTypes.string,
  message: PropTypes.string,
  timestamp: PropTypes.string,
  senderInitials: PropTypes.string,
  avatarUrl: PropTypes.string,
  scale: PropTypes.number,
  onClick: PropTypes.func,
};
