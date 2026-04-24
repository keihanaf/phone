import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@/shared/components/ui/PageHeader.jsx';
import RadioButton from '@/shared/components/elements/RadioButton.jsx';
import NumberStepper from '@/shared/components/elements/NumberStepper.jsx';

export default function ApplicationSettingPage({ scale = 1, onBack, appName }) {
  const [isPopupEnabled, setIsPopupEnabled] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [stepperValue, setStepperValue] = useState(50);

  return (
    <div className="flex flex-col items-center w-full h-full bg-app overflow-hidden relative">
      <div
        className="flex flex-col relative h-full w-full"
        style={{ width: `${265 * scale}px` }}
      >
        <div
          className="shrink-0 w-full relative z-20 transition-all"
          style={{
            paddingTop: `${20 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
            paddingBottom: `${10 * scale}px`,
          }}
        >
          <PageHeader
            scale={scale}
            onLeftClick={onBack}
            showRightButton={false}
            title={`${appName} Settings`}
          />
        </div>

        <div
          className="flex-1 overflow-y-auto scrollbar-hide z-0"
          style={{
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
            paddingBottom: `${20 * scale}px`,
            display: 'flex',
            flexDirection: 'column',
            gap: `${15 * scale}px`,
          }}
        >
          <div
            className="flex flex-col w-full"
            style={{ gap: `${5 * scale}px` }}
          >
            <div
              className="flex flex-col w-full overflow-hidden"
              style={{
                background: 'var(--color-info)',
                borderRadius: `${10 * scale}px`,
              }}
            >
              <div
                className="flex items-center justify-between w-full transition-colors"
                style={{
                  height: `${35 * scale}px`,
                  padding: `${10 * scale}px`,
                  borderBottom: `${1 * scale}px solid var(--color-border)`,
                }}
              >
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: `${8 * scale}px`,
                    lineHeight: '100%',
                    color: '#FFFFFF',
                  }}
                >
                  Notifications Popup
                </span>
                <RadioButton
                  isOn={isPopupEnabled}
                  onToggle={() => setIsPopupEnabled(!isPopupEnabled)}
                  scale={scale}
                />
              </div>

              <div
                className="flex items-center justify-between w-full transition-colors"
                style={{
                  height: `${35 * scale}px`,
                  padding: `${10 * scale}px`,
                  borderBottom: `${1 * scale}px solid var(--color-border)`,
                }}
              >
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: `${8 * scale}px`,
                    lineHeight: '100%',
                    color: '#FFFFFF',
                  }}
                >
                  Notifications Sound
                </span>
                <RadioButton
                  isOn={isSoundEnabled}
                  onToggle={() => setIsSoundEnabled(!isSoundEnabled)}
                  scale={scale}
                />
              </div>

              <div
                className="flex items-center justify-between w-full transition-colors"
                style={{
                  height: `${35 * scale}px`,
                  padding: `${10 * scale}px`,
                }}
              >
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: `${8 * scale}px`,
                    lineHeight: '100%',
                    color: '#FFFFFF',
                  }}
                >
                  Another Setting
                </span>
                <NumberStepper
                  value={stepperValue}
                  min={0}
                  max={100}
                  step={10}
                  onChange={setStepperValue}
                  scale={scale}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ApplicationSettingPage.propTypes = {
  scale: PropTypes.number,
  onBack: PropTypes.func.isRequired,
  appName: PropTypes.string.isRequired,
};
