require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize AI clients based on available API keys
let openaiClient = null;
let anthropicClient = null;

if (process.env.OPENAI_API_KEY) {
    openaiClient = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    console.log('✅ OpenAI client initialized');
}

if (process.env.ANTHROPIC_API_KEY) {
    anthropicClient = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
    });
    console.log('✅ Anthropic Claude client initialized');
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        providers: {
            openai: !!openaiClient,
            anthropic: !!anthropicClient
        }
    });
});

// Chat endpoint - OpenAI
async function chatWithOpenAI(messages) {
    if (!openaiClient) {
        throw new Error('OpenAI API key not configured');
    }

    const completion = await openaiClient.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7
    });

    return completion.choices[0].message.content;
}

// Chat endpoint - Anthropic Claude
async function chatWithAnthropic(messages) {
    if (!anthropicClient) {
        throw new Error('Anthropic API key not configured');
    }

    // Convert messages format for Claude
    // Claude expects system message separately
    const systemMessage = messages.find(m => m.role === 'system');
    const userMessages = messages.filter(m => m.role !== 'system');

    const response = await anthropicClient.messages.create({
        model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022',
        max_tokens: 500,
        system: systemMessage ? systemMessage.content : undefined,
        messages: userMessages
    });

    return response.content[0].text;
}

// Main chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { messages, provider } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Messages array is required' });
        }

        let response;
        const selectedProvider = provider || process.env.AI_PROVIDER || 'openai';

        if (selectedProvider === 'anthropic') {
            response = await chatWithAnthropic(messages);
        } else if (selectedProvider === 'openai') {
            response = await chatWithOpenAI(messages);
        } else {
            return res.status(400).json({ error: 'Invalid AI provider specified' });
        }

        res.json({ message: response });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({
            error: 'Failed to get AI response',
            details: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 Chat endpoint: http://localhost:${PORT}/api/chat`);

    if (!openaiClient && !anthropicClient) {
        console.warn('⚠️  No AI API keys configured. Please add OPENAI_API_KEY or ANTHROPIC_API_KEY to .env file');
    }
});
