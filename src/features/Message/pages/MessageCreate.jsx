import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/shared/utils/cn.js';
import { cva } from 'class-variance-authority';

// Header button styles similar to PageHeader
const actionButtonVariants = cva(
  'flex items-center justify-center cursor-pointer hover:opacity-90 active:scale-[0.95] transition-all z-10',
  {
    variants: {
      variant: {
        ghost: 'bg-transparent text-muted',
      },
    },
    defaultVariants: {
      variant: 'ghost',
    },
  }
);

// Contacts Mock Data
const MOCK_CONTACTS = [
  { id: 1, name: 'Yusuf Amir', number: '0142 123 4567' },
  { id: 2, name: 'Eddie Marshall', number: '0142 987 6543' },
  { id: 3, name: 'Joseph Cohl', number: '0142 157 1357' },
  { id: 4, name: 'Amanda De Santa', number: '0142 333 4444' },
];

export default function MessageCreate({ scale = 1, onBack, onStartChat }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  // Logic to filter contacts based on input value
  const filteredContacts = useMemo(() => {
    if (!inputValue.trim()) return MOCK_CONTACTS;

    const query = inputValue.toLowerCase();
    return MOCK_CONTACTS.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        contact.number.includes(query)
    );
  }, [inputValue]);

  // Handler for selecting a contact from the list
  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setInputValue(contact.name || contact.number);
    // onStartChat?.(contact); // Uncomment for immediate transition to chat page
  };

  // Handler for confirming an unknown typed number
  const handleConfirmUnknownNumber = () => {
    if (inputValue.trim()) {
      const newContact = { id: Date.now(), name: '', number: inputValue };
      setSelectedContact(newContact);
      // onStartChat?.(newContact);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-app overflow-hidden relative">
      <div
        className="flex flex-col relative h-full w-full"
        style={{ width: `${265 * scale}px` }}
      >
        {/* Custom Header with Search Input (iOS Style) */}
        <div
          className="shrink-0 w-full z-10 bg-app/90 backdrop-blur-sm border-b border-border"
          style={{
            paddingTop: `${20 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
            paddingBottom: `${10 * scale}px`,
          }}
        >
          <div
            className="flex items-center w-full gap-2"
            style={{ height: `${25 * scale}px` }}
          >
            {/* Back Button */}
            <button
              onClick={onBack}
              aria-label="Go back"
              className={cn(
                actionButtonVariants({ variant: 'ghost' }),
                'shrink-0'
              )}
              style={{
                width: `${25 * scale}px`,
                height: `${25 * scale}px`,
                borderRadius: `${5 * scale}px`,
              }}
            >
              <i
                className="fi fi-br-angle-left flex items-center justify-center text-muted"
                style={{ fontSize: `${10 * scale}px` }}
              />
            </button>

            {/* Input Field replacing the Title */}
            <div className="flex-1 flex items-center h-full">
              <span
                className="text-muted font-normal shrink-0"
                style={{
                  fontSize: `${10 * scale}px`,
                  marginRight: `${5 * scale}px`,
                }}
              >
                To:
              </span>
              <input
                type="text"
                value={inputValue}
                aria-label="Recipient name or number"
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setSelectedContact(null);
                }}
                placeholder="Type a name or number..."
                className="w-full h-full bg-transparent border-none outline-none text-white font-medium placeholder:text-muted"
                style={{ fontSize: `${11 * scale}px` }}
                autoFocus
              />
            </div>

            {/* Confirm Button (If contact selected or valid input entered) */}
            {(selectedContact || inputValue.trim().length > 0) && (
              <button
                onClick={() =>
                  selectedContact
                    ? onStartChat?.(selectedContact)
                    : handleConfirmUnknownNumber()
                }
                className="shrink-0 text-[#315DFF] font-medium hover:text-[#315DFF]/80 transition-colors"
                style={{
                  fontSize: `${10 * scale}px`,
                  padding: `0 ${5 * scale}px`,
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Filtered Contacts List */}
        <div
          className="flex-1 flex flex-col w-full z-0 overflow-y-auto hide-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingTop: `${10 * scale}px`,
          }}
        >
          <div className="flex flex-col w-full px-4">
            {filteredContacts.length > 0
              ? filteredContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => handleSelectContact(contact)}
                    className="flex flex-col items-start justify-center w-full border-b border-border hover:bg-slot-hover transition-colors text-left"
                    style={{
                      padding: `${10 * scale}px ${5 * scale}px`,
                      minHeight: `${40 * scale}px`,
                    }}
                  >
                    <span
                      className="text-white font-medium"
                      style={{ fontSize: `${11 * scale}px` }}
                    >
                      {contact.name}
                    </span>
                    <span
                      className="text-muted"
                      style={{
                        fontSize: `${9 * scale}px`,
                        marginTop: `${2 * scale}px`,
                      }}
                    >
                      {contact.number}
                    </span>
                  </button>
                ))
              : /* Fallback state when contact is not found (Option to send to unknown number) */
                inputValue.trim() && (
                  <button
                    onClick={handleConfirmUnknownNumber}
                    className="flex items-center w-full border-b border-border hover:bg-slot-hover transition-colors text-left gap-2"
                    style={{
                      padding: `${10 * scale}px ${5 * scale}px`,
                      minHeight: `${40 * scale}px`,
                    }}
                  >
                    <div
                      className="flex items-center justify-center bg-[#315DFF]/20 text-[#315DFF] rounded-full shrink-0"
                      style={{
                        width: `${24 * scale}px`,
                        height: `${24 * scale}px`,
                      }}
                    >
                      <i
                        className="fi fi-rs-user flex justify-center items-center"
                        style={{ fontSize: `${10 * scale}px` }}
                      />
                    </div>
                    <span
                      className="text-white font-medium"
                      style={{ fontSize: `${11 * scale}px` }}
                    >
                      Send to "{inputValue}"
                    </span>
                  </button>
                )}
          </div>
        </div>
      </div>
    </div>
  );
}

MessageCreate.propTypes = {
  scale: PropTypes.number,
  onBack: PropTypes.func,
  onStartChat: PropTypes.func,
};
