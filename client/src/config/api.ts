// API Configuration for different environments
export const API_CONFIG = {
  // Use environment variable or fallback to localhost for development
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  
  // Environment detection
  isDevelopment: import.meta.env.VITE_ENVIRONMENT === 'development' || import.meta.env.DEV,
  isProduction: import.meta.env.VITE_ENVIRONMENT === 'production' || import.meta.env.PROD,
};

// Export the base URL for easy access
export const API_BASE = API_CONFIG.baseURL;

// Helper function to get full API endpoint
export const getApiUrl = (endpoint: string): string => {
  return `${API_BASE}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

// Log current configuration (only in development)
if (API_CONFIG.isDevelopment) {
  console.log('🔧 API Configuration:', {
    baseURL: API_CONFIG.baseURL,
    environment: import.meta.env.VITE_ENVIRONMENT || 'development',
  });
} 