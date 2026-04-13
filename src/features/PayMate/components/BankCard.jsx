import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';

const bankCardVariants = cva(
  'relative flex flex-col overflow-hidden box-border text-white ',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export default function BankCard({
  width = 245,
  balance = '$58 529',
  cardNumber = '2025  3562  8439  3826',
  cardHolder = 'Eddie Marshall',
  backgroundImage = '',
  logoImage = '',
  scale = 1,
  variant = 'default',
  className,
}) {
  const formattedCardNumber = cardNumber.match(/./gs) || [];

  return (
    <div
      className={cn(bankCardVariants({ variant }), className)}
      style={{
        width: `${width * scale}px`,
        height: `${140 * scale}px`,
        paddingTop: `${15 * scale}px`,
        paddingRight: `${20 * scale}px`,
        paddingBottom: `${10 * scale}px`,
        paddingLeft: `${20 * scale}px`,
        borderRadius: `${15 * scale}px`,
        gap: `${10 * scale}px`,
        boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.25)',
        border: `${1 * scale}px solid var(--color-border)`,
      }}
    >
      {/* Background Blur Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backdropFilter: `blur(${6 * scale}px)`,
          WebkitBackdropFilter: `blur(${6 * scale}px)`,
        }}
      />

      {/* Optional Background Image */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt="Card Background Pattern"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
      )}

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Top Section: Bank Logo */}
        <div
          className="flex justify-end w-full"
          style={{
            width: `${205 * scale}px`,
            height: `${48 * scale}px`,
          }}
        >
          {logoImage ? (
            <img
              src={logoImage}
              alt="Bank Logo"
              style={{
                width: `${40 * scale}px`,
                height: `${12 * scale}px`,
                objectFit: 'contain',
              }}
            />
          ) : (
            <div
              style={{
                width: `${40 * scale}px`,
                height: `${12 * scale}px`,
              }}
            />
          )}
        </div>

        {/* Middle Section: Balance and Card Numbers */}
        <div
          className="flex flex-col w-full justify-end"
          style={{
            width: `${205 * scale}px`,
            height: `${37 * scale}px`,
            gap: `${8 * scale}px`,
          }}
        >
          <div
            className="flex items-baseline w-full"
            style={{ gap: `${8 * scale}px` }}
          >
            <span
              className="font-medium leading-none"
              style={{ fontSize: `${16 * scale}px` }}
            >
              {balance}
            </span>
            <span
              className="font-normal leading-none text-muted"
              style={{
                fontSize: `${6 * scale}px`,
              }}
            >
              Total Balance
            </span>
          </div>

          <div className="flex w-full justify-between">
            {formattedCardNumber.map((chunk, index) => (
              <div
                key={index}
                className="flex items-center"
                style={{ gap: `${4 * scale}px` }}
              >
                {chunk.split('').map((digit, digitIndex) => (
                  <span
                    key={digitIndex}
                    className="leading-none font-mono! text-muted"
                    style={{
                      fontSize: `${8 * scale}px`,
                    }}
                  >
                    {digit}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Card Holder Name */}
        <div className="flex-1 flex items-end w-full justify-start">
          <span
            className="font-bold leading-none uppercase tracking-wide"
            style={{ fontSize: `${8 * scale}px` }}
          >
            {cardHolder}
          </span>
        </div>
      </div>
    </div>
  );
}

BankCard.propTypes = {
  width: PropTypes.number,
  balance: PropTypes.string,
  cardNumber: PropTypes.string,
  cardHolder: PropTypes.string,
  backgroundImage: PropTypes.string,
  logoImage: PropTypes.string,
  scale: PropTypes.number,
  variant: PropTypes.oneOf(['default']),
  className: PropTypes.string,
};
