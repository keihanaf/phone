import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { cn } from '@/shared/utils/cn.js';
import PageHeader from '@/shared/components/ui/PageHeader.jsx';
import ChatInput from '@/features/Message/components/ChatInput.jsx';

// Extended Mock Data for Chat Messages
const CHAT_MESSAGES = [
  {
    id: 1,
    sender: 'them',
    text: 'Hey! Are we still on for the project meeting later today?',
    timestamp: new Date('2026-04-01T09:00:00').getTime(),
    displayTime: '09:00',
  },
  {
    id: 2,
    sender: 'me',
    text: "Yes, absolutely. I've prepared the initial wireframes. I think we need to discuss the color palette though, it feels a bit off.",
    timestamp: new Date('2026-04-01T09:15:00').getTime(),
    displayTime: '09:15',
    status: 'Seen',
  },
  {
    id: 3,
    sender: 'them',
    text: "Great! Let's review them. Can you send a quick preview of the main dashboard?",
    timestamp: new Date('2026-04-01T09:20:00').getTime(),
    displayTime: '09:20',
  },
  {
    id: 4,
    sender: 'me',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
    timestamp: new Date('2026-04-01T09:25:00').getTime(),
    displayTime: '09:25',
    status: 'Seen',
  },
  {
    id: 5,
    sender: 'them',
    text: "Looks promising! But I see what you mean about the colors. Let's dig into that during the call.",
    timestamp: new Date('2026-04-01T09:30:00').getTime(),
    displayTime: '09:30',
  },
  {
    id: 6,
    sender: 'me',
    text: 'Perfect. Talk to you then.',
    timestamp: new Date('2026-04-01T09:31:00').getTime(),
    displayTime: '09:31',
    status: 'Seen',
  },
  // 48 hours later (Triggers the badge)
  {
    id: 7,
    sender: 'them',
    text: 'Yeah I know how cool is this messaging app, it also supports multi line messages which is awesome for long explanations and detailed feedback.',
    timestamp: new Date('2026-04-03T10:00:00').getTime(),
    displayTime: 'Yesterday 14:24',
  },
  {
    id: 8,
    sender: 'me',
    text: 'Did you die?',
    timestamp: new Date('2026-04-03T14:00:00').getTime(),
    displayTime: 'Yesterday 18:14',
    status: 'Seen',
  },
  // 32 hours later (Triggers the badge)
  {
    id: 9,
    sender: 'them',
    text: 'Something bad happend',
    timestamp: new Date('2026-04-04T22:00:00').getTime(),
    displayTime: '14:15',
  },
  {
    id: 10,
    sender: 'them',
    text: 'Aenean id felis vitae dui cursus sodales imperdiet eu ligula. Phasellus sed velit ac erat placerat sagittis sed vestibulum arcu. Donec eleifend sollicitudin nisl, in faucibus augue ultrices ac. Quisque posuere, mauris et commodo lacinia, diam risus accumsan nunc, eget tempor nulla ligula et arcu. Sed dapibus sapien id mauris aliquet, eget gravida libero varius. Nunc dictum mauris vel mauris varius, nec tincidunt nisl facilisis. Cras pellentesque ex nec lacus lacinia, ut faucibus velit vehicula.',
    timestamp: new Date('2026-04-04T22:02:00').getTime(), // 2 mins gap (Same sender) -> hides id:9 timestamp
    displayTime: '14:19',
  },
  {
    id: 11,
    sender: 'them',
    image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    timestamp: new Date('2026-04-04T22:05:00').getTime(), // 3 mins gap (Same sender) -> hides id:10 timestamp
    displayTime: '18:14',
  },
  {
    id: 12,
    sender: 'me',
    text: 'Oh no, is the cat okay? That text was so long I thought it was an error log or something! 😂 The image is cute though. Let me know if you need any help with whatever happened. We can reschedule if necessary.',
    timestamp: new Date('2026-04-04T22:15:00').getTime(),
    displayTime: '18:25',
  },
  {
    id: 13,
    sender: 'them',
    text: 'Yeah everything is fine now. Just a minor panic attack over some spilled coffee on my keyboard. Hence the random Latin text earlier, I was just mashing keys testing if they still worked!',
    timestamp: new Date('2026-04-04T22:20:00').getTime(),
    displayTime: '18:30',
  },
  {
    id: 14,
    sender: 'me',
    text: 'Glad to hear that! Make sure to unplug it and let it dry completely.',
    timestamp: new Date('2026-04-04T22:25:00').getTime(),
    displayTime: '18:35',
  },
  {
    id: 15,
    sender: 'me',
    text: 'Rice works sometimes, but just air drying in a warm spot is safer.',
    timestamp: new Date('2026-04-04T22:26:00').getTime(),
    displayTime: '18:36',
    status: 'Seen',
  },
];

