import PropTypes from 'prop-types';

const getColorWithOpacity = (color, opacity) => {
  if (color.startsWith('#')) {
    let hex = color.replace('#', '');

    if (hex.length === 3)
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
  }

  return `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`;
};

export default function BigNotification({
  title = '20% Battery',
  subtitle = 'Tap to turn on Low Power Mode',
  icon = 'fi-ss-rocket-lunch',
  iconColor = '#0A84FF',
  scale = 1,
  onClick,
}) {
  const dynamicColorWithOpacity = getColorWithOpacity(iconColor, 0.3);

  return (
    <div
      className="bg-app rounded-[25px] flex items-center cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all overflow-hidden"
      onClick={onClick}
      style={{
        width: `${265 * scale}px`,
        height: `${50 * scale}px`,
        border: `1px solid ${dynamicColorWithOpacity}`,
      }}
    >
      <div
        className="flex items-center justify-between w-full"
        style={{
          height: `${31 * scale}px`,
          gap: `${10 * scale}px`,
          paddingLeft: `${15 * scale}px`,
          paddingRight: `${15 * scale}px`,
        }}
      >
        {/* Text Section - Left Side */}
        <div
          className="flex flex-col flex-1 justify-center overflow-hidden"
          style={{
            height: `${23 * scale}px`,
          }}
        >
          <span
            className="text-white text-left leading-none truncate block"
            style={{
              fontSize: `${10 * scale}px`,
              fontWeight: 700,
              paddingBottom: `${3 * scale}px`,
            }}
          >
            {title}
          </span>
          <span
            className="text-muted text-left leading-none truncate block"
            style={{
              fontSize: `${8 * scale}px`,
              fontWeight: 400,
            }}
          >
            {subtitle}
          </span>
        </div>

        {/* Icon Section - Right Side */}
        <div
          className="shrink-0 rounded-full flex items-center justify-center"
          style={{
            width: `${31 * scale}px`,
            height: `${31 * scale}px`,
            backgroundColor: dynamicColorWithOpacity,
          }}
        >
          <i
            className={`fi ${icon} flex items-center justify-center`}
            style={{
              fontSize: `${12 * scale}px`,
              color: iconColor,
            }}
          />
        </div>
      </div>
    </div>
  );
}

BigNotification.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  scale: PropTypes.number,
  onClick: PropTypes.func,
};
