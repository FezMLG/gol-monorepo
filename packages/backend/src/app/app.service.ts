import { Injectable } from '@nestjs/common';
import { Board } from '@gol-monorepo/game-of-life';
import { CreateBoardDto } from './dto/createBoard.dto';
import { GetTickDto } from './dto/getTick.dto';

@Injectable()
export class AppService {
  createBoard(createBoardDto: CreateBoardDto) {
    const game = new Board().createBoard(createBoardDto.size).getBoard();
    return {
      board: game,
    };
  }
  getTick(getTickDto: GetTickDto) {
    const game = new Board().tick(getTickDto.board);
    return {
      board: game,
    };
  }
}
