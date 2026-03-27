import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import ClockScreen from './features/clock/ClockScreen';
import AlarmListScreen from './features/alarms/AlarmListScreen';
import AddEditAlarmScreen from './features/alarms/AddEditAlarmScreen';
import AlarmPlayerOverlay from './features/player/AlarmPlayerOverlay';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="main ui container">
          <Routes>
            <Route path="/" element={<ClockScreen />} />
            <Route path="/alarms" element={<AlarmListScreen />} />
            <Route path="/add" element={<AddEditAlarmScreen />} />
            <Route path="/edit/:id" element={<AddEditAlarmScreen />} />

            {/* Catch-all for routing safety */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          {/* Overlay checks for trigger condition inside itself */}
          <AlarmPlayerOverlay />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
