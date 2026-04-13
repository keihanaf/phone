import PropTypes from 'prop-types';

const hexToRgba = (hex, opacity = 0.3) => {
  if (!hex) return `rgba(49, 93, 255, ${opacity})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default function TextNotification({
  title = 'Warning',
  subtitle = 'This action will expose your IP address to the admin of the proxy server.',
  denyText = 'Deny',
  acceptText = 'Pay Now',
  acceptColor = '#315DFF',
  onDeny,
  onAccept,
  scale = 1,
}) {
  return (
    <div
      className="rounded-[25px] bg-six border-border transition-all"
      style={{
        width: `${224 * scale}px`,
        height: `${108 * scale}px`,
        backdropFilter: 'blur(10px) saturate(90%) brightness(1)',
        WebkitBackdropFilter: 'blur(10px) saturate(100%) brightness(1.1)',
        boxShadow:
          '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 var(--color-border)',
      }}
    >
      <div
        className="rounded-[25px] flex flex-col"
        style={{
          width: `${224 * scale}px`,
          height: `${108 * scale}px`,
          padding: `${10 * scale}px`,
        }}
      >
        <div
          className="flex flex-col"
          style={{
            width: `${204 * scale}px`,
            height: `${88 * scale}px`,
            gap: `${10 * scale}px`,
          }}
        >
          <div
            className="flex flex-col"
            style={{
              width: `${204 * scale}px`,
              height: `${53 * scale}px`,
              gap: `${5 * scale}px`,
              paddingTop: `${5 * scale}px`,
              paddingLeft: `${5 * scale}px`,
              paddingRight: `${5 * scale}px`,
              paddingBottom: 0,
            }}
          >
            <span
              className="text-white leading-none"
              style={{
                fontSize: `${12 * scale}px`,
                fontWeight: 700,
              }}
            >
              {title}
            </span>
            <span
              className="text-white leading-tight"
              style={{
                fontSize: `${10 * scale}px`,
                fontWeight: 400,
              }}
            >
              {subtitle}
            </span>
          </div>

          <div
            className="flex items-center"
            style={{
              width: `${204 * scale}px`,
              height: `${25 * scale}px`,
              gap: `${5 * scale}px`,
            }}
          >
            <button
              onClick={onDeny}
              className="flex items-center justify-center cursor-pointer transition-all active:scale-95 text-white"
              style={{
                width: `${99.5 * scale}px`,
                height: `${25 * scale}px`,
                borderRadius: `${20 * scale}px`,
                backgroundColor: 'rgba(112, 115, 140, 0.35)',
                fontSize: `${10 * scale}px`,
                fontWeight: 500,
                padding: `${5 * scale}px 0`,
              }}
            >
              {denyText}
            </button>
            <button
              onClick={onAccept}
              className="flex items-center justify-center cursor-pointer transition-all active:scale-95"
              style={{
                width: `${99.5 * scale}px`,
                height: `${25 * scale}px`,
                borderRadius: `${20 * scale}px`,
                backgroundColor: hexToRgba(acceptColor, 0.2),
                color: acceptColor,
                fontSize: `${10 * scale}px`,
                fontWeight: 500,
                padding: `${5 * scale}px 0`,
              }}
            >
              {acceptText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

TextNotification.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  denyText: PropTypes.string,
  acceptText: PropTypes.string,
  acceptColor: PropTypes.string,
  onDeny: PropTypes.func,
  onAccept: PropTypes.func,
  scale: PropTypes.number,
};
