
// src/components/reporting/ReportingModule.jsx
import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import CommunicationFrequencyReport from './CommunicationFrequencyReport';
import EngagementEffectivenessReport from './EngagementEffectivenessReport';
import OverdueTrendsReport from './OverdueTrendsReport';
import ActivityLog from './ActivityLog';

const ReportingModule = () => {
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', padding: 2 }}>
      <Tabs value={currentTab} onChange={handleChange} aria-label="Reporting Tabs">
        <Tab label="Communication Frequency" />
        <Tab label="Engagement Effectiveness" />
        <Tab label="Overdue Trends" />
        <Tab label="Activity Log" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {currentTab === 0 && <CommunicationFrequencyReport />}
        {currentTab === 1 && <EngagementEffectivenessReport />}
        {currentTab === 2 && <OverdueTrendsReport />}
        {currentTab === 3 && <ActivityLog />}
      </Box>
    </Box>
  );
};

export default ReportingModule;
