/**
 * Configuration for Quick Chops Venice AI Integration
 */

// Configuration object
window.QuickChopsConfig = {
    // Venice AI settings
    veniceAI: {
        apiKey: null, // Will be set from environment or user input
        baseUrl: 'https://api.venice.ai/v1',
        model: 'venice-web-search',
        maxTokens: 500,
        temperature: 0.7,
        timeout: 30000 // 30 seconds
    },
    
    // Chat widget settings
    chat: {
        enabled: true,
        maxMessageLength: 500,
        typingDelay: 1000,
        fallbackEnabled: true
    },
    
    // Company context for RAG
    context: {
        company: "Quick Chops",
        product: "Authentic Smoky Jollof Rice",
        origin: "Nigerian cuisine brought to Mississippi",
        features: [
            "Rich smoky taste from traditional Nigerian methods",
            "All-natural ingredients, no preservatives", 
            "Easy to prepare in minutes",
            "Perfect for parties, meals, or quick chops"
        ],
        story: "Founded by a passionate home cook who grew up in Nigeria and emigrated to the US over 20 years ago",
        contact: "contact@quickchops.com",
        specialty: "Party-style jollof rice with authentic smoky flavor",
        location: "Mississippi, USA",
        inspiration: "Traditional Nigerian open-fire cooking methods"
    }
};

/**
 * Initialize Venice AI configuration
 */
function initializeVeniceConfig() {
    // Try to get API key from various sources
    const apiKey = 
        window.VENICE_API_KEY ||                    // Global variable
        localStorage.getItem('venice_api_key') ||   // Local storage
        sessionStorage.getItem('venice_api_key') || // Session storage
        getCookieValue('venice_api_key') ||         // Cookie
        null;
    
    if (apiKey) {
        window.QuickChopsConfig.veniceAI.apiKey = apiKey;
        console.log('Venice AI configured successfully');
    } else {
        console.warn('Venice AI API key not found. Using fallback responses.');
    }
}

/**
 * Get cookie value by name
 */
function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

/**
 * Set Venice AI API key (for development/testing)
 */
function setVeniceApiKey(apiKey) {
    window.QuickChopsConfig.veniceAI.apiKey = apiKey;
    localStorage.setItem('venice_api_key', apiKey);
    console.log('Venice AI API key updated');
}

/**
 * Debug function to test configuration
 */
function debugConfig() {
    console.log('Quick Chops Configuration:', window.QuickChopsConfig);
    console.log('Venice AI Key Present:', !!window.QuickChopsConfig.veniceAI.apiKey);
}

// Initialize configuration when the script loads
document.addEventListener('DOMContentLoaded', initializeVeniceConfig);

// Export configuration for use in other scripts
window.initializeVeniceConfig = initializeVeniceConfig;
window.setVeniceApiKey = setVeniceApiKey;
window.debugConfig = debugConfig;