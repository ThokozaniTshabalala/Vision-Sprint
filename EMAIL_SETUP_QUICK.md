# Quick Email Setup (2 minutes)

To enable automatic email sending on click, follow these simple steps:

## Step 1: Create EmailJS Account
1. Go to [https://dashboard.emailjs.com](https://dashboard.emailjs.com)
2. Sign up (free) or log in

## Step 2: Add Gmail Service
1. In EmailJS dashboard, click **Email Services** → **Add New Service**
2. Select **Gmail**
3. Click **Connect Account** and sign in with: `lalelaninene@gmail.com`
4. When prompted for password, use the app password: `dbdh dpre fbji cgui`
5. Copy the **Service ID** (starts with `service_`)

## Step 3: Create Email Template
1. Go to **Email Templates** → **Create New Template**
2. Use this template:

**Template Name:** Vision Sprint Contact Form

**Subject:** `🎯 New Project Inquiry from {{from_name}}`

**Content:**
```
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

3. Copy the **Template ID** (starts with `template_`)

## Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key**

## Step 5: Update Configuration

Create a `.env` file in the project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**OR** edit `src/utils/emailService.ts` directly and replace:
- `SERVICE_ID`
- `TEMPLATE_ID`
- `PUBLIC_KEY`

## Done! 🎉

Now when users click "Send Message", emails will be sent automatically to `lalelaninene@gmail.com` without any manual steps!



