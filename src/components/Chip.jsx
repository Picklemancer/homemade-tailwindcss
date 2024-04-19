import React from 'react';
import Box from './Box';
import Text from './Text';
import { clsx } from '../utils';

const variants = {
  solid: {
    default: 'bg-slate-500 text-white',
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-purple-500 text-white',
    success: 'bg-green-500 text-black',
    warning: 'bg-yellow-500 text-black',
    danger: 'bg-red-500 text-white',
  },
  bordered: {
    default: 'border-2 border-slate-500 text-slate-500',
    primary: 'border-2 border-blue-500 text-blue-500',
    secondary: 'border-2 border-purple-500 text-purple-500',
    success: 'border-2 border-green-500 text-green-500',
    warning: 'border-2 border-yellow-500 text-yellow-500',
    danger: 'border-2 border-red-500 text-red-500',
  },
  light: {},
  flat: {},
  faded: {},
  shadow: {
    default: 'shadow-lg shadow-slate-500/50 bg-slate-500 text-white',
    primary: 'shadow-lg shadow-blue-500/50 bg-blue-500 text-white',
  },
  dot: {},
};

const sizes = {
  sm: 'text-xs px-1 h-6',
  md: 'text-sm px-1 h-7',
  lg: 'text-base px-2 h-8',
};

export const Chip = ({
  className,
  color = 'default',
  variant = 'solid',
  size = 'md',
  children,
  ...props
}) => (
  // Box.className = relative max-w-fit inline-flex items-center justify-between box-border rounded-full whitespace-nowrap
  // Text.className = flex-1 text-inherit font-normal px-2
  <Box
    {...props}
    className={clsx(
      'flex items-center rounded-full whitespace-nowrap',
      sizes[size],
      variants[variant][color],
      className
    )}
  >
    <Text>{children}</Text>
  </Box>
);

export default Chip;
