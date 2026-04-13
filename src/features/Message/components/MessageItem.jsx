import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';

const messageItemVariants = cva(
  'flex items-center w-full transition-colors duration-200 cursor-pointer hover:bg-slot-hover bg-one',
  {
    variants: {
      variant: {
        default: '',
        search: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Helper function to find and highlight the searched text
const renderHighlightedText = (text, highlight, scale) => {
  if (!highlight || !highlight.trim()) {
    return <>{text}</>;
  }
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span
            key={index}
            className="font-bold text-white"
            style={{ fontSize: `${8 * scale}px` }}
          >
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

export default function MessageItem({
  message,
  isFirst,
  isLast,
  scale = 1,
  variant = 'default',
  searchQuery = '',
  onClick,
}) {
  const hasName = message.name && message.name.trim().length > 0;
  const hasImage = !!message.image;
  const contactName = hasName ? message.name : message.number;

  const radius = `${15 * scale}px`;
  let borderRadiusStyles = {};

  if (isFirst && isLast) {
    borderRadiusStyles = { borderRadius: radius };
  } else if (isFirst) {
    borderRadiusStyles = {
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
    };
  } else if (isLast) {
    borderRadiusStyles = {
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
    };
  }

  // Handle keyboard interaction for accessibility
  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick(message);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(message)}
      onKeyDown={handleKeyDown}
      className={cn(messageItemVariants({ variant }))}
      style={{
        width: `${245 * scale}px`,
        height: `${50 * scale}px`,
        padding: `${10 * scale}px`,
        gap: `${5 * scale}px`,
        borderBottom: isLast
          ? 'none'
          : `${1 * scale}px solid var(--color-border)`,
        ...borderRadiusStyles,
      }}
    >
      {/* ---------------- Search Variant ---------------- */}
      {variant === 'search' ? (
        <div className="flex flex-col justify-center flex-1 min-w-0 h-full">
          {/* First Row: Name and Recipient/Top Date */}
          <div className="flex items-center justify-between w-full mb-0.5">
            <span
              className="font-bold truncate text-white"
              style={{ fontSize: `${10 * scale}px` }}
            >
              {message.isOutbound ? 'You' : contactName}
            </span>

            {message.isOutbound ? (
              <span
                className="shrink-0 text-white"
                style={{ fontSize: `${6 * scale}px` }}
              >
                <span className="font-normal">To </span>
                <span className="font-bold">{contactName}</span>
              </span>
            ) : (
              message.topTime && (
                <span
                  className="font-normal shrink-0 text-white"
                  style={{ fontSize: `${6 * scale}px` }}
                >
                  {message.topTime}
                </span>
              )
            )}
          </div>

          {/* Second Row: Highlighted Message and Bottom Date */}
          <div className="flex items-center justify-between w-full">
            <span
              className="font-normal truncate flex-1 min-w-0 pr-2 text-muted"
              style={{
                fontSize: `${8 * scale}px`,
              }}
            >
              {renderHighlightedText(message.lastMessage, searchQuery, scale)}
            </span>

            <span
              className="font-normal shrink-0 text-muted"
              style={{
                fontSize: `${6 * scale}px`,
              }}
            >
              {message.time}
            </span>
          </div>
        </div>
      ) : (
        /* ---------------- Default Variant ---------------- */
        <>
          {/* Avatar / Image Section */}
          <div
            className={cn(
              'flex justify-center shrink-0 overflow-hidden relative',
              !hasImage && !hasName ? 'items-end bg-bar' : 'items-center',
              hasImage ? 'bg-transparent' : 'bg-bar'
            )}
            style={{
              width: `${30 * scale}px`,
              height: `${30 * scale}px`,
              borderRadius: `${5 * scale}px`,
            }}
          >
            {hasImage ? (
              <img
                src={message.image}
                alt={contactName || 'User Avatar'}
                className="w-full h-full object-cover"
              />
            ) : hasName ? (
              <span
                className="font-bold flex items-center justify-center w-full h-full leading-none text-muted"
                style={{
                  fontSize: `${16 * scale}px`,
                  paddingTop: `${1 * scale}px`,
                }}
              >
                {message.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <i
                className="fi fi-ss-user leading-none flex items-end text-muted"
                style={{
                  fontSize: `${24 * scale}px`,
                  marginBottom: `-${2 * scale}px`,
                }}
              />
            )}
          </div>

          {/* Message Content Section (Default) */}
          <div className="flex flex-col justify-center flex-1 min-w-0 h-full">
            <div className="flex items-center justify-between w-full mb-0.5">
              <span
                className="font-bold truncate text-white"
                style={{ fontSize: `${10 * scale}px` }}
              >
                {contactName}
              </span>
              <span
                className="font-normal shrink-0 text-white"
                style={{ fontSize: `${6 * scale}px` }}
              >
                {message.time}
              </span>
            </div>

            <div className="flex items-center justify-between w-full">
              <span
                className="font-normal truncate flex-1 min-w-0 pr-2 text-muted"
                style={{ fontSize: `${8 * scale}px` }}
              >
                {message.lastMessage}
              </span>

              {message.status && (
                <span
                  className="font-normal shrink-0 text-muted"
                  style={{ fontSize: `${6 * scale}px` }}
                >
                  {message.status}
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// PropTypes definitions mapped to standard descriptive English
MessageItem.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    number: PropTypes.string,
    image: PropTypes.string,
    lastMessage: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['Sent', 'Seen', '']),
    isOutbound: PropTypes.bool,
    topTime: PropTypes.string,
  }).isRequired,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  scale: PropTypes.number,
  variant: PropTypes.oneOf(['default', 'search']),
  searchQuery: PropTypes.string,
  onClick: PropTypes.func,
};
