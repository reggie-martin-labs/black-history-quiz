const { kv } = require('@vercel/kv');

module.exports = async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get top 10 scores (highest first)
        // ZRANGE with REV gets them in descending order
        const topScores = await kv.zrange('leaderboard', 0, 9, {
            rev: true
        });

        // Parse the JSON entries
        const leaderboard = topScores.map(entry => JSON.parse(entry));

        return res.status(200).json({ leaderboard });

    } catch (error) {
        console.error('Leaderboard error:', error);
        return res.status(500).json({
            error: 'Failed to fetch leaderboard',
            details: error.message
        });
    }
}
