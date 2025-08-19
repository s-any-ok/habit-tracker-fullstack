import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): { message: string; status: string; timestamp: string } {
    return {
      message: 'Habit Tracker API is running!',
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health')
  getHealth(): { status: string; timestamp: string } {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
