/* API Configuration File */
/* Store Frappe/ERPNext API connection credentials */

const API_CONFIG = {
	// Production URL
	production: {
		url: 'https://sweets.andalus-sweets.com',
		apiKey: 'c20854c547845a3',
		apiSecret: '4603e3319d3b55b',
		apiToken: 'c20854c547845a3:4603e3319d3b55b',
	},
	// Development URL (local network)
	development: {
		url: 'http://192.168.100.106',
		apiKey: 'c20854c547845a3',
		apiSecret: '4603e3319d3b55b',
		apiToken: 'c20854c547845a3:4603e3319d3b55b',
	},
};

// Current environment (change to 'development' for local testing)
const CURRENT_ENV = 'production';

// Get current API configuration
function getApiConfig() {
	return API_CONFIG[CURRENT_ENV];
}

// Get API base URL
function getApiUrl() {
	return getApiConfig().url;
}

// Get API token for authentication
function getApiToken() {
	return getApiConfig().apiToken;
}

// Get API key
function getApiKey() {
	return getApiConfig().apiKey;
}

// Get API secret
function getApiSecret() {
	return getApiConfig().apiSecret;
}
