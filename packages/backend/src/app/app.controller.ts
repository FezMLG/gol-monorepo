import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateBoardDto } from './dto/createBoard.dto';
import { GetTickDto } from './dto/getTick.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('board')
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.appService.createBoard(createBoardDto);
  }

  @Get('tick')
  getTick(@Body() getTickDto: GetTickDto) {
    return this.appService.getTick(getTickDto);
  }
}
