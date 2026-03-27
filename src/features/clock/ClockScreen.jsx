import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrentTime } from '../../hooks/useCurrentTime';

const ClockScreen = () => {
  const { hours, minutes, seconds, fullDate } = useCurrentTime();

  return (
    <section className="wrap" id="clock">
      <div className="navbar">
        <h1>Clock</h1>
      </div>
      <div className="page">
        <div className="clock">
          {hours}:{minutes}:{seconds}
          <small>{fullDate}</small>
        </div>
      </div>
      
      <div className="toolbar">
        <div className="toolbar-inner">
          <Link to="/" className="link" style={{ fontWeight: 'bold' }}>Clock</Link>
          <Link to="/alarms" className="link">Alarm</Link>
        </div>
      </div>
    </section>
  );
};

export default ClockScreen;
