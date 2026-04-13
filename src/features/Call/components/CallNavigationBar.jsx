import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';

// --- CVA Definitions ---
const slotUsedVariants = cva(
  'backdrop-blur-md bg-six border border-border transition-all'
);

// --- Main Component ---
export default function CallNavigationBar({
  scale = 1,
  activeTab,
  onTabChange,
  searchQuery = '',
  onSearchChange,
}) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const inputRef = useRef(null);

  const tabs = [
    { id: 'history', icon: 'fi-rs-time-forward' },
    { id: 'contacts', icon: 'fi-rs-address-book' },
    { id: 'keypad', icon: 'fi-rs-grid' },
  ];

  // Auto-focus input when search becomes active
  useEffect(() => {
    if (isSearchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchActive]);

  const handleSearchToggle = () => {
    if (!isSearchActive) {
      setIsSearchActive(true);
      onTabChange('contacts');
    } else {
      setIsSearchActive(false);
      if (onSearchChange) onSearchChange('');
    }
  };

  return (
    <div
      className="flex items-center justify-between w-full mt-auto self-center"
      style={{
        gap: `${5 * scale}px`,
      }}
    >
      {/* Main Tab / Search Navigation (Pill Shape) */}
      <div
        className={cn(
          slotUsedVariants(),
          'flex-1 flex overflow-hidden relative'
        )}
        style={{
          height: `${35 * scale}px`,
          borderRadius: `${25 * scale}px`,
          borderWidth: `${1 * scale}px`,
        }}
      >
        <AnimatePresence mode="wait">
          {!isSearchActive ? (
            <motion.div
              key="tabs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between w-full h-full"
              style={{ padding: `${3 * scale}px` }}
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'flex items-center justify-center transition-all duration-300 hover:opacity-100',
                      isActive ? 'bg-one/60' : 'bg-transparent'
                    )}
                    style={{
                      flex: 1,
                      height: '100%',
                      borderRadius: `${15 * scale}px`,
                    }}
                  >
                    <i
                      className={cn(
                        'fi flex items-center justify-center transition-colors duration-300',
                        tab.icon,
                        isActive ? 'text-[#315DFF]' : 'text-white'
                      )}
                      style={{
                        fontSize: `${13 * scale}px`,
                      }}
                    />
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="search-input"
              initial={{ opacity: 0, width: '80%' }}
              animate={{ opacity: 1, width: '100%' }}
              exit={{ opacity: 0, width: '80%' }}
              transition={{ duration: 0.2 }}
              className="flex items-center w-full h-full"
              style={{ padding: `0 ${10 * scale}px` }}
            >
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  onSearchChange && onSearchChange(e.target.value)
                }
                placeholder="Search contacts..."
                className="w-full h-full bg-transparent border-none outline-none font-medium text-white placeholder:text-text-header placeholder:font-normal"
                style={{ fontSize: `${11 * scale}px` }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action/Search Toggle Button (Circular) */}
      <motion.button
        onClick={handleSearchToggle}
        whileTap={{ scale: 0.9 }}
        className={cn(
          slotUsedVariants(),
          'flex items-center justify-center shrink-0 hover:opacity-90 relative overflow-hidden'
        )}
        style={{
          width: `${35 * scale}px`,
          height: `${35 * scale}px`,
          borderRadius: '50%',
          borderWidth: `${1 * scale}px`,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.i
            key={isSearchActive ? 'close' : 'search'}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'fi flex items-center justify-center absolute',
              isSearchActive
                ? 'fi-rs-cross text-[#FF383C]'
                : 'fi-rs-search text-white/80'
            )}
            style={{
              fontSize: `${13 * scale}px`,
            }}
          />
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

CallNavigationBar.propTypes = {
  scale: PropTypes.number,
  activeTab: PropTypes.oneOf(['history', 'contacts', 'keypad']).isRequired,
  onTabChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  onSearchChange: PropTypes.func,
};
