import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/shared/utils/cn.js';
import PageHeader from '@/shared/components/ui/PageHeader.jsx';

export default function MailDetailPage({ mail, scale = 1, onBack }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleClearInbox = useCallback(() => {
    console.log('Clear Inbox');
    setMenuOpen(false);
  }, []);

  const handleShare = useCallback(() => {
    console.log('Share');
    setMenuOpen(false);
  }, []);

  const handleAccept = useCallback(() => {
    console.log('Accept action triggered');
  }, []);

  const handleDecline = useCallback(() => {
    console.log('Decline action triggered');
  }, []);

  const senderName = mail?.name || mail?.address || 'Unknown Sender';
  const mailSubject = mail?.subject || mail?.lastMessage || 'No Subject';
  const mailDetail =
    mail?.detail ||
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.';

  return (
    <div className="flex flex-col items-center w-full h-full bg-app overflow-hidden relative">
      <div
        className="flex flex-col relative h-full w-full"
        style={{ width: `${265 * scale}px` }}
      >
        {/* Header & Menu */}
        <div
          className="shrink-0 w-full z-10 transition-all"
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
            title="Email"
            onRightClick={handleMenuToggle}
            rightIcon="fi-rs-menu-dots"
            rightIconColor="text-white"
            rightVariant="menu"
          />
          {menuOpen && (
            <div
              className="absolute z-50 flex justify-center pointer-events-auto transition-opacity"
              style={{
                right: `${10 * scale}px`,
                width: `${120 * scale}px`,
                height: `${50 * scale}px`,
              }}
            >
              <div
                className="flex flex-col justify-center w-full h-full bg-six border border-border backdrop-blur-[10px] shadow-[0px_4px_10px_rgba(0,0,0,0.25)]"
                style={{
                  borderRadius: `${10 * scale}px`,
                  padding: `${5 * scale}px`,
                  gap: `${5 * scale}px`,
                }}
              >
                {/* Clear Inbox */}
                <button
                  onClick={handleClearInbox}
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
                    Clear inbox
                  </span>
                </button>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="flex items-center w-full hover:bg-slot-hover rounded transition-colors text-white"
                  style={{
                    height: `${20 * scale}px`,
                    gap: `${5 * scale}px`,
                    padding: `${5 * scale}px`,
                  }}
                >
                  <i
                    className="fi fi-rs-share flex justify-center items-center"
                    style={{ fontSize: `${8 * scale}px` }}
                  />
                  <span
                    style={{
                      fontSize: `${8 * scale}px`,
                      lineHeight: '100%',
                    }}
                  >
                    Share
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div
          className="flex-1 flex flex-col w-full z-0 overflow-y-auto scrollbar-hide"
          style={{
            paddingBottom: `${80 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
            gap: `${10 * scale}px`,
          }}
        >
          {/* Metadata Card (From, Time, To) */}
          <div
            className="w-full shrink-0 bg-one"
            style={{
              height: `${41 * scale}px`,
              borderRadius: `${10 * scale}px`,
            }}
          >
            <div
              className="w-full h-full flex flex-col"
              style={{
                padding: `${10 * scale}px`,
                gap: `${5 * scale}px`,
              }}
            >
              <div
                className="w-full flex flex-col"
                style={{ height: `${21 * scale}px` }}
              >
                {/* Top Row: from & time */}
                <div
                  className="w-full flex justify-between items-center"
                  style={{ height: `${13 * scale}px` }}
                >
                  {/* Sender */}
                  <div
                    className="flex items-center text-white truncate"
                    style={{
                      fontSize: `${10 * scale}px`,
                      lineHeight: '100%',
                      maxWidth: '70%',
                    }}
                  >
                    <span
                      className="font-normal shrink-0 text-muted"
                      style={{ marginRight: `${3 * scale}px` }}
                    >
                      from
                    </span>
                    <span className="font-bold truncate">{senderName}</span>
                  </div>

                  {/* Time & Icon */}
                  <div
                    className="flex items-center shrink-0"
                    style={{
                      height: `${8 * scale}px`,
                      gap: `${5 * scale}px`,
                    }}
                  >
                    <span
                      className="text-muted text-right font-normal"
                      style={{
                        fontSize: `${6 * scale}px`,
                        lineHeight: '100%',
                      }}
                    >
                      {mail?.time || 'Unknown'}
                    </span>
                    <i
                      className="fi fi-rs-clock flex justify-center items-center text-[#315DFF]"
                      style={{ fontSize: `${8 * scale}px` }}
                    />
                  </div>
                </div>

                {/* Bottom Row: to Me */}
                <div
                  className="w-full flex items-center text-muted"
                  style={{
                    height: `${10 * scale}px`,
                    gap: `${3 * scale}px`,
                  }}
                >
                  <span
                    className="font-normal"
                    style={{
                      fontSize: `${8 * scale}px`,
                      lineHeight: '100%',
                    }}
                  >
                    to
                  </span>
                  <span
                    className="font-bold"
                    style={{
                      fontSize: `${8 * scale}px`,
                      lineHeight: '100%',
                    }}
                  >
                    Me
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Email Body Section */}
          <div
            className="flex flex-col w-full"
            style={{
              gap: `${10 * scale}px`,
            }}
          >
            {/* Subject Frame */}
            <div
              className="flex flex-col w-full"
              style={{ gap: `${3 * scale}px` }}
            >
              <span
                className="text-muted font-medium text-left"
                style={{
                  fontSize: `${8 * scale}px`,
                  lineHeight: `${12 * scale}px`,
                }}
              >
                Subject
              </span>
              <h2
                className="text-white font-bold text-left"
                style={{
                  fontSize: `${14 * scale}px`,
                  lineHeight: '120%',
                }}
              >
                {mailSubject}
              </h2>
            </div>

            {/* Full Detail Frame */}
            <div
              className="flex flex-col w-full"
              style={{ gap: `${3 * scale}px` }}
            >
              <span
                className="text-muted font-medium text-left"
                style={{
                  fontSize: `${8 * scale}px`,
                  lineHeight: `${12 * scale}px`,
                }}
              >
                Full Detail
              </span>
              <p
                className="text-white font-normal text-left"
                style={{
                  fontSize: `${10 * scale}px`,
                  lineHeight: `${16 * scale}px`,
                }}
              >
                {mailDetail}
              </p>
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div
          className="absolute bottom-0 left-0 w-full z-20 flex justify-end items-center pointer-events-none transition-all duration-300 ease-in-out"
          style={{
            paddingBottom: `${20 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
            gap: `${5 * scale}px`,
          }}
        >
          {/* Decline (Cross) Button */}
          <button
            onClick={handleDecline}
            className={cn(
              'pointer-events-auto flex items-center justify-center shrink-0 cursor-pointer',
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
              className="fi fi-ss-cross flex items-center justify-center text-muted"
              style={{
                width: `${13 * scale}px`,
                height: `${13 * scale}px`,
                fontSize: `${13 * scale}px`,
              }}
            />
          </button>

          {/* Accept Button */}
          <button
            onClick={handleAccept}
            className={cn(
              'pointer-events-auto flex items-center justify-center shrink-0 cursor-pointer',
              'transition-transform hover:scale-105 active:scale-95 border border-border-strong'
            )}
            style={{
              width: `${67 * scale}px`,
              height: `${35 * scale}px`,
              borderRadius: `${25 * scale}px`,
              background: '#315DFFCC',
              boxShadow: '0px 4px 10px 0px rgba(0,0,0,0.25)',
              backdropFilter: 'blur(10px)',
              paddingTop: `${5 * scale}px`,
              paddingRight: `${15 * scale}px`,
              paddingBottom: `${5 * scale}px`,
              paddingLeft: `${15 * scale}px`,
            }}
          >
            <span
              className="text-white font-bold"
              style={{
                fontSize: `${10 * scale}px`,
                lineHeight: '100%',
              }}
            >
              ACCEPT
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

MailDetailPage.propTypes = {
  mail: PropTypes.object,
  scale: PropTypes.number,
  onBack: PropTypes.func.isRequired,
};
