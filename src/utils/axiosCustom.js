import axios from "axios";
import axiosRetry from "axios-retry";

// Axios custom configuration
const axiosConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 3000, // 3 seconds
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
  retryCondition: async (error) => {
    // Retry on 401 unauthorized with custom action
    if (error.response && error.response.status === 401) {
      try {
        // Re-authenticate (Refresh token)
        await axios.get("http://localhost:3001/api/auths/refresh", {
          withCredentials: true,
        });
        return true; // Retry the original request
      } catch (reAuthError) {
        return false; // Do not retry the original request if re-authentication fails
      }
    }

    // Retry on 5xx server errors
    if (error.response && error.response.status >= 500) return true;

    // Retry on network errors and idempotent requests
    return axiosRetry.isNetworkOrIdempotentRequestError(error);
  },
});

export default axiosCustom;
