import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import SearchActionBar from '@/shared/components/ui/SearchActionBar.jsx';
import BleeterPost from '@/features/Bleeter/components/BleeterPost.jsx';
import ActionPostBar from '@/features/Bleeter/components/ActionPostBar.jsx';
import RepliesPage from '@/features/Bleeter/pages/RepliesPage.jsx';

import BleeterLogo from '@/assets/images/image2.png';
import image from '@/assets/images/image.png';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------
const mockBleets = [
  {
    id: 1,
    authorName: 'Eddie Marshall',
    authorHandle: '@Eddie_Marshall',
    authorAvatar: image, // Test avatar
    timeAgo: '2h',
    content: 'Look at this!',
    image: image, // Test landscape image
    likes: 10,
    rebleets: 2,
    replies: 5,
    isLiked: false,
  },
  {
    id: 2,
    authorName: 'Sarah Walker',
    authorHandle: '@Sarah_W',
    authorAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    timeAgo: '3h',
    likes: 45,
    rebleets: 12,
    replies: 8,
    isLiked: true,
    rebleetData: {
      originalAuthor: '@Mr_Kebun',
      content:
        'Maecenas efficitur tellus nunc, a accumsan augue varius quis. Aenean in metus eget tellus condimentum pharetra at nec quam. Vestibulum vitae lacus lacus.',
    },
  },
  {
    id: 3,
    authorName: 'John Carter',
    authorHandle: '@JCarter99',
    authorAvatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
    timeAgo: '5h',
    content: 'Just had the best coffee in Los Santos! ☕️',
    likes: 112,
    rebleets: 5,
    replies: 20,
    isLiked: false,
  },
  {
    id: 4,
    authorName: 'Michael De Santa',
    authorHandle: '@Michael_DS',
    authorAvatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    timeAgo: '15m',
    content:
      'Absolutely right! The traffic in Vinewood is getting out of hand lately. We need a solution. 🚗💨', // Text written by the user on the rebleet
    likes: 89,
    rebleets: 24,
    replies: 15,
    isLiked: false,
    rebleetData: {
      originalAuthor: '@LSTransit_Official',
      content:
        'Major delays reported on Vinewood Boulevard due to an ongoing movie shoot. Please use alternate routes and drive safely! 🎬🚧',
    },
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function BleeterPage({ scale = 1, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [rebleetContext, setRebleetContext] = useState(null);

  // State to manage the display of the replies page
  const [activeReplyPost, setActiveReplyPost] = useState(null);

  const filteredBleets = useMemo(() => {
    if (!searchQuery.trim()) return mockBleets;
    const lowerQuery = searchQuery.toLowerCase();

    return mockBleets.filter((post) => {
      const matchName = post.authorName.toLowerCase().includes(lowerQuery);
      const matchHandle = post.authorHandle.toLowerCase().includes(lowerQuery);
      const matchContent = post.content?.toLowerCase().includes(lowerQuery);
      const matchRebleet = post.rebleetData?.content
        ?.toLowerCase()
        .includes(lowerQuery);

      return matchName || matchHandle || matchContent || matchRebleet;
    });
  }, [searchQuery]);

  const handleLike = useCallback((id) => console.log('Liked post:', id), []);

  const handleRebleet = useCallback((post) => {
    setRebleetContext({
      originalAuthor: post.authorHandle,
    });
    setIsComposing(true);
  }, []);

  // Reply button click handler
  const handleReply = useCallback((id) => {
    const postToReply = mockBleets.find((p) => p.id === id);
    if (postToReply) {
      setActiveReplyPost(postToReply);
    }
  }, []);

  // Handler to return from the replies page
  const handleCloseReplies = useCallback(() => {
    setActiveReplyPost(null);
  }, []);

  const handleCloseComposer = useCallback(() => {
    setIsComposing(false);
    setRebleetContext(null);
  }, []);

  const handleCreatePost = useCallback(
    (postData) => {
      console.log('New Post Data:', postData);
      handleCloseComposer();
    },
    [handleCloseComposer]
  );

  // Conditional rendering for the replies page
  if (activeReplyPost) {
    return (
      <RepliesPage
        scale={scale}
        post={activeReplyPost}
        onBack={handleCloseReplies}
      />
    );
  }

  // Render the main list
  return (
    <div className="flex flex-col items-center w-full h-full bg-app overflow-hidden relative">
      <div
        className="flex flex-col relative h-full w-full"
        style={{ width: `${265 * scale}px` }}
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {/* Header Section */}
        <div
          className="shrink-0 w-full relative z-20 transition-all"
          style={{ padding: `${20 * scale}px ${10 * scale}px ${10 * scale}px` }}
        >
          <div className="flex items-center" style={{ gap: `${8 * scale}px` }}>
            <img
              src={BleeterLogo}
              alt="Bleeter Logo"
              style={{
                width: `${25 * scale}px`,
                height: `${25 * scale}px`,
                borderRadius: `${5 * scale}px`,
              }}
              className="object-cover shrink-0 cursor-pointer"
              onClick={onClose}
            />
            <span
              className="font-bold text-white leading-none"
              style={{ fontSize: `${16 * scale}px` }}
            >
              Bleeter
            </span>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex flex-col items-center flex-1 overflow-y-auto hide-scrollbar">
          <div
            className="flex flex-col items-center w-full transition-all"
            style={{
              gap: `${10 * scale}px`,
              paddingBottom: isComposing
                ? `${190 * scale}px`
                : `${80 * scale}px`,
            }}
          >
            {filteredBleets.map((post) => (
              <BleeterPost
                key={post.id}
                scale={scale}
                post={post}
                onLike={handleLike}
                onRebleet={handleRebleet}
                onReply={handleReply}
              />
            ))}
          </div>
        </div>

        {/* Bottom Action Bar Area */}
        <div
          className="absolute bottom-0 left-0 w-full flex justify-center z-20 pointer-events-none transition-all duration-300"
          style={{ padding: `0 ${10 * scale}px ${20 * scale}px` }}
        >
          <div className="pointer-events-auto w-full flex justify-center">
            {isComposing ? (
              <ActionPostBar
                scale={scale}
                onSubmit={handleCreatePost}
                rebleetContext={rebleetContext}
              />
            ) : (
              <SearchActionBar
                scale={scale}
                value={searchQuery}
                onChange={setSearchQuery}
                onActionClick={() => setIsComposing(true)}
                placeholder="Search something ..."
                searchIconColor="#315DFF"
                showAction={true}
              />
            )}
          </div>
        </div>

        {/* Overlay for Composer */}
        {isComposing && (
          <div
            className="absolute inset-0 z-10"
            onClick={handleCloseComposer}
          />
        )}
      </div>
    </div>
  );
}

BleeterPage.propTypes = {
  scale: PropTypes.number,
  onClose: PropTypes.func,
};
