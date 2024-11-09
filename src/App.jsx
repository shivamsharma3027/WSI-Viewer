import React from 'react';
import './App.css';  // Basic Grid Layout
import './CustomStyles.css';  // For Advanced Styling
import LeftPanel from './components/LeftPanel';
import CenterPanel from './components/CenterPanel';
import HubView from './components/HubView';

function App() {
  return (
    <div className="app">
      <div className="left-panel">
        <LeftPanel />
      </div>
      <div className="center-panel">
        <CenterPanel />
      </div>
      <div className="hub-view">
        <HubView />
        <button className="report-button">Generate Report</button>
      </div>
    </div>
  );
}

export default App;
