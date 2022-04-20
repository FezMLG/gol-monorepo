import { IsNumber } from 'class-validator';

export class CreateBoardDto {
  @IsNumber()
  readonly size: number;
}
