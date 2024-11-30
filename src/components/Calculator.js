import React, { useState, useEffect } from 'react';
import { fetchSolanaPrice } from '../api/solana';
import AmountAdjustment from './AmountAdjustment';
import ResultsDisplay from './ResultsDisplay';
import DarkModeToggle from './DarkModeToggle';
import { Box, Card, CardContent, Typography, CssBaseline, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CustomSlider from './Slider';
import { TextField } from '@mui/material';

const Calculator = () => {
  // State for the calculator
  const [solPrice, setSolPrice] = useState(null);
  const [stopLoss, setStopLoss] = useState(20);
  const [takeProfitMain, setTakeProfitMain] = useState(40); // Main take profit
  const [takeProfitIncrement, setTakeProfitIncrement] = useState(0); // Incremental take profit
  const [riskAmount, setRiskAmount] = useState(10); // Risk amount in USD
  const [darkMode, setDarkMode] = useState(true); // Dark mode toggle state

  // Calculate the total take profit by adding main and incremental take profit
  const takeProfit = takeProfitMain + takeProfitIncrement;

  // Calculate results based on the current input values
  const calculateResults = () => {
    const riskRewardRatio = takeProfit / stopLoss; // Risk-Reward Ratio
    const positionSizeUSD = (riskAmount / (stopLoss / 100)).toFixed(2); // Position size in USD
    const profitUSD = ((takeProfit / 100) * positionSizeUSD).toFixed(2); // Profit in USD
    const positionSizeSOL = solPrice ? (positionSizeUSD / solPrice).toFixed(2) : 0; // Position size in SOL
    const profitSOL = solPrice ? (profitUSD / solPrice).toFixed(2) : 0; // Profit in SOL

    return { riskRewardRatio, positionSizeUSD, profitUSD, positionSizeSOL, profitSOL };
  };

  const { riskRewardRatio, positionSizeUSD, profitUSD, positionSizeSOL, profitSOL } = calculateResults();

  // Fetch Solana price on mount and every 60 seconds
  useEffect(() => {
    const getPrice = async () => {
      const price = await fetchSolanaPrice();
      setSolPrice(price);
    };

    getPrice();
    const interval = setInterval(getPrice, 60000); 
    return () => clearInterval(interval);
  }, []);

  // Define handleRiskAmountChange function to update riskAmount
  const handleRiskAmountChange = (newRiskAmount) => {
    setRiskAmount(newRiskAmount);
  };
  

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ maxWidth: 800, margin: '0 auto', mt: 4, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
            Crypto Position Size Calculator
          </Typography>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="body1" gutterBottom sx={{ color: darkMode ? '#aaa' : '#555' }}>
              Live Solana Price: 
              <span style={{ fontWeight: 'bold', color: solPrice ? (darkMode ? '#90caf9' : '#1976d2') : '#999' }}>
                {solPrice ? ` $${solPrice}` : ' Loading...'}
              </span>
            </Typography>

            <Box sx={{ mb: 3 }}>
              {/* Stop Loss Slider */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <CustomSlider label="Stop Loss (%)" value={stopLoss} onChange={setStopLoss} min={5} max={80} step={0.1} />
                <TextField 
                  label="SL (%)" 
                  value={stopLoss} 
                  onChange={(e) => setStopLoss(Number(e.target.value))}
                  sx={{ width: 100 }} 
                  type="number"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: { textAlign: 'right' }}}
                />
              </Box>

              {/* Take Profit Slider */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <CustomSlider label="Take Profit (%)" value={takeProfitMain} onChange={setTakeProfitMain} min={0} max={99} step={0.1} />
                <TextField 
                  label="TP (%)" 
                  value={takeProfitMain} 
                  onChange={(e) => setTakeProfitMain(Number(e.target.value))}
                  sx={{ width: 100 }} 
                  type="number"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: { textAlign: 'right' }}}
                />
              </Box>
              
              {/* Adjust Take Profit (percentage) */}
              <AmountAdjustment
                value={takeProfitIncrement} 
                onChange={setTakeProfitIncrement} 
                increments={[-100, 100]} 
                darkMode={darkMode}
                type="percentage" 
              />
              <Divider sx={{ my: 4 }} />

              {/* Adjust Risk Amount (currency) */}
              <AmountAdjustment
                label="Risk Amount ($)"
                value={riskAmount}
                onChange={handleRiskAmountChange}
                increments={[-10,-5,+5,+10]}
                darkMode={darkMode}
                type="currency"
              />
            </Box>
             
            <Divider sx={{ my: 4 }} />

            {/* Results Display */}
            <ResultsDisplay
              riskRewardRatio={riskRewardRatio}
              positionSizeUSD={positionSizeUSD}
              profitUSD={profitUSD}
              positionSizeSOL={positionSizeSOL}
              profitSOL={profitSOL}
              darkMode={darkMode}
            />
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default Calculator;
