import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/shared/utils/cn.js';

// UI Components
import PageHeader from '@/shared/components/ui/PageHeader.jsx';
import ExpandableAssetCard from '@/shared/components/cards/ExpandableAssetCard.jsx';

// Mock Data

const MOCK_GARAGES = [
  {
    id: 'garage-1',
    title: 'Vinewood Garage',
    badgeText: '10 Slots',
    subtitle: 'Eclipse Blvd, West Vinewood',
    icon: 'fi-sr-warehouse',
    actionIcon: 'fi-rs-marker',
    menuData: [
      {
        id: 'root',
        title: 'Vehicles',
        items: [
          {
            id: 'v1',
            title: 'Elegy RH8',
            type: 'nav',
            rightIcon: 'fi-ss-angle-small-right',
            targetMenuId: 'elegy-options',
          },
          {
            id: 'v2',
            title: 'Zentorno',
            type: 'nav',
            rightIcon: 'fi-ss-angle-small-right',
            targetMenuId: 'zentorno-options',
          },
          { id: 'v3', title: 'Bati 801', type: 'text', rightText: 'Impounded' },
        ],
      },

      {
        id: 'elegy-options',
        title: 'Elegy RH8',
        items: [
          {
            id: 'opt1',
            title: 'Take Out Vehicle',
            type: 'icon',
            rightIcon: 'fi-sr-car-side',
            action: 'spawn_elegy',
          },
          {
            id: 'opt2',
            title: 'Transfer to...',
            type: 'icon',
            rightIcon: 'fi-sr-exchange',
            action: 'transfer_elegy',
          },
        ],
      },

      {
        id: 'zentorno-options',
        title: 'Zentorno',
        items: [
          {
            id: 'opt3',
            title: 'Track on Map',
            type: 'icon',
            rightIcon: 'fi-rs-marker',
            action: 'track_zentorno',
          },
          {
            id: 'opt4',
            title: 'Request Return',
            type: 'icon',
            rightIcon: 'fi-sr-undo',
            action: 'return_zentorno',
          },
        ],
      },
    ],
  },
  {
    id: 'garage-2',
    title: 'Pillbox Hill Garage',
    badgeText: '2 Slots',
    subtitle: 'Peaceful St, Pillbox Hill',
    icon: 'fi-sr-warehouse',
    actionIcon: 'fi-rs-marker',
    menuData: [
      {
        id: 'root',
        title: 'Vehicles',
        items: [
          {
            id: 'v4',
            title: 'Sultan RS',
            type: 'nav',
            rightIcon: 'fi-ss-angle-small-right',
            targetMenuId: 'sultan-options',
          },
          { id: 'v5', title: 'Sanchez', type: 'text', rightText: 'Stored' },
        ],
      },
      {
        id: 'sultan-options',
        title: 'Sultan RS',
        items: [
          {
            id: 'opt5',
            title: 'Take Out Vehicle',
            type: 'icon',
            rightIcon: 'fi-sr-car-side',
            action: 'spawn_sultan',
          },
        ],
      },
    ],
  },
  {
    id: 'garage-3',
    title: 'Sandy Shores Hangar',
    badgeText: 'Aircraft',
    subtitle: 'Senora Way, Grand Senora Desert',
    icon: 'fi-sr-plane-alt',
    actionIcon: 'fi-rs-marker',
    menuData: [
      {
        id: 'root',
        title: 'Aircrafts',
        items: [
          {
            id: 'v6',
            title: 'Frogger',
            type: 'nav',
            rightText: 'Stored',
            targetMenuId: 'frogger-options',
          },
        ],
      },
      {
        id: 'frogger-options',
        title: 'Frogger',
        items: [
          {
            id: 'opt6',
            title: 'Request Flight',
            type: 'icon',
            rightIcon: 'fi-sr-plane',
            action: 'spawn_frogger',
          },
        ],
      },
    ],
  },
];

// Main Component
export default function GaragesPage({ scale = 1, onClose }) {
  const handleLocationClick = useCallback((garageId) => {
    console.log(`Setting waypoint to garage: ${garageId}`);
  }, []);

  const handleVehicleAction = useCallback((action, garageId) => {
    console.log(`Action: ${action} triggered in garage: ${garageId}`);
  }, []);

  return (
    <div
      className={cn(
        'flex flex-col items-center w-full h-full bg-app overflow-hidden relative'
      )}
    >
      <div
        className="flex flex-col relative h-full w-full"
        style={{ width: `${265 * scale}px` }}
      >
        {/* Header Section */}
        <div
          className="shrink-0 w-full relative z-20 transition-all"
          style={{
            paddingTop: `${20 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
            paddingBottom: `${10 * scale}px`,
          }}
        >
          <div className="relative z-30 pointer-events-auto">
            <PageHeader
              scale={scale}
              onLeftClick={onClose}
              showRightButton={false}
            />
          </div>

          <div
            className="absolute flex items-center pointer-events-none z-10"
            style={{
              top: `${20 * scale}px`,
              left: `${(10 + 25 + 8) * scale}px`,
              height: `${25 * scale}px`,
            }}
          >
            <span
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: `${16 * scale}px`,
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#FFFFFF',
              }}
            >
              Garages
            </span>
          </div>
        </div>

        {/* Main Content Section */}
        <div
          className="flex-1 w-full flex flex-col relative z-0 overflow-y-auto hide-scrollbar"
          style={{
            paddingBottom: `${20 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
            gap: `${10 * scale}px`,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {MOCK_GARAGES.map((garage) => (
            <ExpandableAssetCard
              key={garage.id}
              variant="combo"
              scale={scale}
              title={garage.title}
              badgeText={garage.badgeText}
              subtitle={garage.subtitle}
              icon={garage.icon}
              actionIcon={garage.actionIcon}
              menuData={garage.menuData}
              onActionClick={() => handleLocationClick(garage.id)}
              onItemAction={(action) => handleVehicleAction(action, garage.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// PropTypes

GaragesPage.propTypes = {
  scale: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};
