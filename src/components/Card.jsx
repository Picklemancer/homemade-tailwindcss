import React from 'react';
import Box from './Box';
import { clsx } from '../utils';

export const Card = ({ className, isBlurred = false, ...props }) => (
  <Box
    {...props}
    className={clsx(
      'rounded-xl',
      isBlurred
        ? 'backdrop-blur bg-slate-100/80 dark:bg-slate-900/80'
        : 'bg-slate-100 dark:bg-slate-900',
      className
    )}
  />
);

export const CardBody = ({ className, ...props }) => (
  <Box {...props} className={clsx('p-3', className)} />
);

export default Card;
