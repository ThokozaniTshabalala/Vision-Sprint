# How to Run the Email System

## Setup (One-time)

1. **Start the Email Server:**
   ```bash
   npm run server
   ```
   This starts the TypeScript email server on port 3001.

2. **Start the Frontend:**
   In a separate terminal:
   ```bash
   npm run dev
   ```

## Usage

1. Both servers should be running:
   - Frontend: `http://localhost:5173` (or your Vite port)
   - Email Server: `http://localhost:3001`

2. Navigate to the "Discuss Project" page

3. Fill out the form and click "Send Message"

4. Email will be automatically sent to:
   - lalelaninene@gmail.com
   - thokozanierick02@gmail.com

## Production Deployment

For production, you'll need to:

1. **Deploy the server** to a hosting service (Heroku, Railway, Render, etc.)
2. Update `VITE_API_URL` in your frontend environment variables
3. Set `GMAIL_USER` and `GMAIL_APP_PASSWORD` as environment variables on your server

The server uses your Gmail credentials directly - no third-party services needed!



