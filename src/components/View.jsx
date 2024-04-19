import React from 'react';
import { clsx } from '../utils';
import Box from './Box';

export const View = ({ className, ...props }) => (
  <Box
    // src="https://i.pinimg.com/originals/cb/b0/26/cbb02601168f7171d754e047354c6c9a.gif"
    {...props}
    className={clsx('h-screen p-4', className)}
  />
);

export default View;
