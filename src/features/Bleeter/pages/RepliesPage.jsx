import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@/shared/components/ui/PageHeader.jsx';
import BleeterThreadNode from '@/features/Bleeter/components/BleeterThreadNode.jsx';
import ActionPostBar from '@/features/Bleeter/components/ActionPostBar.jsx';

// ==========================================
// MOCK DATA
// ==========================================
const MOCK_DEEP_REPLIES = [
  {
    id: 101,
    authorName: 'Jimmy',
    authorHandle: '@Jim_Underwood',
    authorAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    timeAgo: '2h',
    content:
      "This is the start of a massive thread! Let's see how deep it goes.",
    likes: 145,
    isLiked: true,
    repliesList: [
      {
        id: 1011,
        authorName: 'Eddie Marshall',
        authorHandle: '@Eddie_Marshall',
        authorAvatar:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
        timeAgo: '1h',
        content: 'I agree! The UI looks super clean now.',
        likes: 32,
        isLiked: false,
      },
    ],
  },
  {
    id: 102, // Sibling to Jimmy
    authorName: 'Amanda',
    authorHandle: '@Mandy_99',
    authorAvatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    timeAgo: '3h',
    content: 'Here is another top-level reply. Keeping things organized.',
    likes: 210,
    isLiked: false,
    repliesList: [
      {
        id: 1021,
        authorName: 'Franklin C.',
        authorHandle: '@Frankie_C',
        authorAvatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        timeAgo: '2h',
        content:
          'Yessir! We need to make sure the scrollbar hides properly when it gets this long.',
        likes: 45,
        isLiked: true,
        repliesList: [],
      },
    ],
  },
  {
    id: 103,
    authorName: 'Lamar Davis',
    authorHandle: '@LD_Original',
    authorAvatar:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150',
    timeAgo: '4h',
    content:
      "Man, this thread is getting crazy long. Just scrolling through to check the padding at the bottom. Gotta make sure the composer doesn't cover the last message!",
    likes: 500,
    isLiked: true,
    repliesList: [],
  },
  {
    id: 104,
    authorName: 'Trevor P.',
    authorHandle: '@TP_Industries',
    authorAvatar:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    timeAgo: '5h',
    content: 'Brought some scenery for the bottom of the thread!',
    image:
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=300&q=80',
    likes: 1024,
    isLiked: false,
    repliesList: [],
  },
];

// ==========================================
// Helper Functions
// ==========================================
const addReplyToTree = (node, targetId, newReply) => {
  if (node.id === targetId) {
    return {
      ...node,
      repliesList: [...(node.repliesList || []), newReply],
    };
  }
  if (node.repliesList && node.repliesList.length > 0) {
    return {
      ...node,
      repliesList: node.repliesList.map((child) =>
        addReplyToTree(child, targetId, newReply)
      ),
    };
  }
  return node;
};

export default function RepliesPage({ scale = 1, post, onBack }) {
  // Tree data state
  const [threadData, setThreadData] = useState({
    ...post,
    // If the passed post has no replies, use the massive mock data for testing
    repliesList:
      post?.repliesList?.length > 0 ? post.repliesList : MOCK_DEEP_REPLIES,
  });

  const [replyingToId, setReplyingToId] = useState(null);

  const handleReplyClick = useCallback((id) => {
    setReplyingToId(id);
  }, []);

  const handleCloseComposer = useCallback(() => {
    setReplyingToId(null);
  }, []);

  const handleCreateReply = useCallback(
    (postData) => {
      if (!replyingToId) return;

      const newReply = {
        id: Date.now(),
        authorName: 'You',
        authorHandle: '@You',
        authorAvatar:
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        timeAgo: 'Just now',
        content: postData.content,
        image:
          postData.images && postData.images.length > 0
            ? postData.images[0]
            : null,
        likes: 0,
        isLiked: false,
        repliesList: [],
      };

      setThreadData((prevData) =>
        addReplyToTree(prevData, replyingToId, newReply)
      );

      handleCloseComposer();
    },
    [replyingToId, handleCloseComposer]
  );

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
          className="shrink-0 w-full relative z-20 transition-all flex justify-center"
          style={{ padding: `${20 * scale}px ${10 * scale}px ${10 * scale}px` }}
        >
          <div
            className="relative w-full"
            style={{ width: `${245 * scale}px` }}
          >
            <PageHeader
              scale={scale}
              onLeftClick={onBack}
              leftIcon="fi-br-angle-left"
              showRightButton={false}
            />
            <span
              className="absolute font-bold text-white pointer-events-none"
              style={{
                left: `${33 * scale}px`,
                fontSize: `${16 * scale}px`,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              Replies
            </span>
          </div>
        </div>

        {/* Scrollable Thread Content */}
        <div className="flex flex-col items-center flex-1 overflow-y-auto hide-scrollbar relative z-10">
          <div
            className="flex flex-col items-center w-full transition-all"
            style={{
              paddingBottom: replyingToId
                ? `${190 * scale}px`
                : `${20 * scale}px`,
              paddingLeft: `${10 * scale}px`,
              paddingRight: `${10 * scale}px`,
            }}
          >
            <div
              className="w-full flex flex-col shrink-0 bg-one"
              style={{
                width: `${245 * scale}px`,
                padding: `${10 * scale}px`,
                borderRadius: `${10 * scale}px`,
              }}
            >
              <BleeterThreadNode
                scale={scale}
                post={threadData}
                depth={0}
                onReply={handleReplyClick}
              />
            </div>
          </div>
        </div>

        {/* Bottom Action Post Bar */}
        {replyingToId && (
          <div
            className="absolute bottom-0 left-0 w-full flex justify-center z-30 transition-all duration-300 pointer-events-none"
            style={{ padding: `0 ${10 * scale}px ${20 * scale}px` }}
          >
            <div className="pointer-events-auto w-full flex justify-center">
              <ActionPostBar
                scale={scale}
                onSubmit={handleCreateReply}
                onCancel={handleCloseComposer}
              />
            </div>
          </div>
        )}

        {/* Overlay */}
        {replyingToId && (
          <div
            className="absolute inset-0 z-20"
            onClick={handleCloseComposer}
          />
        )}
      </div>
    </div>
  );
}

RepliesPage.propTypes = {
  scale: PropTypes.number,
  post: PropTypes.object,
  onBack: PropTypes.func.isRequired,
};
