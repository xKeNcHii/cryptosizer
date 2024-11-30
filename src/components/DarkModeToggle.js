import React from 'react';
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const DarkModeToggle = ({ darkMode, setDarkMode }) => (
  <IconButton onClick={() => setDarkMode(!darkMode)}>
    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
  </IconButton>
);

export default DarkModeToggle;
