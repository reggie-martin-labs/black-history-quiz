const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');

// Initialize Azure OpenAI client
let azureOpenAIClient = null;

if (process.env.AZURE_OPENAI_ENDPOINT && process.env.AZURE_OPENAI_KEY) {
    azureOpenAIClient = new OpenAIClient(
        process.env.AZURE_OPENAI_ENDPOINT,
        new AzureKeyCredential(process.env.AZURE_OPENAI_KEY)
    );
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages array is required' });
        }

        if (!azureOpenAIClient) {
            return res.status(500).json({ error: 'Azure OpenAI not configured' });
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

        return res.status(200).json({
            message: result.choices[0].message.content
        });

    } catch (error) {
        console.error('Chat error:', error);
        return res.status(500).json({
            error: 'Failed to get AI response',
            details: error.message
        });
    }
}
