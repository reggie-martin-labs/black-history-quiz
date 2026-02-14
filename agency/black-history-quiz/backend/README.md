# Black History Quiz - Backend API

Backend server for AI-powered chat functionality in the Black History Quiz app.

## Features

- ✅ RESTful API for AI chat
- ✅ Support for multiple AI providers (OpenAI & Anthropic Claude)
- ✅ Secure API key management
- ✅ CORS enabled for frontend communication
- ✅ Error handling and logging

## Prerequisites

- Node.js 16+ installed
- An API key from either:
  - **OpenAI** (recommended: GPT-4o-mini) - [Get API Key](https://platform.openai.com/api-keys)
  - **Anthropic Claude** (recommended: Claude 3.5 Sonnet) - [Get API Key](https://console.anthropic.com/)

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

**Option A: Using OpenAI**
```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-actual-key-here
OPENAI_MODEL=gpt-4o-mini
```

**Option B: Using Anthropic Claude**
```env
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
```

### 3. Start the Server

**Development mode (auto-restart on changes):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
```
GET /health
```

Response:
```json
{
  "status": "ok",
  "providers": {
    "openai": true,
    "anthropic": false
  }
}
```

### Chat
```
POST /api/chat
Content-Type: application/json
```

Request body:
```json
{
  "messages": [
    { "role": "system", "content": "You are a helpful educator..." },
    { "role": "user", "content": "Tell me about Rosa Parks" }
  ],
  "provider": "openai"  // optional: defaults to AI_PROVIDER from .env
}
```

Response:
```json
{
  "message": "Rosa Parks was a civil rights activist..."
}
```

## Frontend Integration

Update the `callAIAPI()` function in `index.html`:

```javascript
async function callAIAPI(conversation) {
    const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation })
    });

    const data = await response.json();
    return data.message;
}
```

## Cost Considerations

### OpenAI Pricing (as of 2024)
- **GPT-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- Very affordable for educational use

### Anthropic Pricing (as of 2024)
- **Claude 3.5 Sonnet**: ~$3 per 1M input tokens, ~$15 per 1M output tokens
- Higher quality responses, higher cost

**Recommendation**: Start with GPT-4o-mini for cost-effectiveness.

## Security Best Practices

1. ✅ Never commit `.env` file to version control
2. ✅ Keep API keys secure and rotated regularly
3. ✅ Consider adding rate limiting for production
4. ✅ Add authentication if deploying publicly
5. ✅ Monitor API usage to avoid unexpected costs

## Deployment

### Deploy to Heroku
```bash
# Install Heroku CLI
heroku create your-app-name
heroku config:set OPENAI_API_KEY=your_key_here
git push heroku main
```

### Deploy to Render/Railway/Fly.io
1. Connect your GitHub repo
2. Add environment variables in dashboard
3. Deploy automatically

## Troubleshooting

**Server won't start:**
- Check Node.js version: `node --version` (need 16+)
- Verify dependencies: `npm install`

**API errors:**
- Verify API key is correct in `.env`
- Check API key has available credits
- Review server logs for detailed error messages

**CORS errors:**
- Ensure backend is running
- Check frontend is pointing to correct URL
- Verify CORS is enabled in server.js

## Support

For issues or questions:
1. Check server logs
2. Verify `.env` configuration
3. Test `/health` endpoint
4. Review API provider documentation

---

Built with ❤️ for Black History education
