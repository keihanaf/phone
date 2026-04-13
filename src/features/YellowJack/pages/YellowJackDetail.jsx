import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';
import { useAppLauncher } from '@/shared/context/AppLauncherContext.jsx';
import PageHeader from '@/shared/components/ui/PageHeader.jsx';
// eslint-disable-next-line
import { motion, useScroll, useTransform } from 'framer-motion';

// 1. Badge variant configurations
const badgeVariants = cva(
  'flex items-center justify-center border font-medium capitalize',
  {
    variants: {
      type: {
        selling: 'bg-[#FFCC00]/30 border-[#FFCC00]/75 text-[#FFCC00]',
        buying: 'bg-[#34C759]/30 border-[#34C759]/50 text-[#34C759]',
      },
    },
    defaultVariants: {
      type: 'selling',
    },
  }
);

// 2. Icon color variant configurations
const iconColorVariants = cva('fi flex justify-center items-center shrink-0', {
  variants: {
    type: {
      selling: 'text-[#FFCC00]',
      buying: 'text-[#34C759]',
    },
  },
  defaultVariants: {
    type: 'selling',
  },
});

// 3. Helper function to format price
const formatPrice = (value) => {
  if (value === null || value === undefined) return '';
  const numericValue = Number(value);
  if (!isNaN(numericValue) && value.toString().trim() !== '') {
    return numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  return value;
};

export default function YellowJackDetail({ scale = 1, post, onBack }) {
  const { setIsFullscreen, headerOffset } = useAppLauncher();
  const scrollRef = useRef(null);

  const hasImage = !!post.imageUrl;
  const postType = post.type?.toLowerCase() === 'buying' ? 'buying' : 'selling';

  useEffect(() => {
    setIsFullscreen(hasImage);
    return () => setIsFullscreen(false);
  }, [hasImage, setIsFullscreen]);

  // Base dimensions
  const imageHeight = 170 * scale;
  const imageWidth = 280 * scale;
  const contentWidth = 265 * scale;

  // Precise gap calculations for states with and without image
  const headerTopPosition = hasImage ? headerOffset + 20 * scale : 20 * scale;

  // Approximate header height + safe spacing to panel
  const safeHeaderSpace = 50 * scale;

  // Top spacing above content panel (Spacer Height)
  const imageTopSpace = headerOffset + imageHeight - 24 * scale;
  const noImageTopSpace = headerTopPosition + safeHeaderSpace;

  const currentTopSpace = hasImage ? imageTopSpace : noImageTopSpace;

  // Framer Motion hooks
  const { scrollY } = useScroll({ container: scrollRef });
  const imageOverlayOpacity = useTransform(scrollY, [0, imageHeight], [0, 0.6]);

  const bottomFrameStyles = {
    height: `${35 * scale}px`,
    paddingLeft: `${15 * scale}px`,
    paddingRight: `${15 * scale}px`,
    paddingTop: `${5 * scale}px`,
    paddingBottom: `${5 * scale}px`,
    borderRadius: `${25 * scale}px`,
    backgroundColor: 'var(--color-six)',
    border: `${1 * scale}px solid var(--color-border)`,
    backdropFilter: `blur(${10 * scale}px)`,
    WebkitBackdropFilter: `blur(${10 * scale}px)`,
    boxShadow: `0px ${4 * scale}px ${10 * scale}px 0px rgba(0, 0, 0, 0.25)`,
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-app overflow-hidden relative">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        className="flex flex-col relative h-full"
        style={{ width: `${contentWidth}px` }}
      >
        {/* Floating Header */}
        <div
          className="absolute w-full z-40 pointer-events-none"
          style={{
            top: `${headerTopPosition}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
          }}
        >
          <div className="pointer-events-auto">
            <PageHeader
              scale={scale}
              onLeftClick={onBack}
              showRightButton={false}
            />
          </div>
        </div>

        {/* Fixed Image Section (Only if image exists) */}
        {hasImage && (
          <div
            className="absolute top-0 overflow-hidden z-0"
            style={{
              height: `${headerOffset + imageHeight}px`,
              width: `${imageWidth}px`,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <img
              src={post.imageUrl}
              alt={post.title || 'Post Image'}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute bottom-0 left-0 w-full pointer-events-none z-10"
              style={{
                height: `${60 * scale}px`,
                background:
                  'linear-gradient(to top, var(--color-app) 0%, transparent 100%)',
              }}
            />
            <div
              className="absolute top-0 left-0 w-full pointer-events-none z-10"
              style={{
                height: `${80 * scale}px`,
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
              }}
            />
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none bg-one"
              style={{
                opacity: imageOverlayOpacity,
              }}
            />
          </div>
        )}

        {/* Main scroll container */}
        <div
          ref={scrollRef}
          className="absolute top-0 h-full overflow-y-auto hide-scrollbar z-20 flex flex-col items-center"
          style={{
            width: `${imageWidth}px`,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {/* Harmonized Spacer for both states */}
          <div
            className="shrink-0 w-full transition-all duration-300"
            style={{ height: `${currentTopSpace}px` }}
          />

          {/* Main content frame (Dark panel) */}
          <div
            className="relative flex flex-col items-center shrink-0 w-full overflow-y-auto hide-scrollbar bg-one"
            style={{
              width: `${275 * scale}px`,
              height: `calc(100% - ${hasImage ? headerOffset + 50 * scale : currentTopSpace}px)`,
              borderTopLeftRadius: `${15 * scale}px`,
              borderTopRightRadius: `${15 * scale}px`,
            }}
          >
            <div
              className="flex flex-col items-center w-full shrink-0"
              style={{
                paddingTop: `${20 * scale}px`,
                paddingBottom: `${100 * scale}px`,
              }}
            >
              <div
                className="flex flex-col"
                style={{
                  width: `${240 * scale}px`,
                  gap: `${20 * scale}px`,
                }}
              >
                {/* First Row */}
                <div
                  className="flex flex-col"
                  style={{ gap: `${6 * scale}px` }}
                >
                  <div className="flex flex-row justify-between items-center w-full">
                    <h1
                      className="font-bold text-white text-left truncate pr-2"
                      style={{ fontSize: `${14 * scale}px` }}
                    >
                      {post.title}
                    </h1>

                    <div
                      className={cn(badgeVariants({ type: postType }))}
                      style={{
                        width: `${53 * scale}px`,
                        height: `${19 * scale}px`,
                        borderRadius: `${5 * scale}px`,
                        borderWidth: `${1 * scale}px`,
                        fontSize: `${10 * scale}px`,
                      }}
                    >
                      {post.type}
                    </div>
                  </div>

                  <div
                    className="flex items-center"
                    style={{ gap: `${4 * scale}px` }}
                  >
                    <i
                      className={cn(
                        iconColorVariants({ type: postType }),
                        'fi-rs-clock'
                      )}
                      style={{ fontSize: `${10 * scale}px` }}
                    />
                    <span
                      className="font-normal text-muted"
                      style={{ fontSize: `${8 * scale}px` }}
                    >
                      {post.time}
                    </span>
                  </div>
                </div>

                {/* Description Section */}
                <div
                  className="flex flex-col"
                  style={{ gap: `${16 * scale}px` }}
                >
                  <div
                    className="flex flex-col"
                    style={{ gap: `${4 * scale}px` }}
                  >
                    <span
                      className="font-medium text-muted text-left"
                      style={{ fontSize: `${8 * scale}px` }}
                    >
                      Description
                    </span>
                    <span
                      className="font-normal text-white text-left"
                      style={{ fontSize: `${10 * scale}px`, lineHeight: 1.5 }}
                    >
                      {post.subtitle || 'No description provided.'}
                    </span>
                  </div>

                  <div
                    className="flex flex-col"
                    style={{ gap: `${4 * scale}px` }}
                  >
                    <span
                      className="font-medium text-muted text-left"
                      style={{ fontSize: `${8 * scale}px` }}
                    >
                      Full Detail
                    </span>
                    <span
                      className="font-normal text-white text-left"
                      style={{ fontSize: `${10 * scale}px`, lineHeight: 1.6 }}
                    >
                      {post.content || 'No details provided.'}
                    </span>
                  </div>

                  <div
                    className="flex flex-col"
                    style={{ gap: `${4 * scale}px` }}
                  >
                    <span
                      className="font-medium text-muted text-left"
                      style={{ fontSize: `${8 * scale}px` }}
                    >
                      Publisher
                    </span>
                    <div
                      className="flex items-center"
                      style={{ gap: `${4 * scale}px` }}
                    >
                      <span
                        className="font-normal text-white text-left"
                        style={{ fontSize: `${10 * scale}px`, lineHeight: 1.5 }}
                      >
                        {post.userName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div
          className="absolute bottom-0 left-0 w-full flex justify-center z-40 pointer-events-none"
          style={{
            paddingBottom: `${20 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
          }}
        >
          <div
            className="pointer-events-auto flex w-full justify-between items-center"
            style={{ gap: `${10 * scale}px` }}
          >
            <div
              className="flex flex-row items-center justify-center shrink-0"
              style={{
                ...bottomFrameStyles,
                width: 'fit-content',
              }}
            >
              <div
                className="flex items-center"
                style={{ gap: `${5 * scale}px` }}
              >
                <i
                  className="fi fi-rs-dollar flex items-center justify-center text-[#FFCC00]"
                  style={{ fontSize: `${13 * scale}px` }}
                />
                <span
                  className="text-white font-bold"
                  style={{ fontSize: `${12 * scale}px` }}
                >
                  {formatPrice(post.price)}
                </span>
              </div>
            </div>

            <div
              className="flex items-center justify-between shrink-0"
              style={{
                ...bottomFrameStyles,
                width: `${66 * scale}px`,
              }}
            >
              <button
                className="flex items-center justify-center hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                onClick={() => console.log('Comment Action')}
              >
                <i
                  className="fi fi-rs-comments text-white flex justify-center items-center"
                  style={{ fontSize: `${13 * scale}px` }}
                />
              </button>

              <button
                className="flex items-center justify-center hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                onClick={() => console.log('Contact Action')}
              >
                <i
                  className="fi fi-rs-phone-call text-white flex justify-center items-center"
                  style={{ fontSize: `${13 * scale}px` }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

YellowJackDetail.propTypes = {
  scale: PropTypes.number,
  post: PropTypes.shape({
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    type: PropTypes.oneOf(['selling', 'buying', 'Selling', 'Buying']),
    time: PropTypes.string,
    subtitle: PropTypes.string,
    content: PropTypes.string,
    userName: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};
