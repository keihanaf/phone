import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';
import DropdownItem from '@/shared/components/modules/dropdown/DropdownItem.jsx';

// Variants Definition

const headerVariants = cva(
  'flex items-center justify-between w-full transition-all duration-300',
  {
    variants: {
      variant: {
        expandable: 'cursor-pointer',
        static: 'bg-[#14151A]',
        combo: 'cursor-pointer bg-[#14151A]',
      },
      isOpen: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { variant: 'expandable', isOpen: true, className: 'bg-[#315DFF]' },
      { variant: 'expandable', isOpen: false, className: 'bg-ten' },
    ],
    defaultVariants: {
      variant: 'expandable',
      isOpen: false,
    },
  }
);

const mainIconBoxVariants = cva(
  'flex items-center justify-center shrink-0 transition-all duration-300',
  {
    variants: {
      variant: {
        expandable: '',
        static: 'bg-bar',
        combo: 'bg-[var(--bar-color,#70738C80)]',
      },
      isOpen: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { variant: 'expandable', isOpen: true, className: 'bg-white/30' },
      { variant: 'expandable', isOpen: false, className: 'bg-[#315DFF]' },
    ],
    defaultVariants: {
      variant: 'expandable',
      isOpen: false,
    },
  }
);

const actionBoxClass =
  'flex items-center justify-center shrink-0 transition-all duration-300';

// Main Component

