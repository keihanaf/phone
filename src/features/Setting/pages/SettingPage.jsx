import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@/shared/components/ui/PageHeader.jsx';
import RadioButton from '@/shared/components/elements/RadioButton.jsx';
import Button from '@/shared/components/elements/Button.jsx';
import NumberStepper from '@/shared/components/elements/NumberStepper.jsx';
import CardDetail from '@/features/Setting/components/CardDetail.jsx';
import SettingDetailsPage from '@/features/Setting/pages/SettingDetailsPage.jsx';
import RingtonePage from '@/features/Setting/pages/RingtonePage.jsx';
import ApplicationSettingPage from '@/features/Setting/pages/ApplicationSettingPage.jsx';
import WallpaperPage from '@/features/Setting/pages/WallpaperPage.jsx';

const mockApplications = [
  {
    id: 'app-1',
    name: 'Camera',
    iconUrl:
      'https://ui-avatars.com/api/?name=C&background=1E1E24&color=fff&size=60',
  },
  {
    id: 'app-2',
    name: 'Messages',
    iconUrl:
      'https://ui-avatars.com/api/?name=M&background=315DFF&color=fff&size=60',
  },
  {
    id: 'app-3',
    name: 'Bank',
    iconUrl:
      'https://ui-avatars.com/api/?name=B&background=28A745&color=fff&size=60',
  },
  {
    id: 'app-4',
    name: 'Maps',
    iconUrl:
      'https://ui-avatars.com/api/?name=Ma&background=FFC107&color=fff&size=60',
  },
];

