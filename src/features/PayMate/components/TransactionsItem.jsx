import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';
import Button from '@/shared/components/elements/Button.jsx';

const transactionIconVariants = cva(
  'fi flex items-center justify-center ml-[2px] shrink-0',
  {
    variants: {
      type: {
        income: 'text-[#34C759] fi-rs-plus-small',
        expense: 'text-[#FF383C] fi-rs-minus-small',
      },
    },
    defaultVariants: {
      type: 'expense',
    },
  }
);

export default function TransactionsItem({
  scale = 1,
  mode = 'transaction',
  title,
  subtitle,
  amount,
  time,
  type = 'expense',
  imageUrl,
  iconClass = 'fi-rs-pizza-slice',
  isFirst,
  isLast,
  className,
  onAccept,
  onReject,
}) {
  const radius = `${12 * scale}px`;

  const borderRadiusStyles = {
    ...(isFirst && {
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
    }),
    ...(isLast && {
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
    }),
  };

  return (
    <div
      className={cn(
        'flex items-center w-full transition-colors duration-200 cursor-pointer',
        className
      )}
      style={{
        height: `${44 * scale}px`,
        padding: `${10 * scale}px`,
        backgroundColor: 'var(--color-ten)',
        borderBottom: isLast
          ? 'none'
          : `${0.5 * scale}px solid var(--color-border)`,
        ...borderRadiusStyles,
      }}
    >
      {/* Icon or Image Wrapper */}
      <div
        className="shrink-0 flex items-center justify-center overflow-hidden"
        style={{
          width: `${20 * scale}px`,
          height: `${20 * scale}px`,
          borderRadius: `${6 * scale}px`,
          backgroundColor: !imageUrl ? 'var(--color-ten)' : 'transparent',
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <i
            className={cn(
              'fi text-muted flex justify-center items-center',
              iconClass
            )}
            style={{ fontSize: `${10 * scale}px` }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Main Content Body */}
      <div
        className="flex flex-1 h-full items-center justify-between min-w-0"
        style={{ marginLeft: `${8 * scale}px` }}
      >
        {/* Left Section: Title & Subtitle */}
        <div className="flex flex-col justify-center min-w-0">
          <span
            className="text-white font-bold truncate"
            style={{ fontSize: `${10 * scale}px`, lineHeight: 1.2 }}
          >
            {title}
          </span>
          <span
            className="text-muted font-normal truncate"
            style={{
              fontSize: `${6 * scale}px`,
              lineHeight: 1,
              marginTop: `${2 * scale}px`,
            }}
          >
            {subtitle}
          </span>
        </div>

        {/* Right Section: Amount, Time & Actions */}
        <div className="flex items-center shrink-0">
          {mode === 'transaction' ? (
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <span
                  className="text-white font-normal"
                  style={{ fontSize: `${8 * scale}px`, lineHeight: 1.2 }}
                >
                  ${amount}
                </span>
                <i
                  className={transactionIconVariants({ type })}
                  style={{
                    fontSize: `${10 * scale}px`,
                    width: `${10 * scale}px`,
                    height: `${10 * scale}px`,
                  }}
                  aria-hidden="true"
                />
              </div>
              <span
                className="text-muted font-normal whitespace-nowrap"
                style={{
                  fontSize: `${6 * scale}px`,
                  lineHeight: 1,
                  marginTop: `${2 * scale}px`,
                }}
              >
                {time}
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="flex flex-col items-end justify-center">
                <span
                  className="text-white font-normal"
                  style={{ fontSize: `${8 * scale}px`, lineHeight: 1.2 }}
                >
                  ${amount}
                </span>
                <span
                  className="text-muted font-normal whitespace-nowrap"
                  style={{
                    fontSize: `${6 * scale}px`,
                    lineHeight: 1,
                    marginTop: `${2 * scale}px`,
                  }}
                >
                  {time}
                </span>
              </div>

              <div
                className="flex items-center"
                style={{
                  marginLeft: `${6 * scale}px`,
                  gap: `${5 * scale}px`,
                }}
              >
                {/* Reject Button */}
                <Button
                  variant="iconButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReject?.();
                  }}
                  icon="fi fi-rs-cross"
                  iconClassName="text-[#FF383C]"
                  iconStyle={{ fontSize: `${8 * scale}px` }}
                  className="bg-[#FF383C]/30 hover:bg-[#FF383C]/40 transition-colors"
                  style={{
                    width: `${15 * scale}px`,
                    height: `${15 * scale}px`,
                    borderRadius: `${5 * scale}px`,
                  }}
                  aria-label="Reject bill"
                />

                {/* Accept Button */}
                <Button
                  variant="iconButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAccept?.();
                  }}
                  icon="fi fi-rs-check"
                  iconClassName="text-[#34C759]"
                  iconStyle={{ fontSize: `${8 * scale}px` }}
                  className="bg-[#34C759]/30 hover:bg-[#34C759]/40 transition-colors"
                  style={{
                    width: `${15 * scale}px`,
                    height: `${15 * scale}px`,
                    borderRadius: `${5 * scale}px`,
                  }}
                  aria-label="Accept bill"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

TransactionsItem.propTypes = {
  scale: PropTypes.number,
  mode: PropTypes.oneOf(['transaction', 'bill']),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  time: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['income', 'expense']),
  imageUrl: PropTypes.string,
  iconClass: PropTypes.string,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  className: PropTypes.string,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
};
