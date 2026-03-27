import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleAlarm, deleteAlarm } from '../../store/alarmSlice';

const AlarmListScreen = () => {
  const alarms = useSelector((state) => state.alarms.alarms);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section className="wrap" id="alarmListRoot">
      <div className="navbar">
        <a
          className="pills left editAlarms"
          onClick={toggleEditMode}
          style={{ cursor: 'pointer' }}
        >
          {isEditing ? 'Done' : 'Edit'}
        </a>
        <h1>Alarm</h1>
        <Link to="/add" className="pills right addAlarm">Add</Link>
      </div>

      <div className="page">
        {alarms.length === 0 ? (
          <div className="clock">
            <p style={{ fontSize: '18px' }}>No Alarms set</p>
          </div>
        ) : (
          <ul className="list">
            {alarms.map((alarm) => (
              <li key={alarm.id} className={`item ${!alarm.isActive ? 'off' : ''} ${isEditing ? 'edit' : ''}`}>
                {/* Remove Button - styled by CSS */}
                <a
                  className="remove"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(deleteAlarm(alarm.id));
                  }}
                >X</a>

                <label>
                  <input
                    type="checkbox"
                    checked={alarm.isActive}
                    onChange={() => dispatch(toggleAlarm(alarm.id))}
                  />
                  <Link to={`/edit/${alarm.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <strong>{alarm.time.split(' ')[0]} <sub>{alarm.time.split(' ')[1]}</sub></strong>
                    <small>{alarm.label}, {alarm.days.join(', ')}</small>
                  </Link>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="toolbar">
        <div className="toolbar-inner">
          <Link to="/" className="link">Clock</Link>
          <Link to="/alarms" className="link" style={{ fontWeight: 'bold' }}>Alarm</Link>
        </div>
      </div>
    </section>
  );
};

export default AlarmListScreen;
