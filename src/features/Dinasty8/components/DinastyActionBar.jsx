import React from 'react';
import PropTypes from 'prop-types';

export default function DinastyActionBar({
  scale = 1,
  activeTab,
  onTabChange,
  isAddingMode = false,
  inputValue = '',
  onInputChange,
  onSubmitAdd,
}) {
  if (isAddingMode) {
    return (
      <div
        className="flex items-center w-full pointer-events-auto"
        style={{
          width: `${260 * scale}px`,
          height: `${35 * scale}px`,
          gap: `${5 * scale}px`,
        }}
      >
        <input
          type="text"
          placeholder="Key Reciver State ID"
          value={inputValue}
          onChange={onInputChange}
          className="flex-1 h-full text-white placeholder:text-muted outline-none transition-all bg-six border-solid border-border shadow-[0_4px_10px_0_rgba(0,0,0,0.25)] backdrop-blur-md"
          style={{
            borderRadius: `${25 * scale}px`,
            borderWidth: `${1 * scale}px`,
            paddingTop: `${5 * scale}px`,
            paddingRight: `${10 * scale}px`,
            paddingBottom: `${5 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            fontSize: `${8 * scale}px`,
            lineHeight: '100%',
          }}
        />

        <button
          onClick={onSubmitAdd}
          type="button"
          aria-label="Submit Add"
          className="flex items-center justify-center shrink-0 transition-colors bg-[#315DFF]/80 hover:bg-[#315DFF] active:scale-95 cursor-pointer border-solid border-border shadow-[0_4px_10px_0_rgba(0,0,0,0.25)] backdrop-blur-md"
          style={{
            width: `${34.66 * scale}px`,
            height: `${34.66 * scale}px`,
            borderRadius: `${20 * scale}px`,
            borderWidth: `${1 * scale}px`,
          }}
        >
          <i
            className="fi fi-rs-paper-plane flex items-center justify-center text-white"
            style={{
              fontSize: `${13 * scale}px`,
            }}
          />
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-between pointer-events-auto transition-all bg-six border-solid border-border shadow-[0_4px_10px_0_rgba(0,0,0,0.25)] backdrop-blur-md"
      style={{
        width: `${260 * scale}px`,
        height: `${35 * scale}px`,
        borderRadius: `${25 * scale}px`,
        borderWidth: `${1 * scale}px`,
        padding: `${3 * scale}px`,
      }}
    >
      <button
        type="button"
        onClick={() => onTabChange && onTabChange('building')}
        className={`flex items-center justify-center transition-all duration-200 cursor-pointer ${
          activeTab === 'building' ? 'bg-info/60' : 'bg-transparent'
        }`}
        style={{
          width: `${127 * scale}px`,
          height: `${29 * scale}px`,
          borderRadius: `${15 * scale}px`,
        }}
      >
        <i
          className={`fi fi-rs-building flex items-center justify-center transition-colors duration-200 ${
            activeTab === 'building' ? 'text-[#315DFF]' : 'text-white'
          }`}
          style={{
            fontSize: `${13 * scale}px`,
          }}
        />
      </button>

      <button
        type="button"
        onClick={() => onTabChange && onTabChange('home')}
        className={`flex items-center justify-center transition-all duration-200 cursor-pointer ${
          activeTab === 'home' ? 'bg-info/60' : 'bg-transparent'
        }`}
        style={{
          width: `${127 * scale}px`,
          height: `${29 * scale}px`,
          borderRadius: `${15 * scale}px`,
        }}
      >
        <i
          className={`fi fi-rs-home flex items-center justify-center transition-colors duration-200 ${
            activeTab === 'home' ? 'text-[#315DFF]' : 'text-white'
          }`}
          style={{
            fontSize: `${13 * scale}px`,
          }}
        />
      </button>
    </div>
  );
}

DinastyActionBar.propTypes = {
  scale: PropTypes.number,
  activeTab: PropTypes.oneOf(['home', 'building']),
  onTabChange: PropTypes.func,
  isAddingMode: PropTypes.bool,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func,
  onSubmitAdd: PropTypes.func,
};
