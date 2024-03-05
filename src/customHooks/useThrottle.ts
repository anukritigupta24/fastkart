import { useRef, useCallback, useEffect } from 'react';


function useThrottleFunction(callback: Function, delay: number) {
  const callbackRef = useRef(callback);
  const timeoutRef: any = useRef(null);
  const lastExecutedRef = useRef(Date.now());

  // Update callbackRef.current on each render, so if callback changes,
  // the latest callback will be invoked without needing to reset the timer.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttledFunction = useCallback((...args: any) => {
    const execute = () => {
      lastExecutedRef.current = Date.now();
      timeoutRef.current = null;
      callbackRef.current(...args);
    };

    const now = Date.now();
    const elapsed = now - lastExecutedRef.current;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (elapsed >= delay) {
      execute();
    } else {
      timeoutRef.current = setTimeout(execute, delay - elapsed);
    }
  }, [delay]);

  // Cleanup the timeout when the component using this hook unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledFunction;
}

export default useThrottleFunction;