import { useEffect, useState } from "react";

const useCountdown = (initialDays) => {
  const [timeLeft, setTimeLeft] = useState(initialDays);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export default useCountdown;
