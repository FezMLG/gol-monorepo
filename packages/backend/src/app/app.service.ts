import { Injectable } from '@nestjs/common';
import { Board } from '@gol-monorepo/game-of-life';
import { CreateBoardDto } from './dto/createBoard.dto';

@Injectable()
export class AppService {
  createBoard(createBoardDto: CreateBoardDto) {
    const game = new Board();
    return game.createBoard(createBoardDto.size).getBoard();
  }
  getTick() {
    throw new Error('Method not implemented.');
  }
  getData(): { message: string } {
    return { message: 'Welcome to backend!' };
  }
}
