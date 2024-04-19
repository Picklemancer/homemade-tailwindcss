import { useRef } from 'react';

export const useSafeRef = (value) => {
  const { current: ref } = useRef(value);
  return ref;
};
