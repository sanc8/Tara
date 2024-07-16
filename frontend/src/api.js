import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/usuarios`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/usuarios/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


