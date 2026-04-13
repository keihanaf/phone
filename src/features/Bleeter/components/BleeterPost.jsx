import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const actionButtonVariants = cva(
  'flex items-center bg-transparent border-none cursor-pointer transition-all hover:opacity-80 active:scale-95'
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function BleeterPost({
  scale = 1,
  post,
  onLike,
  onRebleet,
  onReply,
  className,
}) {
  const {
    authorName,
    authorHandle,
    authorAvatar,
    timeAgo,
    content,
    image,
    likes,
    rebleets,
    replies,
    isLiked,
    rebleetData,
  } = post;

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden bg-one shadow-md',
        className
      )}
      style={{
        width: `${245 * scale}px`,
        borderRadius: `${10 * scale}px`,
      }}
    >
      {/* Top Content Section */}
      <div
        className="flex flex-col items-center"
        style={{
          width: `${245 * scale}px`,
          padding: `${5 * scale}px ${10 * scale}px`,
          gap: `${9 * scale}px`,
        }}
      >
        {/* Inner Wrapper */}
        <div
          className="flex flex-col"
          style={{
            width: `${225 * scale}px`,
            padding: `${5 * scale}px 0`,
            gap: `${10 * scale}px`,
          }}
        >
          {/* User Header */}
          <div
            className="flex items-start justify-between w-full"
            style={{ height: `${30 * scale}px` }}
          >
            {/* Left: Avatar & Info */}
            <div
              className="flex items-center h-full"
              style={{ gap: `${5 * scale}px` }}
            >
              <img
                src={authorAvatar}
                alt={authorName}
                className="object-cover shrink-0"
                style={{
                  width: `${30 * scale}px`,
                  height: `${30 * scale}px`,
                  borderRadius: `${5 * scale}px`,
                }}
              />
              <div className="flex flex-col justify-center">
                <span
                  className="font-bold text-white leading-tight"
                  style={{ fontSize: `${10 * scale}px` }}
                >
                  {authorName}
                </span>
                <span
                  className="font-normal leading-tight text-muted"
                  style={{
                    fontSize: `${6 * scale}px`,
                  }}
                >
                  {authorHandle}
                </span>
              </div>
            </div>

            {/* Right: Time */}
            <span
              className="font-normal text-muted"
              style={{
                fontSize: `${8 * scale}px`,
                marginTop: `${2 * scale}px`,
              }}
            >
              {timeAgo}
            </span>
          </div>

          {/* Post Content (Text) */}
          {content && (
            <span
              className="font-normal text-white text-left wrap-break-word"
              style={{ fontSize: `${8 * scale}px` }}
            >
              {content}
            </span>
          )}

          {/* Post Image (If available and NOT a rebleet) */}
          {image && !rebleetData && (
            <img
              src={image}
              alt="Post media"
              className="object-cover w-full shrink-0"
              style={{
                width: `${225 * scale}px`,
                height: `${149.09 * scale}px`,
                borderRadius: `${5 * scale}px`,
              }}
            />
          )}

          {/* Rebleet Box Variant */}
          {rebleetData && (
            <div
              className="flex flex-col w-full bg-six"
              style={{
                padding: `${5 * scale}px ${10 * scale}px`,
                borderLeft: `${2 * scale}px solid #315DFF`,
                borderRadius: `0 ${4 * scale}px ${4 * scale}px 0`,
              }}
            >
              <span
                className="font-medium text-muted"
                style={{
                  fontSize: `${6 * scale}px`,
                  marginBottom: `${3 * scale}px`,
                }}
              >
                RB {rebleetData.originalAuthor}
              </span>
              <span
                className="font-normal text-white text-left wrap-break-word"
                style={{
                  fontSize: `${8 * scale}px`,
                  lineHeight: 1.4,
                }}
              >
                {rebleetData.content}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div
        className="flex items-center justify-between mt-auto w-full bg-six"
        style={{
          height: `${20 * scale}px`,
          padding: `${5 * scale}px ${30 * scale}px`,
        }}
      >
        {/* Like Button */}
        <button
          type="button"
          onClick={() => onLike?.(post.id)}
          className={cn(actionButtonVariants())}
          style={{ gap: `${5 * scale}px` }}
        >
          <i
            className={cn(
              'flex items-center justify-center',
              isLiked ? 'fi fi-ss-heart' : 'fi fi-rs-heart'
            )}
            style={{
              fontSize: `${10 * scale}px`,
              color: isLiked ? '#FF383C' : 'var(--color-muted)',
            }}
          />
          <span
            className="font-normal text-white"
            style={{ fontSize: `${6 * scale}px` }}
          >
            {likes} Likes
          </span>
        </button>

        {/* Rebleet Button */}
        <button
          type="button"
          onClick={() => onRebleet?.(post)}
          className={cn(actionButtonVariants())}
          style={{ gap: `${5 * scale}px` }}
        >
          <i
            className="fi fi-rs-refresh flex items-center text-muted justify-center"
            style={{
              fontSize: `${10 * scale}px`,
            }}
          />
          <span
            className="font-normal text-white"
            style={{ fontSize: `${6 * scale}px` }}
          >
            {rebleets} Rebleet
          </span>
        </button>

        {/* Reply Button */}
        <button
          type="button"
          onClick={() => onReply?.(post.id)}
          className={cn(actionButtonVariants())}
          style={{ gap: `${5 * scale}px` }}
        >
          <i
            className="fi fi-rs-redo flex items-center justify-center text-muted"
            style={{
              fontSize: `${10 * scale}px`,
            }}
          />
          <span
            className="font-normal text-white"
            style={{ fontSize: `${6 * scale}px` }}
          >
            {replies} Replies
          </span>
        </button>
      </div>
    </div>
  );
}

BleeterPost.propTypes = {
  scale: PropTypes.number,
  className: PropTypes.string,
  onLike: PropTypes.func,
  onRebleet: PropTypes.func,
  onReply: PropTypes.func,
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    authorName: PropTypes.string.isRequired,
    authorHandle: PropTypes.string.isRequired,
    authorAvatar: PropTypes.string.isRequired,
    timeAgo: PropTypes.string.isRequired,
    content: PropTypes.string,
    image: PropTypes.string,
    likes: PropTypes.number,
    rebleets: PropTypes.number,
    replies: PropTypes.number,
    isLiked: PropTypes.bool,
    rebleetData: PropTypes.shape({
      originalAuthor: PropTypes.string,
      content: PropTypes.string,
    }),
  }).isRequired,
};
