import React, { forwardRef } from 'react';

export const Box = forwardRef((props, ref) => <div ref={ref} {...props} />);
export default Box;
