# Venice AI API Integration Documentation

This document outlines the Venice AI API integration for Quick Chops RAG system.

## API Endpoint Structure

Based on common LLM API patterns, the Venice AI integration assumes the following structure:

### Base Configuration
```javascript
{
  baseUrl: 'https://api.venice.ai/v1',
  endpoint: '/chat/completions',
  method: 'POST'
}
```

### Authentication
```javascript
Headers: {
  'Authorization': 'Bearer YOUR_VENICE_API_KEY',
  'Content-Type': 'application/json'
}
```

### Request Format
```javascript
{
  "model": "venice-web-search",  // Model with web search enabled
  "messages": [
    {
      "role": "system",
      "content": "System prompt with company context"
    },
    {
      "role": "user",
      "content": "User question"
    }
  ],
  "max_tokens": 500,
  "temperature": 0.7,
  "use_web_search": true  // Enable web search capabilities
}
```

### Expected Response Format
```javascript
{
  "choices": [
    {
      "message": {
        "content": "AI response with RAG-enhanced content"
      }
    }
  ]
}
```

## RAG Implementation Details

### Context Injection
The system injects Quick Chops specific context into the prompt:
- Company information and history
- Product details and features
- Contact information
- Brand story and values

### Web Search Enhancement
Venice AI's web search capability is enabled via the `use_web_search: true` parameter, allowing the AI to:
- Find current pricing information
- Research ingredient details
- Get shipping and availability information
- Access general jollof rice and Nigerian cuisine information

### Fallback System
When Venice AI is unavailable, the system uses:
- Keyword-based response matching
- Pre-defined answers for common questions
- Always directs users to contact information for detailed inquiries

## Error Handling

The implementation includes comprehensive error handling for:
- Network connectivity issues
- API authentication failures
- Request timeouts (30-second limit)
- Invalid response formats
- Rate limiting scenarios

## Security Considerations

- API keys are never exposed in client-side code in production
- Responses are sanitized to prevent XSS
- Request timeouts prevent hanging connections
- Fallback ensures functionality without external dependencies

## Customization Points

### Model Selection
Update the `model` parameter in `config.js` to use different Venice AI models:
```javascript
veniceAI: {
  model: 'venice-web-search',  // or other available models
  // ...
}
```

### Response Tuning
Adjust AI behavior through parameters:
- `temperature`: Controls response creativity (0.0-1.0)
- `max_tokens`: Limits response length
- `timeout`: Request timeout duration

### Context Enhancement
Modify the company context in `config.js` to include:
- Additional product information
- Seasonal promotions
- FAQ content
- Regional availability details

## Integration Testing

Use the browser console commands:
```javascript
// Test configuration
debugConfig();

// Set API key for testing
setVeniceApiKey("your-test-key");

// Manual API test (when Venice AI class is available)
veniceAI.testConnection();
```

## Adaptation Notes

If the actual Venice AI API differs from these assumptions:
1. Update the `baseUrl` and endpoint in `config.js`
2. Modify the request format in `venice-ai.js` `callVeniceAPI` method
3. Adjust response parsing in `processResponse` method
4. Update authentication method if needed

## Performance Optimization

- Responses cached in session storage (optional enhancement)
- Request debouncing to prevent spam
- Graceful degradation maintains user experience
- Lazy loading of AI features reduces initial page load