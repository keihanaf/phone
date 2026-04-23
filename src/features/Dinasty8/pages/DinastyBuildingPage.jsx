import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

// UI Components
import ExpandableAssetCard from '@/shared/components/cards/ExpandableAssetCard.jsx';

const officeMenuData = [
  {
    id: 'root',
    title: 'Office Options',
    items: [
      {
        title: 'Location',
        type: 'icon',
        rightIcon: 'fi-rs-marker',
        rightIconColor: '#FFFFFF80',
      },
      {
        title: 'Lock State',
        type: 'icon',
        rightIcon: 'fi-rs-lock',
        rightIconColor: '#FF383C',
      },
      {
        title: 'Manage Employees',
        type: 'nav',
        rightIcon: 'fi-ss-angle-small-right',
        targetMenuId: 'manageEmployees',
      },
      {
        title: 'Manage Bills',
        type: 'nav',
        rightIcon: 'fi-ss-angle-small-right',
        targetMenuId: 'manageBills',
      },
      { title: 'Office Tax', type: 'badge-paid' },
    ],
  },
  {
    id: 'manageBills',
    title: 'Manage Bills',
    items: [
      { title: 'Maintenance', type: 'badge-not-paid' },
      { title: 'Electricity', type: 'badge-paid' },
      { title: 'Internet', type: 'badge-paid' },
    ],
  },
  {
    id: 'manageEmployees',
    title: 'Manage Employees',
    items: [
      {
        title: 'Alice Smith',
        type: 'icon',
        rightIcon: 'fi-rs-cross-small',
        rightIconColor: '#FF383C',
      },
      {
        title: 'Bob Johnson',
        type: 'icon',
        rightIcon: 'fi-rs-cross-small',
        rightIconColor: '#FF383C',
      },
      {
        title: 'Add New',
        type: 'icon',
        rightIcon: 'fi-rs-plus-small',
        rightIconColor: '#315DFF',
        action: 'addNewEmployee',
      },
    ],
  },
];

const apartmentMenuData = [
  {
    id: 'root',
    title: 'Apartment Complex Options',
    items: [
      {
        title: 'Location',
        type: 'icon',
        rightIcon: 'fi-rs-marker',
        rightIconColor: '#FFFFFF80',
      },
      { title: 'Security Status', type: 'text', rightText: 'Active' },
      { title: 'Occupancy Rate', type: 'text', rightText: '95%' },
      { title: 'Property Tax', type: 'badge-paid' },
    ],
  },
];

// --- Main Page Component ---

export default function DinastyBuildingPage({ scale = 1, onItemAction }) {
  const handleMarkerSet = useCallback((propertyName) => {
    console.log(`Marker set for ${propertyName}`);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-start w-full h-full"
      style={{
        paddingTop: `${5 * scale}px`,
        paddingLeft: `${10 * scale}px`,
        paddingRight: `${10 * scale}px`,
        gap: `${10 * scale}px`,
      }}
    >
      {/* === My Buildings (Expandable Variants) === */}
      <div
        className="flex flex-col items-center justify-start w-full"
        style={{ gap: `${10 * scale}px` }}
      >
        <ExpandableAssetCard
          variant="expandable"
          scale={scale}
          title="Arcadius Business Center"
          badgeText="Office 12"
          icon="fi-ss-building"
          subtitle="Pillbox Hill, Los Santos"
          menuData={officeMenuData}
          onItemAction={onItemAction}
        />

        <ExpandableAssetCard
          variant="expandable"
          scale={scale}
          title="Richman Mansion"
          badgeText=""
          icon="fi-ss-building"
          subtitle="Richman, Los Santos"
          menuData={apartmentMenuData}
          onItemAction={onItemAction}
        />
      </div>

      {/* === Shared Offices Section (Static Variants) === */}
      <div
        className="flex flex-col justify-start w-full"
        style={{
          gap: `${10 * scale}px`,
          marginTop: `${5 * scale}px`,
        }}
      >
        <span
          style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 500,
            fontSize: `${8 * scale}px`,
            lineHeight: `${12 * scale}px`,
            letterSpacing: '0px',
            color: '#FFFFFF80',
            textAlign: 'left',
            width: '100%',
          }}
        >
          Shared Workspaces
        </span>

        <ExpandableAssetCard
          variant="static"
          scale={scale}
          title="Maze Bank Tower"
          badgeText="Floor 45"
          icon="fi-ss-building"
          subtitle="Pillbox Hill, Los Santos"
          actionIcon="fi-rs-marker"
          onActionClick={() => handleMarkerSet('Maze Bank Tower')}
        />

        <ExpandableAssetCard
          variant="static"
          scale={scale}
          title="Lombank West"
          badgeText="Suite 3"
          icon="fi-ss-building"
          subtitle="Del Perro, Los Santos"
          actionIcon="fi-rs-marker"
          onActionClick={() => handleMarkerSet('Lombank West')}
        />
      </div>
    </div>
  );
}

DinastyBuildingPage.propTypes = {
  scale: PropTypes.number,
  onBack: PropTypes.func,
  onItemAction: PropTypes.func,
};
