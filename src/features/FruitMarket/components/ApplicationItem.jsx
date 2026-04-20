import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';

const applicationItemVariants = cva(
  'flex items-center justify-between w-full bg-one',
  {
    variants: {
      type: {
        download: '',
        remove: '',
      },
    },
    defaultVariants: {
      type: 'download',
    },
  }
);

export default function ApplicationItem({
  app,
  type = 'download',
  scale = 1,
  onClick,
}) {
  const isDownload = type === 'download';

  return (
    <div
      className={cn(applicationItemVariants({ type }))}
      style={{
        width: `${245 * scale}px`,
        height: `${50 * scale}px`,
        padding: `${10 * scale}px ${15 * scale}px ${10 * scale}px ${10 * scale}px`,
        borderRadius: `${10 * scale}px`,
      }}
    >
      {/* LEFT */}
      <div className="flex items-center" style={{ gap: `${5 * scale}px` }}>
        {/* Image */}
        <div
          className="shrink-0 overflow-hidden"
          style={{
            width: `${30 * scale}px`,
            height: `${30 * scale}px`,
          }}
        >
          <img
            src={app.image}
            alt={app.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Texts */}
        <div
          className="flex flex-col justify-between"
          style={{
            width: `${160 * scale}px`,
            height: `${21 * scale}px`,
          }}
        >
          {/* Title */}
          <div
            className="flex items-center justify-between"
            style={{
              width: `${160 * scale}px`,
              height: `${13 * scale}px`,
            }}
          >
            <span
              className="font-bold text-white leading-none truncate"
              style={{
                fontSize: `${10 * scale}px`,
                lineHeight: '100%',
              }}
            >
              {app.name}
            </span>
          </div>

          {/* Description */}
          <div
            className="flex items-center"
            style={{
              width: `${160 * scale}px`,
              height: `${10 * scale}px`,
              gap: `${3 * scale}px`,
            }}
          >
            <span
              className="text-muted leading-none truncate"
              style={{
                fontSize: `${8 * scale}px`,
                lineHeight: '100%',
              }}
            >
              {app.description}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT BUTTON */}
      <button
        type="button"
        onClick={() => onClick?.(app)}
        className={cn(
          'flex items-center justify-center shrink-0 transition-all duration-200 active:scale-[0.95]',
          isDownload ? 'bg-[#315DFF4D]' : 'bg-[#FF375D4D]'
        )}
        style={{
          width: `${20 * scale}px`,
          height: `${20 * scale}px`,
          borderRadius: `${5 * scale}px`,
          padding: `${5 * scale}px`,
        }}
      >
        <i
          className={cn(
            'fi flex items-center justify-center',
            isDownload
              ? 'fi-rs-download text-[#315DFF]'
              : 'fi-rs-cross text-[#FF375D]'
          )}
          style={{
            fontSize: `${10 * scale}px`,
          }}
        />
      </button>
    </div>
  );
}

ApplicationItem.propTypes = {
  app: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['download', 'remove']),
  scale: PropTypes.number,
  onClick: PropTypes.func,
};
