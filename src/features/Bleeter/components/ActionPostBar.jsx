import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';
import { EMOJIS } from '@/shared/constants/emojis';
import Button from '@/shared/components/elements/Button.jsx';

const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=200&q=80',
];

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const containerVariants = cva(
  'flex flex-col justify-center items-center bg-six border-border transition-all duration-300 ease-in-out relative z-50 items-start'
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function ActionPostBar({ scale = 1, onSubmit, rebleetContext }) {
  // States
  const [content, setContent] = useState('');
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  // Refs
  const emojiRef = useRef(null);
  const attachmentRef = useRef(null);
  const selectedImagesRef = useRef(null);

  // Derived State
  const hasText = content.trim().length > 0;
  const hasAttachments = selectedImages.length > 0;
  const isReadyToSend = hasText || hasAttachments;

  // Handlers
  const toggleEmojiPicker = () => {
    setIsEmojiOpen((prev) => !prev);
    if (isAttachmentOpen) setIsAttachmentOpen(false);
  };

  const toggleAttachmentPicker = () => {
    setIsAttachmentOpen((prev) => !prev);
    if (isEmojiOpen) setIsEmojiOpen(false);
  };

  const handleEmojiClick = (emoji) => {
    setContent((prev) => prev + emoji);
  };

  const handleAttachmentClick = (imageSrc) => {
    setSelectedImages((prev) => [...prev, imageSrc]);
    setIsAttachmentOpen(false);
  };

  const handleRemoveImage = (indexToRemove) => {
    setSelectedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = () => {
    if (isReadyToSend) {
      onSubmit?.({
        content: content.trim(),
        images: selectedImages,
        rebleetData: rebleetContext
          ? { originalAuthor: rebleetContext.originalAuthor }
          : null,
      });
      setContent('');
      setSelectedImages([]);
      setIsEmojiOpen(false);
      setIsAttachmentOpen(false);
    }
  };

  // Effects
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target) &&
        isEmojiOpen
      ) {
        setIsEmojiOpen(false);
      }
      if (
        attachmentRef.current &&
        !attachmentRef.current.contains(event.target) &&
        isAttachmentOpen
      ) {
        setIsAttachmentOpen(false);
      }
    };

    if (isEmojiOpen || isAttachmentOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEmojiOpen, isAttachmentOpen]);

  // Horizontal Scroll for Selected Images
  useEffect(() => {
    const scrollContainer = selectedImagesRef.current;
    const handleWheel = (event) => {
      if (scrollContainer) {
        event.preventDefault();
        scrollContainer.scrollLeft += event.deltaY;
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel, {
        passive: false,
      });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, [selectedImages]);

  return (
    <div
      className={containerVariants()}
      style={{
        width: `${260 * scale}px`,
        height: `${170 * scale}px`,
        padding: `${10 * scale}px`,
        borderRadius: `${25 * scale}px`,
        border: `${1 * scale}px solid`,
        boxShadow: `0px ${4 * scale}px ${10 * scale}px 0px rgba(0, 0, 0, 0.25)`,
        backdropFilter: `blur(${10 * scale}px)`,
        WebkitBackdropFilter: `blur(${10 * scale}px)`,
      }}
    >
      {/* Selected Images List */}
      {hasAttachments && (
        <div
          ref={selectedImagesRef}
          className="absolute flex items-center overflow-x-auto bg-six border-border transition-all duration-300 ease-in-out"
          style={{
            width: '100%',
            height: `${55 * scale}px`,
            gap: `${8 * scale}px`,
            top: `-${65 * scale}px`,
            left: 0,
            padding: `${5 * scale}px`,
            borderRadius: `${15 * scale}px`,
            border: `${1 * scale}px solid`,
            boxShadow: `0px ${4 * scale}px ${10 * scale}px 0px rgba(0, 0, 0, 0.25)`,
            backdropFilter: `blur(${10 * scale}px)`,
            WebkitBackdropFilter: `blur(${10 * scale}px)`,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth',
          }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          {selectedImages.map((imgSrc, index) => (
            <div
              key={index}
              className="relative group shrink-0 cursor-pointer overflow-hidden transition-all shadow-sm"
              style={{
                width: `${45 * scale}px`,
                height: `${45 * scale}px`,
                borderRadius: `${10 * scale}px`,
              }}
              onClick={() => handleRemoveImage(index)}
            >
              <img
                src={imgSrc}
                alt={`selected-${index}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#FF383C]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[2px]">
                <i
                  className="fi fi-ss-trash text-white flex items-center justify-center drop-shadow-md"
                  style={{ fontSize: `${16 * scale}px` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rebleet Indicator */}
      {rebleetContext && (
        <div
          className="w-full flex items-center shrink-0"
          style={{
            paddingLeft: `${5 * scale}px`,
            marginBottom: `${6 * scale}px`,
          }}
        >
          <span
            className="font-semibold tracking-wide flex items-center"
            style={{
              fontSize: `${9 * scale}px`,
              color: '#315DFF',
            }}
          >
            RB {rebleetContext.originalAuthor}
          </span>
        </div>
      )}

      {/* Main Inner Container (Text Area + Buttons) */}
      <div
        className="relative flex flex-col w-full flex-1 bg-one"
        style={{
          padding: `${10 * scale}px`,
          borderRadius: `${15 * scale}px`,
        }}
      >
        {/* Text Area */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What’s Happening?"
          className="w-full h-full bg-transparent border-none outline-none text-white resize-none transition-all placeholder-muted"
          style={{
            fontSize: `${8 * scale}px`,
            paddingBottom: `${25 * scale}px`,
          }}
        />

        {/* Emoji Picker Popup */}
        {isEmojiOpen && (
          <div
            ref={emojiRef}
            className="absolute z-50 flex flex-wrap content-start overflow-y-auto shadow-[0px_4px_10px_0px_rgba(0,0,0,0.5)] bg-slot-free border-border border"
            style={{
              width: `${200 * scale}px`,
              height: `${95 * scale}px`,
              padding: `${10 * scale}px`,
              borderRadius: `${10 * scale}px`,
              bottom: `${35 * scale}px`,
              right: `${10 * scale}px`,
              gap: `${6 * scale}px`,
              scrollbarWidth: 'none',
            }}
          >
            {EMOJIS.map((emoji, index) => (
              <Button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                className="hover:scale-110 transition-transform text-white"
                style={{
                  fontSize: `${14 * scale}px`,
                  width: `${18 * scale}px`,
                  height: `${18 * scale}px`,
                }}
              >
                {emoji}
              </Button>
            ))}
          </div>
        )}

        {/* Attachment Picker Popup */}
        {isAttachmentOpen && (
          <div
            ref={attachmentRef}
            className="absolute z-50 grid grid-cols-2 grid-rows-3 bg-slot-free border-border shadow-[0px_4px_10px_0px_rgba(0,0,0,0.5)] border"
            style={{
              width: `${200 * scale}px`,
              height: `${195 * scale}px`,
              padding: `${5 * scale}px`,
              gap: `${5 * scale}px`,
              borderRadius: `${10 * scale}px`,
              bottom: `${35 * scale}px`,
              right: `${10 * scale}px`,
            }}
          >
            {MOCK_IMAGES.map((imgSrc, index) => (
              <Button
                key={index}
                onClick={() => handleAttachmentClick(imgSrc)}
                className="relative overflow-hidden hover:opacity-80 transition-opacity bg-black/20"
                style={{
                  width: `${92 * scale}px`,
                  height: `${58 * scale}px`,
                  borderRadius: `${5 * scale}px`,
                }}
              >
                <img
                  src={imgSrc}
                  alt={`attachment-${index}`}
                  className="w-full h-full object-cover"
                />
              </Button>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div
          className="absolute flex items-center"
          style={{
            bottom: `${10 * scale}px`,
            right: `${10 * scale}px`,
            gap: `${5 * scale}px`,
          }}
        >
          {/* Image Button */}
          <Button
            variant="iconButton"
            onClick={toggleAttachmentPicker}
            icon="fi fi-rs-mode-landscape"
            iconClassName="text-white"
            iconStyle={{ fontSize: `${12 * scale}px` }}
            className={cn(
              'active:scale-95 transition-all duration-200',
              !isAttachmentOpen && 'hover:brightness-110'
            )}
            style={{
              width: `${20 * scale}px`,
              height: `${20 * scale}px`,
              borderRadius: `${5 * scale}px`,
              backgroundColor: isAttachmentOpen
                ? '#315DFF'
                : 'var(--color-bar)',
            }}
          />

          {/* Emoji Button */}
          <Button
            variant="iconButton"
            onClick={toggleEmojiPicker}
            icon="fi fi-rs-meh"
            iconClassName="text-white"
            iconStyle={{ fontSize: `${12 * scale}px` }}
            className={cn(
              'active:scale-95 transition-all duration-200',
              !isEmojiOpen && 'hover:brightness-110'
            )}
            style={{
              width: `${20 * scale}px`,
              height: `${20 * scale}px`,
              borderRadius: `${5 * scale}px`,
              backgroundColor: isEmojiOpen ? '#315DFF' : 'var(--color-bar)',
            }}
          />

          {/* Send Button */}
          {isReadyToSend && (
            <Button
              variant="iconButton"
              onClick={handleSubmit}
              icon="fi fi-rs-paper-plane"
              iconClassName="text-white"
              iconStyle={{ fontSize: `${12 * scale}px` }}
              className="hover:brightness-110 active:scale-95 bg-[#315DFF]"
              style={{
                width: `${20 * scale}px`,
                height: `${20 * scale}px`,
                borderRadius: `${5 * scale}px`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

ActionPostBar.propTypes = {
  scale: PropTypes.number,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  rebleetContext: PropTypes.shape({
    originalAuthor: PropTypes.string,
  }),
};
