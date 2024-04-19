import React, { useState } from 'react';
import { useEffectOnce } from '../hooks/useEffect';
import Text from './Text';

// const dots = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export const Loading = ({ children = 'Loading...', ...props }) => {
  const [state, setState] = useState(0);

  useEffectOnce(() => {
    const interval = setInterval(
      () => setState((prev) => (prev < children.length ? prev + 1 : 0)),
      300
    );

    return () => clearInterval(interval);
  });

  return (
    <Text className="leading-none border-e" {...props}>
      {children.slice(0, state)}
    </Text>
  );
};

export default Loading;
