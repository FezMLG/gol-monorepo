import { IsArray } from 'class-validator';

export class GetTickDto {
  @IsArray()
  readonly board: number[][];
}
