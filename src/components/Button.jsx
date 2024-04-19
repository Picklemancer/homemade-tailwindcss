import React from 'react';
import { clsx } from '../utils';

const variants = {
  solid: {
    default: 'bg-slate-500 text-white hover:bg-slate-600',
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-purple-500 text-white hover:bg-purple-600',
    success: 'bg-green-500 text-black hover:bg-green-600',
    warning: 'bg-yellow-500 text-black hover:bg-yellow-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  },
  bordered: {
    default:
      'border-2 border-slate-500 bg-transparent text-slate-500 hover:border-slate-600 hover:text-slate-600',
    primary:
      'border-2 border-blue-500 bg-transparent text-blue-500 hover:border-blue-600 hover:text-blue-600',
  },
  light: {},
  flat: {},
  faded: {},
  shadow: {
    default:
      'shadow-lg shadow-slate-500/50 bg-slate-500 text-white hover:bg-slate-600',
    primary:
      'shadow-lg shadow-blue-500/50 bg-blue-500 text-white hover:bg-blue-600',
  },
  ghost: {
    default:
      'border-2 border-slate-500 bg-transparent text-slate-500 hover:bg-slate-500 hover:text-white',
    primary:
      'border-2 border-blue-500 bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white',
  },
};

const sizes = {
  sm: 'text-xs px-3 rounded-lg min-w-16 h-8',
  md: 'text-sm px-4 rounded-xl min-w-20 h-10',
  lg: 'text-base px-6 rounded-2xl min-w-24 h-12',
  xl: 'text-lg px-8 rounded-2xl min-w-28 h-14',
};

export const Button = ({
  className,
  size = 'lg',
  variant = 'solid',
  color = 'default',
  isDisabled = false,
  ...props
}) => (
  <button
    {...props}
    disabled={isDisabled}
    className={clsx(
      'transition font-inherit',
      isDisabled
        ? 'opacity-50 pointer-events-none'
        : 'cursor-pointer active:scale-95',
      sizes[size],
      variants[variant][color],
      className
    )}
  />
);

export default Button;
