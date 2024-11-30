import React from 'react';
import { Grid, Typography } from '@mui/material';

const ResultsDisplay = ({ 
  riskRewardRatio, 
  positionSizeUSD, 
  profitUSD, 
  positionSizeSOL, 
  profitSOL, 
  darkMode 
}) => (
  <div>
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: darkMode ? '#90caf9' : '#1976d2', mb: 2 }}>
      Results
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: darkMode ? '#aaa' : '#555' }}>
          Risk-Reward Ratio: 
          <strong style={{ color: darkMode ? '#76ff03' : '#388e3c' }}>
            {riskRewardRatio.toFixed(2)}x
          </strong>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" sx={{ color: darkMode ? '#aaa' : '#555' }}>
          Position Size (USD): 
          <strong>${positionSizeUSD}</strong>
        </Typography>
        <Typography variant="body1" sx={{ color: darkMode ? '#aaa' : '#555' }}>
          Profit (USD): 
          <strong style={{ color: darkMode ? '#76ff03' : '#388e3c' }}>${profitUSD}</strong>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" sx={{ color: darkMode ? '#aaa' : '#555' }}>
          Position Size (SOL): 
          <strong>{positionSizeSOL} SOL</strong>
        </Typography>
        <Typography variant="body1" sx={{ color: darkMode ? '#aaa' : '#555' }}>
          Profit (SOL):
          <strong style={{ color: darkMode ? '#76ff03' : '#388e3c' }}>{profitSOL} SOL</strong>
        </Typography>
      </Grid>
    </Grid>
  </div>
);

export default ResultsDisplay;
