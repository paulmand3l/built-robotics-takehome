import { useCallback, useEffect } from 'react';

export const useEscape = (callbackFn: Function) => {
  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callbackFn();
      }
    },
    [callbackFn]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);
};
