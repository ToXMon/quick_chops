/**
 * Venice AI Integration for Quick Chops RAG System
 * Provides intelligent responses using Venice AI's LLM with web search capabilities
 */

class VeniceAI {
    constructor() {
        // Wait for configuration to be available
        this.config = null;
        this.initializeConfig();
    }

    /**
     * Initialize configuration from global config
     */
    initializeConfig() {
        // Use global configuration if available
        if (window.QuickChopsConfig) {
            this.config = window.QuickChopsConfig.veniceAI;
        } else {
            // Fallback configuration
            this.config = {
                apiKey: this.getApiKey(),
                baseUrl: 'https://api.venice.ai/v1',
                model: 'venice-web-search',
                maxTokens: 500,
                temperature: 0.7,
                timeout: 30000
            };
        }
    }

    /**
     * Get Venice AI API key from various sources
     */
    getApiKey() {
        return window.VENICE_API_KEY || 
               localStorage.getItem('venice_api_key') || 
               sessionStorage.getItem('venice_api_key') ||
               null;
    }

    /**
     * Enhanced RAG processing with Venice AI
     * @param {string} userQuery - User's question
     * @param {object} context - Quick Chops specific context
     * @returns {Promise<string>} - AI generated response
     */
    async processQuery(userQuery, context) {
        try {
            // Construct RAG prompt with context
            const ragPrompt = this.buildRAGPrompt(userQuery, context);
            
            // Call Venice AI API
            const response = await this.callVeniceAPI(ragPrompt);
            
            // Process and validate response
            return this.processResponse(response, userQuery);
            
        } catch (error) {
            console.error('Venice AI Error:', error);
            return this.getFallbackResponse(userQuery, context);
        }
    }

    /**
     * Build RAG prompt with context and instructions
     */
    buildRAGPrompt(userQuery, context) {
        return `You are an AI assistant for Quick Chops, a company that sells authentic smoky Nigerian jollof rice. Use the provided context and your web search capabilities to answer questions accurately and helpfully.

COMPANY CONTEXT:
- Company: ${context.company}
- Product: ${context.product}
- Origin: ${context.origin}
- Features: ${context.features.join(', ')}
- Story: ${context.story}
- Contact: ${context.contact}
- Specialty: ${context.specialty}

INSTRUCTIONS:
1. Answer questions about Quick Chops products, ingredients, pricing, ordering, and company story
2. For questions you cannot answer with the provided context, use web search to find relevant, accurate information
3. If information is not available, direct users to contact ${context.contact}
4. Keep responses conversational, helpful, and under 150 words
5. Always maintain accuracy - don't make up information about products or pricing

USER QUESTION: ${userQuery}

Please provide a helpful, accurate response:`;
    }

    /**
     * Call Venice AI API
     */
    async callVeniceAPI(prompt) {
        if (!this.config.apiKey) {
            throw new Error('Venice AI API key not configured');
        }

        const requestBody = {
            model: this.config.model,
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant for Quick Chops, specializing in Nigerian jollof rice products. Use web search when needed to provide accurate, helpful information."
                },
                {
                    role: "user", 
                    content: prompt
                }
            ],
            max_tokens: this.config.maxTokens,
            temperature: this.config.temperature,
            use_web_search: true // Enable web search capability
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        try {
            const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Venice API Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    /**
     * Process Venice AI response
     */
    processResponse(apiResponse, originalQuery) {
        try {
            // Extract message from Venice AI response
            const message = apiResponse.choices?.[0]?.message?.content;
            
            if (!message) {
                throw new Error('Invalid response format from Venice AI');
            }

            // Validate and sanitize response
            return this.sanitizeResponse(message);
            
        } catch (error) {
            console.error('Error processing Venice response:', error);
            return this.getFallbackResponse(originalQuery);
        }
    }

    /**
     * Sanitize AI response to ensure safety and appropriateness
     */
    sanitizeResponse(response) {
        // Remove any potentially harmful content
        let sanitized = response.trim();
        
        // Ensure response mentions Quick Chops context when appropriate
        if (!sanitized.toLowerCase().includes('quick chops') && 
            !sanitized.toLowerCase().includes('contact')) {
            sanitized += "\n\nFor more information about Quick Chops products, feel free to contact us at contact@quickchops.com";
        }
        
        return sanitized;
    }

    /**
     * Fallback response when Venice AI is unavailable
     */
    getFallbackResponse(userQuery, context = null) {
        const lowerQuery = userQuery.toLowerCase();
        
        // Basic keyword matching for fallback responses
        const fallbackResponses = {
            price: "For current pricing and ordering information, please contact us at contact@quickchops.com. We'd be happy to help you get our authentic smoky jollof rice!",
            
            ingredients: "Our jollof rice is made with all-natural ingredients and no preservatives. For detailed ingredient information and allergy details, please contact us at contact@quickchops.com",
            
            cook: "Our jollof rice comes in convenient ready-to-heat pouches - just heat and enjoy! For detailed preparation instructions, contact us at contact@quickchops.com",
            
            story: "Quick Chops was founded by a passionate cook who grew up in Nigeria and moved to Mississippi. She wanted to share the authentic smoky party jollof flavors from her homeland. Contact us at contact@quickchops.com to learn more!",
            
            flavor: "Our signature smoky flavor comes from traditional Nigerian open-fire cooking methods. We recreate that authentic party jollof magic in every package!",
            
            order: "To place an order or learn about availability in your area, please contact us at contact@quickchops.com. We'll help you get our delicious jollof rice delivered to you!"
        };

        // Find matching response
        for (const [keyword, response] of Object.entries(fallbackResponses)) {
            if (lowerQuery.includes(keyword)) {
                return response;
            }
        }

        // Default fallback
        return "Thank you for your interest in Quick Chops! For detailed information about our authentic smoky jollof rice, please contact us at contact@quickchops.com. Our team will be happy to answer all your questions about our products, ingredients, pricing, and availability.";
    }

    /**
     * Test Venice AI connection
     */
    async testConnection() {
        try {
            const testResponse = await this.callVeniceAPI("Hello, this is a connection test.");
            return { success: true, response: testResponse };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

// Global instance for use in main application
window.veniceAI = new VeniceAI();