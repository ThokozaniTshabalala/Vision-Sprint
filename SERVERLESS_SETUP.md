# 🚀 Serverless Email Setup (No Server to Manage!)

## What Changed?

Instead of running a server, we're using **Netlify Serverless Functions**. You deploy once, and it works forever - no server to manage!

## Option 1: Deploy to Netlify (Recommended)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo>
git push -u origin main
```

### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repo
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

**That's it!** Your email function will work automatically at `https://yoursite.netlify.app/api/send-email`

## Option 2: Local Development (Still Need Server)

For local testing, you still need the server:

```bash
# Terminal 1: Start email server
npm run server

# Terminal 2: Start frontend
npm run dev
```

## How It Works

- **Development**: Uses local server on port 3001
- **Production**: Uses Netlify Functions (no server needed!)

The frontend automatically detects which environment and uses the correct API URL.

## Why Serverless?

✅ **No server to manage** - Netlify handles everything  
✅ **Auto-scales** - Handles any traffic  
✅ **Free tier** - Netlify Functions are free for reasonable use  
✅ **Easy deployment** - One click deploy  
✅ **Still uses your Gmail** - No third-party services  

Your credentials are embedded in the function, so emails still come from your Gmail account!

