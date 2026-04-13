import { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/shared/utils/cn.js';

// Components
import PageHeader from '@/shared/components/ui/PageHeader.jsx';
import MessageItem from '@/features/Message/components/MessageItem.jsx';
import MessageSearched from '@/features/Message/pages/MessageSearched.jsx';
import MessageCreate from '@/features/Message/pages/MessageCreate.jsx';
import ChatPage from '@/features/Message/pages/ChatPage.jsx';
import SearchActionBar from '@/shared/components/ui/SearchActionBar.jsx';

// Mock Data
const MOCK_MESSAGES = [
  {
    id: 1,
    name: 'Yusuf Amir',
    image: '',
    lastMessage: 'Call me RIGHT NOW!',
    time: '0:25',
    topTime: 'Yesterday',
    status: '',
    isOutbound: false,
  },
  {
    id: 2,
    name: 'Eddie Marshall',
    image: '',
    lastMessage: 'I think we need to talk',
    time: 'Yesterday',
    topTime: 'Monday',
    status: 'Seen',
    isOutbound: true,
  },
  {
    id: 3,
    name: '',
    number: '0142 157 1357',
    image: '',
    lastMessage: 'This is me just writing until this box ends a...',
    time: 'Yesterday',
    topTime: 'Tuesday',
    status: 'Sent',
    isOutbound: true,
  },
  {
    id: 4,
    name: 'Joseph Cohl',
    image: '',
    lastMessage: 'Ok Bye.',
    time: 'Yesterday',
    topTime: '12/3',
    status: '',
    isOutbound: false,
  },
  {
    id: 5,
    name: 'Yusuf Amir',
    image: '',
    lastMessage: 'Call me RIGHT NOW!',
    time: 'Friday',
    status: '',
  },
  {
    id: 6,
    name: 'Eddie Marshall',
    image: '',
    lastMessage: 'I think we need to talk',
    time: 'Tuesday',
    status: 'Seen',
  },
  {
    id: 7,
    name: 'Joseph Cohl',
    image: '',
    lastMessage: 'Ok Bye.',
    time: '09/3',
    status: '',
  },
];

export default function MessagePage({ scale = 1, onClose }) {
  const [messages] = useState(MOCK_MESSAGES);
  const [searchQuery, setSearchQuery] = useState('');

  // States to manage view navigation
  const [isCreatingMessage, setIsCreatingMessage] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  // Handler for clicking a message to open the chat
  const handleMessageClick = useCallback((message) => {
    setActiveChat(message);
    setSearchQuery(''); // Optional: clear search when entering a chat
  }, []);

  // Handler for closing the chat view
  const handleCloseChat = useCallback(() => {
    setActiveChat(null);
  }, []);

  // Handler for clicking the add button in MessageBar
  const handleAddClick = useCallback(() => {
    setIsCreatingMessage(true);
  }, []);

  // Handler for the back button in MessageCreate
  const handleBackFromCreate = useCallback(() => {
    setIsCreatingMessage(false);
  }, []);

  // Handler for starting a new chat from MessageCreate
  const handleStartNewChat = useCallback((contact) => {
    setIsCreatingMessage(false);
    setActiveChat(contact); // Route directly to the chat page with the new contact
  }, []);

  // Filter messages based on the search query
  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const lowerQuery = searchQuery.toLowerCase();
    return messages.filter((msg) => {
      const targetName = msg.name || msg.number || '';
      return (
        targetName.toLowerCase().includes(lowerQuery) ||
        msg.lastMessage.toLowerCase().includes(lowerQuery)
      );
    });
  }, [messages, searchQuery]);

  const isSearching = searchQuery.trim().length > 0;
  const headerTitle = isSearching ? `"${searchQuery}"` : 'Messages';

  // Route 1: Active Chat View
  if (activeChat) {
    return (
      <ChatPage scale={scale} contact={activeChat} onBack={handleCloseChat} />
    );
  }

  // Route 2: Create Message View
  if (isCreatingMessage) {
    return (
      <MessageCreate
        scale={scale}
        onBack={handleBackFromCreate}
        onStartChat={handleStartNewChat}
      />
    );
  }

  // Default Route: Message List View
  return (
    <div
      className={cn(
        'flex flex-col items-center w-full h-full bg-app overflow-hidden relative'
      )}
    >
      <div
        className="flex flex-col relative h-full w-full"
        style={{ width: `${265 * scale}px` }}
      >
        {/* Header */}
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
            onLeftClick={onClose}
            title={headerTitle}
            showRightButton={false}
          />
        </div>

        {/* Scrollable List */}
        <div
          className="flex-1 flex flex-col items-center w-full z-0 overflow-y-auto hide-scrollbar"
          style={{
            paddingBottom: `${80 * scale}px`,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div
            className="flex flex-col w-full items-center"
            style={{ width: `${245 * scale}px` }}
          >
            {isSearching ? (
              <MessageSearched
                messages={filteredMessages}
                searchQuery={searchQuery}
                scale={scale}
                onMessageClick={handleMessageClick}
              />
            ) : (
              messages.map((msg, index) => (
                <MessageItem
                  key={msg.id}
                  message={msg}
                  scale={scale}
                  isFirst={index === 0}
                  isLast={index === messages.length - 1}
                  onClick={handleMessageClick}
                  variant="default"
                />
              ))
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={cn(
            'absolute bottom-0 left-0 w-full z-10 flex justify-center pointer-events-none transition-all duration-300 ease-in-out'
          )}
          style={{
            paddingBottom: `${20 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
          }}
        >
          <div className="flex justify-center pointer-events-auto w-full">
            <SearchActionBar
              scale={scale}
              value={searchQuery}
              onChange={setSearchQuery}
              onActionClick={handleAddClick}
              placeholder="Search messages..."
              searchIconColor="#315DFF"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

MessagePage.propTypes = {
  scale: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};
