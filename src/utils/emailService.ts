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
  (import.meta.env.PROD ? '/api' : 'http://localhost:3001');

/**
 * Sends email via local API server (uses Gmail SMTP)
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

    const result = await response.json();
    
    return result;
  } catch (error: any) {
    console.error('Email API request failed:', error);
    return {
      success: false,
      error: 'Failed to connect to email server. Make sure the server is running on port 3001.'
    };
  }
};

export type { FormData, EmailResult };
