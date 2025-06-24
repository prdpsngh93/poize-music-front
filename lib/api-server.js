// lib/api-server.js
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (userData) => {

  try {
    const res = await axios.post(
      `${BASE_URL}/api/auth/register`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return res.data;

  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
    throw error;
  }
};
