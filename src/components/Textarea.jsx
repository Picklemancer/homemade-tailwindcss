import React from 'react';
import { clsx } from '../utils';
import Box from './Box';

const variants = {
  flat: {
    default:
      'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700',
    primary:
      'bg-blue-200 hover:bg-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700',
    secondary:
      'bg-purple-200 hover:bg-purple-300 dark:bg-purple-800 dark:hover:bg-purple-700',
    success:
      'bg-green-200 hover:bg-green-300 dark:bg-green-800 dark:hover:bg-green-700',
    warning:
      'bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-800 dark:hover:bg-yellow-700',
    danger: 'bg-red-200 hover:bg-red-300 dark:bg-red-800 dark:hover:bg-red-700',
  },
  bordered: {
    default:
      'border-2 border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700',
  },
  faded: {
    default:
      'border-2 border-slate-300 bg-slate-200 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600',
  },
  underlined: {},
};

const sizes = {
  sm: 'text-xs rounded-lg', // py-1 min-h-8 max-h-12
  md: 'text-sm rounded-xl', // py-2 min-h-10 max-h-14
  lg: 'text-base rounded-2xl', // py-2 min-h-12 max-h-16
  xl: 'text-lg rounded-2xl', // py-3 min-h-14 max-h-18
};

export const Textarea = ({
  className,
  inputClassName,
  size = 'lg',
  variant = 'flat',
  color = 'default',
  placeholder = 'Enter text here...',
  minRows = 3,
  maxRows = 8,
  isDisabled = false,
  isReadOnly = false,
  autoSize = true,
  onChange,
  onValueChange,
  startContent,
  endContent,
  ...props
}) => (
  <Box
    className={clsx(
      'flex items-center p-3',
      isDisabled
        ? 'opacity-50 pointer-events-none'
        : 'cursor-text transition-colors',
      sizes[size],
      variants[variant][color],
      className
    )}
  >
    {startContent}
    <textarea
      {...props}
      className={clsx(
        'size-full transition bg-transparent outline-0 font-inherit text-inherit p-0',
        autoSize ? 'resize-none' : 'resize-y',
        startContent && 'ps-2',
        endContent && 'pe-2',
        inputClassName
      )}
      rows={minRows}
      disabled={isDisabled}
      readOnly={isReadOnly}
      placeholder={placeholder}
      onChange={(evt) => {
        if (autoSize) {
          // implement limit by maxRows
          evt.target.style.height = evt.target.value
            ? evt.target.scrollHeight + 'px'
            : '';
        }
        if (onChange) onChange(evt);
        if (onValueChange) onValueChange(evt.target.value);
      }}
    />
    {endContent}
  </Box>
);

export default Textarea;