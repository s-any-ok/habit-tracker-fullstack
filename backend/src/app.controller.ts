import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getHello(@Res() res: Response): void {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Habit Tracker API</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container {
            background: white;
            padding: 3rem;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
          }
          h1 {
            color: #333;
            margin-bottom: 1rem;
            font-size: 2.5rem;
          }
          p {
            color: #666;
            font-size: 1.1rem;
            margin-bottom: 2rem;
          }
          .status {
            background: #10b981;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            display: inline-block;
            font-weight: 500;
          }
          .timestamp {
            color: #999;
            font-size: 0.9rem;
            margin-top: 2rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Habit Tracker API</h1>
          <p>Your full-stack habit tracking application backend is running successfully!</p>
          <div class="status">Status: Online</div>
          <div class="timestamp">Last updated: ${new Date().toLocaleString()}</div>
        </div>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }

  @Get('health')
  getHealth(): { status: string; timestamp: string } {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
