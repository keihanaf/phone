import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';
import Button from '@/shared/components/elements/Button.jsx';

const contactItemVariants = cva(
  'flex items-center justify-between w-full transition-colors duration-200 group',
  {
    variants: {
      variant: {
        history: 'bg-one',
        contacts: 'bg-one hover:bg-six/45 cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'history',
    },
  }
);

export default function ContactItem({
  call,
  isFirst,
  isLast,
  scale = 1,
  variant = 'history',
  onClick,
}) {
  const isHistory = variant === 'history';
  const isMissed = isHistory && call.type === 'missed';
  const isOutgoing = isHistory && call.type === 'outgoing';

  const hasName = call.name && call.name.trim().length > 0;
  const hasImage = !!call.image;

  // Dynamic calculation for border radius based on scale
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

  return (
    <div
      onClick={() => variant === 'contacts' && onClick?.(call)}
      className={cn(contactItemVariants({ variant }))}
      style={{
        height: `${50 * scale}px`,
        padding: `${10 * scale}px`,
        borderBottom: isLast
          ? 'none'
          : `${1 * scale}px solid var(--color-border)`,
        ...borderRadiusStyles,
      }}
    >
      <div
        className={cn('flex items-center flex-1 min-w-0')}
        style={{ gap: `${5 * scale}px` }}
      >
        {/* Avatar Box */}
        <div
          className={cn(
            'flex justify-center shrink-0 overflow-hidden',
            !hasImage && !hasName ? 'items-end' : 'items-center',
            hasImage ? 'bg-transparent' : 'bg-six'
          )}
          style={{
            width: `${30 * scale}px`,
            height: `${30 * scale}px`,
            borderRadius: `${5 * scale}px`,
          }}
        >
          {hasImage ? (
            <img
              src={call.image}
              alt={call.name || 'Caller Avatar'}
              className={cn('w-full h-full object-cover')}
            />
          ) : hasName ? (
            <span
              className={cn('font-bold text-muted')}
              style={{
                fontSize: `${16 * scale}px`,
              }}
            >
              {call.name.charAt(0).toUpperCase()}
            </span>
          ) : (
            <i
              className={cn(
                'fi fi-ss-user leading-none flex items-end text-muted'
              )}
              style={{
                fontSize: `${24 * scale}px`,
                marginBottom: `-${2 * scale}px`,
              }}
            />
          )}
        </div>

        {/* Middle Info */}
        <div
          className={cn('flex flex-col justify-center flex-1 min-w-0')}
          style={{ height: `${21 * scale}px` }}
        >
          {/* Name or Number - Missed call color handling */}
          <span
            className={cn(
              'font-bold truncate leading-tight w-full',
              isMissed ? 'text-[#FF383C]' : 'text-white'
            )}
            style={{
              fontSize: `${10 * scale}px`,
            }}
          >
            {hasName ? call.name : call.number}
          </span>

          <div
            className={cn('flex items-center w-full')}
            style={{
              gap: `${3 * scale}px`,
              marginTop: `${2 * scale}px`,
            }}
          >
            {isHistory && (
              <i
                className={cn(
                  'fi shrink-0 text-muted',
                  isOutgoing ? 'fi-br-arrow-up-right' : 'fi-br-arrow-down-left'
                )}
                style={{
                  fontSize: `${4.7 * scale}px`,
                }}
              />
            )}
            <span
              className={cn(
                'font-normal truncate leading-tight flex-1 min-w-0 text-muted'
              )}
              style={{
                fontSize: `${6 * scale}px`,
              }}
            >
              {isHistory
                ? hasName
                  ? call.number
                  : call.location
                : call.number}
            </span>
          </div>
        </div>
      </div>

      {/* Right Side (Actions) */}
      <div
        className={cn('flex items-center justify-end shrink-0')}
        style={{
          gap: `${5 * scale}px`,
          marginLeft: `${8 * scale}px`,
        }}
      >
        {isHistory ? (
          <span
            className={cn(
              'font-normal whitespace-nowrap flex items-center leading-none text-muted'
            )}
            style={{
              fontSize: `${6 * scale}px`,
              height: `${15 * scale}px`,
            }}
          >
            {call.time}
          </span>
        ) : (
          <Button
            variant="iconButton"
            icon="fi fi-ss-comments"
            iconClassName="text-muted"
            iconStyle={{ fontSize: `${8 * scale}px` }}
            className={cn(
              'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto hover:opacity-80!',
              'bg-six'
            )}
            style={{
              width: `${15 * scale}px`,
              height: `${15 * scale}px`,
              borderRadius: `${5 * scale}px`,
            }}
            aria-label="Send message"
          />
        )}

        <Button
          variant="iconButton"
          icon="fi fi-ss-phone-call"
          iconClassName="text-[#315DFF]"
          iconStyle={{ fontSize: `${8 * scale}px` }}
          className={cn(
            'hover:opacity-80!',
            !isHistory &&
              'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto',
            'bg-[#315DFF]/30'
          )}
          style={{
            width: `${15 * scale}px`,
            height: `${15 * scale}px`,
            borderRadius: `${5 * scale}px`,
          }}
          aria-label="Call contact"
        />
      </div>
    </div>
  );
}

// Defining PropTypes for type safety
ContactItem.propTypes = {
  call: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    number: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    time: PropTypes.string,
    type: PropTypes.oneOf(['incoming', 'outgoing', 'missed']),
  }).isRequired,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  scale: PropTypes.number,
  variant: PropTypes.oneOf(['history', 'contacts']),
  onClick: PropTypes.func,
};
