import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@/shared/components/ui/PageHeader.jsx';
import CustomTextArea from '@/features/Setting/components/CustomTextArea.jsx';
import { cn } from '@/shared/utils/cn.js';

export default function RingtonePage({ scale = 1, onBack }) {
  const [activeRingtoneId, setActiveRingtoneId] = useState('default');

  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [savedCustomUrl, setSavedCustomUrl] = useState('');

  const ringtonesList = [
    { id: 'default', name: 'Default' },
    { id: 'ring_1', name: 'Ring 1' },
    { id: 'ring_2', name: 'Ring 2' },
    { id: 'ring_3', name: 'Ring 3' },
  ];

  const handleAddSubmit = () => {
    if (customUrl.trim() !== '') {
      setSavedCustomUrl(customUrl);
    }
    setIsAddingCustom(false);
  };

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
            title="Ringtone"
          />
        </div>

        <div
          className="flex-1 overflow-y-auto scrollbar-hide z-0"
          style={{
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
            paddingBottom: isAddingCustom
              ? `${110 * scale}px`
              : `${20 * scale}px`,
            display: 'flex',
            flexDirection: 'column',
            gap: `${10 * scale}px`,
            transition: 'padding 0.3s ease-in-out',
          }}
          onClick={() => isAddingCustom && setIsAddingCustom(false)}
        >
          <div
            className="flex flex-row items-center justify-between shrink-0 w-full box-border"
            style={{
              height: `${30 * scale}px`,
              gap: `${5 * scale}px`,
              padding: `${10 * scale}px`,
              backgroundColor: 'var(--color-info)',
              borderRadius: `${10 * scale}px`,
            }}
          >
            <span
              className="shrink-0"
              style={{
                fontWeight: 500,
                fontSize: `${8 * scale}px`,
                lineHeight: '100%',
                color: '#FFFFFF',
              }}
            >
              Custom Ringtone
            </span>

            <button
              type="button"
              className="flex items-center justify-end cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none p-0 m-0"
              style={{
                fontWeight: 400,
                fontSize: `${8 * scale}px`,
                lineHeight: '100%',
                color: '#315DFF',
                maxWidth: `${120 * scale}px`,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsAddingCustom(true);
              }}
              title={savedCustomUrl || 'Add'}
            >
              {savedCustomUrl ? savedCustomUrl : 'Add'}
            </button>
          </div>

          <div
            className="flex flex-col w-full box-border overflow-hidden"
            style={{ borderRadius: `${10 * scale}px` }}
          >
            {ringtonesList.map((ringtone, index) => {
              const isActive = activeRingtoneId === ringtone.id;
              const isLastItem = index === ringtonesList.length - 1;

              return (
                <div
                  key={ringtone.id}
                  className="flex flex-row items-center justify-between shrink-0 w-full box-border cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => setActiveRingtoneId(ringtone.id)}
                  style={{
                    height: `${30 * scale}px`,
                    gap: `${5 * scale}px`,
                    padding: `${10 * scale}px`,
                    backgroundColor: 'var(--color-info)',
                    borderBottom: isLastItem
                      ? 'none'
                      : `${1 * scale}px solid var(--color-border)`,
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
                    {ringtone.name}
                  </span>

                  {isActive && (
                    <div
                      style={{
                        width: `${5 * scale}px`,
                        height: `${5 * scale}px`,
                        backgroundColor: '#315DFF',
                        borderRadius: '50%',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={cn(
            'absolute left-0 w-full z-30 flex justify-center transition-all duration-300 ease-in-out',
            isAddingCustom
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : 'translate-y-full opacity-0 pointer-events-none'
          )}
          style={{
            bottom: `${20 * scale}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <CustomTextArea
            scale={scale}
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            onSubmit={handleAddSubmit}
            placeholder="URL"
          />
        </div>
      </div>
    </div>
  );
}

RingtonePage.propTypes = {
  scale: PropTypes.number,
  onBack: PropTypes.func.isRequired,
};
