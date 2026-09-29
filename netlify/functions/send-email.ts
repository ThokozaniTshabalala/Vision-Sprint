// Netlify Serverless Function - No server to manage!
import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';
import { escapeHtml, headerSafe, validateInquiry, type Inquiry } from '../../server/inquiry';

// Use environment variables for security
const GMAIL_USER = process.env.GMAIL_USER || 'lalelaninene@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || '';
const RECIPIENT_1 = process.env.RECIPIENT_1 || 'lalelaninene@gmail.com';
const RECIPIENT_2 = process.env.RECIPIENT_2 || 'thokozanierick02@gmail.com';
// Absolute URL for logo: prefer explicit env, fallback to Netlify site URL + public asset
const SITE_URL = process.env.SITE_URL || process.env.URL || 'https://vision-sprint.netlify.app';
const COMPANY_LOGO_URL = process.env.COMPANY_LOGO_URL || `${SITE_URL}/vision_sprint_logo123.png`;
// Prefer a dark/white logo on colored (orange) header backgrounds
const COMPANY_LOGO_DARK_URL = process.env.COMPANY_LOGO_DARK_URL || COMPANY_LOGO_URL;

const createEmailHTML = (data: Inquiry): string => {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Poppins, Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 20px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #ff7f32 0%, #ff5e00 100%); color: white; padding: 30px 20px; text-align: center;">
      <div style="margin-bottom: 10px;">
  <img src="${COMPANY_LOGO_DARK_URL}"
             alt="Vision Sprint Logo"
             style="max-width: 140px; height: auto; display: inline-block; border-radius: 8px; background: rgba(255,255,255,0.06); padding: 6px;" />
      </div>
      <h1 style="margin: 0; font-size: 24px;">🎯 New Project Inquiry</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Vision Sprint Contact Form</p>
    </div>
    <div style="padding: 30px;">
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #ff7f32; margin-bottom: 20px;">
        <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;"><strong>👤 Name:</strong> ${escapeHtml(data.name)}</div>
        <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;"><strong>📧 Email:</strong> <a href="mailto:${escapeHtml(data.email)}" style="color: #ff7f32;">${escapeHtml(data.email)}</a></div>
        ${data.phone ? `<div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;"><strong>📞 Phone:</strong> ${escapeHtml(data.phone)}</div>` : ''}
        ${data.company ? `<div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;"><strong>🏢 Company:</strong> ${escapeHtml(data.company)}</div>` : ''}
        <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;"><strong>🎨 Project Type:</strong> <span style="color: #ff7f32; font-weight: 600;">${escapeHtml(data.projectType)}</span></div>
        ${data.budget ? `<div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;"><strong>💰 Budget:</strong> ${escapeHtml(data.budget)}</div>` : ''}
        ${data.timeline ? `<div style=\"margin-bottom: 12px;\"><strong>⏱️ Timeline:</strong> ${escapeHtml(data.timeline)}</div>` : ''}
      </div>
      <div style="padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="color: #ff7f32; margin-top: 0; border-bottom: 2px solid #ff7f32; padding-bottom: 10px;">📝 Project Details</h3>
        <div style="color: #4b5563; white-space: pre-wrap; line-height: 1.8;">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
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
  // CORS headers
  const headers = {
    // Only the site itself may call this endpoint from a browser.
    'Access-Control-Allow-Origin': SITE_URL,
    Vary: 'Origin',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    let raw: unknown;
    try {
      raw = JSON.parse(event.body || '{}');
    } catch {
      return { statusCode: 400, headers, body: JSON.stringify({ success: false, error: 'Invalid request body' }) };
    }

    const result = validateInquiry(raw);
    if (result.ok === 'spam') {
      // Honeypot tripped: pretend success so bots don't learn to adapt.
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, message: 'Email sent successfully!' }) };
    }
    if (!result.ok) {
      return { statusCode: 400, headers, body: JSON.stringify({ success: false, error: result.error }) };
    }
    const data = result.data;

    // Check if email credentials are configured
    if (!GMAIL_APP_PASSWORD) {
      console.error('GMAIL_APP_PASSWORD not configured');
      return {
        statusCode: 500,
        headers,
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

    const safeName = headerSafe(data.name);

    // Send email
    await transporter.sendMail({
      from: `"Vision Sprint" <${GMAIL_USER}>`,
      to: `${RECIPIENT_1}, ${RECIPIENT_2}`,
      replyTo: data.email,
      subject: `🎯 New Project Inquiry from ${safeName}`,
      html: createEmailHTML(data),
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully! We\'ll get back to you within 24 hours.',
      }),
    };
  } catch (error) {
    // Log details server-side only; SMTP errors can reveal account/config details.
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to send email. Please try again or contact us directly.',
      }),
    };
  }
};



