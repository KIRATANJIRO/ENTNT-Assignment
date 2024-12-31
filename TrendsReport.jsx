// src/components/reporting/OverdueTrendsReport.jsx

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Typography,
} from '@mui/material';

// Mock data representing overdue communications
const MOCK_DATA = [
  { date: '2024-01-01', ENTNT: 5, GOOGLE: 3, MICROSOFT: 7 },
  { date: '2024-01-02', ENTNT: 2, GOOGLE: 4, MICROSOFT: 6 },
  { date: '2024-01-03', ENTNT: 3, GOOGLE: 2, MICROSOFT: 5 },
  { date: '2024-01-04', ENTNT: 4, GOOGLE: 5, MICROSOFT: 3 },
  { date: '2024-01-05', ENTNT: 1, GOOGLE: 3, MICROSOFT: 4 },
  { date: '2024-01-06', ENTNT: 6, GOOGLE: 2, MICROSOFT: 5 },
  { date: '2024-01-07', ENTNT: 3, GOOGLE: 4, MICROSOFT: 2 },
  // ... Add more data points as needed
];

/**
 * Assigns a distinct color to each line in the chart based on its index.
 *
 * @param {number} index - The index of the company.
 * @returns {string} - The HEX color code.
 */
const getColor = (index) => {
  const colors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff7300',
    '#413ea0',
    '#ff0000',
    '#00ff00',
    '#0000ff',
  ];
  return colors[index % colors.length];
};

/**
 * Formats a date string from 'YYYY-MM-DD' to 'MMM DD, YYYY' (e.g., '2024-01-01' -> 'Jan 01, 2024').
 *
 * @param {string} dateString - The date string in 'YYYY-MM-DD' format.
 * @returns {string} - The formatted date string.
 */
const formatDate = (dateString) => {
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

/**
 * Filters the mock data based on the provided company filter and date range.
 *
 * @param {Array} data - The mock data array.
 * @param {string|null} companyFilter - The company name to filter by, or null for all companies.
 * @param {string} startDate - The start date in 'YYYY-MM-DD' format.
 * @param {string} endDate - The end date in 'YYYY-MM-DD' format.
 * @returns {Array} - The filtered data array.
 */
const filterData = (data, companyFilter, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return data
    .filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= start && entryDate <= end;
    })
    .map((entry) => {
      // If a company filter is applied, exclude other companies from the data
      if (companyFilter) {
        const filteredEntry = { date: entry.date };
        if (entry[companyFilter] !== undefined) {
          filteredEntry[companyFilter] = entry[companyFilter];
        }
        return filteredEntry;
      }
      return entry;
    });
};

/**
 * OverdueTrendsReport Component
 *
 * Displays a trendline chart of overdue communications over time, categorized by company.
 *
 * @returns {JSX.Element} - The rendered component.
 */
const OverdueTrendsReport = () => {
  // Determine available companies from mock data
  const availableCompanies = MOCK_DATA.length > 0
    ? Object.keys(MOCK_DATA[0]).filter((key) => key !== 'date')
    : [];

  // Initialize state for filters
  const [companyFilter, setCompanyFilter] = useState('All'); // 'All' represents no filter
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-07');

  // Handle filter changes
  const handleCompanyChange = (event) => {
    setCompanyFilter(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    // Ensure that endDate is not before startDate
    if (new Date(event.target.value) > new Date(endDate)) {
      setEndDate(event.target.value);
    }
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    // Ensure that startDate is not after endDate
    if (new Date(event.target.value) < new Date(startDate)) {
      setStartDate(event.target.value);
    }
  };

  // Filter data based on current filters
  const filteredData = filterData(
    MOCK_DATA,
    companyFilter === 'All' ? null : companyFilter,
    startDate,
    endDate
  );

  // Determine the companies present in the filtered data
  const companies = companyFilter === 'All'
    ? availableCompanies
    : [companyFilter].filter((company) => availableCompanies.includes(company));

  // Format dates for better readability
  const formattedData = filteredData.map((entry) => ({
    date: formatDate(entry.date),
    ...entry,
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Overdue Communication Trends
      </Typography>

      {/* Filter Controls */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} justifyContent="center">
          {/* Company Filter */}
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth>
              <InputLabel id="company-filter-label">Company</InputLabel>
              <Select
                labelId="company-filter-label"
                id="company-filter"
                value={companyFilter}
                label="Company"
                onChange={handleCompanyChange}
              >
                <MenuItem value="All">All</MenuItem>
                {availableCompanies.map((company) => (
                  <MenuItem key={company} value={company}>
                    {company}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Start Date Filter */}
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              id="start-date"
              label="Start Date"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              inputProps={{
                min: '2024-01-01',
                max: endDate,
              }}
            />
          </Grid>

          {/* End Date Filter */}
          <Grid item xs={12} sm={4} md={3}>
            <TextField
              id="end-date"
              label="End Date"
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              inputProps={{
                min: startDate,
                max: '2024-12-31',
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Chart or No Data Message */}
      {formattedData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              allowDecimals={false}
              label={{
                value: 'Overdue Count',
                angle: -90,
                position: 'insideLeft',
                offset: 10,
              }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            {companies.map((company, index) => (
              <Line
                key={company}
                type="monotone"
                dataKey={company}
                stroke={getColor(index)}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Typography variant="body1" align="center">
          No overdue communication data available for the selected criteria.
        </Typography>
      )}
    </Box>
  );
};

// No props are required as the component manages its own state and filters

OverdueTrendsReport.propTypes = {};

export default OverdueTrendsReport;
