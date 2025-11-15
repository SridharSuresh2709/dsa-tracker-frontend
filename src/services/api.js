import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get all problems
export const getProblems = async () => {
  try {
    const response = await axios.get(`${API_URL}/problems`);
    return response.data;
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw error;
  }
};

// Get recent 3 problems
export const getRecentProblems = async () => {
  try {
    const response = await axios.get(`${API_URL}/problems/recent`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent problems:', error);
    throw error;
  }
};

// Get single problem
export const getProblem = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/problems/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching problem:', error);
    throw error;
  }
};

// Create new problem
export const createProblem = async (problem) => {
  try {
    const response = await axios.post(`${API_URL}/problems`, problem);
    return response.data;
  } catch (error) {
    console.error('Error creating problem:', error);
    throw error;
  }
};

// Update existing problem
export const updateProblem = async (id, problem) => {
  try {
    const response = await axios.put(`${API_URL}/problems/${id}`, problem);
    return response.data;
  } catch (error) {
    console.error('Error updating problem:', error);
    throw error;
  }
};

// Delete problem
export const deleteProblem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/problems/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting problem:', error);
    throw error;
  }
};

// Get statistics
export const getStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};