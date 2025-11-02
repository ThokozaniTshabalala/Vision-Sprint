# 🚀 Production Deployment Guide

## Prerequisites
- ✅ Node.js 20+ installed
- ✅ Netlify account connected to your GitHub repository
- ✅ Gmail App Password generated

## 🔐 Setup Environment Variables in Netlify

**CRITICAL:** You must add these environment variables in Netlify Dashboard before deployment:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** > **Environment variables**
3. Add the following variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `GMAIL_USER` | `lalelaninene@gmail.com` | Gmail account for sending emails |
| `GMAIL_APP_PASSWORD` | `<your 16‑char Gmail App Password>` | Gmail App Password (no spaces) |
| `RECIPIENT_1` | `lalelaninene@gmail.com` | First recipient email |
| `RECIPIENT_2` | `thokozanierick02@gmail.com` | Second recipient email |

### How to Get Gmail App Password
1. Go to your Google Account settings
2. Security > 2-Step Verification (must be enabled)
3. App passwords > Generate new app password
4. Select "Mail" and "Other (Custom name)"
5. Copy the 16-character password
6. Add it to Netlify (remove spaces)

## 📦 Build Optimizations

The project includes production optimizations:
- ✅ Minified code with Terser
- ✅ Console.log removal in production
- ✅ Code splitting for better performance
- ✅ Security headers enabled
- ✅ Static asset caching (1 year)
- ✅ SPA routing configured

## 🌐 Deploy to Netlify

### Option 1: Automatic Deployment (Recommended)
```bash
git add .
git commit -m "chore: prepare for production deployment"
git push
```
Netlify will automatically build and deploy when you push to your main branch.

### Option 2: Manual Deployment via CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

## ✅ Post-Deployment Checklist

1. **Test the contact form:**
   - Visit your live site
   - Fill out the contact form
   - Submit and verify email is received

2. **Check browser console:**
   - Should be no errors
   - No console.logs in production

3. **Verify security headers:**
   - Use [Security Headers Checker](https://securityheaders.com)
   - All headers should be properly set

4. **Performance check:**
   - Use [Google PageSpeed Insights](https://pagespeed.web.dev/)
   - Test mobile and desktop performance

5. **Test all routes:**
   - Homepage
   - Discuss Project page
   - All navigation links

## 🔧 Build Commands

```bash
# Development
npm run dev

# Production build (local test)
npm run build
npm run preview

# Lint
npm run lint
```

## 📊 Expected Performance
- Lighthouse Score: 90+
- First Contentful Paint: < 2s
- Time to Interactive: < 3s
- Bundle size: ~150KB (gzipped)

## 🐛 Troubleshooting

### Email not sending?
- Check environment variables in Netlify
- Verify Gmail App Password is correct (no spaces)
- Check Netlify function logs

### Build fails?
- Check Node version (must be 20+)
- Verify all dependencies are installed
- Check build logs in Netlify

### Routing issues?
- Netlify.toml should have SPA redirect configured
- Check deployment logs

## 📱 Contact Form Functionality
- Emails sent via Netlify serverless functions
- No backend server needed
- Automatic email to both recipients
- Reply-to set to form submitter's email

## 🔒 Security Features
- Environment variables protected
- No sensitive data in source code
- Security headers configured
- XSS protection enabled
- HTTPS enforced by Netlify

---

**Last Updated:** October 29, 2025
**Deployment Platform:** Netlify
**Production URL:** https://vision-sprint.netlify.app
