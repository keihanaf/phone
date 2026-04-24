import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/shared/components/elements/Button.jsx';

export default function NumberStepper({
  value = 100,
  min = 0,
  max = 100,
  step = 10,
  onChange,
  scale = 1,
}) {
  const handleDecrease = (e) => {
    e.stopPropagation();
    if (value > min) {
      onChange(Math.max(min, value - step));
    }
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    if (value < max) {
      onChange(Math.min(max, value + step));
    }
  };

  const isMin = value <= min;
  const isMax = value >= max;

  return (
    <div
      className="flex items-center justify-between"
      style={{
        gap: `${6 * scale}px`,
      }}
    >
      <Button
        variant="iconButton"
        icon="fi fi-rs-minus-small"
        disabled={isMin}
        onClick={handleDecrease}
        iconStyle={{
          fontSize: `${10 * scale}px`,
          color: isMin ? 'var(--color-muted)' : '#FFFFFF',
        }}
        style={{
          width: `${14 * scale}px`,
          height: `${14 * scale}px`,
          borderRadius: `${4 * scale}px`,
          background: '#313238A6',
        }}
      />

      <span
        className="flex items-center justify-center text-center"
        style={{
          fontWeight: 500,
          fontSize: `${8 * scale}px`,
          lineHeight: '100%',
          color: '#FFFFFF',
          width: `${18 * scale}px`,
        }}
      >
        {value}
      </span>

      <Button
        variant="iconButton"
        icon="fi fi-rs-plus-small"
        disabled={isMax}
        onClick={handleIncrease}
        iconStyle={{
          fontSize: `${10 * scale}px`,
          color: isMax ? 'var(--color-muted)' : '#FFFFFF',
        }}
        style={{
          width: `${14 * scale}px`,
          height: `${14 * scale}px`,
          borderRadius: `${4 * scale}px`,
          background: '#313238A6',
        }}
      />
    </div>
  );
}

NumberStepper.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  scale: PropTypes.number,
};
