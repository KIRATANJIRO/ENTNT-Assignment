
// CommunicationFrequencyReport.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { saveAs } from 'file-saver';
import { exportToCSV, exportToPDF } from './utils/exportUtils';
import jsPDF from 'jspdf';

const mockData = [
  // Sample data
  { company: 'ENTNT', method: 'Email', count: 120 },
  { company: 'ENTNT', method: 'LinkedIn Post', count: 80 },
  { company: 'GOOGLE', method: 'Email', count: 150 },
  { company: 'GOOGLE', method: 'Phone Call', count: 60 },
  // Add more data as needed
];

const CommunicationFrequencyReport = () => {
  const [company, setCompany] = useState('');
  const [method, setMethod] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [filteredData, setFilteredData] = useState(mockData);

  const companies = [...new Set(mockData.map((item) => item.company))];
  const methods = [...new Set(mockData.map((item) => item.method))];

  const handleFilter = () => {
    let data = [...mockData];
    if (company) data = data.filter((item) => item.company === company);
    if (method) data = data.filter((item) => item.method === method);
    // Date filtering can be implemented based on actual data with dates
    setFilteredData(data);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredData, 'communication_frequency_report.csv');
  };

  const handleExportPDF = () => {
    exportToPDF('Communication Frequency Report', filteredData);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Company</InputLabel>
          <Select value={company} label="Company" onChange={(e) => setCompany(e.target.value)}>
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {companies.map((comp) => (
              <MenuItem key={comp} value={comp}>
                {comp}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Communication Method</InputLabel>
          <Select value={method} label="Communication Method" onChange={(e) => setMethod(e.target.value)}>
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {methods.map((meth) => (
              <MenuItem key={meth} value={meth}>
                {meth}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="From"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dateRange.from}
          onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
        />
        <TextField
          label="To"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dateRange.to}
          onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
        />
        <Button variant="contained" onClick={handleFilter}>
          Filter
        </Button>
      </Box>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={filteredData}>
          <XAxis dataKey="method" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#1976d2" name="Communication Count" />
        </BarChart>
      </ResponsiveContainer>
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={handleExportCSV}>
          Export CSV
        </Button>
        <Button variant="outlined" onClick={handleExportPDF}>
          Export PDF
        </Button>
      </Box>
    </Box>
  );
};

export default CommunicationFrequencyReport;
