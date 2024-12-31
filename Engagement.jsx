
// EngagementEffectivenessReport.jsx
import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Utility functions for exporting data
const exportToCSV = (data, filename) => {
  const csvRows = [];
  // Headers
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(','));

  // Rows
  data.forEach((row) => {
    const values = headers.map((header) => row[header]);
    csvRows.push(values.join(','));
  });

  // Create a blob and trigger download
  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const exportToPDF = (title, data) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(title, 14, 22);

  doc.setFontSize(12);
  const tableColumn = Object.keys(data[0]);
  const tableRows = data.map((row) => Object.values(row));

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
  });

  doc.save(`${title}.pdf`);
};

// Mock data for different companies
const companyEffectivenessData = {
  ENTNT: [
    { method: 'Email', successRate: 30 },
    { method: 'Phone Call', successRate: 90 },
    { method: 'LinkedIn Message', successRate: 100 },
    { method: 'Webinar', successRate: 10 },
  ],
  GOOGLE: [
    { method: 'Email', successRate: 75 },
    { method: 'Phone Call', successRate: 10 },
    { method: 'LinkedIn Message', successRate: 200 },
    { method: 'Webinar', successRate: 130 },
  ],
  MICROSOFT: [
    { method: 'Email', successRate: 20 },
    { method: 'Phone Call', successRate: 50 },
    { method: 'LinkedIn Message', successRate: 150 },
    { method: 'Webinar', successRate: 80 },
  ],
};

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#33AA99'];

const EngagementEffectivenessReport = () => {
  const [company, setCompany] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const companies = ['ENTNT', 'GOOGLE', 'MICROSOFT'];

  // Initialize with all data (you can decide how to aggregate if needed)
  React.useEffect(() => {
    // If no company is selected, you might want to aggregate data or show nothing
    if (!company) {
      // For simplicity, show aggregated data by averaging success rates
      const aggregated = companies.reduce((acc, comp) => {
        companyEffectivenessData[comp].forEach((item, index) => {
          if (!acc[index]) {
            acc[index] = { method: item.method, successRate: 0 };
          }
          acc[index].successRate += item.successRate;
        });
        return acc;
      }, []);

      const averaged = aggregated.map((item) => ({
        method: item.method,
        successRate: Math.round(item.successRate / companies.length),
      }));

      setFilteredData(averaged);
    } else {
      setFilteredData(companyEffectivenessData[company]);
    }
  }, [company]);

  const handleFilter = () => {
    // The filtering logic is handled by useEffect
    // This function can be used if additional actions are needed on filter
  };

  const handleExportCSV = () => {
    if (filteredData.length === 0) {
      alert('No data to export');
      return;
    }
    exportToCSV(filteredData, 'engagement_effectiveness_report.csv');
  };

  const handleExportPDF = () => {
    if (filteredData.length === 0) {
      alert('No data to export');
      return;
    }
    const title = company ? `${company} Engagement Effectiveness Report` : 'All Companies Engagement Effectiveness Report';
    exportToPDF(title, filteredData);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Company</InputLabel>
          <Select
            value={company}
            label="Company"
            onChange={(e) => setCompany(e.target.value)}
          >
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
        <Button variant="contained" onClick={handleFilter}>
          Filter
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" onClick={handleExportCSV}>
          Export CSV
        </Button>
        <Button variant="outlined" onClick={handleExportPDF}>
          Export PDF
        </Button>
      </Box>
      {filteredData.length > 0 ? (
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={filteredData}
              dataKey="successRate"
              nameKey="method"
              cx="50%"
              cy="50%"
              outerRadius={200}
              fill="#8884d8"
              label
            >
              {filteredData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <p>No data available for the selected company.</p>
        </Box>
      )}
    </Box>
  );
};

export default EngagementEffectivenessReport;

