// Netlify Serverless Function - No server to manage!
import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
}

// Use environment variables for security
const GMAIL_USER = process.env.GMAIL_USER || 'lalelaninene@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || '';
const RECIPIENT_1 = process.env.RECIPIENT_1 || 'lalelaninene@gmail.com';
const RECIPIENT_2 = process.env.RECIPIENT_2 || 'thokozanierick02@gmail.com';

const createEmailHTML = (data: FormData): string => {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Poppins, Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 20px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #ff7f32 0%, #ff5e00 100%); color: white; padding: 30px 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 24px;">🎯 New Project Inquiry</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Vision Sprint Contact Form</p>
    </div>
    <div style="padding: 30px;">
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #ff7f32; margin-bottom: 20px;">
        <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;"><strong>👤 Name:</strong> ${data.name}</div>
        <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;"><strong>📧 Email:</strong> <a href="mailto:${data.email}" style="color: #ff7f32;">${data.email}</a></div>
        ${data.phone ? `<div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;"><strong>📞 Phone:</strong> ${data.phone}</div>` : ''}
        ${data.company ? `<div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;"><strong>🏢 Company:</strong> ${data.company}</div>` : ''}
        <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;"><strong>🎨 Project Type:</strong> <span style="color: #ff7f32; font-weight: 600;">${data.projectType}</span></div>
        ${data.budget ? `<div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;"><strong>💰 Budget:</strong> ${data.budget}</div>` : ''}
        ${data.timeline ? `<div style="margin-bottom: 12px;"><strong>⏱️ Timeline:</strong> ${data.timeline}</div>` : ''}
      </div>
      <div style="padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="color: #ff7f32; margin-top: 0; border-bottom: 2px solid #ff7f32; padding-bottom: 10px;">📝 Project Details</h3>
        <div style="color: #4b5563; white-space: pre-wrap; line-height: 1.8;">${data.message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div style="background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px;">
      <p style="margin: 0;">Vision Sprint Contact Form | <a href="https://vision-sprint.netlify.app" style="color: #ff7f32;">vision-sprint.netlify.app</a></p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

export const handler: Handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data: FormData = JSON.parse(event.body || '{}');
    
    // Validate
    if (!data.name || !data.email || !data.projectType || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: 'Missing required fields' }),
      };
    }

    // Check if email credentials are configured
    if (!GMAIL_APP_PASSWORD) {
      console.error('GMAIL_APP_PASSWORD not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: 'Email service not configured' }),
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Vision Sprint" <${GMAIL_USER}>`,
      to: `${RECIPIENT_1}, ${RECIPIENT_2}`,
      replyTo: data.email,
      subject: `🎯 New Project Inquiry from ${data.name}`,
      html: createEmailHTML(data),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully! We\'ll get back to you within 24 hours.',
      }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message || 'Failed to send email',
      }),
    };
  }
};



