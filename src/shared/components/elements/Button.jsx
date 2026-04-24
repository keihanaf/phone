import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';

const buttonVariants = cva(
  'inline-flex items-center justify-center transition-all duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-transparent border-none',
        iconButton: 'hover:opacity-80 shrink-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Button = forwardRef(
  (
    { className, variant, icon, iconClassName, iconStyle, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant }), className)}
        {...props}
      >
        {icon && (
          <i
            className={cn(
              'flex items-center justify-center',
              icon,
              iconClassName
            )}
            style={iconStyle}
          />
        )}
        {children}
      </button>
    );
  }
);

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'iconButton']),
  icon: PropTypes.string,
  iconClassName: PropTypes.string,
  iconStyle: PropTypes.object,
  children: PropTypes.node,
};

Button.displayName = 'Button';

export default Button;
