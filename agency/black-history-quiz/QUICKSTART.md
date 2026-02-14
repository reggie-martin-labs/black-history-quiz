# Black History Quiz - Quick Start Guide

Get your Black History Quiz app up and running in 5 minutes!

## What You're Building

A complete educational platform with:
- 🎮 **Single Player Quiz** - Timed questions with leaderboards
- 📚 **Study Mode** - Browse facts by category
- 🤖 **AI Chat** - Deep dive into any topic with AI assistance

## Prerequisites

- Node.js 16+ ([Download here](https://nodejs.org/))
- An API key from OpenAI or Anthropic (see below)

## Step 1: Get an AI API Key

### Option A: OpenAI (Recommended for Cost)
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

**Cost**: ~$0.15 per 1M tokens (very affordable)

### Option B: Anthropic Claude (Recommended for Quality)
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Generate an API key
4. Copy the key (starts with `sk-ant-`)

**Cost**: ~$3 per 1M tokens (higher quality)

## Step 2: Set Up Backend

Open terminal in the project folder:

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Now edit `.env` and add your API key:

**For OpenAI:**
```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-actual-key-here
```

**For Anthropic:**
```env
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

## Step 3: Start the Backend Server

```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:3000
✅ OpenAI client initialized
```

**Keep this terminal window open!**

## Step 4: Open the Quiz App

1. Open `index.html` in your web browser
2. Try the quiz or go to **Study Mode**
3. Click **"Learn More 🤖"** on any fact
4. Chat with the AI about Black history!

## Testing the AI Chat

1. Go to **Study Mode** tab
2. Click any category (e.g., "Civil Rights")
3. Click **"Learn More"** on any fact card
4. Ask questions like:
   - "Tell me more about this"
   - "What happened next?"
   - "Who else was involved?"
   - "Why was this important?"

## Troubleshooting

### Backend won't start
- ✅ Check Node.js installed: `node --version`
- ✅ Run `npm install` again
- ✅ Verify `.env` file exists with API key

### AI chat shows errors
- ✅ Backend server running? Check terminal
- ✅ API key correct in `.env`?
- ✅ Check API key has credits/quota
- ✅ Open browser console (F12) for errors

### CORS errors
- ✅ Backend must be on `http://localhost:3000`
- ✅ Frontend opening directly (not via file://)
- ✅ Try opening with: `npx http-server` in quiz folder

## Next Steps

### Deploy to Production
- Follow `backend/README.md` for deployment guides
- Update frontend API URL to production endpoint
- Add rate limiting and authentication

### Customize Content
- Add more facts in `factsByCategory` object
- Add more quiz questions in `quizData` object
- Customize AI system prompts for different tones

### Add Features
- User authentication
- Save chat history
- Export quiz results
- Multiplayer mode (coming soon!)

## Cost Management

- Set usage limits in your AI provider dashboard
- Monitor costs regularly
- GPT-4o-mini is very affordable (~$0.10-0.50 per day for moderate use)
- Consider caching common responses

## Support

- Backend issues: Check `backend/README.md`
- Frontend issues: Check browser console (F12)
- AI provider issues: Check provider status pages

---

**Enjoy teaching and learning Black history!** 🎉
