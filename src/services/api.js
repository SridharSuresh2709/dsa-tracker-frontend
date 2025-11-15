import axios from 'axios';

// Use environment variable or fallback to production URL
const API_URL = process.env.REACT_APP_API_URL || 'https://dsa-tracker-backend-ppco.onrender.com/api';

// Rest of the code remains same...
export const getProblems = async () => {
  try {
    const response = await axios.get(`${API_URL}/problems`);
    return response.data;
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw error;
  }
};

// ... rest of functions