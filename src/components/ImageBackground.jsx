import React from 'react';
import Box from './Box';

export const ImageBackground = ({ src, style, ...props }) => (
  <Box
    {...props}
    style={{
      backgroundImage: 'url(' + src + ')',
      ...style,
    }}
  />
);

export default ImageBackground;
