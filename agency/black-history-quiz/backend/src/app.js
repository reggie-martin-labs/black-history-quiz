const { app } = require('@azure/functions');
const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');

// Initialize Azure OpenAI client
let azureOpenAIClient = null;

if (process.env.AZURE_OPENAI_ENDPOINT && process.env.AZURE_OPENAI_KEY) {
    azureOpenAIClient = new OpenAIClient(
        process.env.AZURE_OPENAI_ENDPOINT,
        new AzureKeyCredential(process.env.AZURE_OPENAI_KEY)
    );
    console.log('✅ Azure OpenAI client initialized');
}

// Health check endpoint
app.http('health', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'health',
    handler: async (request, context) => {
        context.log('Health check request');

        return {
            status: 200,
            jsonBody: {
                status: 'ok',
                providers: {
                    azureOpenAI: !!azureOpenAIClient
                },
                usingAzureCredits: !!azureOpenAIClient
            }
        };
    }
});

// Chat endpoint
app.http('chat', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'api/chat',
    handler: async (request, context) => {
        try {
            context.log('Chat request received');

            const body = await request.json();
            const { messages } = body;

            if (!messages || !Array.isArray(messages)) {
                return {
                    status: 400,
                    jsonBody: { error: 'Messages array is required' }
                };
            }

            if (!azureOpenAIClient) {
                return {
                    status: 500,
                    jsonBody: { error: 'Azure OpenAI not configured' }
                };
            }

            const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o-mini';

            const result = await azureOpenAIClient.getChatCompletions(
                deploymentName,
                messages,
                {
                    maxTokens: 500,
                    temperature: 0.7
                }
            );

            return {
                status: 200,
                jsonBody: {
                    message: result.choices[0].message.content
                }
            };

        } catch (error) {
            context.log.error('Chat error:', error);
            return {
                status: 500,
                jsonBody: {
                    error: 'Failed to get AI response',
                    details: error.message
                }
            };
        }
    }
});
