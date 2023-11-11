import { IsNotEmpty } from 'class-validator';

export class UserTagDto {
  @IsNotEmpty({ message: '标签Id不能为空' })
  tagId: number;
}
