import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alarms: [], // Array of alarm objects: { id, time, label, days, isActive, snoozeEnabled, sound }
  activeAlarm: null, // The alarm currently "ringing"
};

const alarmSlice = createSlice({
  name: 'alarms',
  initialState,
  reducers: {
    addAlarm: (state, action) => {
      // action.payload example: { time: '06:20 AM', label: 'Morning walk', days: ['Everyday'], ... }
      state.alarms.push({ ...action.payload, id: Date.now(), isActive: true });
      // Requirement: "upcoming should come on the top"
      // Sorting by time (HH:MM AM/PM)
      state.alarms.sort((a, b) => {
        const timeA = convertTo24Hour(a.time);
        const timeB = convertTo24Hour(b.time);
        return timeA.localeCompare(timeB);
      });
    },
    // alarmSlice.js ke reducers mein add kijiye:
    updateAlarm: (state, action) => {
      const index = state.alarms.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.alarms[index] = { ...state.alarms[index], ...action.payload };
        // Sorting wapas karni hogi update ke baad
        state.alarms.sort((a, b) => {
          const timeA = convertTo24Hour(a.time);
          const timeB = convertTo24Hour(b.time);
          return timeA.localeCompare(timeB);
        });
      }
    },

    toggleAlarm: (state, action) => {
      const alarm = state.alarms.find(a => a.id === action.payload);
      if (alarm) alarm.isActive = !alarm.isActive;
    },
    deleteAlarm: (state, action) => {
      state.alarms = state.alarms.filter(a => a.id !== action.payload);
    },
    triggerAlarm: (state, action) => {
      state.activeAlarm = action.payload;
    },
    stopAlarm: (state) => {
      state.activeAlarm = null;
    }
  },
});

// Helper to sort 12hr time in 24hr format
function convertTo24Hour(timeStr) {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') hours = '00';
  if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

export const { addAlarm, updateAlarm, toggleAlarm, deleteAlarm, triggerAlarm, stopAlarm } = alarmSlice.actions;
export default alarmSlice.reducer;
