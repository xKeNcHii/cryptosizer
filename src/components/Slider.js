import React from 'react';
import { Slider, Typography, Box } from '@mui/material';

const CustomSlider = ({ label, value, onChange, min, max, step }) => {
  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography gutterBottom>{label}</Typography>
      <Slider
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default CustomSlider;
