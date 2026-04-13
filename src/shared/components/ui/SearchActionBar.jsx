import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';

// 1. Base glassmorphism styles utilizing standard CSS variables
const glassmorphismVariants = cva(
  'flex items-center bg-six border border-border backdrop-blur-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition-all'
);

export default function SearchActionBar({
  scale = 1,
  value = '',
  onChange,
  onActionClick,
  placeholder = 'Search...',
  searchIconColor = '#315DFF',
  showAction = true,
  className,
}) {
  return (
    <div
      className={cn('flex items-center w-full', className)}
      style={{
        width: `${260 * scale}px`,
        height: `${35 * scale}px`,
        gap: `${5 * scale}px`,
      }}
    >
      {/* Search Input Container */}
      <div
        className={cn(glassmorphismVariants(), 'justify-between flex-1 h-full')}
        style={{
          padding: `${5 * scale}px ${10 * scale}px`,
          borderRadius: `${25 * scale}px`,
          borderWidth: `${1 * scale}px`,
        }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full bg-transparent border-none outline-none font-normal text-white placeholder-muted"
          style={{
            fontSize: `${8 * scale}px`,
          }}
        />

        <i
          className="fi fi-rs-search flex items-center justify-center shrink-0"
          style={{
            fontSize: `${10 * scale}px`,
            marginLeft: `${5 * scale}px`,
            color: searchIconColor,
          }}
        />
      </div>

      {/* Action Button (e.g., Add New Item) */}
      {showAction && (
        <button
          type="button"
          onClick={onActionClick}
          aria-label="Action"
          className={cn(
            glassmorphismVariants(),
            'justify-center shrink-0 cursor-pointer hover:bg-item-hover active:scale-95'
          )}
          style={{
            width: `${34.67 * scale}px`,
            height: `${34.67 * scale}px`,
            borderRadius: `${20 * scale}px`,
            borderWidth: `${1 * scale}px`,
          }}
        >
          <i
            className="fi fi-ss-plus flex items-center justify-center text-white"
            style={{
              fontSize: `${13 * scale}px`,
            }}
          />
        </button>
      )}
    </div>
  );
}

SearchActionBar.propTypes = {
  scale: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onActionClick: PropTypes.func,
  placeholder: PropTypes.string,
  searchIconColor: PropTypes.string,
  showAction: PropTypes.bool,
  className: PropTypes.string,
};
