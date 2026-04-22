import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/shared/utils/cn.js';

// UI Components
import PageHeader from '@/shared/components/ui/PageHeader.jsx';
import DinastyItem from '@/features/Dinasty8/components/DinastyItem.jsx';
import DinastyActionBar from '@/features/Dinasty8/components/DinastyActionBar.jsx';
import DinastyBuildingPage from '@/features/Dinasty8/pages/DinastyBuildingPage.jsx';

// --- Mock Data ---
const houseMenuData = [
  {
    id: 'root',
    title: 'My House Options',
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
        title: 'Manage Garage',
        type: 'nav',
        rightIcon: 'fi-ss-angle-small-right',
        targetMenuId: 'manageGarage',
      },
      {
        title: 'Manage Bills',
        type: 'nav',
        rightIcon: 'fi-ss-angle-small-right',
        targetMenuId: 'manageBills',
      },
      {
        title: 'Manage Keys',
        type: 'nav',
        rightIcon: 'fi-ss-angle-small-right',
        targetMenuId: 'manageKeys',
      },
      { title: 'Rent', type: 'badge-not-paid' },
    ],
  },
  {
    id: 'manageBills',
    title: 'Manage Bills',
    items: [
      { title: 'Water Bill', type: 'badge-paid' },
      { title: 'Electricity Bill', type: 'badge-not-paid' },
      { title: 'Gas Bill', type: 'badge-paid' },
    ],
  },
  {
    id: 'manageKeys',
    title: 'Manage Keys',
    items: [
      {
        title: 'Eddie Marshall',
        type: 'icon',
        rightIcon: 'fi-rs-cross-small',
        rightIconColor: '#FF383C',
      },
      {
        title: 'John Silver',
        type: 'icon',
        rightIcon: 'fi-rs-cross-small',
        rightIconColor: '#FF383C',
      },
      {
        title: 'Add New',
        type: 'icon',
        rightIcon: 'fi-rs-plus-small',
        rightIconColor: '#315DFF',
        action: 'addNewKey',
      },
    ],
  },
  {
    id: 'manageGarage',
    title: 'Manage Garage',
    items: [
      { title: 'Vehicle 1', type: 'text', rightText: 'Banshee' },
      { title: 'Vehicle 2', type: 'text', rightText: 'Elegy Retro' },
      { title: 'Vehicle 3', type: 'text', rightText: 'Sanchez' },
    ],
  },
];

const warehouseMenuData = [
  {
    id: 'root',
    title: 'Warehouse Options',
    items: [
      {
        title: 'Location',
        type: 'icon',
        rightIcon: 'fi-rs-marker',
        rightIconColor: '#FFFFFF80',
      },
      { title: 'Security Status', type: 'text', rightText: 'Active' },
      { title: 'Storage Capacity', type: 'text', rightText: '85%' },
      { title: 'Property Tax', type: 'badge-paid' },
    ],
  },
];

// --- Main Page Component ---

export default function DinastyPage({ scale = 1, onClose }) {
  const [activeTab, setActiveTab] = useState('home');

  const [isAddingMode, setIsAddingMode] = useState(false);
  const [addInputValue, setAddInputValue] = useState('');

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setIsAddingMode(false);
  }, []);

  const handleMarkerSet = useCallback((propertyName) => {
    console.log(`Marker set for ${propertyName}`);
  }, []);

  const handleItemAction = useCallback((action) => {
    if (action === 'addNewKey' || action === 'addNewEmployee') {
      setIsAddingMode(true);
    } else if (action === 'closeInput') {
      setIsAddingMode(false);
      setAddInputValue('');
    }
  }, []);

  const handleSubmitAdd = useCallback(() => {
    if (!addInputValue.trim()) return;

    console.log(`Adding new entry for ID: ${addInputValue}`);
    // -- API Call Logic Here --

    setIsAddingMode(false);
    setAddInputValue('');
  }, [addInputValue]);

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
              Dinasty8
            </span>
          </div>
        </div>

        {/* Main Content Section */}
        <div
          className="flex-1 w-full flex flex-col relative z-0 overflow-y-auto hide-scrollbar"
          style={{
            paddingBottom: `${60 * scale}px`,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {activeTab === 'home' ? (
            <div
              className="flex flex-col items-center justify-start w-full"
              style={{
                paddingTop: `${5 * scale}px`,
                gap: `${10 * scale}px`,
              }}
            >
              {/* === My Properties (Dropdowns) === */}
              <div
                className="flex flex-col items-center justify-start w-full"
                style={{ gap: `${10 * scale}px` }}
              >
                <DinastyItem
                  variant="dropdown"
                  scale={scale}
                  title="My House"
                  subValue="25"
                  mainIcon="fi-ss-home"
                  subtitle="Alta st, Pillbox Hill"
                  menuData={houseMenuData}
                  onItemAction={handleItemAction}
                />

                <DinastyItem
                  variant="dropdown"
                  scale={scale}
                  title="Pillbox Warehouse"
                  subValue=""
                  mainIcon="fi-ss-home"
                  subtitle="Commercial Dist, Los Santos"
                  menuData={warehouseMenuData}
                  onItemAction={handleItemAction}
                />
              </div>

              {/* === Shared Keys Section (Locations) === */}
              <div
                className="flex flex-col justify-start w-full"
                style={{
                  gap: `${5 * scale}px`,
                  marginTop: `${5 * scale}px`,
                  paddingLeft: `${10 * scale}px`,
                  paddingRight: `${10 * scale}px`,
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
                  Shared Keys
                </span>

                <DinastyItem
                  variant="location"
                  scale={scale}
                  title="Eclipse Towers"
                  subValue="Apt 3"
                  mainIcon="fi-ss-home"
                  subtitle="Rockford Hills, Los Santos"
                  onMarkerClick={() => handleMarkerSet('Eclipse Towers')}
                />

                <DinastyItem
                  variant="location"
                  scale={scale}
                  title="Integrity Way"
                  subValue="Apt 28"
                  mainIcon="fi-ss-home"
                  subtitle="Pillbox Hill, Los Santos"
                  onMarkerClick={() => handleMarkerSet('Integrity Way')}
                />
              </div>
            </div>
          ) : (
            <>
              <DinastyBuildingPage
                scale={scale}
                onItemAction={handleItemAction}
              />
            </>
          )}
        </div>

        {/* Bottom Action Bar */}
        <div
          className="absolute bottom-0 left-0 w-full z-10 flex justify-center pointer-events-none transition-all duration-300 ease-in-out"
          style={{
            paddingBottom: `${10 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
          }}
        >
          <div className="flex justify-center pointer-events-auto w-full">
            <DinastyActionBar
              scale={scale}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              isAddingMode={isAddingMode}
              inputValue={addInputValue}
              onInputChange={(e) => setAddInputValue(e.target.value)}
              onSubmitAdd={handleSubmitAdd}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

DinastyPage.propTypes = {
  scale: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};
