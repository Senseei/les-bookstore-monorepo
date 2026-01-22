import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  healthCheck(): string {
    Logger.log('Health check endpoint called', 'AppService');
    return "I'm alive!";
  }
}
