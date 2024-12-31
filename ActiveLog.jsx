// ActivityLog.jsx
import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const mockActivityLogs = [
  { id: 1, timestamp: '2024-12-29 10:00', activity: 'Sent Email to ENTNT' },
  { id: 2, timestamp: '2024-12-29 10:05', activity: 'LinkedIn Message sent to GOOGLE' },
  // Initial logs
];

const ActivityLog = () => {
  const [logs, setLogs] = useState(mockActivityLogs);

  useEffect(() => {
    // Simulate real-time activity by adding a new log every 10 seconds
    const interval = setInterval(() => {
      const newLog = {
        id: logs.length + 1,
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        activity: `New activity ${logs.length + 1}`,
      };
      setLogs((prevLogs) => [newLog, ...prevLogs]);
    }, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, [logs]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Real-Time Activity Log
      </Typography>
      <List sx={{ maxHeight: 400, overflow: 'auto', bgcolor: 'background.paper' }}>
        {logs.map((log) => (
          <ListItem key={log.id} divider>
            <ListItemText primary={log.activity} secondary={log.timestamp} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ActivityLog;
