import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn.js';

const buttonVariants = cva(
  'inline-flex items-center justify-center transition-all duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
  {
    variants: {
      variant: {
        iconButton: 'hover:opacity-80 shrink-0',
        ghost: 'bg-transparent hover:opacity-70 shrink-0',
      },
    },
  }
);

const Button = forwardRef(
  (
    {
      className,
      variant,
      icon,
      iconClassName,
      iconStyle,
      iconSize,
      iconColor,
      children,
      ...props
    },
    ref
  ) => {
    const mergedIconStyle = {
      ...(iconSize && { fontSize: iconSize }),
      ...(iconColor && { color: iconColor }),
      ...iconStyle,
    };

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
            style={mergedIconStyle}
          />
        )}
        {children}
      </button>
    );
  }
);

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['iconButton', 'ghost']),
  icon: PropTypes.string,
  iconClassName: PropTypes.string,
  iconStyle: PropTypes.object,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconColor: PropTypes.string,
  children: PropTypes.node,
};

Button.displayName = 'Button';

export default Button;
