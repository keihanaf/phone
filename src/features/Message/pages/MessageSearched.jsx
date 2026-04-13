import PropTypes from 'prop-types';
import MessageItem from '@/features/Message/components/MessageItem.jsx';

export default function MessageSearched({
  messages,
  searchQuery,
  scale = 1,
  onMessageClick,
}) {
  // State when no results are found
  if (!messages || messages.length === 0) {
    return (
      <span
        className="text-muted text-center font-normal mt-4"
        style={{ fontSize: `${10 * scale}px` }}
      >
        No messages found
      </span>
    );
  }

  // Render the found results with the search variant
  return (
    <>
      {messages.map((msg, index) => (
        <MessageItem
          key={msg.id}
          message={msg}
          scale={scale}
          isFirst={index === 0}
          isLast={index === messages.length - 1}
          onClick={onMessageClick}
          variant="search"
          searchQuery={searchQuery}
        />
      ))}
    </>
  );
}

MessageSearched.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      // Other props are validated within MessageItem
    })
  ).isRequired,
  searchQuery: PropTypes.string.isRequired,
  scale: PropTypes.number,
  onMessageClick: PropTypes.func,
};
