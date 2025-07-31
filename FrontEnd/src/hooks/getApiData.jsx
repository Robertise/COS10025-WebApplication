const API_BASE_URL = 'https://cos10025-webapplication.onrender.com';

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return await response.json();
  } catch (err) {
    console.error("API Fetching Error: ", err);
    throw err;
  }
};

// Export All Tables from the API
export const getApi = (path) => fetchData(path);