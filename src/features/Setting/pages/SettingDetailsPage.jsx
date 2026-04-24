import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@/shared/components/ui/PageHeader.jsx';
import Button from '@/shared/components/elements/Button.jsx';

export default function SettingDetailsPage({ scale = 1, onBack }) {
  const [isCopied, setIsCopied] = useState(false);

  const personalInfo = {
    stateId: '456569',
    phoneNumber: '912 566 3556',
  };

  const licensesData = [
    { id: 1, name: 'Driving', status: 'VALID' },
    { id: 2, name: 'Weapon', status: 'INVALID' },
    { id: 3, name: 'Flying', status: 'EXPIRED' },
    { id: 4, name: 'Hunting', status: 'VALID' },
  ];

  const handleCopyPhoneNumber = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.phoneNumber);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getBadgeStyles = (status) => {
    switch (status) {
      case 'VALID':
        return {
          bg: '#315DFF4D',
          color: '#315DFF',
          shadow: 'none',
        };
      case 'INVALID':
        return {
          bg: '#FF383C4D',
          color: '#FF383C',
          shadow: '0px 4px 4px 0px #00000040',
        };
      case 'EXPIRED':
        return {
          bg: '#FFCC004D',
          color: '#FFCC00',
          shadow: 'none',
        };
      default:
        return { bg: 'transparent', color: '#FFFFFF', shadow: 'none' };
    }
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
            title="Details"
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
            <span
              style={{
                fontWeight: 500,
                fontSize: `${8 * scale}px`,
                lineHeight: `${12 * scale}px`,
                color: 'var(--color-muted)',
                paddingLeft: `${2 * scale}px`,
              }}
            >
              Personal Info
            </span>

            <div
              className="flex flex-col w-full overflow-hidden"
              style={{
                background: 'var(--color-info)',
                borderRadius: `${10 * scale}px`,
              }}
            >
              <div
                className="flex items-center justify-between w-full"
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
                  State ID
                </span>
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: `${8 * scale}px`,
                    lineHeight: '100%',
                    color: 'var(--color-muted)',
                  }}
                >
                  {personalInfo.stateId}
                </span>
              </div>

              <div
                className="flex items-center justify-between w-full"
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
                  Phone Number
                </span>

                <div
                  className="flex items-center"
                  style={{ gap: `${5 * scale}px` }}
                >
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: `${8 * scale}px`,
                      lineHeight: '100%',
                      color: 'var(--color-muted)',
                    }}
                  >
                    {personalInfo.phoneNumber}
                  </span>

                  <Button
                    variant="iconButton"
                    icon={
                      isCopied ? 'fi fi-ss-check-circle' : 'fi fi-ss-duplicate'
                    }
                    onClick={handleCopyPhoneNumber}
                    iconStyle={{
                      fontSize: `${8 * scale}px`,
                      color: '#315DFF',
                    }}
                    style={{
                      width: `${15 * scale}px`,
                      height: `${15 * scale}px`,
                      borderRadius: `${5 * scale}px`,
                      background: '#315DFF4D',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col w-full"
            style={{ gap: `${5 * scale}px` }}
          >
            <span
              style={{
                fontWeight: 500,
                fontSize: `${8 * scale}px`,
                lineHeight: `${12 * scale}px`,
                color: 'var(--color-muted)',
                paddingLeft: `${2 * scale}px`,
              }}
            >
              Licenses
            </span>

            <div
              className="flex flex-col w-full overflow-hidden"
              style={{
                background: 'var(--color-info)',
                borderRadius: `${10 * scale}px`,
              }}
            >
              {licensesData.map((license, index) => {
                const badgeStyle = getBadgeStyles(license.status);
                const isLastItem = index === licensesData.length - 1;

                return (
                  <div
                    key={license.id}
                    className="flex items-center justify-between w-full"
                    style={{
                      height: `${35 * scale}px`,
                      padding: `${10 * scale}px`,
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
                      {license.name}
                    </span>

                    <div
                      className="flex items-center justify-center"
                      style={{
                        height: `${10 * scale}px`,
                        background: badgeStyle.bg,
                        borderRadius: `${3 * scale}px`,
                        padding: `${1 * scale}px ${3 * scale}px`,
                        boxShadow: badgeStyle.shadow,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 400,
                          fontSize: `${6 * scale}px`,
                          lineHeight: '100%',
                          color: badgeStyle.color,
                        }}
                      >
                        {license.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SettingDetailsPage.propTypes = {
  scale: PropTypes.number,
  onBack: PropTypes.func.isRequired,
};
