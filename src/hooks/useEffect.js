import { useEffect } from 'react';
import { useIsFirstRender } from './useIsFirstRender';

export const useEffectOnce = (effect) => useEffect(effect, []);

export const useUpdateEffect = (effect, deps) => {
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (isFirstRender) return;
    effect();
  }, deps);
};