export default function SettingPage({ scale = 1, onClose }) {
  const [activeView, setActiveView] = useState('main');
  const [selectedApp, setSelectedApp] = useState(null);

  const [isStreamerMode, setIsStreamerMode] = useState(false);
  const [isAirplaneMode, setIsAirplaneMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [zoomLevel, setZoomLevel] = useState(100);
  const [volumeLevel, setVolumeLevel] = useState(100);

  const [isContactDetailOpen, setIsContactDetailOpen] = useState(false);

  const myProfile = {
    id: 'me',
    name: 'Eddie Marshall',
    phone: '912 566 3159',
    avatar: 'https://i.pravatar.cc/150?u=eddie',
  };

  if (activeView === 'details') {
    return (
      <SettingDetailsPage scale={scale} onBack={() => setActiveView('main')} />
    );
  }

  if (activeView === 'ringtone') {
    return <RingtonePage scale={scale} onBack={() => setActiveView('main')} />;
  }

  if (activeView === 'wallpaper') {
    return <WallpaperPage scale={scale} onBack={() => setActiveView('main')} />;
  }

  if (activeView === 'app-settings' && selectedApp) {
    return (
      <ApplicationSettingPage
        scale={scale}
        appName={selectedApp.name}
        onBack={() => {
          setActiveView('main');
          setSelectedApp(null);
        }}
      />
    );
  }

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
            onLeftClick={onClose}
            showRightButton={false}
            title="Settings"
          />
        </div>

        <div
          className={`flex-1 overflow-y-auto scrollbar-hide z-0 ${
            isContactDetailOpen ? 'overflow-hidden' : ''
          }`}
          style={{
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
            paddingBottom: `${20 * scale}px`,
            display: 'flex',
            flexDirection: 'column',
            gap: `${15 * scale}px`,
          }}
        >
          {/* Account Section */}
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
              Account
            </span>
            <div
              className="flex flex-col w-full overflow-hidden"
              style={{
                background: 'var(--color-info)',
                borderRadius: `${10 * scale}px`,
              }}
            >
              <div
                className="flex items-center w-full"
                style={{
                  height: `${50 * scale}px`,
                  padding: `${10 * scale}px`,
                  gap: `${10 * scale}px`,
                  borderBottom: `${1 * scale}px solid var(--color-border)`,
                }}
              >
                <div
                  className="shrink-0 bg-gray-700 bg-cover bg-center"
                  style={{
                    width: `${30 * scale}px`,
                    height: `${30 * scale}px`,
                    borderRadius: `${5 * scale}px`,
                    backgroundImage: `url('${myProfile.avatar}')`,
                  }}
                />

                <div className="flex flex-col flex-1 justify-center">
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: `${10 * scale}px`,
                      lineHeight: '100%',
                      color: '#FFFFFF',
                      marginBottom: `${3 * scale}px`,
                    }}
                  >
                    {myProfile.name}
                  </span>
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: `${6 * scale}px`,
                      lineHeight: '100%',
                      color: 'var(--color-muted)',
                    }}
                  >
                    {myProfile.phone}
                  </span>
                </div>

                <div
                  className="flex items-center shrink-0"
                  style={{ gap: `${5 * scale}px` }}
                >
                  <Button
                    variant="iconButton"
                    icon="fi-ss-pencil"
                    iconSize={`${8 * scale}px`}
                    iconColor="var(--color-muted)"
                    onClick={() => setIsContactDetailOpen(true)}
                    style={{
                      width: `${15 * scale}px`,
                      height: `${15 * scale}px`,
                      borderRadius: `${5 * scale}px`,
                      background: 'var(--color-bar)',
                    }}
                    aria-label="Edit Contact"
                  />

                  <Button
                    variant="iconButton"
                    icon="fi-ss-share"
                    iconSize={`${8 * scale}px`}
                    iconColor="#315DFF"
                    style={{
                      width: `${15 * scale}px`,
                      height: `${15 * scale}px`,
                      borderRadius: `${5 * scale}px`,
                      background: '#315DFF4D',
                    }}
                    aria-label="Share Contact"
                  />
                </div>
              </div>

              <div
                onClick={() => setActiveView('details')}
                className="flex items-center w-full cursor-pointer hover:bg-white/5 transition-colors"
                style={{
                  height: `${30 * scale}px`,
                  padding: `${10 * scale}px`,
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: `${8 * scale}px`,
                      lineHeight: '100%',
                      color: '#FFFFFF',
                    }}
                  >
                    Details
                  </span>
                  <Button
                    variant="ghost"
                    icon="fi-rs-angle-small-right"
                    iconSize={`${10 * scale}px`}
                    iconColor="var(--color-muted)"
                    className="pointer-events-none p-0!"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Global Section */}
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
              Global
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
                  Streamer Mode
                </span>
                <RadioButton
                  isOn={isStreamerMode}
                  onToggle={() => setIsStreamerMode(!isStreamerMode)}
                  scale={scale}
                />
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
                  Airplane Mode
                </span>
                <RadioButton
                  isOn={isAirplaneMode}
                  onToggle={() => setIsAirplaneMode(!isAirplaneMode)}
                  scale={scale}
                />
              </div>
            </div>
          </div>

          {/* Visuals Section */}
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
              Visuals
            </span>
            <div
              className="flex flex-col w-full overflow-hidden"
              style={{
                background: 'var(--color-info)',
                borderRadius: `${10 * scale}px`,
              }}
            >
              <div
                className="flex items-center justify-between w-full cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setActiveView('wallpaper')}
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
                  Wallpaper
                </span>
                <Button
                  variant="ghost"
                  icon="fi-rs-angle-small-right"
                  iconSize={`${10 * scale}px`}
                  iconColor="var(--color-muted)"
                  className="pointer-events-none p-0!"
                  aria-hidden="true"
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
                  Zoom
                </span>
                <NumberStepper
                  value={zoomLevel}
                  min={0}
                  max={100}
                  step={10}
                  onChange={setZoomLevel}
                  scale={scale}
                />
              </div>
            </div>
          </div>

          {/* Sounds Section */}
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
              Sounds
            </span>
            <div
              className="flex flex-col w-full overflow-hidden"
              style={{
                background: 'var(--color-info)',
                borderRadius: `${10 * scale}px`,
              }}
            >
              <div
                className="flex items-center justify-between w-full cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setActiveView('ringtone')}
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
                  Ringtone
                </span>
                <Button
                  variant="ghost"
                  icon="fi-rs-angle-small-right"
                  iconSize={`${10 * scale}px`}
                  iconColor="var(--color-muted)"
                  className="pointer-events-none p-0!"
                  aria-hidden="true"
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
                  Mute
                </span>
                <RadioButton
                  isOn={isMuted}
                  onToggle={() => setIsMuted(!isMuted)}
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
                  Volume
                </span>
                <NumberStepper
                  value={volumeLevel}
                  min={0}
                  max={100}
                  step={10}
                  onChange={setVolumeLevel}
                  scale={scale}
                />
              </div>
            </div>
          </div>

          {/* Applications Section */}
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
              Applications
            </span>
            <div
              className="flex flex-col w-full overflow-hidden"
              style={{
                background: 'var(--color-info)',
                borderRadius: `${10 * scale}px`,
              }}
            >
              {mockApplications.map((app, index) => (
                <div
                  key={app.id}
                  onClick={() => {
                    setSelectedApp(app);
                    setActiveView('app-settings');
                  }}
                  className="flex items-center justify-between w-full cursor-pointer hover:bg-white/5 transition-colors"
                  style={{
                    height: `${35 * scale}px`,
                    padding: `${10 * scale}px`,
                    borderBottom:
                      index !== mockApplications.length - 1
                        ? `${1 * scale}px solid var(--color-border)`
                        : 'none',
                  }}
                >
                  <div
                    className="flex items-center"
                    style={{ gap: `${5 * scale}px` }}
                  >
                    <img
                      src={app.iconUrl}
                      alt={app.name}
                      style={{
                        width: `${15 * scale}px`,
                        height: `${15 * scale}px`,
                        borderRadius: `${3 * scale}px`,
                        objectFit: 'cover',
                        opacity: 1,
                      }}
                    />
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: `${8 * scale}px`,
                        lineHeight: '100%',
                        color: '#FFFFFF',
                      }}
                    >
                      {app.name}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    icon="fi-rs-angle-small-right"
                    iconSize={`${10 * scale}px`}
                    iconColor="var(--color-muted)"
                    className="pointer-events-none p-0!"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <CardDetail
          isOpen={isContactDetailOpen}
          onClose={() => setIsContactDetailOpen(false)}
          contact={myProfile}
          scale={scale}
        />
      </div>
    </div>
  );
}

SettingPage.propTypes = {
  scale: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};
