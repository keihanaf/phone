import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/shared/components/elements/Button.jsx';

export default function CustomTextArea({
  scale = 1,
  value,
  onChange,
  onSubmit,
  placeholder = 'URL',
}) {
  return (
    <div
      className="flex items-center justify-center box-border relative"
      style={{
        width: `${260 * scale}px`,
        height: `${91 * scale}px`,
        padding: `${10 * scale}px`,
        borderRadius: `${25 * scale}px`,
        backgroundColor: '#313238A6',
        border: `${1 * scale}px solid var(--color-border)`,
        backdropFilter: 'blur(10px)',
        boxShadow: '0px 4px 10px 0px #00000040',
        margin: '0 auto',
      }}
    >
      <div
        className="flex flex-col relative w-full h-full box-border"
        style={{
          width: `${240 * scale}px`,
          height: `${71 * scale}px`,
          borderRadius: `${15 * scale}px`,
          backgroundColor: 'var(--color-info)',
          padding: `${8 * scale}px`,
        }}
      >
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none resize-none scrollbar-hide"
          style={{
            flex: 1,
            fontWeight: 400,
            fontSize: `${8 * scale}px`,
            lineHeight: `${12 * scale}px`,
            color: '#FFFFFF',
            padding: 0,
            margin: 0,
            paddingBottom: `${24 * scale}px`,
          }}
        />

        <style>{`
          textarea::placeholder {
            color: var(--color-muted);
            opacity: 1;
          }
        `}</style>

        <div
          className="absolute flex justify-end"
          style={{
            bottom: `${8 * scale}px`,
            right: `${8 * scale}px`,
          }}
        >
          <Button
            variant="iconButton"
            icon="fi fi-rs-check"
            onClick={onSubmit}
            style={{
              width: `${20 * scale}px`,
              height: `${20 * scale}px`,
              borderRadius: `${8 * scale}px`,
              backgroundColor: '#315DFF',
              padding: 0,
            }}
            iconStyle={{
              fontSize: `${10 * scale}px`,
              color: '#FFFFFF',
            }}
          />
        </div>
      </div>
    </div>
  );
}

CustomTextArea.propTypes = {
  scale: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
};
