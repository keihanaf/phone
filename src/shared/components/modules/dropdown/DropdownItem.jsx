import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/shared/utils/cn.js';
import Button from '@/shared/components/elements/Button.jsx';

export default function DropdownItem({
  scale,
  title,
  type,
  rightIcon,
  rightIconColor,
  rightText,
  onNavigate,
  isLast,
}) {
  return (
    <div
      className="flex w-full cursor-pointer items-center justify-between border-white/10 transition-colors hover:bg-slot-hover"
      style={{
        height: `${25 * scale}px`,
        paddingTop: `${5 * scale}px`,
        paddingRight: `${5 * scale}px`,
        paddingBottom: `${5 * scale}px`,
        paddingLeft: `${10 * scale}px`,
        borderBottomWidth: isLast ? '0px' : `${1 * scale}px`,
        borderBottomStyle: 'solid',
      }}
      onClick={onNavigate}
    >
      <span
        className="font-space font-medium leading-none text-white"
        style={{ fontSize: `${8 * scale}px` }}
      >
        {title}
      </span>

      <div className="flex shrink-0 items-center">
        {(type === 'icon' || type === 'nav') && rightIcon && (
          <Button
            variant="ghost"
            icon={cn('fi', rightIcon)}
            iconColor={rightIconColor || 'var(--color-muted)'}
            iconSize={`${10 * scale}px`}
            className="pointer-events-none p-0!"
            aria-hidden="true"
          />
        )}

        {type === 'text' && rightText && (
          <span
            className="font-space font-normal leading-none text-muted"
            style={{ fontSize: `${8 * scale}px` }}
          >
            {rightText}
          </span>
        )}

        {type === 'badge-not-paid' && (
          <div
            className="flex items-center justify-center bg-[#FF383C]/30"
            style={{
              width: `${32 * scale}px`,
              height: `${10 * scale}px`,
              borderRadius: `${3 * scale}px`,
            }}
          >
            <span
              className="font-space font-normal leading-none text-[#FF383C]"
              style={{ fontSize: `${6 * scale}px` }}
            >
              NOT PAID
            </span>
          </div>
        )}

        {type === 'badge-paid' && (
          <div
            className="flex items-center justify-center bg-[#315DFF]/30"
            style={{
              width: `${19 * scale}px`,
              height: `${10 * scale}px`,
              borderRadius: `${3 * scale}px`,
            }}
          >
            <span
              className="font-space font-normal leading-none text-[#315DFF]"
              style={{ fontSize: `${6 * scale}px` }}
            >
              PAID
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

DropdownItem.propTypes = {
  scale: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['icon', 'nav', 'text', 'badge-paid', 'badge-not-paid'])
    .isRequired,
  rightIcon: PropTypes.string,
  rightIconColor: PropTypes.string,
  rightText: PropTypes.string,
  onNavigate: PropTypes.func,
  isLast: PropTypes.bool,
};
