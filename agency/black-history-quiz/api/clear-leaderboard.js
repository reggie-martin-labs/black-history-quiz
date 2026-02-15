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
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        if (!redis) {
            return res.status(500).json({ error: 'Redis not configured' });
        }

        // Delete the leaderboard key
        await redis.del('leaderboard');

        return res.status(200).json({
            success: true,
            message: 'Leaderboard cleared successfully'
        });

    } catch (error) {
        console.error('Clear leaderboard error:', error);
        return res.status(500).json({
            error: 'Failed to clear leaderboard',
            details: error.message
        });
    }
}
