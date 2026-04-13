import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/shared/utils/cn.js';
import ContactItem from '@/features/Call/components/ContactItem.jsx';

// Mock Data
const mockContacts = [
  {
    id: 1,
    name: 'Arthur Morgan',
    number: '0912 345 6789',
    image: null,
    location: 'Valentine',
    time: '',
    type: 'incoming',
  },
  {
    id: 2,
    name: 'Alice Cooper',
    number: '0924 158 1958',
    image: 'https://i.pravatar.cc/150?img=5',
    location: '',
    time: '',
    type: 'outgoing',
  },
  {
    id: 3,
    name: 'Alice Cooper',
    number: '0924 158 1958',
    image: 'https://i.pravatar.cc/150?img=5',
    location: '',
    time: '',
    type: 'outgoing',
  },
  {
    id: 4,
    name: 'Alice Cooper',
    number: '0924 158 1958',
    image: 'https://i.pravatar.cc/150?img=5',
    location: '',
    time: '',
    type: 'outgoing',
  },
  {
    id: 5,
    name: 'Bob Builder',
    number: '0933 111 2233',
    image: null,
    location: 'Los Santos',
    time: '',
    type: 'missed',
  },
  {
    id: 6,
    name: 'Charlie Chaplin',
    number: '0911 222 3344',
    image: 'https://i.pravatar.cc/150?img=8',
    location: '',
    time: '',
    type: 'incoming',
  },
  {
    id: 7,
    name: 'Carl Johnson',
    number: '0999 888 7766',
    image: null,
    location: 'Grove Street',
    time: '',
    type: 'outgoing',
  },
  {
    id: 8,
    name: 'Zack Fair',
    number: '0900 000 0000',
    image: null,
    location: 'Midgar',
    time: '',
    type: 'missed',
  },
  {
    id: 9,
    name: 'Zack Fair',
    number: '0900 000 0000',
    image: null,
    location: 'Midgar',
    time: '',
    type: 'missed',
  },
];

// Receiving onSelectContact from CallPage
export default function CallContacts({ scale = 1, onSelectContact }) {
  const groupedContacts = useMemo(() => {
    if (!mockContacts || mockContacts.length === 0) return {};

    const sortedContacts = [...mockContacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return sortedContacts.reduce((acc, contact) => {
      const firstLetter = contact.name
        ? contact.name.charAt(0).toUpperCase()
        : '#';
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(contact);
      return acc;
    }, {});
  }, []);

  const letters = Object.keys(groupedContacts);

  // Empty State
  if (letters.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center w-full h-full text-muted'
        )}
        style={{ gap: `${10 * scale}px` }}
      >
        <i
          className={cn('fi fi-rs-address-book')}
          style={{ fontSize: `${30 * scale}px` }}
        />
        <span style={{ fontSize: `${14 * scale}px`, fontWeight: 500 }}>
          No Contacts Found
        </span>
      </div>
    );
  }

  // Active State
  return (
    <div className={cn('flex flex-col items-center justify-start w-full')}>
      <div
        className={cn('flex flex-col items-center justify-start w-full')}
        style={{ paddingTop: `${10 * scale}px` }}
      >
        <div
          className={cn('flex flex-col w-full items-center')}
          style={{ width: `${245 * scale}px` }}
        >
          {letters.map((letter, index) => (
            <div key={letter} className={cn('flex flex-col w-full')}>
              {/* Alphabet Header */}
              <div
                className={cn('flex items-center w-full')}
                style={{
                  height: `${13 * scale}px`,
                  padding: `0 ${10 * scale}px`,
                  marginTop: index === 0 ? `${5 * scale}px` : `${10 * scale}px`,
                  marginBottom: `${5 * scale}px`,
                }}
              >
                <span
                  className={cn('font-bold text-left w-full text-white')}
                  style={{
                    fontSize: `${10 * scale}px`,
                    lineHeight: `${13 * scale}px`,
                  }}
                >
                  {letter}
                </span>
              </div>

              {/* Contact Items within the specific letter group */}
              <div className={cn('flex flex-col w-full shrink-0')}>
                {groupedContacts[letter].map((contact, contactIndex) => {
                  const isFirstInGroup = contactIndex === 0;
                  const isLastInGroup =
                    contactIndex === groupedContacts[letter].length - 1;

                  return (
                    <ContactItem
                      key={contact.id}
                      call={contact}
                      scale={scale}
                      isFirst={isFirstInGroup}
                      isLast={isLastInGroup}
                      variant="contacts"
                      onClick={onSelectContact}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Defining PropTypes for type safety
CallContacts.propTypes = {
  scale: PropTypes.number,
  onSelectContact: PropTypes.func,
};
