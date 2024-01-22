import { Injectable } from '@nestjs/common';

// https://www.notion.so/providers-544469b3b30449118c9fff0addc6ec52
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
