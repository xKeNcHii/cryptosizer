import React, { useState } from 'react';
import { Button, ButtonGroup, Tooltip, Paper, Typography, TextField, InputAdornment } from '@mui/material';

const AmountAdjustment = ({ label, value, onChange, increments, darkMode, type }) => {
  // Split increments into negative and positive arrays
  const negativeIncrements = increments.filter(delta => delta < 0);
  const positiveIncrements = increments.filter(delta => delta > 0);

  // Local state for the editable value
  const [editableValue, setEditableValue] = useState(value);

  const handleValueChange = (event) => {
    const newValue = parseFloat(event.target.value); // Ensure the input is a number
    if (!isNaN(newValue) && newValue >= 0) {
      setEditableValue(newValue);
      onChange(newValue);
    }
  };

  // Determine the unit to display (USD or %)
  const unit = type === 'currency' ? 'USD' : '%';

  return (
    <div>
      <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
        {label}
      </Typography>
      <ButtonGroup
        sx={{
          display: 'flex',
          justifyContent: 'center',  // Center the group horizontally
          alignItems: 'center',      // Center the group vertically
          width: '100%'              // Ensure the group takes up full width
        }}
      >
        {/* Negative increments on the left (red color) */}
        {negativeIncrements.map((delta, index) => (
          <Tooltip key={index} title={`Adjust by ${delta}${unit}`}>
            <Button
              onClick={() => {
                const newValue = editableValue + delta;
                if (!isNaN(newValue) && newValue >= 0) {
                  setEditableValue(newValue);
                  onChange(newValue);
                }
              }}
              variant={delta < 0 ? 'outlined' : 'contained'}
              color="error"  // Set color to red for negative increments
              sx={{ fontWeight: 'bold' }}
            >
              {delta < 0 ? `${delta}` : `+${delta}`}
            </Button>
          </Tooltip>
        ))}

        {/* Paper element in the middle of the buttons with editable input */}
        <Paper
          elevation={3}
          sx={{
            p: 1,
            width: 100,
            textAlign: 'center',
            backgroundColor: darkMode ? '#333' : '#f5f5f5',
            display: 'flex',
            justifyContent: 'center',  // Ensure content inside Paper is centered
            alignItems: 'center',      // Vertically center the content
          }}
        >
          <TextField
            value={editableValue}  // The value is a number now
            onChange={handleValueChange}
            variant="standard"
            slotProps={{
              input: {
                disableUnderline: true, // To remove the underline for a cleaner look
                style: { textAlign: 'center' }, // Center the text inside input
                endAdornment: (
                  <InputAdornment position="end" sx={{ fontWeight: 'bold' }}>
                    {unit} {/* Display the unit after the number */}
                  </InputAdornment>
                ),
              }
            }}
            sx={{
              fontWeight: 'bold',
              fontSize: '1.2rem',
              width: '100%',
              input: { textAlign: 'center' },
            }}
          />
        </Paper>

        {/* Positive increments on the right (green color) */}
        {positiveIncrements.map((delta, index) => (
          <Tooltip key={index} title={`Adjust by ${delta}${unit}`}>
            <Button
              onClick={() => {
                const newValue = editableValue + delta;
                if (!isNaN(newValue) && newValue >= 0) {
                  setEditableValue(newValue);
                  onChange(newValue);
                }
              }}
              variant={delta < 0 ? 'outlined' : 'contained'}
              color="success"  // Set color to green for positive increments
              sx={{ fontWeight: 'bold' }}
            >
              {delta < 0 ? `${delta}` : `+${delta}`}
            </Button>
          </Tooltip>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default AmountAdjustment;
