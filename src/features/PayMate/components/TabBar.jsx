import PropTypes from 'prop-types';
import { cn } from '@/shared/utils/cn.js';

export default function TabBar({ scale = 1, activeTab, onTabChange }) {
  const tabs = ['Latest Transactions', 'Bills'];

  return (
    <div
      className="flex items-center justify-start"
      style={{
        width: `${225 * scale}px`,
        height: `${30 * scale}px`,
        gap: `${5 * scale}px`,
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              'flex items-center justify-center bg-transparent border-none p-0 cursor-pointer transition-colors duration-200 ease-in-out',
              isActive ? 'text-white' : 'text-muted hover:text-white-muted'
            )}
            style={{
              fontSize: `${12 * scale}px`,
              fontWeight: isActive ? 700 : 400,
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

TabBar.propTypes = {
  scale: PropTypes.number,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};
