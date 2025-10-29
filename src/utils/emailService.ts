// TypeScript Email Service - Sends to local API server

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

// API endpoint - uses Netlify Functions if deployed, otherwise local server
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '' : 'http://localhost:3001');

/**
 * Sends email via Netlify serverless function in production, or local API in development
 */
export const sendEmail = async (data: FormData): Promise<EmailResult> => {
  try {
    const response = await fetch(`${API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || `Server error: ${response.status}`
      };
    }

    const result = await response.json();
    
    return result;
  } catch (error: any) {
    console.error('Email API request failed:', error);
    return {
      success: false,
      error: import.meta.env.PROD 
        ? 'Failed to send email. Please try again or contact us directly.'
        : 'Failed to connect to email server. Make sure the server is running on port 3001.'
    };
  }
};

export type { FormData, EmailResult };
