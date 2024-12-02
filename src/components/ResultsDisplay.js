import React from 'react';
import { Box, Typography, Grid2 } from '@mui/material';
import PrecisionToggleCopy from './PrecisionToggleCopy';

const ResultsDisplay = ({ 
  riskRewardRatio, 
  positionSizeUSD, 
  profitUSD, 
  positionSizeSOL, 
  profitSOL, 
  darkMode 
}) => {
  const textStyle = {
    color: darkMode ? '#aaa' : '#555',
  };
  const textStyle2 = {
    color: darkMode ? '#76ff03' : '#388e3c',
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography 
        variant="h6" 
        sx={{ fontWeight: 'bold', color: darkMode ? '#90caf9' : '#1976d2', mb: 2 }}
      >
        Results
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <Typography variant="body1" sx={textStyle}>
            Risk-Reward Ratio: 
            <strong style={{ color: darkMode ? '#76ff03' : '#388e3c' }}>
              {riskRewardRatio.toFixed(2)}x
            </strong>
          </Typography>
        </Grid2>
        <Grid2 xs={12} sm={6}>
          <Typography variant="body1" sx={textStyle}>
            Position Size (USD): 
            <strong>${positionSizeUSD}</strong>
          </Typography>
          <Typography variant="body1" sx={textStyle}>
            Profit (USD): 
            <strong style={{ color: darkMode ? '#76ff03' : '#388e3c' }}>${profitUSD}</strong>
          </Typography>
        </Grid2>
        <Grid2 xs={12} sm={6}>
          <PrecisionToggleCopy label="Position Size (SOL)" value={positionSizeSOL} textStyle={textStyle2} />
          <PrecisionToggleCopy label="Profit (SOL)" value={profitSOL} textStyle={textStyle2} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ResultsDisplay;
