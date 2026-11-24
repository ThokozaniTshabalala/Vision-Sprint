// Express Server for Email API - TypeScript
import express, { Request, Response } from 'express';
import cors from 'cors';
import { sendEmail, type FormData } from './emailServer.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Email server is running' });
});

// Email endpoint
app.post('/api/send-email', async (req: Request, res: Response) => {
  try {
    const formData: FormData = req.body;
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.projectType || !formData.message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const result = await sendEmail(formData);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Email server running on http://localhost:${PORT}`);
  console.log(`📧 Ready to send emails via Gmail SMTP`);
});

