# Quick Chops Venice AI Configuration

This file contains environment variables and configuration for the Venice AI integration.

## Venice AI API Key Setup

To enable the RAG functionality with Venice AI, you need to set up your API key. Here are several ways to do this:

### Method 1: Environment Variable (Recommended for production)
Set the `VENICE_API_KEY` environment variable:
```bash
export VENICE_API_KEY="your-venice-api-key-here"
```

### Method 2: Browser Local Storage (For development)
Open the browser console on the Quick Chops website and run:
```javascript
setVeniceApiKey("your-venice-api-key-here");
```

### Method 3: Direct JavaScript (For testing)
Set the global variable in the browser console:
```javascript
window.VENICE_API_KEY = "your-venice-api-key-here";
```

## Configuration Options

You can customize the Venice AI integration by modifying the `QuickChopsConfig` object in `js/config.js`:

- `apiKey`: Your Venice AI API key
- `baseUrl`: Venice AI API endpoint (default: 'https://api.venice.ai/v1')
- `model`: Venice AI model to use (default: 'venice-web-search')
- `maxTokens`: Maximum response length (default: 500)
- `temperature`: Response creativity (default: 0.7)
- `timeout`: Request timeout in milliseconds (default: 30000)

## Testing the Integration

After setting up your API key, you can test the Venice AI integration:

1. Open the website in your browser
2. Click the chat widget in the bottom-right corner
3. Ask questions about Quick Chops products
4. Open browser console and run `debugConfig()` to check configuration

## Fallback Behavior

If Venice AI is unavailable or not configured, the system will automatically fall back to basic keyword-based responses to ensure the chat functionality remains operational.

## Security Notes

- Never commit API keys to version control
- Use environment variables or secure key management for production
- The current implementation stores keys in localStorage for development convenience only