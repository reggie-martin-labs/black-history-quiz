# Azure Setup Guide for Microsoft Hackathon

Quick guide to deploy Black History Quiz using Azure services and credits.

## ✅ Prerequisites

You mentioned you have:
- Azure account with credits
- Azure OpenAI access
- GitHub Codespaces access

Perfect! Let's use them all.

---

## Step 1: Set Up Azure OpenAI Service (5 minutes)

### Get Your Azure OpenAI Credentials:

1. **Go to Azure Portal:** https://portal.azure.com
2. **Find your Azure OpenAI resource** (or create one if needed)
3. **Get Endpoint:**
   - Click your Azure OpenAI resource
   - Go to "Keys and Endpoint"
   - Copy the **Endpoint** (e.g., `https://your-resource.openai.azure.com/`)

4. **Get API Key:**
   - Same page ("Keys and Endpoint")
   - Copy **KEY 1**

5. **Get Deployment Name:**
   - Go to "Model deployments" or "Azure OpenAI Studio"
   - Note your deployment name (e.g., `gpt-4o-mini`)
   - If you don't have one, create a deployment with GPT-4o-mini model

### Update Your .env File:

```bash
cd backend
cp .env.example .env
# Edit .env file with your values:
```

```env
AI_PROVIDER=azure
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_KEY=your_actual_key_here
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini
```

### Test It:

```bash
npm install
npm start
```

Visit http://localhost:3000/health - should show:
```json
{
  "status": "ok",
  "providers": {
    "azureOpenAI": true
  },
  "usingAzureCredits": true
}
```

✅ **You're now using Azure credits instead of your personal OpenAI account!**

---

## Step 2: Deploy Frontend (Azure Static Web Apps)

### Why Azure Static Web Apps?
- ✅ Free tier (perfect for hackathon)
- ✅ Auto-deploy from GitHub
- ✅ Custom domains free
- ✅ SSL included
- ✅ CI/CD built-in

### Deploy Steps:

1. **Push to GitHub** (if not done already)

2. **Create Static Web App:**
   - Go to Azure Portal → "Create a resource"
   - Search "Static Web Apps"
   - Click "Create"

3. **Configure:**
   - **Subscription:** Your Azure subscription
   - **Resource Group:** Create new or use existing
   - **Name:** `black-history-quiz`
   - **Region:** Choose closest to you
   - **Source:** GitHub
   - **Organization:** Your GitHub username
   - **Repository:** `black-history-quiz`
   - **Branch:** `master` or `main`
   - **Build Presets:** Custom
   - **App location:** `/` (root)
   - **API location:** (leave blank for now)
   - **Output location:** (leave blank)

4. **Create!**
   - Takes 2-3 minutes
   - Auto-deploys on every push to GitHub
   - Get URL: `https://black-history-quiz.azurestaticapps.net`

---

## Step 3: Deploy Backend (Azure App Service or Functions)

### Option A: Azure App Service (Simpler)

1. **Create App Service:**
   - Azure Portal → "Create a resource"
   - Search "Web App"
   - **Name:** `black-history-api`
   - **Runtime:** Node 18 LTS
   - **Plan:** Free F1 tier (for testing)

2. **Configure Environment Variables:**
   - Go to your App Service
   - Settings → Configuration → Application settings
   - Add:
     - `AZURE_OPENAI_ENDPOINT`
     - `AZURE_OPENAI_KEY`
     - `AZURE_OPENAI_DEPLOYMENT`

3. **Deploy:**
   ```bash
   cd backend
   az webapp up --name black-history-api --resource-group YOUR-RG
   ```

### Option B: Azure Functions (Serverless - Better for hackathon!)

(Can set up if you prefer serverless approach)

---

## Step 4: Connect Frontend to Backend

Update `index.html`:

```javascript
// Find this line:
async function callAIAPI(conversation) {
    const response = await fetch('http://localhost:3000/api/chat', {

// Replace with your Azure App Service URL:
    const response = await fetch('https://black-history-api.azurewebsites.net/api/chat', {
```

Commit and push - Static Web App auto-deploys!

---

## Step 5: Add Shared Leaderboard (Azure Cosmos DB)

### Why Cosmos DB?
- ✅ Free tier (25GB storage, 1000 RU/s)
- ✅ NoSQL (perfect for leaderboards)
- ✅ Global distribution
- ✅ Real-time queries

### Quick Setup:

1. **Create Cosmos DB:**
   - Azure Portal → "Create a resource"
   - Search "Azure Cosmos DB"
   - **API:** NoSQL (recommended)
   - **Name:** `black-history-db`
   - **Free tier:** Yes!

2. **Get Connection String:**
   - Your Cosmos DB → Keys
   - Copy "PRIMARY CONNECTION STRING"

3. **Add to backend .env:**
   ```env
   COSMOS_DB_CONNECTION_STRING=your_connection_string_here
   COSMOS_DB_DATABASE=quiz
   COSMOS_DB_CONTAINER=leaderboard
   ```

4. **Update backend code** (I can help with this!)

---

## Cost Estimates (with Azure Free Tier)

| Service | Free Tier | Expected Cost |
|---------|-----------|---------------|
| **Azure OpenAI** | Pay-per-use | ~$0.15-0.50/day with moderate use |
| **Static Web Apps** | Free forever | $0 |
| **App Service F1** | Free tier | $0 |
| **Cosmos DB** | 25GB free | $0 |
| **Total** | | **~$5-15/month** |

### Set Spending Limits:

1. Azure Portal → Subscriptions
2. Your subscription → Budgets
3. Create budget alert at $20/month
4. Get email if approaching limit

---

## Sharing with Coworkers

### GitHub Repository:
1. Share repo URL
2. Coworkers can:
   - Clone repo
   - Use GitHub Codespaces (free hours)
   - Submit pull requests
   - Test locally

### Live Demo:
- Share Azure Static Web Apps URL
- No authentication needed
- Works on any device
- Perfect for hackathon demo!

---

## For Your Kids:

Just send them the Azure Static Web Apps URL:
`https://black-history-quiz.azurestaticapps.net`

- Works on phones, tablets, any browser
- No installation needed
- Add to home screen (works like an app!)
- Safe with spending limits set

---

## Hackathon Presentation Tips:

**"Built with Microsoft Azure Stack":**
- ✅ Azure OpenAI Service (AI-powered learning)
- ✅ Azure Static Web Apps (modern hosting)
- ✅ Azure Cosmos DB (global leaderboard)
- ✅ GitHub Actions (CI/CD)
- ✅ Progressive Web App (mobile-first)

**Architecture Diagram:**
```
[Users]
   ↓
[Azure Static Web Apps] → [Azure App Service]
                              ↓
                         [Azure OpenAI Service]
                              ↓
                         [Azure Cosmos DB]
```

---

## Next Steps:

1. ✅ Set up Azure OpenAI (5 min)
2. ✅ Deploy to Static Web Apps (10 min)
3. ✅ Deploy backend (10 min)
4. ✅ Add Cosmos DB leaderboard (15 min)
5. ✅ Share with coworkers and kids!

Total setup: ~40 minutes

**Questions?** I'm here to help with each step!
