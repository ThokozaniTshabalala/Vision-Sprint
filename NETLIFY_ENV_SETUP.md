# 🔐 Netlify Environment Variables Setup Guide

## ⚠️ CRITICAL: Email Won't Work Without These!

Your contact form **requires** these environment variables to be set in Netlify. Without them, you'll get 404 or 500 errors.

---

## 📋 Step-by-Step Instructions

### 1. Go to Netlify Dashboard
👉 https://app.netlify.com/

### 2. Select Your Site
- Click on **"Vision Sprint"** (or your site name)

### 3. Navigate to Environment Variables
- Click **"Site configuration"** in the left sidebar
- Click **"Environment variables"** 
- OR go directly to: **Site settings** → **Environment variables**

### 4. Add Each Variable

Click **"Add a variable"** button and add these **4 variables** one by one:

---

#### Variable 1: GMAIL_USER
```
Key:   GMAIL_USER
Value: lalelaninene@gmail.com
```
- Click **"Create variable"**

---

#### Variable 2: GMAIL_APP_PASSWORD
```
Key:   GMAIL_APP_PASSWORD
Value: <your 16-char Gmail App Password>
```
**⚠️ IMPORTANT:** 
- 16 characters, no spaces (generated from Google App Passwords)
- Click **"Create variable"**

---

#### Variable 3: RECIPIENT_1
```
Key:   RECIPIENT_1
Value: lalelaninene@gmail.com
```
- Click **"Create variable"**

---

#### Variable 4: RECIPIENT_2
```
Key:   RECIPIENT_2
Value: thokozanierick02@gmail.com
```
- Click **"Create variable"**

---

### 5. Verify All Variables Are Set

You should now see all 4 variables listed:
- ✅ GMAIL_USER
- ✅ GMAIL_APP_PASSWORD
- ✅ RECIPIENT_1
- ✅ RECIPIENT_2

---

### 6. Redeploy Your Site

After adding the variables:
1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** dropdown
3. Select **"Clear cache and deploy site"**
4. Wait for deployment to complete (~2-3 minutes)

---

## 🧪 Test the Contact Form

1. Visit your live site: **https://vision-sprint.netlify.app**
2. Go to "Discuss Project" page
3. Fill out the contact form with test data
4. Click "Send Message"
5. You should see: ✅ "Email sent successfully!"
6. Check both email addresses for the message

---

## 🐛 Troubleshooting

### Still Getting Errors?

#### Check Function Logs:
1. Go to Netlify Dashboard
2. Click **"Functions"** tab
3. Click on **"send-email"** function
4. Check the logs for errors

#### Common Issues:

**"Email service not configured"**
- ❌ GMAIL_APP_PASSWORD is missing or empty
- ✅ Add GMAIL_APP_PASSWORD in environment variables

**"Server error: 404"**
- ❌ Function not deployed
- ✅ Check Deploys → Functions section
- ✅ Redeploy if needed

**"Failed to send email"**
- ❌ Gmail password is incorrect
- ❌ Gmail password has spaces
- ✅ Verify password: 16 chars, no spaces
- ✅ Check Gmail account has 2FA enabled

**"Invalid credentials"**
- ❌ Gmail App Password expired or revoked
- ✅ Generate new Gmail App Password:
  1. Google Account → Security
  2. 2-Step Verification
  3. App passwords → Create new
  4. Update GMAIL_APP_PASSWORD in Netlify

---

## 📸 Visual Guide

### Where to find Environment Variables in Netlify:

```
Netlify Dashboard
└── Your Site (Vision Sprint)
    └── Site configuration (left sidebar)
        └── Environment variables
            └── Add a variable (button)
```

### What it should look like:

```
Environment variables (4)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GMAIL_USER              lalelaninene@gmail.com
GMAIL_APP_PASSWORD      <your 16-char Gmail App Password>
RECIPIENT_1             lalelaninene@gmail.com
RECIPIENT_2             thokozanierick02@gmail.com
```

---

## ✅ Verification Checklist

Before testing, make sure:
- [ ] All 4 environment variables are added in Netlify
- [ ] GMAIL_APP_PASSWORD has NO spaces
- [ ] Gmail account has 2-Factor Authentication enabled
- [ ] Site has been redeployed after adding variables
- [ ] Functions show "send-email" in Netlify dashboard

---

## 🎯 Expected Result

When everything is configured correctly:

1. **User submits form** → 
2. **Frontend calls** `/api/send-email` → 
3. **Netlify routes to** serverless function → 
4. **Function reads** environment variables → 
5. **Sends email** via Gmail SMTP → 
6. **Both recipients** receive beautifully formatted email → 
7. **User sees** success message ✅

---

**Need More Help?**
- Check Netlify Functions logs for detailed error messages
- Verify Gmail App Password is still valid
- Make sure 2FA is enabled on Gmail account

---

**Last Updated:** October 29, 2025
