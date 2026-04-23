import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';
import DropdownItem from '@/features/Dinasty8/components/DropdownItem.jsx';

const headerVariants = cva(
  'flex items-center justify-between w-full transition-all duration-300',
  {
    variants: {
      variant: {
        dropdown: 'cursor-pointer',
        location: 'bg-ten',
      },
      isOpen: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { variant: 'dropdown', isOpen: true, className: 'bg-[#315DFF]' },
      { variant: 'dropdown', isOpen: false, className: 'bg-ten' },
    ],
    defaultVariants: {
      variant: 'dropdown',
      isOpen: false,
    },
  }
);

const mainIconBoxVariants = cva(
  'flex items-center justify-center shrink-0 transition-all duration-300',
  {
    variants: {
      variant: {
        dropdown: '',
        location: 'bg-bar',
      },
      isOpen: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { variant: 'dropdown', isOpen: true, className: 'bg-white/30' },
      { variant: 'dropdown', isOpen: false, className: 'bg-[#315DFF]' },
    ],
    defaultVariants: {
      variant: 'dropdown',
      isOpen: false,
    },
  }
);

const rightActionBoxVariants = cva(
  'flex items-center justify-center shrink-0 transition-all duration-300',
  {
    variants: {
      variant: {
        dropdown: '',
        location: 'bg-[#315DFF]/30 hover:bg-[#315DFF]/40 cursor-pointer',
      },
      isOpen: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { variant: 'dropdown', isOpen: true, className: 'bg-[#315DFF]' },
      { variant: 'dropdown', isOpen: false, className: 'bg-six' },
    ],
    defaultVariants: {
      variant: 'dropdown',
      isOpen: false,
    },
  }
);

export default function DinastyItem({
  variant = 'dropdown',
  scale = 1,
  title = 'My House',
  subValue = '25',
  subtitle = 'Alta st, Pillbox Hill',
  mainIcon = 'fi-ss-home',
  menuData = [],
  className,
  onMarkerClick,
  onItemAction,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState('root');

  const activeMenu = menuData.find((m) => m.id === activeMenuId) || menuData[0];
  const isSubMenu = activeMenuId !== 'root';
  const isDropdown = variant === 'dropdown';

  const toggleDropdown = (e) => {
    if (!isDropdown) return;
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

  return (
    <div
      className={cn('flex flex-col w-full', className)}
      style={{ width: `${245 * scale}px` }}
    >
      <div
        className={headerVariants({ variant, isOpen })}
        onClick={toggleDropdown}
        style={{
          height: `${50 * scale}px`,
          padding: `${10 * scale}px`,
          borderTopLeftRadius: `${10 * scale}px`,
          borderTopRightRadius: `${10 * scale}px`,
          borderBottomLeftRadius:
            isOpen && isDropdown ? '0px' : `${10 * scale}px`,
          borderBottomRightRadius:
            isOpen && isDropdown ? '0px' : `${10 * scale}px`,
        }}
      >
        <div className="flex items-center" style={{ gap: `${5 * scale}px` }}>
          <div
            className={mainIconBoxVariants({ variant, isOpen })}
            onClick={isDropdown && isSubMenu ? handleBackToRoot : undefined}
            style={{
              width: `${30 * scale}px`,
              height: `${30 * scale}px`,
              borderRadius: `${5 * scale}px`,
            }}
          >
            <i
              className={cn(
                'fi flex items-center justify-center',
                isDropdown && isSubMenu ? 'fi-ss-angle-small-left' : mainIcon
              )}
              style={{
                fontSize: `${15 * scale}px`,
                color: isOpen && isDropdown ? '#FFFFFF' : 'var(--color-muted)',
              }}
            />
          </div>

          <div className="flex min-w-0 flex-col justify-center">
            <div
              className="flex items-baseline"
              style={{ gap: `${4 * scale}px` }}
            >
              <span
                className="font-space font-bold leading-none text-white"
                style={{ fontSize: `${10 * scale}px` }}
              >
                {title}
              </span>

              {subValue && (
                <span
                  className="font-space font-normal leading-none text-muted"
                  style={{ fontSize: `${8 * scale}px` }}
                >
                  {subValue}
                </span>
              )}
            </div>

            <span
              className="font-space font-normal leading-none text-muted"
              style={{
                fontSize: `${8 * scale}px`,
                marginTop: `${2 * scale}px`,
              }}
            >
              {isDropdown && isSubMenu ? activeMenu.title : subtitle}
            </span>
          </div>
        </div>

        <div
          className={rightActionBoxVariants({ variant, isOpen })}
          onClick={variant === 'location' ? onMarkerClick : undefined}
          style={{
            width: `${15 * scale}px`,
            height: `${15 * scale}px`,
            borderRadius: `${3 * scale}px`,
          }}
        >
          {variant === 'dropdown' ? (
            <i
              className="fi fi-ss-angle-small-down flex items-center justify-center transition-transform duration-300"
              style={{
                fontSize: `${10 * scale}px`,
                color: isOpen ? '#FFFFFF' : 'var(--color-muted)',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          ) : (
            <i
              className="fi fi-rs-marker flex items-center justify-center"
              style={{
                fontSize: `${10 * scale}px`,
                color: '#315DFF',
              }}
            />
          )}
        </div>
      </div>

      {isDropdown && isOpen && activeMenu && (
        <div
          className="bg-ten flex w-full flex-col overflow-hidden"
          style={{
            borderBottomLeftRadius: `${10 * scale}px`,
            borderBottomRightRadius: `${10 * scale}px`,
          }}
        >
          {activeMenu.items.map((item, index) => (
            <DropdownItem
              key={index}
              scale={scale}
              title={item.title}
              type={item.type}
              rightIcon={item.rightIcon}
              rightIconColor={item.rightIconColor}
              rightText={item.rightText}
              isLast={index === activeMenu.items.length - 1}
              onNavigate={() => {
                if (item.targetMenuId) {
                  setActiveMenuId(item.targetMenuId);
                } else if (item.action && onItemAction) {
                  onItemAction(item.action);
                } else if (item.onClick) {
                  item.onClick();
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const menuItemShape = PropTypes.shape({
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

DinastyItem.propTypes = {
  variant: PropTypes.oneOf(['dropdown', 'location']),
  scale: PropTypes.number,
  title: PropTypes.string,
  subValue: PropTypes.string,
  subtitle: PropTypes.string,
  mainIcon: PropTypes.string,
  menuData: PropTypes.arrayOf(menuShape),
  className: PropTypes.string,
  onMarkerClick: PropTypes.func,
  onItemAction: PropTypes.func,
};
