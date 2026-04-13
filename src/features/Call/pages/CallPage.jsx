import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';

// Components
import CallNavigationBar from '@/features/Call/components/CallNavigationBar.jsx';
import PageHeader from '@/shared/components/ui/PageHeader.jsx';
import ContactDetail from '@/features/Call/components/ContactDetail.jsx';

// Views
import CallHistory from '@/features/Call/pages/CallHistory.jsx';
import CallContacts from '@/features/Call/pages/CallContacts.jsx';

const keypadButtonVariants = cva(
  'flex items-center justify-center cursor-pointer hover:opacity-90 active:scale-[0.95] transition-all disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'flex-col bg-six border border-border',
        call: 'bg-[#34c759]/80',
        ghost: 'bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export default function CallPage({ scale = 1, onClose }) {
  const [activeTab, setActiveTab] = useState('keypad');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isCreatingContact, setIsCreatingContact] = useState(false);
  const [dialedNumber, setDialedNumber] = useState('');

  // New State for Search Functionality
  const [searchQuery, setSearchQuery] = useState('');

  const dialPads = [
    { id: '1', num: '1', sub: '' },
    { id: '2', num: '2', sub: 'ABC' },
    { id: '3', num: '3', sub: 'DEF' },
    { id: '4', num: '4', sub: 'GHI' },
    { id: '5', num: '5', sub: 'JKL' },
    { id: '6', num: '6', sub: 'MNO' },
    { id: '7', num: '7', sub: 'PQRS' },
    { id: '8', num: '8', sub: 'TUV' },
    { id: '9', num: '9', sub: 'WXYZ' },
    { id: 'star', num: '*', sub: '' },
    { id: '0', num: '0', sub: '+' },
    { id: 'hash', num: '#', sub: '' },
  ];

  const handleDialClick = useCallback((num) => {
    setDialedNumber((prev) => {
      if (prev.length >= 15) return prev;
      return prev + num;
    });
  }, []);

  const handleDeleteClick = useCallback(() => {
    setDialedNumber((prev) => prev.slice(0, -1));
  }, []);

  const handleCallClick = useCallback(() => {
    if (!dialedNumber) return;
    console.log(`Calling ${dialedNumber}...`);
  }, [dialedNumber]);

  const handleAddContactClick = useCallback(() => {
    if (!dialedNumber) return;
    setIsCreatingContact(true);
  }, [dialedNumber]);

  const handleCloseModal = useCallback(() => {
    setSelectedContact(null);
    setIsCreatingContact(false);
  }, []);

  const getHeaderProps = () => {
    switch (activeTab) {
      case 'history':
        return { title: 'History', showRightButton: false };
      case 'contacts':
        return { title: 'Contacts', showRightButton: false };
      case 'keypad':
      default:
        return {
          title: '',
          showRightButton: dialedNumber.length > 0,
        };
    }
  };

  const renderKeypad = () => (
    <div
      className={cn('flex flex-col items-center h-full justify-start w-full')}
      style={{
        width: `${245 * scale}px`,
        gap: `${40 * scale}px`,
      }}
    >
      <div
        className={cn(
          'flex items-center justify-center shrink-0 overflow-hidden'
        )}
        style={{ width: `${180 * scale}px`, height: `${26 * scale}px` }}
      >
        <span
          className={cn(
            'text-white text-center leading-none tracking-widest whitespace-nowrap'
          )}
          style={{ fontSize: `${20 * scale}px`, fontWeight: 500 }}
        >
          {dialedNumber || '\u00A0'}
        </span>
      </div>

      <div
        className={cn('grid shrink-0')}
        style={{
          width: `${180 * scale}px`,
          gridTemplateColumns: `repeat(3, ${50 * scale}px)`,
          gridTemplateRows: `repeat(5, ${50 * scale}px)`,
          columnGap: `${15 * scale}px`,
          rowGap: `${15 * scale}px`,
        }}
      >
        {dialPads.map((pad) => (
          <button
            key={pad.id}
            onClick={() => handleDialClick(pad.num)}
            className={cn(keypadButtonVariants({ variant: 'default' }))}
            style={{
              width: `${50 * scale}px`,
              height: `${50 * scale}px`,
              borderRadius: `${30 * scale}px`,
              borderWidth: `${1 * scale}px`,
            }}
            aria-label={`Dial ${pad.num}`}
          >
            <span
              className={cn('text-white text-center leading-none')}
              style={{ fontSize: `${18 * scale}px`, fontWeight: 700 }}
            >
              {pad.num}
            </span>
            {pad.sub && (
              <span
                className={cn('text-muted text-center leading-none')}
                style={{
                  fontSize: `${8 * scale}px`,
                  fontWeight: 500,
                }}
              >
                {pad.sub}
              </span>
            )}
          </button>
        ))}

        <div />

        <button
          onClick={handleCallClick}
          disabled={!dialedNumber}
          className={cn(keypadButtonVariants({ variant: 'call' }))}
          style={{
            width: `${50 * scale}px`,
            height: `${50 * scale}px`,
            borderRadius: `${30 * scale}px`,
          }}
          aria-label="Initiate Call"
        >
          <i
            className={cn(
              'fi fi-ss-phone-call flex items-center justify-center text-white'
            )}
            style={{ fontSize: `${18 * scale}px` }}
          />
        </button>

        <button
          onClick={handleDeleteClick}
          disabled={!dialedNumber}
          className={cn(keypadButtonVariants({ variant: 'ghost' }))}
          style={{
            width: `${50 * scale}px`,
            height: `${50 * scale}px`,
            borderRadius: `${30 * scale}px`,
          }}
          aria-label="Delete last digit"
        >
          <i
            className={cn(
              'fi fi-sr-delete flex items-center justify-center',
              dialedNumber ? 'text-muted' : 'text-transparent'
            )}
            style={{ fontSize: `${18 * scale}px` }}
          />
        </button>
      </div>
    </div>
  );

  const headerProps = getHeaderProps();
  const isModalOpen = !!selectedContact || isCreatingContact;
  const modalContactData = isCreatingContact
    ? { number: dialedNumber }
    : selectedContact;

  return (
    <div
      className={cn(
        'flex flex-col items-center w-full h-full bg-app overflow-hidden relative'
      )}
    >
      <div
        className={cn('flex flex-col relative h-full w-full')}
        style={{ width: `${265 * scale}px` }}
      >
        {/* Top Header */}
        <div
          className={cn('shrink-0 w-full z-10 bg-app')}
          style={{
            paddingTop: `${20 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
          }}
        >
          <PageHeader
            scale={scale}
            onLeftClick={onClose}
            onRightClick={handleAddContactClick}
            title={headerProps.title}
            showRightButton={headerProps.showRightButton}
          />
        </div>

        {/* Dynamic Content */}
        <div
          className={cn(
            'flex-1 flex flex-col items-center w-full z-0 hide-scrollbar',
            isModalOpen ? 'overflow-hidden' : 'overflow-y-auto'
          )}
          style={{
            marginTop: activeTab === 'keypad' ? `${30 * scale}px` : `0px`,
            paddingBottom: `${100 * scale}px`,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {activeTab === 'history' && <CallHistory scale={scale} />}
          {activeTab === 'contacts' && (
            <CallContacts
              scale={scale}
              onSelectContact={setSelectedContact}
              searchQuery={searchQuery}
            />
          )}
          {activeTab === 'keypad' && renderKeypad()}
        </div>

        {/* Bottom Navigation */}
        <div
          className={cn(
            'absolute bottom-0 left-0 w-full z-10 flex justify-center pointer-events-none transition-all duration-300 ease-in-out',
            isModalOpen
              ? 'translate-y-full opacity-0'
              : 'translate-y-0 opacity-100'
          )}
          style={{
            paddingBottom: `${20 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
          }}
        >
          <div className={cn('w-full pointer-events-auto')}>
            <CallNavigationBar
              scale={scale}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </div>

        {/* Contact Detail / Form Modal */}
        <ContactDetail
          scale={scale}
          isOpen={isModalOpen}
          mode={isCreatingContact ? 'create' : 'view'}
          contact={modalContactData}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}

CallPage.propTypes = {
  scale: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};
