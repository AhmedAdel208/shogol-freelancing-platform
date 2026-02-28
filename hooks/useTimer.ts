import { useState, useEffect, useRef } from "react";

export function useTimer(initialSeconds: number = 30) {
  const [timer, setTimer] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = (seconds?: number) => {
    if (seconds !== undefined) setTimer(seconds);
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = (seconds: number = initialSeconds) => {
    setTimer(seconds);
    setIsActive(true);
  };

  useEffect(() => {
    if (isActive && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => {
          const newTime = t - 1;
          if (newTime === 0) {
            setIsActive(false);
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timer]);

  return { timer, isActive, startTimer, stopTimer, resetTimer };
}
