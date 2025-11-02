# 📧 Email System - Complete Setup

## ✅ What's Been Configured

- **TypeScript-based email system** using Gmail SMTP
- **No third-party services** - uses your Gmail credentials directly
- **Sends to both emails:**
  - lalelaninene@gmail.com
  - thokozanierick02@gmail.com
- **Phone numbers updated:**
  - +27 64 421 0047
  - +27 69 806 1824

## 🚀 Quick Start

### 1. Start Email Server (Terminal 1)
```bash
npm run server
```
Server runs on `http://localhost:3001`

### 2. Start Frontend (Terminal 2)
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

### 3. Test the Form
- Navigate to `/discuss-project`
- Fill out the form
- Click "Send Message"
- Email is sent automatically!

## 📁 Project Structure

```
Vision-Sprint/
├── server/
│   ├── index.ts          # Express API server
│   └── emailServer.ts    # Gmail SMTP email logic
├── src/
│   └── utils/
│       └── emailService.ts  # Frontend API client
└── package.json
```

## 🔧 Configuration

Configure credentials via environment variables (recommended). Create a `.env` file locally (do not commit secrets):
```env
GMAIL_USER=lalelaninene@gmail.com
GMAIL_APP_PASSWORD=<your 16-char Gmail App Password>
PORT=3001
```

## 📦 Production Deployment

1. Deploy server to hosting service (Heroku, Railway, Render, etc.)
2. Set environment variables on hosting platform
3. Update `VITE_API_URL` in frontend `.env`
4. Deploy frontend (Netlify, Vercel, etc.)

## ✨ Features

- ✅ Beautiful HTML email template
- ✅ Plain text fallback
- ✅ Automatic email sending on click
- ✅ Sends to multiple recipients
- ✅ TypeScript type safety
- ✅ No third-party dependencies (EmailJS removed)
- ✅ Uses your own Gmail account

## 🐛 Troubleshooting

**Server won't start:**
- Check if port 3001 is available
- Ensure Node.js version is 18+

**Emails not sending:**
- Verify Gmail app password is correct
- Check server console for errors
- Ensure Gmail account has 2FA enabled and app password created

**Frontend can't connect:**
- Make sure email server is running
- Check API URL matches server port
- Look for CORS errors in browser console