const THIRTY_HOURS_IN_MS = 30 * 60 * 60 * 1000;
const THIRTY_MINS_IN_MS = 30 * 60 * 1000;

export default function ChatPage({ scale = 1, contact, onBack }) {
  const handleCallClick = () => {
    console.log('Calling contact:', contact?.name || contact?.number);
  };

  const messagesWithBadges = useMemo(() => {
    const result = [];
    let lastTimestamp = null;

    CHAT_MESSAGES.forEach((msg, index) => {
      if (lastTimestamp && msg.timestamp - lastTimestamp > THIRTY_HOURS_IN_MS) {
        result.push({
          id: `badge-${msg.id}`,
          type: 'badge',
          text: msg.displayTime.includes('Yesterday') ? 'Yesterday' : 'Today',
        });
      }

      let showTimestamp = true;
      const nextMsg = CHAT_MESSAGES[index + 1];

      if (
        nextMsg &&
        nextMsg.sender === msg.sender &&
        nextMsg.timestamp - msg.timestamp <= THIRTY_MINS_IN_MS
      ) {
        showTimestamp = false;
      }

      result.push({ ...msg, type: 'message', showTimestamp });
      lastTimestamp = msg.timestamp;
    });

    return result;
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full bg-app overflow-hidden relative">
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
            onLeftClick={onBack}
            contact={contact}
            onRightClick={handleCallClick}
            rightIcon="fi-sr-phone-call"
            rightVariant="call"
            rightIconColor="text-[#315DFF]"
          />
        </div>

        {/* Messages List */}
        <div
          className="flex-1 flex flex-col w-full z-0 overflow-y-auto hide-scrollbar"
          style={{
            paddingBottom: `${80 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            gap: `${5 * scale}px`,
          }}
        >
          {messagesWithBadges.map((item) => {
            if (item.type === 'badge') {
              return (
                <div
                  key={item.id}
                  className="flex justify-center w-full my-2.5"
                >
                  <span
                    className="text-white font-medium bg-black/20 rounded-full px-3 py-1"
                    style={{ fontSize: `${10 * scale}px` }}
                  >
                    {item.text}
                  </span>
                </div>
              );
            }

            const isMe = item.sender === 'me';

            return (
              <div
                key={item.id}
                className={cn(
                  'flex flex-col shrink-0',
                  isMe ? 'items-end' : 'items-start',
                  !item.showTimestamp && 'mb-1'
                )}
              >
                {/* Message Bubble or Image */}
                {item.image ? (
                  <img
                    src={item.image}
                    alt="chat-attachment"
                    className="object-cover shrink-0"
                    style={{
                      width: `${225 * scale}px`,
                      height: `${149.09 * scale}px`,
                      borderRadius: `${15 * scale}px`,
                    }}
                  />
                ) : (
                  <div
                    className={cn(
                      'shrink-0',
                      isMe ? 'bg-[#315DFF]/30' : 'bg-[#313238]/65'
                    )}
                    style={{
                      maxWidth: `${225 * scale}px`,
                      borderRadius: `${15 * scale}px`,
                      paddingTop: `${6 * scale}px`,
                      paddingBottom: `${6 * scale}px`,
                      paddingLeft: `${10 * scale}px`,
                      paddingRight: `${10 * scale}px`,
                    }}
                  >
                    <p
                      className="text-white whitespace-pre-wrap wrap-break-word"
                      style={{
                        fontSize: `${10 * scale}px`,
                        fontWeight: 400,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.text}
                    </p>
                  </div>
                )}

                {/* Timestamp and Status */}
                {item.showTimestamp && (
                  <div
                    className="flex items-center text-white/50"
                    style={{
                      marginTop: `${2 * scale}px`,
                      fontSize: `${6 * scale}px`,
                      fontWeight: 400,
                    }}
                  >
                    <span>{item.displayTime}</span>
                    {isMe && item.status === 'Seen' && (
                      <>
                        <span className="mx-1">-</span>
                        <span className="font-bold">{item.status}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div
          className="absolute bottom-0 left-0 w-full z-10 flex justify-center pointer-events-none transition-all duration-300 ease-in-out"
          style={{
            paddingBottom: `${20 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
          }}
        >
          <div className="flex justify-center pointer-events-auto w-full">
            <ChatInput scale={scale} />
          </div>
        </div>
      </div>
    </div>
  );
}

ChatPage.propTypes = {
  scale: PropTypes.number,
  contact: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    number: PropTypes.string,
    image: PropTypes.string,
  }),
  onBack: PropTypes.func.isRequired,
};
