import { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import PageHeader from '@/shared/components/ui/PageHeader.jsx';
import YellowjackCard from '@/features/YellowJack/components/YellowjackCard.jsx';
import SearchActionBar from '@/shared/components/ui/SearchActionBar.jsx';
import YellowJackDetail from '@/features/YellowJack/pages/YellowJackDetail.jsx';
import CreateNewAd from '@/features/YellowJack/pages/CreateNewAd.jsx';
import image from '@/assets/images/image.png';

const mockPosts = [
  {
    id: 1,
    type: 'selling',
    title: 'Premium Whiskey Bottle',
    subtitle: 'Fresh imported whiskey available at Yellow Jack.',
    time: '5 min ago',
    userName: 'Eddie Marshall',
    price: 'Negotiable',
    imageUrl: image,
  },
  {
    id: 2,
    type: 'buying',
    title: 'Looking for Beer Supply',
    subtitle: 'Need multiple beer boxes for weekend party.',
    time: '20 min ago',
    userName: 'John Carter',
    price: '80',
  },
  {
    id: 3,
    type: 'selling',
    title: 'Classic Bourbon',
    subtitle: 'Limited edition bourbon bottle available.',
    time: '1 hour ago',
    userName: 'Sarah Walker',
    price: '240',
    imageUrl:
      'https://images.unsplash.com/photo-1584225064536-d0fbc0a10f18?w=800',
  },
  {
    id: 4,
    type: 'buying',
    title: 'Bar Equipment Needed',
    subtitle: 'Searching for cocktail shaker and bar tools.',
    time: '2 hours ago',
    userName: 'Mike Dawson',
    price: '60',
    imageUrl:
      'https://images.unsplash.com/photo-1514361892635-cebbd9c0b3a2?w=800',
  },
];

export default function YellowJackPage({ scale = 1, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState(null);
  // 2. Create state to manage the ad creation page visibility
  const [isCreating, setIsCreating] = useState(false);

  // Handlers for post detail view
  const handleCardClick = useCallback((post) => {
    setActivePost(post);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setActivePost(null);
  }, []);

  // 3. Handlers to open and close the ad creation page
  const handleOpenCreate = useCallback(() => {
    setIsCreating(true);
  }, []);

  const handleCloseCreate = useCallback(() => {
    setIsCreating(false);
  }, []);

  // Memoized filtered posts for better performance on search
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return mockPosts;
    const lowerQuery = searchQuery.toLowerCase();
    return mockPosts.filter((post) =>
      post.title.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  // 4. Conditional rendering for the ad creation page
  if (isCreating) {
    return <CreateNewAd scale={scale} onBack={handleCloseCreate} />;
  }

  // Conditional rendering for the detail page
  if (activePost) {
    return (
      <YellowJackDetail
        scale={scale}
        post={activePost}
        onBack={handleCloseDetail}
      />
    );
  }

  // Render the main list of cards
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
            title={
              <span
                className="font-bold"
                style={{ fontSize: `${16 * scale}px` }}
              >
                <span style={{ color: '#FFCC00' }}>Yellow</span>
                <span className="text-white">Jack</span>
              </span>
            }
          />
        </div>

        {/* Scrollable Content (List View) */}
        <div className="flex flex-col items-center flex-1 overflow-y-auto hide-scrollbar">
          <div
            className="flex flex-col items-center w-full"
            style={{
              gap: `${10 * scale}px`,
              paddingBottom: `${80 * scale}px`,
            }}
          >
            {filteredPosts.map((post) => (
              <YellowjackCard
                key={post.id}
                scale={scale}
                type={post.type}
                title={post.title}
                subtitle={post.subtitle}
                time={post.time}
                userName={post.userName}
                price={post.price}
                imageUrl={post.imageUrl}
                onClick={() => handleCardClick(post)}
              />
            ))}

            {filteredPosts.length === 0 && (
              <div
                className="text-center mt-10 text-muted"
                style={{ fontSize: `${12 * scale}px` }}
              >
                No results found.
              </div>
            )}
          </div>
        </div>

        {/* Bottom Search Action Bar */}
        <div
          className="absolute bottom-0 left-0 w-full flex justify-center z-20 pointer-events-none transition-all duration-300"
          style={{
            paddingBottom: `${20 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
          }}
        >
          <div className="pointer-events-auto w-full flex justify-center">
            <SearchActionBar
              scale={scale}
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search something ..."
              searchIconColor="#FFCC00"
              showAction={true}
              // 5. Pass handler to the '+' action button
              onActionClick={handleOpenCreate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

YellowJackPage.propTypes = {
  scale: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};
