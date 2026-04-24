import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { motion } from 'framer-motion';

export default function RadioButton({ isOn, onToggle, scale = 1 }) {
  return (
    <motion.div
      onClick={onToggle}
      initial={false}
      animate={{
        backgroundColor: isOn ? '#315DFF' : '#313238A6',
      }}
      transition={{ duration: 0.2 }}
      className="flex items-center cursor-pointer shrink-0"
      style={{
        width: `${30 * scale}px`,
        height: `${15 * scale}px`,
        borderRadius: `${3 * scale}px`,
        paddingLeft: `${2 * scale}px`,
        paddingRight: `${2 * scale}px`,
        justifyContent: isOn ? 'flex-end' : 'flex-start',
      }}
    >
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30,
        }}
        style={{
          width: `${11 * scale}px`,
          height: `${11 * scale}px`,
          borderRadius: `${2 * scale}px`,
          backgroundColor: '#FFFFFF',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      />
    </motion.div>
  );
}

RadioButton.propTypes = {
  isOn: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  scale: PropTypes.number,
};
