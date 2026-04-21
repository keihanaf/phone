import React from 'react';
import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';

const mailItemVariants = cva(
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

const renderHighlightedText = (text, highlight, scale) => {
  if (!highlight || !highlight.trim()) return <>{text}</>;

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

export default function MailItem({
  mail,
  isFirst,
  isLast,
  scale = 1,
  variant = 'default',
  searchQuery = '',
  onClick,
}) {
  const hasName = mail.name && mail.name.trim().length > 0;
  const contactName = hasName ? mail.name : mail.address || mail.number;

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

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick(mail);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(mail)}
      onKeyDown={handleKeyDown}
      className={cn(mailItemVariants({ variant }))}
      style={{
        width: `${245 * scale}px`,
        height: `${41 * scale}px`,
        padding: `${10 * scale}px`,
        gap: `${5 * scale}px`,
        borderBottom: isLast
          ? 'none'
          : `${1 * scale}px solid var(--color-border)`,
        ...borderRadiusStyles,
      }}
    >
      {variant === 'search' ? (
        <div className="flex flex-col justify-center flex-1 min-w-0 h-full">
          <div className="flex items-center justify-between w-full mb-0.5">
            <span
              className="font-bold truncate text-white"
              style={{ fontSize: `${10 * scale}px` }}
            >
              {mail.isOutbound ? 'You' : contactName}
            </span>

            {mail.isOutbound ? (
              <span
                className="shrink-0 text-white"
                style={{ fontSize: `${6 * scale}px` }}
              >
                <span className="font-normal">To </span>
                <span className="font-bold">{contactName}</span>
              </span>
            ) : (
              mail.topTime && (
                <span
                  className="font-normal shrink-0 text-white"
                  style={{ fontSize: `${6 * scale}px` }}
                >
                  {mail.topTime}
                </span>
              )
            )}
          </div>

          <div className="flex items-center justify-between w-full">
            <span
              className="font-normal truncate flex-1 min-w-0 pr-2 text-muted"
              style={{ fontSize: `${8 * scale}px` }}
            >
              {renderHighlightedText(mail.lastMessage, searchQuery, scale)}
            </span>

            <div
              className="flex items-center shrink-0"
              style={{ gap: `${5 * scale}px` }}
            >
              <span
                className="font-normal text-muted"
                style={{ fontSize: `${6 * scale}px` }}
              >
                {mail.time}
              </span>

              {mail.unread && (
                <span
                  style={{
                    width: `${5 * scale}px`,
                    height: `${5 * scale}px`,
                    background: '#315DFF',
                    borderRadius: '50%',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center flex-1 min-w-0 h-full">
          <div className="flex items-center justify-between w-full mb-0.5">
            <span
              className="font-bold truncate text-white"
              style={{ fontSize: `${10 * scale}px` }}
            >
              {contactName}
            </span>

            <div
              className="flex items-center shrink-0"
              style={{ gap: `${5 * scale}px` }}
            >
              <span
                className="font-normal text-white"
                style={{ fontSize: `${6 * scale}px` }}
              >
                {mail.time}
              </span>

              {mail.unread && (
                <span
                  style={{
                    width: `${5 * scale}px`,
                    height: `${5 * scale}px`,
                    background: '#315DFF',
                    borderRadius: '50%',
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <span
              className="font-normal truncate flex-1 min-w-0 pr-2 text-muted"
              style={{ fontSize: `${8 * scale}px` }}
            >
              {mail.lastMessage}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

MailItem.propTypes = {
  mail: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    address: PropTypes.string,
    number: PropTypes.string,
    lastMessage: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    isOutbound: PropTypes.bool,
    topTime: PropTypes.string,
    unread: PropTypes.bool,
  }).isRequired,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  scale: PropTypes.number,
  variant: PropTypes.oneOf(['default', 'search']),
  searchQuery: PropTypes.string,
  onClick: PropTypes.func,
};
