import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { addAlarm, updateAlarm, deleteAlarm } from '../../store/alarmSlice';

const AddEditAlarmScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alarms = useSelector(state => state.alarms.alarms);
  
  const [hour, setHour] = useState('06');
  const [minute, setMinute] = useState('20');
  const [modifier, setModifier] = useState('AM');
  const [label, setLabel] = useState('Alarm');
  const [snooze, setSnooze] = useState(true);
  const [selectedDays, setSelectedDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
  const [sound, setSound] = useState('Radar');

  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekends = ['Saturday', 'Sunday'];

  // Load data for edit mode
  useEffect(() => {
    if (id) {
      const alarmToEdit = alarms.find(a => a.id === parseInt(id));
      if (alarmToEdit) {
        const [timePart, ampm] = alarmToEdit.time.split(' ');
        const [h, m] = timePart.split(':');
        setHour(h);
        setMinute(m);
        setModifier(ampm);
        setLabel(alarmToEdit.label);
        setSnooze(alarmToEdit.snoozeEnabled);
        setSound(alarmToEdit.sound);

        // Parse days string back to array
        const dayStr = alarmToEdit.days[0];
        if (dayStr === 'Everyday') {
            setSelectedDays(allDays);
        } else if (dayStr === 'Weekdays') {
            setSelectedDays(weekdays);
        } else if (dayStr === 'Weekends') {
            setSelectedDays(weekends);
        } else if (dayStr === 'No days selected') {
            setSelectedDays([]);
        } else {
            setSelectedDays(dayStr.split(', ').filter(d => allDays.includes(d)));
        }
      }
    }
  }, [id, alarms]);

  const handleSave = () => {
    let dayString = '';
    const sortedSelected = allDays.filter(day => selectedDays.includes(day));

    if (sortedSelected.length === 0) dayString = 'No days selected';
    else if (sortedSelected.length === 7) dayString = 'Everyday';
    else if (JSON.stringify(sortedSelected) === JSON.stringify(weekdays)) dayString = 'Weekdays';
    else if (JSON.stringify(sortedSelected) === JSON.stringify(weekends)) dayString = 'Weekends';
    else dayString = sortedSelected.join(', ');

    const alarmData = {
      time: `${hour}:${minute} ${modifier}`,
      label,
      snoozeEnabled: snooze,
      days: [dayString],
      sound
    };

    if (id) {
      dispatch(updateAlarm({ ...alarmData, id: parseInt(id) }));
    } else {
      dispatch(addAlarm(alarmData));
    }
    navigate('/alarms');
  };

  const handleDelete = () => {
    if (id) {
        dispatch(deleteAlarm(parseInt(id)));
        navigate('/alarms');
    }
  };

  const toggleDay = (day) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <section className="wrap" id="AddEdit">
      <div className="navbar">
        <Link to="/alarms" className="pills left cancel">Cancel</Link>
        <h1>{id ? 'Edit Alarm' : 'Add Alarm'}</h1>
        <a className="pills right save" onClick={handleSave} style={{ cursor: 'pointer' }}>Save</a>
      </div>
      
      <div className="page" style={{ paddingBottom: '20px' }}>
        <div className="content-block-title">Select Time</div>
        <div className="content-block-inner" style={{ textAlign: 'center' }}>
          <div className="time-picker" style={{ display: 'flex', justifyContent: 'center', gap: '5px', padding: '10px 0' }}>
            <select value={hour} onChange={(e) => setHour(e.target.value)}>
              {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(h => <option key={h} value={h}>{h}</option>)}
            </select>
            <select value={minute} onChange={(e) => setMinute(e.target.value)}>
              {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value={modifier} onChange={(e) => setModifier(e.target.value)}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <div className="content-block-inner">
          <p className="item select">
            <label>
              <input type="checkbox" checked={snooze} onChange={(e) => setSnooze(e.target.checked)} />
              <span>Snooze</span>
            </label>
          </p>
          <p className="item select">
            <label>
              <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Alarm Label" />
              <span>Label</span>
            </label>
          </p>
        </div>

        <div className="content-block-title">Repeat</div>
        <ul className="list">
          {allDays.map(day => (
            <li key={day} className="item select selected">
              <label>
                <input 
                  type="checkbox" 
                  checked={selectedDays.includes(day)} 
                  onChange={() => toggleDay(day)} 
                />
                <span>{day}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="content-block-title">Sound</div>
        <ul className="list">
          {['None', 'Radar', 'Beep'].map(s => (
            <li key={s} className="item select selected">
              <label>
                <input 
                  type="radio" 
                  name="sound" 
                  checked={sound === s} 
                  onChange={() => setSound(s)} 
                />
                <span>{s}</span>
              </label>
            </li>
          ))}
        </ul>

        {id && (
          <div style={{ padding: '20px' }}>
            <a className="button danger" onClick={handleDelete} style={{ cursor: 'pointer' }}>
                Delete Alarm
            </a>
          </div>
        )}
      </div>

      <div className="action" style={{ display: 'none' }}>
        {/* Keeping original save button structure if needed, but we used navbar save */}
      </div>
    </section>
  );
};

export default AddEditAlarmScreen;
