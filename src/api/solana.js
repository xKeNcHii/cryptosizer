import axios from 'axios';

const API_URL = 'https://api.coinlore.net/api/ticker/?id=48543';

export const fetchSolanaPrice = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data[0].price_usd;
  } catch (error) {
    console.error('Error fetching Solana price:', error);
    return null;
  }
};
