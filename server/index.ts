// Express Server for Email API - TypeScript
import express, { Request, Response } from 'express';
import cors from 'cors';
import { sendEmail } from './emailServer.js';
import { validateInquiry } from './inquiry.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Dev server: only accept browser calls from local Vite origins, and cap body size.
app.use(cors({ origin: /^http:\/\/localhost:\d+$/ }));
app.use(express.json({ limit: '20kb' }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Email server is running' });
});

// Email endpoint
app.post('/api/send-email', async (req: Request, res: Response) => {
  try {
    const check = validateInquiry(req.body);
    if (check.ok === 'spam') {
      return res.status(200).json({ success: true, message: 'Email sent successfully!' });
    }
    if (!check.ok) {
      return res.status(400).json({ success: false, error: check.error });
    }
    
    const result = await sendEmail(check.data);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('Send-email route failed:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Email server running on http://localhost:${PORT}`);
  console.log(`📧 Ready to send emails via Gmail SMTP`);
});

