import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';
import Button from '@/shared/components/elements/Button.jsx';

// Badge variant configurations (Selling / Buying)
const badgeVariants = cva(
  'flex items-center justify-center border font-medium',
  {
    variants: {
      type: {
        selling: 'bg-[#FFCC00]/30 border-[#FFCC00]/75 text-[#FFCC00]',
        buying: 'bg-[#34C759]/30 border-[#34C759]/50 text-[#34C759]',
      },
    },
    defaultVariants: {
      type: 'selling',
    },
  }
);

// Icon color configurations for time and user
const iconColorVariants = cva('fi flex justify-center items-center shrink-0', {
  variants: {
    type: {
      selling: 'text-[#FFCC00]',
      buying: 'text-[#34C759]',
    },
  },
  defaultVariants: {
    type: 'selling',
  },
});

// Helper function to format price (add thousands separators or return string)
const formatPrice = (value) => {
  if (value === null || value === undefined) return '';

  // If the value is purely numeric (or a numeric string)
  const numericValue = Number(value);
  if (!isNaN(numericValue) && value.toString().trim() !== '') {
    return numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  // If the value is text, e.g., "Negotiable"
  return value;
};

export default function YellowjackCard({
  scale = 1,
  type = 'selling',
  title,
  subtitle,
  time,
  userName,
  price,
  imageUrl,
  className,
  onClick,
}) {
  const cardRadius = `${10 * scale}px`;

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex flex-col overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.02] bg-one',
        className
      )}
      style={{
        width: `${245 * scale}px`,
        borderRadius: cardRadius,
      }}
    >
      {/* 1. Image Section (Optional) */}
      {imageUrl && (
        <div
          className="w-full shrink-0 relative"
          style={{
            height: `${122.5 * scale}px`,
          }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* 2. Middle Content Body */}
      <div
        className="flex flex-col w-full"
        style={{
          gap: `${5 * scale}px`,
          paddingTop: `${5 * scale}px`,
          paddingBottom: `${10 * scale}px`,
          paddingLeft: `${10 * scale}px`,
          paddingRight: `${10 * scale}px`,
        }}
      >
        {/* Top Row: Title & Badge */}
        <div
          className="flex justify-between items-start w-full"
          style={{
            paddingTop: `${5 * scale}px`,
            paddingBottom: `${5 * scale}px`,
          }}
        >
          <span
            className="text-white font-bold truncate"
            style={{ fontSize: `${10 * scale}px`, lineHeight: 1.2 }}
          >
            {title}
          </span>
          <div
            className={cn(badgeVariants({ type }), 'shrink-0 capitalize')}
            style={{
              paddingLeft: `${7 * scale}px`,
              paddingRight: `${7 * scale}px`,
              paddingTop: `${2 * scale}px`,
              paddingBottom: `${2 * scale}px`,
              borderRadius: `${3 * scale}px`,
              fontSize: `${8 * scale}px`,
              borderWidth: `${1 * scale}px`,
            }}
          >
            {type}
          </div>
        </div>

        {/* Subtitle */}
        <span
          className="font-normal truncate text-muted"
          style={{
            fontSize: `${8 * scale}px`,
            lineHeight: 1.2,
          }}
        >
          {subtitle}
        </span>

        {/* Bottom Row: Time & User */}
        <div
          className="flex items-center justify-between mt-auto w-full"
          style={{ paddingTop: `${5 * scale}px` }}
        >
          {/* Time Section */}
          <div className="flex items-center" style={{ gap: `${5 * scale}px` }}>
            <i
              className={cn(iconColorVariants({ type }), 'fi-rs-clock')}
              style={{ fontSize: `${10 * scale}px` }}
            />
            <span
              className="font-normal text-muted"
              style={{ fontSize: `${8 * scale}px` }}
            >
              {time}
            </span>
          </div>

          {/* User Section */}
          <div className="flex items-center" style={{ gap: `${5 * scale}px` }}>
            <i
              className={cn(iconColorVariants({ type }), 'fi-rs-user')}
              style={{ fontSize: `${10 * scale}px` }}
            />
            <span
              className="font-normal truncate max-w-20 text-muted"
              style={{ fontSize: `${8 * scale}px` }}
            >
              {userName}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Footer Section (Price & Action) */}
      <div
        className="flex items-center justify-between w-full bg-six"
        style={{
          height: `${25 * scale}px`,
          padding: `${5 * scale}px`,
        }}
      >
        {/* Left: Price */}
        <div className="flex items-center" style={{ gap: `${5 * scale}px` }}>
          <i
            className="fi fi-rs-dollar flex items-center justify-center text-muted"
            style={{ fontSize: `${10 * scale}px` }}
          />
          <span
            className="text-white font-bold"
            style={{ fontSize: `${10 * scale}px` }}
          >
            {formatPrice(price)}
          </span>
        </div>

        {/* Right: Action Button */}
        <Button
          variant="iconButton"
          icon="fi fi-ss-angle-small-right"
          iconClassName="text-muted"
          iconStyle={{ fontSize: `${10 * scale}px` }}
          className="bg-action hover:bg-item-hover"
          style={{
            width: `${15 * scale}px`,
            height: `${15 * scale}px`,
            borderRadius: `${3 * scale}px`,
          }}
        />
      </div>
    </div>
  );
}

YellowjackCard.propTypes = {
  scale: PropTypes.number,
  type: PropTypes.oneOf(['selling', 'buying']),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  imageUrl: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
