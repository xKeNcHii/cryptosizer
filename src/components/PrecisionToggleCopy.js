import React, { useState } from 'react';
import { Typography, Box, IconButton, Tooltip } from '@mui/material';
import { ContentCopy as CopyIcon } from '@mui/icons-material';

const PrecisionToggleCopy = ({ label, value, textStyle }) => {
  const [precision, setPrecision] = useState(2);

  const handleTogglePrecision = () => {
    setPrecision((prev) => (prev === 2 ? 5 : 2));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${label}: ${Number(value).toFixed(precision)} SOL`);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', m: 0 }}>
      <Typography
        variant="body1"
        sx={{
          cursor: 'pointer',
          color: '#aaa', // This applies to the label, not the value
          m: 0, // Remove margin from Typography
        }}
        onClick={handleTogglePrecision}
      >
        {label}:{' '}
        <strong
          style={{
            ...textStyle, // Apply additional styles (like font-size) from parent
          }}
        >
          {Number(value).toFixed(precision)} SOL
        </strong>
      </Typography>
      <Tooltip title="Copy to clipboard">
        <IconButton onClick={handleCopy} sx={{ m: 0 }}>
          <CopyIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default PrecisionToggleCopy;
