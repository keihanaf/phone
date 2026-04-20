import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@/shared/components/ui/PageHeader.jsx';
import ApplicationItem from '@/features/FruitMarket/components/ApplicationItem.jsx';

// Mock Data
const mockApplications = [
  {
    id: 1,
    name: 'Telegram',
    description: 'Messaging app',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
  },
  {
    id: 2,
    name: 'WhatsApp',
    description: 'Chat & calls',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
  },
  {
    id: 3,
    name: 'Instagram',
    description: 'Social media',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
  },
  {
    id: 4,
    name: 'Spotify',
    description: 'Music streaming',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
  },
  {
    id: 5,
    name: 'Netflix',
    description: 'Video streaming',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
  {
    id: 6,
    name: 'Netflix',
    description: 'Video streaming',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
  {
    id: 7,
    name: 'Netflix',
    description: 'Video streaming',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
  {
    id: 8,
    name: 'Netflix',
    description: 'Video streaming',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
  {
    id: 9,
    name: 'Netflix',
    description: 'Video streaming',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
  {
    id: 10,
    name: 'Netflix',
    description: 'Video streaming',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
  {
    id: 11,
    name: 'Netflix',
    description: 'Video streaming',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
];

export default function FruitMarketPage({ scale = 1, onClose }) {
  const handleAppClick = (app) => {
    console.log('App clicked:', app);
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
            onLeftClick={onClose}
            showRightButton={false}
            title={
              <span style={{ fontSize: `${12 * scale}px`, lineHeight: '100%' }}>
                <span className="font-light text-white">Fruit</span>
                <span className="font-bold text-white">Market</span>
              </span>
            }
          />
        </div>

        <div
          className="flex-1 overflow-y-auto scrollbar-hide  "
          style={{
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
          }}
        >
          <div
            className="flex flex-col"
            style={{
              gap: `${10 * scale}px`,
            }}
          >
            {mockApplications.map((app, index) => (
              <ApplicationItem
                key={app.id}
                app={app}
                type={index % 2 === 0 ? 'download' : 'remove'}
                scale={scale}
                isFirst={index === 0}
                isLast={index === mockApplications.length - 1}
                onClick={handleAppClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

FruitMarketPage.propTypes = {
  scale: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};
