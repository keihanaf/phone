import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/utils/cn.js';

export default function DepositBar({ scale = 1 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = useCallback(() => {
    if (!amount || !receiverId) return;
    console.log('Deposit:', { amount, receiverId, description });

    setAmount('');
    setReceiverId('');
    setDescription('');
    setIsOpen(false);
  }, [amount, receiverId, description]);

  const springTransition = { type: 'spring', stiffness: 300, damping: 25 };

  return (
    <div
      className="relative w-full flex justify-center items-end  text-white"
      style={{ height: `${35 * scale}px` }}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={springTransition}
            style={{
              width: `${260 * scale}px`,
              height: `${134 * scale}px`,
              borderRadius: `${25 * scale}px`,
              padding: `${10 * scale}px`,
              gap: `${10 * scale}px`,
              border: `${1 * scale}px solid var(--color-border)`,
              boxShadow: `0px ${4 * scale}px ${10 * scale}px 0px rgba(0,0,0,0.25)`,
              backdropFilter: `blur(${10 * scale}px)`,
              WebkitBackdropFilter: `blur(${10 * scale}px)`,
              boxSizing: 'border-box',
              transformOrigin: 'bottom center',
              position: 'absolute',
              bottom: 0,
            }}
            className="flex flex-col bg-six"
          >
            {/* Row 1: Inputs */}
            <div
              className="flex shrink-0"
              style={{ gap: `${5 * scale}px`, height: `${30 * scale}px` }}
            >
              {[
                { value: amount, setter: setAmount, placeholder: 'Amount' },
                {
                  value: receiverId,
                  setter: setReceiverId,
                  placeholder: 'Receiver State ID',
                },
              ].map(({ value, setter, placeholder }) => (
                <input
                  key={placeholder}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder={placeholder}
                  style={{
                    width: `${117.5 * scale}px`,
                    height: `${30 * scale}px`,
                    borderRadius: `${15 * scale}px`,
                    padding: `0 ${10 * scale}px`,
                    backgroundColor:
                      'var(--color-card, rgba(20, 21, 26, 0.60))',
                    fontSize: `${8 * scale}px`,
                    fontWeight: 400,
                    border: 'none',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  className={cn(
                    'text-white placeholder:text-muted transition-colors focus:ring-1 focus:ring-white-border'
                  )}
                />
              ))}
            </div>

            {/* Row 2: Textarea & Submit Button */}
            <div
              className="relative shrink-0"
              style={{ width: `${240 * scale}px`, height: `${74 * scale}px` }}
            >
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                style={{
                  width: `${240 * scale}px`,
                  height: `${74 * scale}px`,
                  borderRadius: `${15 * scale}px`,
                  padding: `${10 * scale}px`,
                  backgroundColor: 'var(--color-card, rgba(20, 21, 26, 0.60))',
                  fontSize: `${8 * scale}px`,
                  fontWeight: 400,
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  boxSizing: 'border-box',
                }}
                className={cn(
                  'text-white placeholder:text-muted transition-colors focus:ring-1 focus:ring-white-border'
                )}
              />

              <button
                onClick={handleSubmit}
                className="hover:opacity-90 transition-opacity"
                style={{
                  position: 'absolute',
                  bottom: `${8 * scale}px`,
                  right: `${8 * scale}px`,
                  width: `${20 * scale}px`,
                  height: `${20 * scale}px`,
                  borderRadius: `${6 * scale}px`,
                  backgroundColor: '#315DFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <i
                  className="fi fi-rs-sign-out-alt flex items-center justify-center text-white"
                  style={{ fontSize: `${12 * scale}px` }}
                />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="toggle"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={springTransition}
            onClick={() => setIsOpen(true)}
            className="hover:opacity-90 transition-opacity shadow-lg"
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: `${35 * scale}px`,
              height: `${35 * scale}px`,
              borderRadius: `${25 * scale}px`,
              backgroundColor: 'rgba(246, 60, 68, 0.80)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformOrigin: 'bottom right',
            }}
          >
            <i
              className="fi fi-rs-sign-out-alt flex items-center justify-center text-white"
              style={{ fontSize: `${13 * scale}px` }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

DepositBar.propTypes = {
  scale: PropTypes.number,
};
