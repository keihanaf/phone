import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/shared/utils/cn.js';
import PageHeader from '@/shared/components/ui/PageHeader.jsx';
import MailItem from '@/features/Mail/components/MailItem.jsx';
import MailDetailPage from '@/features/Mail/pages/MailDetailPage.jsx';

const MOCK_MAILS = [
  {
    id: '1',
    name: 'Apple',
    address: 'no-reply@apple.com',
    lastMessage: 'Your invoice for Apple Music is available.',
    time: '10:42 AM',
    unread: true,
  },
  {
    id: '2',
    name: 'John Doe',
    address: 'john.doe@example.com',
    lastMessage: 'Are we still meeting for lunch today?',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: '3',
    name: '',
    address: 'newsletter@github.com',
    lastMessage: 'Check out the trending repositories this week.',
    time: 'Oct 24',
    unread: true,
  },
  {
    id: '4',
    name: 'Dribbble',
    address: 'hello@dribbble.com',
    lastMessage: 'Here are the top design shots for you.',
    time: 'Oct 22',
    unread: false,
  },
  {
    id: '5',
    name: 'Sarah Smith',
    address: 's.smith@company.com',
    lastMessage: 'The project files have been attached to this thread.',
    time: 'Oct 20',
    unread: false,
  },
];

export default function MailPage({ scale = 1, onClose }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMail, setActiveMail] = useState(null);

  const handleMailClick = useCallback((mail) => {
    setActiveMail(mail);
  }, []);

  const handleCloseMail = useCallback(() => {
    setActiveMail(null);
  }, []);

  const handleMenuClick = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleCall = useCallback(() => {
    console.log('Call action triggered');
    setMenuOpen(false);
  }, []);

  const handleDeleteChat = useCallback(() => {
    console.log('Delete Chat action triggered');
    setMenuOpen(false);
  }, []);

  if (activeMail) {
    return (
      <MailDetailPage
        mail={activeMail}
        scale={scale}
        onBack={handleCloseMail}
      />
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-full bg-app overflow-hidden relative">
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
            onLeftClick={onClose}
            showRightButton={false}
            title="Inbox"
          />
        </div>

        {/* Mail List */}
        <div
          className="flex-1 overflow-y-auto scrollbar-hide z-0"
          style={{
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
            paddingBottom: `${80 * scale}px`,
          }}
        >
          <div className="w-full flex flex-col shadow-sm">
            {MOCK_MAILS.map((mail, index) => (
              <MailItem
                key={mail.id}
                mail={mail}
                scale={scale}
                isFirst={index === 0}
                isLast={index === MOCK_MAILS.length - 1}
                onClick={handleMailClick}
              />
            ))}
          </div>
        </div>

        {/* Floating Action Button & Menu Container */}
        <div
          className="absolute bottom-0 left-0 w-full z-10 flex justify-end pointer-events-none transition-all duration-300 ease-in-out"
          style={{
            paddingBottom: `${20 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
          }}
        >
          {/* Popup Menu */}
          {menuOpen && (
            <div
              className="absolute z-50 flex justify-center pointer-events-auto transition-opacity"
              style={{
                right: `${10 * scale}px`,
                bottom: `${60 * scale}px`,
                width: `${120 * scale}px`,
                height: `${50 * scale}px`,
              }}
            >
              <div
                className={cn(
                  'flex flex-col justify-center w-full h-full',
                  'bg-six border border-border backdrop-blur-[10px]',
                  'shadow-[0px_4px_10px_rgba(0,0,0,0.25)]'
                )}
                style={{
                  borderRadius: `${10 * scale}px`,
                  padding: `${5 * scale}px`,
                  gap: `${5 * scale}px`,
                }}
              >
                {/* Call Action */}
                <button
                  onClick={handleCall}
                  className="flex items-center w-full hover:bg-slot-hover rounded transition-colors text-white"
                  style={{
                    height: `${20 * scale}px`,
                    gap: `${5 * scale}px`,
                    padding: `${5 * scale}px`,
                  }}
                >
                  <i
                    className="fi fi-rs-phone-call flex justify-center items-center"
                    style={{ fontSize: `${8 * scale}px` }}
                  />
                  <span
                    style={{
                      fontSize: `${8 * scale}px`,
                      lineHeight: '100%',
                    }}
                  >
                    Call
                  </span>
                </button>

                {/* Delete Chat Action */}
                <button
                  onClick={handleDeleteChat}
                  className="flex items-center w-full hover:bg-slot-hover rounded transition-colors text-white"
                  style={{
                    height: `${20 * scale}px`,
                    gap: `${5 * scale}px`,
                    padding: `${5 * scale}px`,
                  }}
                >
                  <i
                    className="fi fi-rs-trash flex justify-center items-center"
                    style={{ fontSize: `${8 * scale}px` }}
                  />
                  <span
                    style={{
                      fontSize: `${8 * scale}px`,
                      lineHeight: '100%',
                    }}
                  >
                    Delete Chat
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Floating Action Button */}
          <button
            onClick={handleMenuClick}
            className={cn(
              'pointer-events-auto flex items-center justify-center shrink-0 cursor-pointer text-white',
              'bg-six border border-border backdrop-blur-[10px]',
              'shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]',
              'transition-transform hover:scale-105 active:scale-95'
            )}
            style={{
              width: `${34.668 * scale}px`,
              height: `${34.668 * scale}px`,
              borderRadius: `${20 * scale}px`,
            }}
          >
            <i
              className="fi fi-rs-menu-dots-vertical flex items-center justify-center"
              style={{
                width: `${13 * scale}px`,
                height: `${13 * scale}px`,
                fontSize: `${13 * scale}px`,
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

MailPage.propTypes = {
  scale: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};
