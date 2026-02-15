const Redis = require('ioredis');

// Initialize Redis client
let redis = null;
if (process.env.REDIS_URL) {
    redis = new Redis(process.env.REDIS_URL);
}

module.exports = async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, score, questionsCorrect, totalQuestions } = req.body;

        if (!name || score === undefined) {
            return res.status(400).json({ error: 'Name and score are required' });
        }

        if (!redis) {
            return res.status(500).json({ error: 'Redis not configured' });
        }

        // Create a unique entry with timestamp
        const timestamp = Date.now();
        const entry = {
            name,
            score,
            questionsCorrect,
            totalQuestions,
            date: new Date().toISOString(),
            id: `${name}-${timestamp}`
        };

        // Add to sorted set (score is the sort key)
        // ioredis syntax: zadd(key, score, member)
        await redis.zadd('leaderboard', score, JSON.stringify(entry));

        return res.status(200).json({ success: true, entry });

    } catch (error) {
        console.error('Save score error:', error);
        return res.status(500).json({
            error: 'Failed to save score',
            details: error.message
        });
    }
}
