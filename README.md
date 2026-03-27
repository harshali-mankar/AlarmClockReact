# Alarm Clock React

A feature-rich Single Page Application (SPA) alarm clock built with React, Redux Toolkit, and Vite. 

##  Features

- **Real-time Digital Clock**: A precise clock display updated every second.
- **Alarm Management**:
  - **Create & Edit**: Customize alarm time, labels, and recurrence settings.
  - **Recurrence Logic**: Set alarms for specific days of the week.
  - **Toggle**: Quickly enable or disable alarms from the main list.
  - **Delete**: Remove unwanted alarms with ease.
- **Alarm Triggering System**: A responsive overlay that triggers when an alarm's time matches the current system time.
- **Persistent State**: State is managed globally using Redux Toolkit to ensure consistency across the application.
- **Responsive Design**: Designed to work seamlessly across different device sizes.

##  Tech Stack

- **Framework**: [React 19]
- **State Management**: [Redux Toolkit]
- **Styling**: Vanilla CSS with modern aesthetics.[used the existing css provided]

##  Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/harshali-mankar/AlarmClockReact.git
   ```
2. **Navigate to the project directory**:
   ```sh
   cd AlarmClockReact
   ```
3. **Install dependencies**:
   ```sh
   npm install
   ```

##  Usage

Run the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

##  Project Structure

- `src/features/alarms`: Alarm management logic and screens.
- `src/features/clock`: Core digital clock implementation.
- `src/features/player`: Alarm trigger and media player logic.
- `src/store`: Redux store configuration and slices.
- `src/hooks`: Custom React hooks for global logic.

