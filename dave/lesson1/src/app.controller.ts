import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// https://www.notion.so/Controller-4a2771d94e6e459cbc935ec8bd089797

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
