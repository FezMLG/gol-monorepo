import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateBoardDto } from './dto/createBoard.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('board')
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.appService.createBoard(createBoardDto);
  }

  @Get('tick')
  getTick() {
    return this.appService.getTick();
  }
}
