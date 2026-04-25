import React from 'react';
import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';
import Button from '@/shared/components/elements/Button.jsx';

const actionButtonVariants = cva('active:scale-[0.95] z-10', {
  variants: {
    variant: {
      ghost: '',
      active: 'bg-six hover:opacity-90',
      call: 'bg-[#315DFF]/30 hover:opacity-90',
    },
  },
  defaultVariants: {
    variant: 'ghost',
  },
});

export default function PageHeader({
  scale = 1,
  onLeftClick,
  leftIcon = 'fi-br-angle-left',
  onRightClick,
  rightIcon = 'fi-br-plus',
  rightVariant = 'active',
  rightIconColor = 'text-white',
  showRightButton = true,
  title = '',
  contact = null,
}) {
  const hasName = contact?.name && contact.name.trim().length > 0;
  const hasImage = !!contact?.image;
  const contactName = hasName ? contact.name : contact?.number;

  return (
    <div
      className={cn('flex items-center justify-between w-full relative')}
      style={{
        height: `${25 * scale}px`,
        width: `${245 * scale}px`,
      }}
    >
      {/* Left Section: Back Button + Contact Profile */}
      <div
        className="flex items-center h-full z-10"
        style={{ gap: `${8 * scale}px` }}
      >
        <Button
          variant="ghost"
          onClick={onLeftClick}
          icon={cn('fi', leftIcon)}
          iconClassName="text-muted"
          iconSize={`${10 * scale}px`}
          className="z-10"
          style={{
            width: `${25 * scale}px`,
            height: `${25 * scale}px`,
            borderRadius: `${5 * scale}px`,
            padding: `${5 * scale}px`,
          }}
          aria-label="Go Back"
        />

        {/* Contact Profile */}
        {contact && (
          <div className="flex items-center" style={{ gap: `${8 * scale}px` }}>
            <div
              className={cn(
                'flex justify-center overflow-hidden relative shrink-0',
                !hasImage && !hasName ? 'items-end bg-bar' : 'items-center',
                hasImage ? 'bg-transparent' : 'bg-bar'
              )}
              style={{
                width: `${25 * scale}px`,
                height: `${25 * scale}px`,
                borderRadius: `${5 * scale}px`,
              }}
            >
              {hasImage ? (
                <img
                  src={contact.image}
                  alt={contactName || 'User Avatar'}
                  className="w-full h-full object-cover"
                />
              ) : hasName ? (
                <span
                  className="font-bold flex items-center justify-center w-full h-full leading-none text-muted"
                  style={{
                    fontSize: `${14 * scale}px`,
                    paddingTop: `${1 * scale}px`,
                  }}
                >
                  {contact.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <i
                  className="fi fi-ss-user leading-none flex items-end text-muted"
                  style={{
                    fontSize: `${20 * scale}px`,
                    marginBottom: `-${2 * scale}px`,
                  }}
                />
              )}
            </div>
            <span
              className="font-bold whitespace-nowrap text-white truncate"
              style={{
                fontSize: `${12 * scale}px`,
                maxWidth: `${110 * scale}px`,
              }}
            >
              {contactName}
            </span>
          </div>
        )}
      </div>

      {/* Center Title */}
      {title && !contact && (
        <span
          className={cn(
            'absolute left-1/2 -translate-x-1/2 font-bold whitespace-nowrap text-white'
          )}
          style={{ fontSize: `${12 * scale}px` }}
        >
          {title}
        </span>
      )}

      {/* Right Action Button */}
      <div
        className={cn(
          'transition-opacity duration-300 ease-in-out z-10 shrink-0',
          showRightButton
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        style={{ width: `${25 * scale}px`, height: `${25 * scale}px` }}
      >
        {showRightButton && (
          <Button
            variant={rightVariant === 'ghost' ? 'ghost' : undefined}
            onClick={onRightClick}
            icon={cn('fi', rightIcon)}
            iconClassName={rightIconColor}
            iconSize={`${10 * scale}px`}
            className={cn(
              actionButtonVariants({ variant: rightVariant }),
              'w-full h-full flex items-center justify-center'
            )}
            style={{
              borderRadius: `${5 * scale}px`,
              padding: `${5 * scale}px`,
            }}
            aria-label="Primary Action"
          />
        )}
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  scale: PropTypes.number,
  onLeftClick: PropTypes.func,
  leftIcon: PropTypes.string,
  onRightClick: PropTypes.func,
  rightIcon: PropTypes.string,
  rightVariant: PropTypes.oneOf(['ghost', 'active', 'call']),
  rightIconColor: PropTypes.string,
  showRightButton: PropTypes.bool,
  title: PropTypes.string,
  contact: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.string,
    image: PropTypes.string,
  }),
};
