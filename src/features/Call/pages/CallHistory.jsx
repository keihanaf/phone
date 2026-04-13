import PropTypes from 'prop-types';
import { cn } from '@/shared/utils/cn.js';
import ContactItem from '@/features/Call/components/ContactItem.jsx';

// Mock Data
const mockCalls = [
  {
    id: 1,
    name: 'Eddie Marshall',
    number: '0924 158 1958',
    image: 'https://i.pravatar.cc/150?img=11',
    location: '',
    time: '12:45',
    type: 'outgoing',
  },
  {
    id: 2,
    name: '',
    number: '0924 158 1958',
    image: null,
    location: 'Los Santos',
    time: '12:45',
    type: 'incoming',
  },
  {
    id: 3,
    name: 'Yusuf Amir',
    number: '0924 158 1958',
    image: null,
    location: '',
    time: 'Yesterday',
    type: 'incoming',
  },
  {
    id: 4,
    name: 'Joseph Cohl',
    number: '0924 158 1958',
    image: 'https://i.pravatar.cc/150?img=12',
    location: '',
    time: 'Yesterday',
    type: 'missed',
  },
];

export default function CallHistory({ scale = 1 }) {
  if (!mockCalls || mockCalls.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center w-full h-full text-muted'
        )}
        style={{ gap: `${10 * scale}px` }}
      >
        <i
          className={cn('fi fi-rs-time-forward')}
          style={{ fontSize: `${30 * scale}px` }}
        />
        <span style={{ fontSize: `${14 * scale}px`, fontWeight: 500 }}>
          No Recent Calls
        </span>
      </div>
    );
  }

  // Active State: Rendering the list of calls
  return (
    <div
      className={cn('flex flex-col items-center justify-start w-full h-full')}
      style={{ paddingTop: `${10 * scale}px` }}
    >
      <div
        className={cn(
          'flex flex-col overflow-y-auto hide-scrollbar overflow-hidden bg-one'
        )}
        style={{
          width: `${245 * scale}px`,
          borderRadius: `${15 * scale}px`,
        }}
      >
        {mockCalls.map((call, index) => (
          <ContactItem
            key={call.id}
            call={call}
            scale={scale}
            isLast={index === mockCalls.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

// Defining PropTypes for type safety
CallHistory.propTypes = {
  scale: PropTypes.number,
};
