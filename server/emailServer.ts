// Gmail SMTP Email Server - TypeScript
import nodemailer, { Transporter } from 'nodemailer';
import { escapeHtml, headerSafe } from './inquiry.js';

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

interface EmailResult {
  success: boolean;
  message?: string;
  error?: string;
}

// Gmail credentials from environment variables only (no hardcoded fallbacks)
const GMAIL_USER = process.env.GMAIL_USER || '';
const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s/g, '');
const RECIPIENT_EMAIL_1 = 'lalelaninene@gmail.com';
const RECIPIENT_EMAIL_2 = 'thokozanierick02@gmail.com';

// Create reusable transporter
const createTransporter = (): Transporter => {
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
        throw new Error('Missing Gmail credentials. Ensure GMAIL_USER and GMAIL_APP_PASSWORD are set in environment variables.');
    }
    return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
            pass: GMAIL_APP_PASSWORD.replace(/\s/g, ''), // Remove spaces from app password
    },
  });
};

/**
 * Formats the email HTML content
 */
const createEmailHTML = (data: FormData): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Poppins', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background: linear-gradient(135deg, #ff7f32 0%, #ff5e00 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        .email-body {
            padding: 30px;
        }
        .info-section {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #ff7f32;
        }
        .info-row {
            display: flex;
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e5e7eb;
        }
        .info-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .info-label {
            font-weight: 600;
            color: #374151;
            min-width: 140px;
            font-size: 14px;
        }
        .info-value {
            color: #1f2937;
            flex: 1;
            font-size: 14px;
        }
        .message-section {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            margin-top: 20px;
        }
        .message-section h3 {
            color: #ff7f32;
            margin-top: 0;
            font-size: 18px;
            border-bottom: 2px solid #ff7f32;
            padding-bottom: 10px;
        }
        .message-content {
            color: #4b5563;
            white-space: pre-wrap;
            line-height: 1.8;
        }
        .email-footer {
            background: #1f2937;
            color: #9ca3af;
            padding: 20px;
            text-align: center;
            font-size: 12px;
        }
        .highlight {
            color: #ff7f32;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>🎯 New Project Inquiry</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Vision Sprint Contact Form</p>
        </div>
        
        <div class="email-body">
            <div class="info-section">
                <div class="info-row">
                    <div class="info-label">👤 Name:</div>
                    <div class="info-value">${escapeHtml(data.name)}</div>
                </div>
                
                <div class="info-row">
                    <div class="info-label">📧 Email:</div>
                    <div class="info-value"><a href="mailto:${escapeHtml(data.email)}" style="color: #ff7f32; text-decoration: none;">${escapeHtml(data.email)}</a></div>
                </div>
                
                ${data.phone ? `
                <div class="info-row">
                    <div class="info-label">📞 Phone:</div>
                    <div class="info-value">${escapeHtml(data.phone)}</div>
                </div>
                ` : ''}
                
                ${data.company ? `
                <div class="info-row">
                    <div class="info-label">🏢 Company:</div>
                    <div class="info-value">${escapeHtml(data.company)}</div>
                </div>
                ` : ''}
                
                <div class="info-row">
                    <div class="info-label">🎨 Project Type:</div>
                    <div class="info-value highlight">${escapeHtml(data.projectType)}</div>
                </div>
                
                ${data.budget ? `
                <div class="info-row">
                    <div class="info-label">💰 Budget:</div>
                    <div class="info-value">${escapeHtml(data.budget)}</div>
                </div>
                ` : ''}
                
                ${data.timeline ? `
                <div class="info-row">
                    <div class="info-label">⏱️ Timeline:</div>
                    <div class="info-value">${escapeHtml(data.timeline)}</div>
                </div>
                ` : ''}
            </div>
            
            <div class="message-section">
                <h3>📝 Project Details</h3>
                <div class="message-content">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; font-size: 14px; color: #92400e;">
                    <strong>💡 Next Steps:</strong> Reply to ${escapeHtml(data.email)} to start the conversation!
                </p>
            </div>
        </div>
        
        <div class="email-footer">
            <p style="margin: 0;">
                This email was sent from Vision Sprint Contact Form<br>
                <a href="https://vision-sprint.netlify.app" style="color: #ff7f32; text-decoration: none;">vision-sprint.netlify.app</a>
            </p>
        </div>
    </div>
</body>
</html>
  `.trim();
};

/**
 * Creates plain text version
 */
const createEmailText = (data: FormData): string => {
  return `
🎯 NEW PROJECT INQUIRY - VISION SPRINT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CLIENT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:     ${data.name}
Email:    ${data.email}
${data.phone ? `Phone:    ${data.phone}` : ''}
${data.company ? `Company:  ${data.company}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 PROJECT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Project Type:  ${data.projectType}
${data.budget ? `Budget:       ${data.budget}` : ''}
${data.timeline ? `Timeline:     ${data.timeline}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 PROJECT DESCRIPTION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Next Steps: Reply directly to this email at ${data.email} to start the conversation!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This inquiry was sent from Vision Sprint Contact Form
Website: https://vision-sprint.netlify.app
  `.trim();
};

/**
 * Sends email to both recipients using Gmail SMTP
 */
export const sendEmail = async (data: FormData): Promise<EmailResult> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Vision Sprint Contact Form" <${GMAIL_USER}>`,
      to: [RECIPIENT_EMAIL_1, RECIPIENT_EMAIL_2].join(', '),
      replyTo: data.email,
      subject: `🎯 New Project Inquiry from ${headerSafe(data.name)}`,
      text: createEmailText(data),
      html: createEmailHTML(data),
    };

    await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      message: 'Email sent successfully to both recipients! We\'ll get back to you within 24 hours.'
    };
  } catch (error) {
    // Log details server-side only; SMTP errors can reveal account/config details.
    console.error('Email sending failed:', error);
    return {
      success: false,
      error: 'Failed to send email. Please try again.'
    };
  }
};

export type { FormData, EmailResult };

