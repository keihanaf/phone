import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const actionButtonVariants = cva(
  'flex items-center justify-center bg-transparent border-none p-0 cursor-pointer transition-all hover:opacity-80 active:scale-95 w-auto shrink-0'
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function BleeterThreadNode({
  scale = 1,
  post,
  depth = 0,
  onReply,
}) {
  const {
    id,
    authorName,
    authorHandle,
    authorAvatar,
    timeAgo,
    content,
    image,
    likes,
    rebleets,
    isLiked,
    repliesList,
  } = post;

  const isMain = depth === 0;
  const hasReplies = repliesList && repliesList.length > 0;

  return (
    <div
      className="flex w-full"
      style={{
        gap: `${9 * scale}px`,
        marginTop: !isMain ? `${15 * scale}px` : 0,
      }}
    >
      {/* 1. Left Column: Avatar & Thread Line */}
      <div
        className="flex flex-col items-center shrink-0"
        style={{ width: `${20 * scale}px` }}
      >
        <img
          src={authorAvatar}
          alt={authorName}
          className="object-cover shrink-0 z-10 relative"
          style={{
            width: `${20 * scale}px`,
            height: `${20 * scale}px`,
            borderRadius: `${5 * scale}px`,
          }}
        />

        {/* Vertical line connecting nested replies */}
        {hasReplies && (
          <div
            className="flex-1 w-full flex justify-center"
            style={{
              marginTop: `${10 * scale}px`,
            }}
          >
            <div
              className="h-full rounded-full bg-border"
              style={{
                width: `${1.5 * scale}px`,
              }}
            />
          </div>
        )}
      </div>

      {/* 2. Right Column: Content & Nested Replies */}
      <div className="flex flex-col flex-1">
        {/* Header Section */}
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <span
              className="font-bold text-white leading-none"
              style={{ fontSize: `${10 * scale}px` }}
            >
              {authorName}
            </span>
            <span
              className="font-normal leading-none text-muted"
              style={{
                fontSize: `${6 * scale}px`,
                marginTop: `${3 * scale}px`,
              }}
            >
              {authorHandle}
            </span>
          </div>
          <span
            className="font-normal leading-none text-muted"
            style={{
              fontSize: `${8 * scale}px`,
              marginTop: `${1 * scale}px`,
            }}
          >
            {timeAgo}
          </span>
        </div>

        {/* Post Content (Text) */}
        {content && (
          <span
            className="font-normal text-white wrap-break-word leading-tight"
            style={{
              fontSize: `${8 * scale}px`,
              marginTop: `${6 * scale}px`,
            }}
          >
            {content}
          </span>
        )}

        {/* Post Image */}
        {image && (
          <img
            src={image}
            alt="Post media"
            className="object-cover w-full shrink-0"
            style={{
              height: `${149.09 * scale}px`,
              borderRadius: `${5 * scale}px`,
              marginTop: `${8 * scale}px`,
            }}
          />
        )}

        {/* Action Buttons */}
        <div
          className={cn(
            'flex items-center w-full',
            isMain ? 'justify-end' : 'justify-end'
          )}
          style={{
            gap: `${10 * scale}px`,
            marginTop: `${10 * scale}px`,
            height: `${10 * scale}px`,
          }}
        >
          {/* Like Button */}
          <button
            type="button"
            className={cn(actionButtonVariants())}
            style={{
              height: `${10 * scale}px`,
              gap: `${5 * scale}px`,
            }}
          >
            <i
              className={cn(
                'fi flex items-center justify-center',
                isLiked ? 'fi-ss-heart' : 'fi-rs-heart'
              )}
              style={{
                fontSize: `${10 * scale}px`,
                color: isLiked ? '#FF383C' : 'var(--color-muted)',
              }}
            />
            <span
              className="font-normal flex items-center text-muted"
              style={{
                fontSize: `${6 * scale}px`,
                height: '100%',
              }}
            >
              {likes}
            </span>
          </button>

          {/* Rebleet Button (Only visible on Main post) */}
          {isMain && (
            <button
              type="button"
              className={cn(actionButtonVariants())}
              style={{
                height: `${10 * scale}px`,
                gap: `${5 * scale}px`,
              }}
            >
              <i
                className="fi fi-rs-refresh flex items-center justify-center text-muted"
                style={{
                  fontSize: `${10 * scale}px`,
                }}
              />
              <span
                className="font-normal flex items-center text-muted"
                style={{
                  fontSize: `${6 * scale}px`,
                  height: '100%',
                }}
              >
                {rebleets}
              </span>
            </button>
          )}

          {/* Reply Button -> Trigger onReply with id */}
          <button
            type="button"
            onClick={() => onReply?.(id)}
            className={cn(actionButtonVariants())}
            style={{ height: `${10 * scale}px` }}
          >
            <i
              className="fi fi-rs-redo flex items-center justify-center text-muted"
              style={{
                fontSize: `${10 * scale}px`,
              }}
            />
          </button>
        </div>

        {/* Nested Replies (Recursive Rendering) */}
        {hasReplies && (
          <div className="flex flex-col w-full mt-1">
            {repliesList.map((reply) => (
              <BleeterThreadNode
                key={reply.id}
                scale={scale}
                post={reply}
                depth={depth + 1}
                onReply={onReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

BleeterThreadNode.propTypes = {
  scale: PropTypes.number,
  depth: PropTypes.number,
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
    isLiked: PropTypes.bool,
    repliesList: PropTypes.array,
  }).isRequired,
};
