import axios from "axios";
import axiosRetry from "axios-retry";

// Axios custom configuration
const axiosConfig = {
  baseURL: "http://localhost:3001/api",
  timeout: 5000, // 5 seconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// Create the axios instance with custom configuration
const axiosCustom = axios.create(axiosConfig);

// Configure axios-retry
axiosRetry(axiosCustom, {
  retries: 2, // 2 retries + initial request = 3 requests
  retryDelay: axiosRetry.exponentialDelay, // Add delay (exponentially) between retries
  retryCondition: (error) => {
    // Retry on network errors or 5xx server errors
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.response.status >= 500
    );
  },
});

export default axiosCustom;
