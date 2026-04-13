import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';

const actionButtonVariants = cva(
  'flex items-center justify-center shrink-0 cursor-pointer transition-colors duration-200',
  {
    variants: {
      intent: {
        primary: 'bg-six hover:bg-bar',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  }
);

const actionRowVariants = cva(
  'flex items-center w-full text-left transition-colors hover:bg-slot-hover active:bg-nav-key'
);

const EditField = ({ label, value, onChange, scale, hasBorder = false }) => (
  <div
    className={cn(
      'flex items-center w-full',
      hasBorder && 'border-b border-border'
    )}
    style={{
      height: `${41 * scale}px`,
      padding: `0 ${10 * scale}px`,
      gap: `${10 * scale}px`,
    }}
  >
    <span
      className="font-normal whitespace-nowrap text-white/50"
      style={{
        fontSize: `${6 * scale}px`,
        width: `${45 * scale}px`,
      }}
    >
      {label}
    </span>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="flex-1 bg-transparent border-none outline-none font-bold text-white w-full truncate"
      style={{ fontSize: `${10 * scale}px` }}
    />
  </div>
);

EditField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  scale: PropTypes.number.isRequired,
  hasBorder: PropTypes.bool,
};

export default function ContactDetail({
  isOpen,
  onClose,
  contact,
  mode = 'view',
  scale = 1,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    mobile: '',
  });

  const isCreateMode = mode === 'create';

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line
      setIsEditing(isCreateMode);
      setFormData({
        name: contact?.name || '',
        photo: contact?.image || '',
        mobile: contact?.number || '',
      });
    }
  }, [isOpen, contact, isCreateMode]);

  const displayImage = isEditing ? formData.photo : contact?.image;
  const hasImage = !!displayImage;
  const displayName = isEditing
    ? formData.name
    : contact?.name && contact.name.trim().length > 0
      ? contact.name
      : contact?.number;

  const actionButtons = [
    { id: 'message', icon: 'fi-rs-comments', hoverIcon: 'fi-ss-comments' },
    { id: 'call', icon: 'fi-rs-phone-call', hoverIcon: 'fi-ss-phone-call' },
    { id: 'share', icon: 'fi-rs-share', hoverIcon: 'fi-ss-share' },
    { id: 'block', icon: 'fi-rs-phone-slash', hoverIcon: 'fi-ss-phone-slash' },
  ];

  const handleActionClick = () => {
    if (isEditing) {
      if (isCreateMode) {
        onClose();
        return;
      }
    }

    setIsEditing(!isEditing);
  };

  const headerTitle = isCreateMode ? 'New Contact' : 'Detail';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 z-40 w-full h-full bg-black/60"
          />

          <motion.div
            key="bottom-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 z-50 flex flex-col items-center backdrop-blur-[10px] bg-eight w-full border-t border-border"
            style={{
              height: `${452 * scale}px`,
              padding: `${10 * scale}px`,
              paddingTop: `${15 * scale}px`,
              gap: `${10 * scale}px`,
              borderTopLeftRadius: `${25 * scale}px`,
              borderTopRightRadius: `${25 * scale}px`,
              borderTopWidth: `${1 * scale}px`,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between w-full"
              style={{
                width: `${245 * scale}px`,
                height: `${25 * scale}px`,
                gap: `${5 * scale}px`,
              }}
            >
              <button
                onClick={onClose}
                className="flex items-center justify-center shrink-0 cursor-pointer bg-transparent hover:bg-white/10 transition-colors"
                style={{
                  width: `${25 * scale}px`,
                  height: `${25 * scale}px`,
                  padding: `${5 * scale}px`,
                  borderRadius: `${5 * scale}px`,
                }}
              >
                <i
                  className="fi fi-rr-angle-small-down flex items-center justify-center text-white/50"
                  style={{ fontSize: `${15 * scale}px` }}
                />
              </button>

              <span
                className="font-bold flex-1 text-center text-white"
                style={{ fontSize: `${12 * scale}px` }}
              >
                {headerTitle}
              </span>

              <button
                onClick={handleActionClick}
                className="flex items-center justify-center shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ width: `${25 * scale}px` }}
              >
                <span
                  className="font-bold text-[#315DFF]"
                  style={{ fontSize: `${8 * scale}px` }}
                >
                  {isEditing ? 'Done' : 'Edit'}
                </span>
              </button>
            </div>

            {/* Profile Avatar / Name */}
            <div className="flex flex-col items-center mt-2">
              <div
                className={cn(
                  'flex justify-center shrink-0 overflow-hidden',
                  !hasImage && !displayName ? 'items-end' : 'items-center',
                  !hasImage && 'bg-bar'
                )}
                style={{
                  width: `${80 * scale}px`,
                  height: `${80 * scale}px`,
                  borderRadius: `${15 * scale}px`,
                }}
              >
                {hasImage ? (
                  <img
                    src={displayImage}
                    alt={displayName || 'contact'}
                    className="w-full h-full object-cover"
                  />
                ) : displayName ? (
                  <span
                    className="font-bold text-white/50"
                    style={{ fontSize: `${32 * scale}px` }}
                  >
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <i
                    className="fi fi-ss-user leading-none flex items-end text-white/50"
                    style={{
                      fontSize: `${50 * scale}px`,
                      marginBottom: `-${5 * scale}px`,
                    }}
                  />
                )}
              </div>

              {!isEditing && (
                <span
                  className="font-bold text-center mt-2 text-white"
                  style={{ fontSize: `${18 * scale}px` }}
                >
                  {displayName}
                </span>
              )}
            </div>

            {/* Content Area Based on Mode */}
            {isEditing ? (
              <div
                className="flex flex-col w-full items-center mt-2"
                style={{ gap: `${10 * scale}px` }}
              >
                <div
                  className="flex flex-col w-full overflow-hidden bg-six"
                  style={{
                    width: `${245 * scale}px`,
                    height: `${82 * scale}px`,
                    borderRadius: `${15 * scale}px`,
                  }}
                >
                  <EditField
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    scale={scale}
                    hasBorder
                  />
                  <EditField
                    label="Photo"
                    value={formData.photo}
                    onChange={(e) =>
                      setFormData({ ...formData, photo: e.target.value })
                    }
                    scale={scale}
                  />
                </div>

                <div
                  className="flex items-center w-full bg-six"
                  style={{
                    width: `${245 * scale}px`,
                    borderRadius: `${15 * scale}px`,
                  }}
                >
                  <EditField
                    label="Mobile"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    scale={scale}
                  />
                </div>

                {/* Only show Delete button if NOT in create mode */}
                {!isCreateMode && (
                  <button
                    className="flex items-center w-full transition-colors bg-six hover:bg-red-500/10 active:bg-red-500/20"
                    style={{
                      width: `${245 * scale}px`,
                      height: `${41 * scale}px`,
                      padding: `0 ${10 * scale}px`,
                      gap: `${5 * scale}px`,
                      borderRadius: `${15 * scale}px`,
                    }}
                  >
                    <span
                      className="font-medium text-[#FF383C]"
                      style={{ fontSize: `${10 * scale}px` }}
                    >
                      Delete Contact
                    </span>
                  </button>
                )}
              </div>
            ) : (
              <>
                <div
                  className="flex items-center justify-center w-full"
                  style={{ gap: `${10 * scale}px` }}
                >
                  {actionButtons.map((btn) => (
                    <button
                      key={btn.id}
                      className={cn(
                        actionButtonVariants({ intent: 'primary' }),
                        'group'
                      )}
                      style={{
                        width: `${35 * scale}px`,
                        height: `${35 * scale}px`,
                        borderRadius: `${20 * scale}px`,
                      }}
                    >
                      <i
                        className={cn(
                          'fi flex items-center justify-center text-white transition-opacity duration-200 group-hover:hidden',
                          btn.icon
                        )}
                        style={{ fontSize: `${13 * scale}px` }}
                      />
                      <i
                        className={cn(
                          'fi hidden items-center justify-center text-white transition-opacity duration-200 group-hover:flex',
                          btn.hoverIcon
                        )}
                        style={{ fontSize: `${13 * scale}px` }}
                      />
                    </button>
                  ))}
                </div>

                <div
                  className="flex flex-col justify-center w-full bg-six"
                  style={{
                    width: `${245 * scale}px`,
                    height: `${41 * scale}px`,
                    gap: `${2 * scale}px`,
                    padding: `${10 * scale}px`,
                    borderRadius: `${15 * scale}px`,
                  }}
                >
                  <span
                    className="font-normal text-white/50"
                    style={{ fontSize: `${6 * scale}px`, lineHeight: 1 }}
                  >
                    Mobile
                  </span>
                  <span
                    className="font-bold text-white"
                    style={{ fontSize: `${10 * scale}px`, lineHeight: 1 }}
                  >
                    {contact?.number}
                  </span>
                </div>

                <div
                  className="flex flex-col w-full overflow-hidden bg-six"
                  style={{
                    width: `${245 * scale}px`,
                    height: `${99 * scale}px`,
                    borderRadius: `${15 * scale}px`,
                  }}
                >
                  <button
                    className={cn(
                      actionRowVariants(),
                      'border-b border-border'
                    )}
                    style={{
                      padding: `0 ${10 * scale}px`,
                      height: `${33 * scale}px`,
                      borderBottomWidth: `${1 * scale}px`,
                    }}
                  >
                    <span
                      className="font-medium text-white"
                      style={{ fontSize: `${10 * scale}px` }}
                    >
                      Send Message
                    </span>
                  </button>

                  <button
                    className={cn(
                      actionRowVariants(),
                      'border-b border-border'
                    )}
                    style={{
                      padding: `0 ${10 * scale}px`,
                      height: `${33 * scale}px`,
                      borderBottomWidth: `${1 * scale}px`,
                    }}
                  >
                    <span
                      className="font-medium text-white"
                      style={{ fontSize: `${10 * scale}px` }}
                    >
                      Share Contact
                    </span>
                  </button>

                  <button
                    className={actionRowVariants()}
                    style={{
                      padding: `0 ${10 * scale}px`,
                      height: `${33 * scale}px`,
                    }}
                  >
                    <span
                      className="font-medium text-[#FF383C]"
                      style={{ fontSize: `${10 * scale}px` }}
                    >
                      Block Number
                    </span>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

ContactDetail.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['view', 'create']),
  contact: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    number: PropTypes.string,
  }),
  scale: PropTypes.number,
};
