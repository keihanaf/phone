import { forwardRef, useState, useRef, useEffect } from 'react';
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

const chatInputVariants = cva(
  'flex items-center justify-between shrink-0 relative',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const ChatInput = forwardRef(
  ({ scale = 1, className, variant, ...props }, ref) => {
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);
    const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);

    const emojiRef = useRef(null);
    const attachmentRef = useRef(null);
    const selectedImagesRef = useRef(null);

    const hasText = inputValue.trim().length > 0;
    const hasAttachments = selectedImages.length > 0;
    const isReadyToSend = hasText || hasAttachments;

    const toggleEmojiPicker = () => {
      setIsEmojiOpen((prev) => !prev);
      if (isAttachmentOpen) setIsAttachmentOpen(false);
    };

    const toggleAttachmentPicker = () => {
      setIsAttachmentOpen((prev) => !prev);
      if (isEmojiOpen) setIsEmojiOpen(false);
    };

    const handleEmojiClick = (emoji) => {
      setInputValue((prev) => prev + emoji);
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

    useEffect(() => {
      const scrollContainer = selectedImagesRef.current;

      const handleWheel = (event) => {
        if (scrollContainer) {
          event.preventDefault();
          scrollContainer.scrollLeft -= event.deltaY;
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
        ref={ref}
        className={cn(chatInputVariants({ variant, className }))}
        style={{
          width: `${260 * scale}px`,
          height: `${35 * scale}px`,
          gap: `${5 * scale}px`,
        }}
        {...props}
      >
        {selectedImages.length > 0 && (
          <div
            ref={selectedImagesRef}
            className="absolute flex items-center bg-transparent overflow-x-auto"
            style={{
              width: `${200 * scale}px`,
              height: `${45 * scale}px`,
              gap: `${5 * scale}px`,
              bottom: `${42 * scale}px`,
              left: `${10 * scale}px`,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth',
            }}
          >
            <style>
              {`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>

            {selectedImages.map((imgSrc, index) => (
              <div
                key={index}
                className="relative group shrink-0 cursor-pointer overflow-hidden transition-all"
                style={{
                  width: `${45 * scale}px`,
                  height: `${45 * scale}px`,
                  borderRadius: `${5 * scale}px`,
                }}
                onClick={() => handleRemoveImage(index)}
              >
                <img
                  src={imgSrc}
                  alt={`selected-${index}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#FF383C]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    icon="fi-ss-trash"
                    iconSize={`${15 * scale}px`}
                    iconColor="#FFFFFF"
                    className="pointer-events-none p-0!"
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {isEmojiOpen && (
          <div
            ref={emojiRef}
            className="absolute z-50 flex flex-wrap content-start overflow-y-auto bg-slot-free shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]"
            style={{
              width: `${222 * scale}px`,
              height: `${95.86 * scale}px`,
              padding: `${10 * scale}px`,
              borderRadius: `${10 * scale}px`,
              bottom: `${45 * scale}px`,
              right: `${40 * scale}px`,
              gap: `${6 * scale}px`,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {EMOJIS.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                className="flex items-center justify-center outline-none hover:scale-110 transition-transform"
                style={{
                  fontSize: `${14 * scale}px`,
                  width: `${18 * scale}px`,
                  height: `${18 * scale}px`,
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {isAttachmentOpen && (
          <div
            ref={attachmentRef}
            className="absolute z-50 grid grid-cols-2 grid-rows-3 bg-slot-free shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)]"
            style={{
              width: `${222 * scale}px`,
              height: `${215 * scale}px`,
              padding: `${5 * scale}px`,
              gap: `${5 * scale}px`,
              borderRadius: `${10 * scale}px`,
              bottom: `${45 * scale}px`,
              right: `${40 * scale}px`,
            }}
          >
            {MOCK_IMAGES.map((imgSrc, index) => (
              <button
                key={index}
                onClick={() => handleAttachmentClick(imgSrc)}
                className="outline-none relative overflow-hidden flex items-center justify-center hover:opacity-80 transition-opacity"
                style={{
                  width: `${103.5 * scale}px`,
                  height: `${65 * scale}px`,
                  borderRadius: `${5 * scale}px`,
                }}
              >
                <img
                  src={imgSrc}
                  alt={`attachment-${index}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div
          className="flex items-center w-full h-full border border-white/10 backdrop-blur-[10px] bg-[#313238]/65 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] transition-all"
          style={{
            width: `${220 * scale}px`,
            borderRadius: `${25 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
            paddingTop: `${5 * scale}px`,
            paddingBottom: `${5 * scale}px`,
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Text Message"
            className="flex-1 bg-transparent outline-none text-white w-full h-full placeholder:text-white/50"
            style={{
              fontSize: `${8 * scale}px`,
              fontWeight: 400,
            }}
          />
          <div
            className="flex items-center shrink-0"
            style={{ gap: `${8 * scale}px` }}
          >
            <Button
              variant="ghost"
              icon="fi-rs-mode-landscape"
              iconSize={`${12 * scale}px`}
              onClick={toggleAttachmentPicker}
              className="p-0!"
              iconClassName={cn(
                'transition-colors',
                isAttachmentOpen
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80'
              )}
            />

            <Button
              variant="ghost"
              icon="fi-rs-meh"
              iconSize={`${12 * scale}px`}
              onClick={toggleEmojiPicker}
              className="p-0!"
              iconClassName={cn(
                'transition-colors',
                isEmojiOpen ? 'text-white' : 'text-white/50 hover:text-white/80'
              )}
            />
          </div>
        </div>

        <Button
          variant="iconButton"
          icon="fi-rs-paper-plane"
          iconSize={`${13 * scale}px`}
          className={cn(
            'shrink-0 border border-white/10 rounded-full outline-none transition-all duration-300',
            isReadyToSend
              ? 'bg-[#315DFF]/80 hover:bg-[#315DFF] hover:scale-105 active:scale-95'
              : 'bg-[#313238]/65 cursor-default'
          )}
          iconClassName={cn(
            'transition-all',
            isReadyToSend
              ? 'text-white hover:translate-x-0.5 hover:-translate-y-0.5'
              : 'text-white/50'
          )}
          style={{
            width: `${34.67 * scale}px`,
            height: `${34.67 * scale}px`,
          }}
        />
      </div>
    );
  }
);

ChatInput.displayName = 'ChatInput';

ChatInput.propTypes = {
  scale: PropTypes.number,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
};

export default ChatInput;
