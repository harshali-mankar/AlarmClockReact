import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCurrentTime } from '../../hooks/useCurrentTime';
import { triggerAlarm, stopAlarm } from '../../store/alarmSlice';
import { useNavigate } from 'react-router-dom';
import alarmTone from '../../assets/alarm-sound.mp3';

const AlarmPlayerOverlay = () => {
  const { hours, minutes, seconds, fullDate, raw } = useCurrentTime();
  const alarms = useSelector((state) => state.alarms.alarms);
  const activeAlarm = useSelector((state) => state.alarms.activeAlarm);
  const [audio] = useState(new Audio(alarmTone));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Current time in 12hr format for matching
    const currentHour = raw.getHours();
    const currentMin = raw.getMinutes();
    const currentSec = raw.getSeconds();

    const h12 = currentHour % 12 || 12;
    const modifier = currentHour >= 12 ? 'PM' : 'AM';
    const currentTimeStr = `${h12.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')} ${modifier}`;

    // Check if any active alarm matches the current time and we are at the 0th second
    if (currentSec === 0) {
      const match = alarms.find(a => a.isActive && a.time === currentTimeStr);
      if (match && !activeAlarm) {
        dispatch(triggerAlarm(match));
      }
    }
  }, [raw, alarms, activeAlarm, dispatch]);

  useEffect(() => {
    if (activeAlarm) {
      audio.loop = true;
      audio.play().catch(e => console.log("Audio play blocked by browser", e));
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [activeAlarm, audio]);

  if (!activeAlarm) return null;

  const handleStop = () => {
    dispatch(stopAlarm());
    navigate('/'); // requirement: "On clicking of 'stop' it should take you to the 'Clock' screen"
  };

  const handleSnooze = () => {
    dispatch(stopAlarm());
  };

  return (
    <div className="alarm-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100, background: '#000' }}>
      <section className="wrap" id="AlarmPlaying">
        <div className="page alarm">
          <div className="clock">
            {hours}:{minutes}:{seconds}
            <small>{fullDate}</small>
            <p className="">{activeAlarm.label}</p>
          </div>

          <div className="action">
            {activeAlarm.snoozeEnabled && (
              <a onClick={handleSnooze} className="button">Snooze</a>
            )}
            <a onClick={handleStop} className="button small">Stop</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AlarmPlayerOverlay;
