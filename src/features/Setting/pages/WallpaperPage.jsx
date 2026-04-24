import React, { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { motion } from 'framer-motion';
import PageHeader from '@/shared/components/ui/PageHeader.jsx';
import CustomTextArea from '@/features/Setting/components/CustomTextArea.jsx';
import { cn } from '@/shared/utils/cn.js';

import wall1 from '@/assets/images/wall1.png';
import wall2 from '@/assets/images/wall2.png';

export default function WallpaperPage({ scale = 1, onBack }) {
  const [activeIndex, setActiveIndex] = useState(1);
  const [currentWallpaperIndex, setCurrentWallpaperIndex] = useState(1);

  // Stateهای مربوط به افزودن والپیپر کاستوم
  const [isAddingWallpaper, setIsAddingWallpaper] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  const itemWidth = 187;
  const gap = 12;
  const shiftAmount = itemWidth + gap;

  const wallpapers = [
    { id: 0, image: wall1 },
    { id: 1, image: wall2 },
    { id: 2, image: wall1 },
    { id: 3, image: wall2 },
    { id: 4, image: wall1 },
    { id: 5, image: wall2 },
  ];

  const handleSetCurrent = () => {
    setCurrentWallpaperIndex(activeIndex);
  };

  const handleAddSubmit = () => {
    if (customUrl.trim() !== '') {
      console.log('Submitted Wallpaper URL:', customUrl);
      // منطق افزودن والپیپر جدید در اینجا
    }
    setIsAddingWallpaper(false);
    setCustomUrl('');
  };

  return (
    <div
      className="flex flex-col items-center w-full h-full bg-app overflow-hidden relative"
      onClick={() => isAddingWallpaper && setIsAddingWallpaper(false)} // بستن کادر با کلیک روی پس زمینه
    >
      <div
        className="flex flex-col relative h-full w-full"
        style={{ width: `${265 * scale}px` }}
      >
        {/* Header */}
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
            title="Wallpaper"
          />
        </div>

        {/* Content Area */}
        <div
          className="flex-1 overflow-y-auto scrollbar-hide z-0 flex flex-col items-center"
          style={{
            paddingBottom: `${20 * scale}px`,
          }}
        >
          {/* Main Frame */}
          <div
            className="flex flex-col items-center relative overflow-hidden"
            style={{
              width: `${245 * scale}px`,
              height: `${492 * scale}px`,
              gap: `${10 * scale}px`,
              borderRadius: `${15 * scale}px`,
              paddingTop: `${15 * scale}px`,
              paddingRight: `${10 * scale}px`,
              paddingBottom: `${15 * scale}px`,
              paddingLeft: `${10 * scale}px`,
              background: '#14151A',
            }}
          >
            {/* Header Text / Set Current Button Area */}
            <div
              className="w-full flex justify-center z-10 relative"
              style={{ height: `${12 * scale}px` }}
            >
              {activeIndex === currentWallpaperIndex ? (
                <span
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 500,
                    fontSize: `${8 * scale}px`,
                    lineHeight: `${12 * scale}px`,
                    color: '#FFFFFF80',
                    letterSpacing: `${1 * scale}px`,
                  }}
                >
                  CURRENT
                </span>
              ) : (
                <button
                  onClick={handleSetCurrent}
                  className="flex items-center justify-center transition-all hover:opacity-80 active:scale-95 cursor-pointer"
                  style={{
                    width: `${73 * scale}px`,
                    height: `${12 * scale}px`,
                    borderRadius: `${10 * scale}px`,
                    paddingRight: `${5 * scale}px`,
                    paddingLeft: `${5 * scale}px`,
                    background: '#313238A6',
                    border: 'none',
                    outline: 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 500,
                      fontSize: `${8 * scale}px`,
                      lineHeight: `${12 * scale}px`,
                      letterSpacing: '0px',
                      color: '#315DFF',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    SET AS CURRENT
                  </span>
                </button>
              )}
            </div>

            {/* Carousel Container */}
            <div
              className="relative flex items-center w-full"
              style={{
                height: `${400 * scale}px`,
              }}
            >
              <motion.div
                className="absolute flex flex-nowrap items-center"
                animate={{
                  x: -(activeIndex * shiftAmount + itemWidth / 2) * scale,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  left: '50%',
                  width: 'max-content',
                  gap: `${gap * scale}px`,
                }}
              >
                {wallpapers.map((wp, index) => (
                  <motion.div
                    key={wp.id}
                    onClick={() => setActiveIndex(index)}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0.6,
                      scale: activeIndex === index ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 flex items-center justify-center cursor-pointer"
                    style={{
                      width: `${itemWidth * scale}px`,
                      height: `${400 * scale}px`,
                      borderRadius: `${20 * scale}px`,
                      backgroundImage: `url(${wp.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      boxSizing: 'border-box',
                      boxShadow: `inset 0 0 0 ${1 * scale}px rgba(255, 255, 255, 0.1)`,
                      willChange: 'transform, opacity',
                      WebkitTransformStyle: 'preserve-3d',
                      overflow: 'hidden',
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Bottom Controls Area */}
            <div
              className="flex flex-col items-center justify-end mt-auto z-10 relative"
              style={{
                width: '100%',
                height: `${40 * scale}px`,
                gap: `${8 * scale}px`,
              }}
            >
              {/* Tab Navigation (Dots) */}
              <div
                className="flex items-center justify-center"
                style={{
                  height: `${9 * scale}px`,
                  gap: `${4 * scale}px`,
                }}
              >
                {wallpapers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="transition-all duration-300"
                    style={{
                      width:
                        activeIndex === index
                          ? `${12 * scale}px`
                          : `${4 * scale}px`,
                      height: `${4 * scale}px`,
                      borderRadius: `${4 * scale}px`,
                      background:
                        activeIndex === index ? '#FFFFFF' : '#FFFFFF50',
                      padding: 0,
                      border: 'none',
                    }}
                  />
                ))}
              </div>

              {/* Add New Wallpaper Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddingWallpaper(true);
                }}
                className="flex items-center justify-center transition-all hover:opacity-80 hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  width: 'max-content',
                  height: `${20 * scale}px`,
                  borderRadius: `${20 * scale}px`,
                  background: '#315DFF',
                  paddingLeft: `${10 * scale}px`,
                  paddingRight: `${10 * scale}px`,
                  gap: `${4 * scale}px`,
                  border: 'none',
                  outline: 'none',
                }}
              >
                <i
                  className="fi fi-rs-plus-small flex items-center justify-center"
                  style={{
                    fontSize: `${11 * scale}px`,
                    color: '#FFFFFF',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 500,
                    fontSize: `${8 * scale}px`,
                    color: '#FFFFFF',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Add New Wallpaper
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Absolute Overlay - Moved OUTSIDE the Main Frame to match RingtonePage */}
        <div
          className={cn(
            'absolute left-0 w-full z-30 flex justify-center transition-all duration-300 ease-in-out',
            isAddingWallpaper
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
            placeholder="Image URL"
          />
        </div>
      </div>
    </div>
  );
}

WallpaperPage.propTypes = {
  scale: PropTypes.number,
  onBack: PropTypes.func.isRequired,
};
