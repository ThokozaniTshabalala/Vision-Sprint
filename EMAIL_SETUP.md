# Email Setup Guide

This guide will help you set up email functionality using EmailJS with Gmail.

## Option 1: EmailJS with Gmail (Recommended)

### Step 1: Create EmailJS Account
1. Go to [https://dashboard.emailjs.com](https://dashboard.emailjs.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Gmail Service
1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail**
4. Connect your Gmail account (lalelaninene@gmail.com)
5. Copy the **Service ID** (e.g., `service_xxxxxxx`)

### Step 3: Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Project Inquiry from {{from_name}}

Hi,

You have received a new project inquiry:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Project Type: {{project_type}}
Budget: {{budget}}
Timeline: {{timeline}}

Message:
{{message}}

---
Reply to: {{from_email}}
```

4. Save and copy the **Template ID** (e.g., `template_xxxxxxx`)

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key**

### Step 5: Update Configuration
1. Open `src/utils/emailService.js`
2. Replace the placeholder values:
   - `SERVICE_ID`: Your EmailJS Service ID
   - `TEMPLATE_ID`: Your EmailJS Template ID
   - `PUBLIC_KEY`: Your EmailJS Public Key

### Step 6: Using Gmail App Password
If you need to use your Gmail App Password:
1. Use your 16-character app password (no spaces), e.g., `<your 16-char Gmail App Password>`
2. In EmailJS, when connecting Gmail, you may be asked to authorize
3. EmailJS handles the authentication automatically

## Option 2: Alternative - Direct Gmail SMTP (Requires Backend)
If you prefer direct Gmail SMTP integration, you would need to:
1. Set up a backend server (Node.js/Express)
2. Use nodemailer with Gmail SMTP
3. Store credentials securely

For now, EmailJS is the simplest solution for a frontend-only app.

## Testing
1. After setup, fill out the contact form
2. Submit and check your email (lalelaninene@gmail.com)
3. You should receive the inquiry within seconds

## Troubleshooting
- Make sure all IDs are correct in `emailService.js`
- Check EmailJS dashboard for error logs
- Verify Gmail service is connected properly
- Ensure template variables match the code


