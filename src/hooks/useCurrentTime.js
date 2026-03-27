import { useState, useEffect } from 'react';

export const useCurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUnit = (unit) => unit.toString().padStart(2, '0');

  return {
    hours: formatUnit(time.getHours()),
    minutes: formatUnit(time.getMinutes()),
    seconds: formatUnit(time.getSeconds()),
    fullDate: time.toLocaleDateString('en-GB', { 
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' 
    }),
    raw: time // Useful for triggering alarms
  };
};
