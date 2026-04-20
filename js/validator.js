/**
 * Venice AI Integration Validator
 * Test script to validate Venice AI API connectivity and response format
 */

class VeniceValidator {
    constructor() {
        this.testResults = [];
    }

    /**
     * Run comprehensive validation tests
     */
    async runValidation() {
        console.log('🔍 Starting Venice AI Integration Validation...\n');
        
        this.testResults = [];
        
        // Test 1: Configuration Check
        await this.testConfiguration();
        
        // Test 2: API Key Validation
        await this.testApiKey();
        
        // Test 3: Connection Test
        await this.testConnection();
        
        // Test 4: Response Format Test
        await this.testResponseFormat();
        
        // Test 5: RAG Context Test
        await this.testRAGContext();
        
        // Test 6: Fallback System Test
        await this.testFallbackSystem();
        
        // Generate Report
        this.generateReport();
    }

    /**
     * Test configuration setup
     */
    async testConfiguration() {
        console.log('📋 Testing Configuration...');
        
        try {
            const hasConfig = window.QuickChopsConfig && window.QuickChopsConfig.veniceAI;
            const hasVeniceAI = window.veniceAI;
            
            this.addResult('Configuration', hasConfig && hasVeniceAI, 
                hasConfig && hasVeniceAI ? 'Configuration loaded successfully' : 'Configuration missing or incomplete');
        } catch (error) {
            this.addResult('Configuration', false, `Configuration error: ${error.message}`);
        }
    }

    /**
     * Test API key presence and format
     */
    async testApiKey() {
        console.log('🔑 Testing API Key...');
        
        try {
            const apiKey = window.QuickChopsConfig?.veniceAI?.apiKey;
            const hasKey = apiKey && apiKey !== 'your-venice-api-key-here' && apiKey.length > 10;
            
            this.addResult('API Key', hasKey, 
                hasKey ? 'API key configured' : 'API key missing or placeholder');
        } catch (error) {
            this.addResult('API Key', false, `API key test error: ${error.message}`);
        }
    }

    /**
     * Test Venice AI connection
     */
    async testConnection() {
        console.log('🌐 Testing Venice AI Connection...');
        
        try {
            if (!window.veniceAI) {
                this.addResult('Connection', false, 'Venice AI instance not available');
                return;
            }

            const result = await window.veniceAI.testConnection();
            this.addResult('Connection', result.success, 
                result.success ? 'Connection successful' : `Connection failed: ${result.error}`);
        } catch (error) {
            this.addResult('Connection', false, `Connection test error: ${error.message}`);
        }
    }

    /**
     * Test response format parsing
     */
    async testResponseFormat() {
        console.log('📝 Testing Response Format...');
        
        try {
            if (!window.veniceAI) {
                this.addResult('Response Format', false, 'Venice AI instance not available');
                return;
            }

            // Mock a Venice API response for testing
            const mockResponse = {
                choices: [
                    {
                        message: {
                            content: "Test response from Venice AI"
                        }
                    }
                ]
            };

            const processed = window.veniceAI.processResponse(mockResponse, "test query");
            const isValid = processed && typeof processed === 'string' && processed.length > 0;
            
            this.addResult('Response Format', isValid, 
                isValid ? 'Response parsing successful' : 'Response parsing failed');
        } catch (error) {
            this.addResult('Response Format', false, `Response format test error: ${error.message}`);
        }
    }

    /**
     * Test RAG context integration
     */
    async testRAGContext() {
        console.log('🧠 Testing RAG Context...');
        
        try {
            const context = window.QuickChopsConfig?.context;
            const hasContext = context && context.company && context.product && context.features;
            
            this.addResult('RAG Context', hasContext, 
                hasContext ? 'Company context loaded successfully' : 'Company context missing or incomplete');
        } catch (error) {
            this.addResult('RAG Context', false, `RAG context test error: ${error.message}`);
        }
    }

    /**
     * Test fallback system
     */
    async testFallbackSystem() {
        console.log('🔄 Testing Fallback System...');
        
        try {
            if (!window.veniceAI) {
                this.addResult('Fallback System', false, 'Venice AI instance not available');
                return;
            }

            const fallbackResponse = window.veniceAI.getFallbackResponse("What are the ingredients?");
            const isValidFallback = fallbackResponse && fallbackResponse.includes('contact');
            
            this.addResult('Fallback System', isValidFallback, 
                isValidFallback ? 'Fallback responses working' : 'Fallback system not functioning');
        } catch (error) {
            this.addResult('Fallback System', false, `Fallback test error: ${error.message}`);
        }
    }

    /**
     * Add test result
     */
    addResult(test, passed, message) {
        this.testResults.push({ test, passed, message });
        const status = passed ? '✅' : '❌';
        console.log(`   ${status} ${test}: ${message}`);
    }

    /**
     * Generate comprehensive test report
     */
    generateReport() {
        console.log('\n📊 VALIDATION REPORT');
        console.log('='.repeat(50));
        
        const passed = this.testResults.filter(r => r.passed).length;
        const total = this.testResults.length;
        const percentage = Math.round((passed / total) * 100);
        
        console.log(`Overall Status: ${passed}/${total} tests passed (${percentage}%)`);
        console.log('');
        
        console.log('Test Results:');
        this.testResults.forEach(result => {
            const status = result.passed ? '✅ PASS' : '❌ FAIL';
            console.log(`  ${status} ${result.test}: ${result.message}`);
        });
        
        console.log('');
        
        if (percentage === 100) {
            console.log('🎉 Venice AI integration is fully functional!');
        } else if (percentage >= 75) {
            console.log('⚠️  Venice AI integration is mostly functional with minor issues.');
        } else if (percentage >= 50) {
            console.log('🔧 Venice AI integration has significant issues that need attention.');
        } else {
            console.log('🚨 Venice AI integration requires major fixes.');
        }
        
        console.log('\nRecommendations:');
        if (!this.testResults.find(r => r.test === 'API Key')?.passed) {
            console.log('  • Set your Venice AI API key using: setVeniceApiKey("your-key")');
        }
        if (!this.testResults.find(r => r.test === 'Connection')?.passed) {
            console.log('  • Check Venice AI API endpoint and authentication');
        }
        if (!this.testResults.find(r => r.test === 'Configuration')?.passed) {
            console.log('  • Verify that config.js and venice-ai.js are loading properly');
        }
        
        console.log('\nFor detailed setup instructions, see: VENICE_SETUP.md');
        console.log('For API documentation, see: VENICE_API_DOCS.md');
        
        return {
            passed,
            total,
            percentage,
            results: this.testResults
        };
    }
}

// Global validation function
async function validateVeniceIntegration() {
    const validator = new VeniceValidator();
    return await validator.runValidation();
}

// Auto-run validation in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Development mode detected. Run validateVeniceIntegration() to test Venice AI integration.');
    });
}

// Export for global use
window.validateVeniceIntegration = validateVeniceIntegration;
window.VeniceValidator = VeniceValidator;