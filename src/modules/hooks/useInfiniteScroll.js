import { useRef, useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  const [observationTarget, setObservationTarget] = useState(null);
  const [observerStop, setObserverStop] = useState(false);
  const observer = useRef();

  const getObserver = () => {
    if (!observer.current) {
      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            callback();
          }
        },
        { threshold: 0.5 }
      );
    }

    return observer.current;
  };

  useEffect(() => {
    const currentObserver = getObserver();

    if (!observerStop) {
      if (observationTarget) {
        currentObserver.observe(observationTarget);
      }
    }
    return () => {
      if (observationTarget) {
        currentObserver.unobserve(observationTarget);
      }
    };
  }, [observationTarget, observerStop]);

  return [setObservationTarget, setObserverStop];
};

export default useInfiniteScroll;