export default function ExpandableAssetCard({
  variant = 'expandable',
  scale = 1,
  title,
  badgeText,
  subtitle,
  icon = 'fi-ss-box',
  actionIcon = 'fi-rs-marker',
  menuData = [],
  className,
  onActionClick,
  onItemAction,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState('root');

  const activeMenu =
    menuData?.find((m) => m.id === activeMenuId) || menuData?.[0];
  const isSubMenu = activeMenuId !== 'root';
  const isExpandable = variant === 'expandable' || variant === 'combo';

  const toggleDropdown = (e) => {
    if (!isExpandable) return;
    e.stopPropagation();

    if (isOpen && onItemAction) onItemAction('closeInput');
    if (isOpen && isSubMenu) setActiveMenuId('root');

    setIsOpen(!isOpen);
  };

  const handleBackToRoot = (e) => {
    e.stopPropagation();
    setActiveMenuId('root');
    if (onItemAction) onItemAction('closeInput');
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
    if (onActionClick) onActionClick();
  };

  const handleMenuItemNavigate = (item) => {
    if (item.targetMenuId) {
      setActiveMenuId(item.targetMenuId);
    } else if (item.action && onItemAction) {
      onItemAction(item.action);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div
      className={cn('flex flex-col w-full', className)}
      style={{ width: `${245 * scale}px` }}
    >
      {/* Header Section */}
      <div
        className={headerVariants({ variant, isOpen })}
        onClick={toggleDropdown}
        style={{
          height: `${50 * scale}px`,
          padding: `${10 * scale}px`,
          borderTopLeftRadius: `${10 * scale}px`,
          borderTopRightRadius: `${10 * scale}px`,
          borderBottomLeftRadius:
            isOpen && isExpandable ? '0px' : `${10 * scale}px`,
          borderBottomRightRadius:
            isOpen && isExpandable ? '0px' : `${10 * scale}px`,
        }}
      >
        <div className="flex items-center" style={{ gap: `${5 * scale}px` }}>
          {/* Main Left Icon */}
          <div
            className={mainIconBoxVariants({ variant, isOpen })}
            onClick={isExpandable && isSubMenu ? handleBackToRoot : undefined}
            style={{
              width: `${30 * scale}px`,
              height: `${30 * scale}px`,
              borderRadius: `${5 * scale}px`,
            }}
          >
            <i
              className={cn(
                'fi flex items-center justify-center',
                isExpandable && isSubMenu ? 'fi-ss-angle-small-left' : icon
              )}
              style={{
                fontSize: `${15 * scale}px`,
                color:
                  isOpen && variant === 'expandable'
                    ? '#FFFFFF'
                    : 'var(--color-muted)',
              }}
            />
          </div>

          {/* Texts (Title, Badge, Subtitle) */}
          <div className="flex min-w-0 flex-col justify-center">
            <div
              className="flex items-baseline"
              style={{ gap: `${4 * scale}px` }}
            >
              <span
                className="font-space font-bold leading-none text-white truncate"
                style={{ fontSize: `${10 * scale}px` }}
              >
                {title}
              </span>

              {badgeText && (
                <span
                  className="font-space font-normal leading-none text-muted shrink-0"
                  style={{ fontSize: `${8 * scale}px` }}
                >
                  {badgeText}
                </span>
              )}
            </div>

            <span
              className="font-space font-normal leading-none text-muted truncate"
              style={{
                fontSize: `${8 * scale}px`,
                marginTop: `${2 * scale}px`,
              }}
            >
              {isExpandable && isSubMenu && activeMenu
                ? activeMenu.title
                : subtitle}
            </span>
          </div>
        </div>

        {/* Right Actions Section */}
        <div className="flex items-center" style={{ gap: `${5 * scale}px` }}>
          {/* Static Action Box (Location Marker) */}
          {(variant === 'static' || variant === 'combo') && (
            <div
              className={cn(
                actionBoxClass,
                'bg-[#315DFF]/30 hover:bg-[#315DFF]/40 cursor-pointer'
              )}
              onClick={handleActionClick}
              style={{
                width: `${15 * scale}px`,
                height: `${15 * scale}px`,
                borderRadius: `${3 * scale}px`,
              }}
            >
              <i
                className={cn(
                  'fi flex items-center justify-center',
                  actionIcon
                )}
                style={{
                  fontSize: `${10 * scale}px`,
                  color: '#315DFF',
                }}
              />
            </div>
          )}

          {/* Expandable Action Box (Caret Down) */}
          {(variant === 'expandable' || variant === 'combo') && (
            <div
              className={cn(
                actionBoxClass,
                variant === 'expandable' && isOpen ? 'bg-[#315DFF]' : 'bg-six'
              )}
              style={{
                width: `${15 * scale}px`,
                height: `${15 * scale}px`,
                borderRadius: `${3 * scale}px`,
              }}
            >
              <i
                className="fi fi-ss-angle-small-down flex items-center justify-center transition-transform duration-300"
                style={{
                  fontSize: `${10 * scale}px`,
                  color: isOpen ? '#FFFFFF' : 'var(--color-muted)',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Expandable Menu List */}
      {isExpandable && isOpen && activeMenu && (
        <div
          className="bg-ten flex w-full flex-col overflow-hidden"
          style={{
            borderBottomLeftRadius: `${10 * scale}px`,
            borderBottomRightRadius: `${10 * scale}px`,
          }}
        >
          {activeMenu.items.map((item, index) => (
            <DropdownItem
              key={item.id || index}
              scale={scale}
              title={item.title}
              type={item.type}
              rightIcon={item.rightIcon}
              rightIconColor={item.rightIconColor}
              rightText={item.rightText}
              isLast={index === activeMenu.items.length - 1}
              onNavigate={() => handleMenuItemNavigate(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// PropTypes

const menuItemShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['icon', 'nav', 'text', 'badge-paid', 'badge-not-paid'])
    .isRequired,
  rightIcon: PropTypes.string,
  rightIconColor: PropTypes.string,
  rightText: PropTypes.string,
  targetMenuId: PropTypes.string,
  action: PropTypes.string,
  onClick: PropTypes.func,
});

const menuShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(menuItemShape).isRequired,
});

ExpandableAssetCard.propTypes = {
  variant: PropTypes.oneOf(['expandable', 'static', 'combo']),
  scale: PropTypes.number,
  title: PropTypes.string.isRequired,
  badgeText: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  actionIcon: PropTypes.string,
  menuData: PropTypes.arrayOf(menuShape),
  className: PropTypes.string,
  onActionClick: PropTypes.func,
  onItemAction: PropTypes.func,
};
