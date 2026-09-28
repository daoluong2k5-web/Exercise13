import React, { useState, useEffect } from 'react';

function CountdownTimer({ initialValue = 10 }) {
  const [timeRemaining, setTimeRemaining] = useState(initialValue);

  // Sync internal state when initialValue prop changes
  useEffect(() => {
    setTimeRemaining(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [timeRemaining]);

  return (
    <div className="countdown-timer-container">
      <h3 className="timer-display">Time Remaining: {timeRemaining}</h3>
      {timeRemaining <= 0 && <p className="timer-finished">Time has expired!</p>}
    </div>
  );
}

export default CountdownTimer;
