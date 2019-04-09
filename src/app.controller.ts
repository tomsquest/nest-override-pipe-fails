import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { MyPipe } from './my-pipe';

@Controller()
export class AppController {
  constructor() {}

  @Get(':name')
  getHello(@Param('name', MyPipe) name: string): string {
    return name;
  }
}

