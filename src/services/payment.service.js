import axios from 'axios';
import config from '../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

export const getPayment = async () => {
    return axios.get(`${DOMAIN}/api/payment`);
  };

export const postPayment = async (data) => {
  try {
    const response = await axios.post(`${DOMAIN}/api/payment/initiate`, data, {
      timeout: 10000, // 10 secondes max
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Erreur postPayment:", error?.response?.data || error.message);
    return { success: false, error: error?.response?.data || error.message };
  }
}